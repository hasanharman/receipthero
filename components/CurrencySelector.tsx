"use client";

import * as React from "react";
import { useCurrency, Currency } from "@/lib/currency-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CURRENCIES = [
  {
    value: "USD" as Currency,
    label: "US Dollar",
    symbol: "$",
  },
  {
    value: "EUR" as Currency,
    label: "Euro", 
    symbol: "€",
  },
  {
    value: "TRY" as Currency,
    label: "Turkish Lira",
    symbol: "₺",
  },
];

export default function CurrencySelector() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const currentCurrency = CURRENCIES.find(c => c.value === selectedCurrency);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Display Currency
      </label>
      <Select value={selectedCurrency} onValueChange={(value: Currency) => setSelectedCurrency(value)}>
        <SelectTrigger className="w-full font-mono">
          <SelectValue>
            {currentCurrency?.symbol} {currentCurrency?.label} ({currentCurrency?.value})
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {CURRENCIES.map((currency) => (
            <SelectItem key={currency.value} value={currency.value}>
              {currency.symbol}{" "}
              <span className="text-muted-foreground">{currency.label} ({currency.value})</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}