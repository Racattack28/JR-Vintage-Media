import { DeliveryMethod, hddSizes, usbSizes } from "./data";

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
  usbSize: string;
  hddSize: string;
}

export interface QuoteTotals {
  totalTapes: number;
  pricePerTape: number;
  tapeSubtotal: number;
  longSurcharge: number;
  showSizePicker: boolean;
  deliveryPrice: number;
  deliverySizeLabel: string | null;
  grandTotal: number;
}

export function computeQuoteTotals(inputs: QuoteInputs): QuoteTotals {
  const totalTapes = inputs.vhsCount;
  const perTape = totalTapes > 0 ? pricePerTape(totalTapes) : 35;
  const tapeSubtotal = perTape * totalTapes;
  const longSurcharge = inputs.longMedCount * 15 + inputs.longMaxCount * 30;

  const showSizePicker =
    inputs.deliveryMethod === "usb" || inputs.deliveryMethod === "harddrive";
  const activeSizeList = inputs.deliveryMethod === "usb" ? usbSizes : hddSizes;
  const activeSizeId =
    inputs.deliveryMethod === "usb" ? inputs.usbSize : inputs.hddSize;
  const activeSize =
    activeSizeList.find((sz) => sz.id === activeSizeId) ?? activeSizeList[0];
  const deliveryPrice = showSizePicker ? activeSize.price : 0;

  const grandTotal = tapeSubtotal + longSurcharge + deliveryPrice;

  return {
    totalTapes,
    pricePerTape: perTape,
    tapeSubtotal,
    longSurcharge,
    showSizePicker,
    deliveryPrice,
    deliverySizeLabel: showSizePicker ? activeSize.label : null,
    grandTotal,
  };
}
