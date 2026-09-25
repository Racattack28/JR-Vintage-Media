import { DeliveryMethod, deliveryCatalog } from "./data";

export const DVD_PRICE = 15;

export function pricePerTape(totalTapes: number): number {
  if (totalTapes >= 11) return 30;
  if (totalTapes >= 6) return 32;
  return 35;
}

export interface QuoteInputs {
  vhsCount: number;
  dvdCount: number;
  longMedCount: number;
  longMaxCount: number;
  deliveryMethod: DeliveryMethod;
}

export interface QuoteTotals {
  totalTapes: number;
  pricePerTape: number;
  tapeSubtotal: number;
  longSurcharge: number;
  dvdSubtotal: number;
  deliveryPrice: number;
  grandTotal: number;
}

export function computeQuoteTotals(inputs: QuoteInputs): QuoteTotals {
  const totalTapes = inputs.vhsCount;
  const perTape = totalTapes > 0 ? pricePerTape(totalTapes) : 35;
  const tapeSubtotal = perTape * totalTapes;
  const longSurcharge = inputs.longMedCount * 15 + inputs.longMaxCount * 30;
  // DVDs are a flat rate and deliberately don't count toward the tape
  // volume tiers above.
  const dvdSubtotal = inputs.dvdCount * DVD_PRICE;

  const deliveryEntry = deliveryCatalog.find((d) => d.id === inputs.deliveryMethod);
  const deliveryPrice = deliveryEntry?.startingPrice ?? 0;

  const grandTotal = tapeSubtotal + longSurcharge + dvdSubtotal + deliveryPrice;

  return {
    totalTapes,
    pricePerTape: perTape,
    tapeSubtotal,
    longSurcharge,
    dvdSubtotal,
    deliveryPrice,
    grandTotal,
  };
}

export function itemsNoun(tapeCount: number, dvdCount: number): string {
  if (tapeCount > 0 && dvdCount > 0) return "tapes and DVDs";
  if (dvdCount > 0) return "DVDs";
  return "tapes";
}
