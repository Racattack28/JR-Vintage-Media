import type { DeliveryMethod } from "./data";

export type ServiceType = "local" | "mail" | null;

export interface QuoteState {
  serviceType: ServiceType;
  vhsCount: number;
  longMedCount: number;
  longMaxCount: number;
  deliveryMethod: DeliveryMethod;
  usbSize: string;
  hddSize: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export const initialQuoteState: QuoteState = {
  serviceType: null,
  vhsCount: 2,
  longMedCount: 0,
  longMaxCount: 0,
  deliveryMethod: "usb",
  usbSize: "32",
  hddSize: "500gb",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

export function isStepValid(step: number, state: QuoteState): boolean {
  const isMail = state.serviceType === "mail";
  switch (step) {
    case 0:
      return !!state.serviceType;
    case 1:
      return state.vhsCount > 0;
    case 2:
      return true;
    case 3:
      return !!(
        state.name.trim() &&
        state.email.trim() &&
        state.phone.trim() &&
        (!isMail ||
          (state.address.trim() &&
            state.city.trim() &&
            state.state.trim() &&
            state.zip.trim()))
      );
    case 4:
      return true;
    default:
      return true;
  }
}
