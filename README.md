<a href="https://www.receipthero.app">
  <img alt="ReceiptHero" src="./public/og.png">
  <h1 align="center">ReceiptHero</h1>
</a>

<p align="center">
  An open source receipt management app with AI-powered OCR. Powered by Vercel AI Gateway.
</p>

## Tech stack

- **Next.js 15** with app router and **React 19**
- **Vercel AI Gateway** with **OpenAI GPT-4o** for LLM-powered OCR
- **Tailwind CSS 4** with CSS variables
- **shadcn/ui components** (new-york style) with Radix UI
- **TypeScript** with strict mode enabled
- **Zod** for data validation and type inference
- **PDF processing** with pdf-lib and pdfjs-dist
- **Plausible Analytics** for privacy-focused analytics
- **pnpm** for fast, efficient package management

## How it works

1. **Upload receipts** via drag & drop or file selection (supports PDF and images)
2. **AI processing** - Send files to OpenAI GPT-4o via Vercel AI Gateway for OCR
3. **Data extraction** - Extract structured data: vendor, date, amount, tax, currency, payment method
4. **Smart categorization** - Automatically categorize expenses (groceries, dining, gas, healthcare, etc.)
5. **Currency conversion** - Multi-currency support with automatic conversion
6. **Analytics & insights** - View spending breakdown and receipt management interface
7. **Privacy-first** - All data stored locally in browser, no server-side persistence

## Features

- 🔍 **AI-powered OCR** - Extract text and data from receipt images and PDFs
- 📊 **Smart categorization** - Automatically categorize expenses by type
- 💰 **Multi-currency support** - Handle receipts in different currencies with conversion
- 📱 **Responsive design** - Works seamlessly on desktop and mobile devices  
- 🏷️ **Expense tracking** - Track spending by category, vendor, and date
- 📄 **PDF support** - Process both image and PDF receipt formats
- 🔒 **Privacy-focused** - All processing happens locally, no data leaves your browser
- ⚡ **Fast performance** - Built with Next.js 15 and React 19 for optimal speed
- 🎨 **Modern UI** - Clean interface using shadcn/ui components

## Cloning & running

1. **Fork or clone** the repository
2. **Get API access** - Create an account at [Vercel AI Gateway](https://vercel.com/ai-gateway) for the OCR API
3. **Environment setup** - Create a `.env.local` file (use `.example.env` for reference):
   ```bash
   AI_GATEWAY_API_KEY=your_vercel_ai_gateway_api_key
   ```
4. **Install dependencies** - This project uses pnpm for faster installs:
   ```bash
   pnpm install
   ```
5. **Run locally**:
   ```bash
   pnpm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) to view the app

## Development

- **Build**: `pnpm build` 
- **Type checking**: TypeScript strict mode enabled
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Code style**: See `AGENTS.md` for detailed guidelines
