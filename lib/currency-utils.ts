import type { Currency } from "./currency-context";
import type { ProcessedReceipt } from "./types";

export const formatCurrency = (amount: number, currency: Currency): string => {
  const currencySymbols: Record<Currency, string> = {
    USD: "$",
    EUR: "€", 
    TRY: "₺",
  };

  return `${currencySymbols[currency]}${amount.toFixed(2)}`;
};

export const getCurrencySymbol = (currency: Currency): string => {
  const currencySymbols: Record<Currency, string> = {
    USD: "$",
    EUR: "€", 
    TRY: "₺",
  };
  return currencySymbols[currency] || "$";
};

export const convertReceiptAmount = (
  receipt: ProcessedReceipt,
  toCurrency: Currency
): number => {
  // For now, just return the original amount
  // In a full implementation, you'd convert between currencies here
  // For this simple version, we'll just display all amounts as-is
  return receipt.amount;
};

export const convertReceiptTaxAmount = (
  receipt: ProcessedReceipt,
  toCurrency: Currency
): number => {
  // For now, just return the original tax amount
  // In a full implementation, you'd convert between currencies here
  return receipt.taxAmount;
};