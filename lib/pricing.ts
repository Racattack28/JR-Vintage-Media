import { DeliveryMethod, deliveryCatalog } from "./data";

export function pricePerTape(totalTapes: number): number {
  if (totalTapes >= 11) return 30;
  if (totalTapes >= 6) return 32;
  return 35;
}

export interface QuoteInputs {
  vhsCount: number;
  longMedCount: number;
  longMaxCount: number;
  deliveryMethod: DeliveryMethod;
}

export interface QuoteTotals {
  totalTapes: number;
  pricePerTape: number;
  tapeSubtotal: number;
  longSurcharge: number;
  deliveryPrice: number;
  grandTotal: number;
}

export function computeQuoteTotals(inputs: QuoteInputs): QuoteTotals {
  const totalTapes = inputs.vhsCount;
  const perTape = totalTapes > 0 ? pricePerTape(totalTapes) : 35;
  const tapeSubtotal = perTape * totalTapes;
  const longSurcharge = inputs.longMedCount * 15 + inputs.longMaxCount * 30;

  const deliveryEntry = deliveryCatalog.find((d) => d.id === inputs.deliveryMethod);
  const deliveryPrice = deliveryEntry?.startingPrice ?? 0;

  const grandTotal = tapeSubtotal + longSurcharge + deliveryPrice;

  return {
    totalTapes,
    pricePerTape: perTape,
    tapeSubtotal,
    longSurcharge,
    deliveryPrice,
    grandTotal,
  };
}
