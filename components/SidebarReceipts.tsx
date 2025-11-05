"use client";

import type { ProcessedReceipt, SpendingBreakdown } from "@/lib/types";
import CurrencySelector from "./CurrencySelector";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency, convertReceiptAmount } from "@/lib/currency-utils";

interface SidebarReceiptsProps {
  processedReceipts: ProcessedReceipt[];
  spendingBreakdown: SpendingBreakdown;
  onAddMoreReceipts: () => void;
  isProcessing: boolean;
}

function calculateTotals(receipts: ProcessedReceipt[], currency: string) {
  // For now, just sum all amounts regardless of currency
  // In a full implementation, you'd convert to the selected currency
  const totalSpending = receipts.reduce(
    (sum, receipt) => sum + receipt.amount,
    0
  );
  const totalReceipts = receipts.length;
  return { totalSpending, totalReceipts };
}

export default function SidebarReceipts({
  processedReceipts,
  spendingBreakdown,
  onAddMoreReceipts,
  isProcessing,
}: SidebarReceiptsProps) {
  const { selectedCurrency } = useCurrency();
  const { totalSpending, totalReceipts } = calculateTotals(processedReceipts, selectedCurrency);

  return (
    <div className="w-[calc(100% - 16px)] md:max-w-[322px] rounded-2xl bg-white border border-[#d1d5dc] m-4 md:mr-0 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src="/icon.svg" className="w-6 h-6" alt="Icon" />
          <img
            src="/logo.svg"
            className="text-lg font-semibold text-[#101828]"
            width="107"
            height="20"
            alt="Receipt Hero"
          />
        </div>
      </div>
      {/* Total Spending */}
      <div className="">
        <div className="px-8 py-6">
          <p className="text-sm text-[#1d293d] mb-2">Total Spending</p>
          <p className="text-4xl font-semibold text-[#020618] mb-4">
            {formatCurrency(totalSpending, selectedCurrency)}
          </p>
          <p className="text-sm text-[#4a5565]">
            {totalReceipts} receipts processed
          </p>
          
          {/* Currency Selector */}
          <div className="mt-4">
            <CurrencySelector />
          </div>
        </div>
        {/* Spending Breakdown */}
        <div className="bg-white border border-gray-200 px-8 py-5 mb-6">
          <div className="space-y-4">
            {spendingBreakdown.categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium capitalize">
                    {category.name}
                  </span>
                  <span className="text-sm">{formatCurrency(category.amount, selectedCurrency)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                    <div
                      className="bg-[#1e2939] h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#6a7282]">
                    {category.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Upload Section */}
        <div
          className="rounded-xl bg-gray-50 border border-[#d1d5dc] border-dashed p-4 cursor-pointer m-6"
          onClick={onAddMoreReceipts}
          style={isProcessing ? { opacity: 0.5, pointerEvents: "none" } : {}}
        >
          <div className="flex flex-col items-center gap-2">
            <img
              src={isProcessing ? "/loading.svg" : "/upload.svg"}
              className={`w-8 h-8 ${isProcessing ? "animate-spin" : ""}`}
              alt={isProcessing ? "Loading" : "Upload"}
            />
            <p className="text-base font-medium text-[#1e2939]">
              {isProcessing ? "Uploading receipts..." : "Upload Receipts"}
            </p>
            <p className="text-sm text-center text-[#6a7282]">
              Receipts will be added to the table
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
