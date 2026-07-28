import type { DeliveryMethod } from "./data";
import { isValidEmail } from "./validation";

export type ServiceType = "local" | "mail" | null;

export interface QuoteState {
  serviceType: ServiceType;
  vhsCount: number;
  longMedCount: number;
  longMaxCount: number;
  deliveryMethod: DeliveryMethod;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
}

export const initialQuoteState: QuoteState = {
  serviceType: null,
  vhsCount: 1,
  longMedCount: 0,
  longMaxCount: 0,
  deliveryMethod: "usb",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  notes: "",
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
        isValidEmail(state.email) &&
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
