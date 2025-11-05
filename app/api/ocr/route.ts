import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { ProcessedReceiptSchema } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdf") as File;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing required field: pdf" },
        { status: 400 }
      );
    }

    console.log("📄 Processing:", file.name);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    const receiptSchema = z.object({
      receipts: z.array(ProcessedReceiptSchema),
    });

    console.log("🤖 Sending to AI...");

    // Use OpenAI GPT-4o with AI Gateway (plain string)
    const result = await generateObject({
      model: "openai/gpt-4o" as any, // Type assertion for AI Gateway
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Extract receipt data from this image and return JSON.

Format:
{
  "receipts": [{
    "id": "receipt-${Date.now()}",
    "fileName": "${file.name}",
    "date": "YYYY-MM-DD",
    "vendor": "store name",
    "category": "groceries|dining|gas|healthcare|shopping|electronics|home|clothing|utilities|entertainment|travel|other",
    "paymentMethod": "cash|credit|debit|check|gift card|digital wallet",
    "taxAmount": 5.50,
    "amount": 75.50,
    "currency": "USD",
    "thumbnail": "",
    "base64": "",
    "mimeType": "application/pdf"
  }]
}

Categories: Walmart/Target/Costco=groceries, McDonald's/Starbucks=dining, Shell/BP=gas, CVS=healthcare, Best Buy=electronics
Currency: $=USD, €=EUR, £=GBP, د.إ=AED`,
            },
            {
              type: "image",
              image: `data:application/pdf;base64,${base64}`,
            },
          ],
        },
      ],
      schema: receiptSchema,
      temperature: 0,
    });

    console.log("🔍 Response:", JSON.stringify(result.object, null, 2));

    const validated = receiptSchema.safeParse(result.object);

    if (!validated.success) {
      console.error("❌ Validation failed:", validated.error);

      const obj = result.object as any;
      if (
        obj?.receipts &&
        Array.isArray(obj.receipts) &&
        obj.receipts.length > 0
      ) {
        console.log("⚠️ Fixing data...");
        const fixed = obj.receipts.map((r: any) => ({
          id: r.id || `receipt-${Date.now()}`,
          fileName: r.fileName || file.name,
          date: r.date || new Date().toISOString().split("T")[0],
          vendor: r.vendor || "Unknown",
          category: r.category || "other",
          paymentMethod: r.paymentMethod || "unknown",
          taxAmount: Number(r.taxAmount) || 0,
          amount: Number(r.amount) || 0,
          currency: (r.currency || "USD").toUpperCase(),
          thumbnail: "",
          base64: "",
          mimeType: "application/pdf",
        }));
        console.log("✅ Fixed:", fixed);
        return NextResponse.json({ receipts: fixed });
      }

      return NextResponse.json(
        { error: "No receipt data found" },
        { status: 422 }
      );
    }

    console.log("✅ Success:", validated.data.receipts.length, "receipt(s)");
    return NextResponse.json({ receipts: validated.data.receipts });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      {
        error: "OCR failed",
        details: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
