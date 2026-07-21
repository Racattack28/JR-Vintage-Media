"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { computeQuoteTotals } from "@/lib/pricing";
import { deliveryCatalog } from "@/lib/data";
import { initialQuoteState, isStepValid, type QuoteState } from "@/lib/quote-types";
import Stepper from "./Stepper";
import StepService from "./steps/StepService";
import StepTapes from "./steps/StepTapes";
import StepDelivery from "./steps/StepDelivery";
import StepDetails from "./steps/StepDetails";
import StepReview from "./steps/StepReview";
import Confirmation from "./Confirmation";

export default function QuoteFlow() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<QuoteState>(initialQuoteState);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  function update<K extends keyof QuoteState>(key: K, value: QuoteState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  const totals = computeQuoteTotals(state);
  const valid = isStepValid(step, state);

  const isMail = state.serviceType === "mail";
  const serviceLabel = isMail
    ? "Mail-in"
    : state.serviceType === "local"
    ? "Local drop-off"
    : "Not selected";
  const longSummary =
    totals.longSurcharge > 0
      ? `+$${totals.longSurcharge} long recording surcharge`
      : "";
  const deliveryMethodLabel =
    deliveryCatalog.find((d) => d.id === state.deliveryMethod)?.label ?? "";
  const deliverySummary = totals.showSizePicker
    ? `${deliveryMethodLabel} (${totals.deliverySizeLabel}, +$${totals.deliveryPrice})`
    : `${deliveryMethodLabel} (free)`;

  function goNext() {
    if (!isStepValid(step, state)) return;
    setStep((s) => Math.min(4, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function submitOrder() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: state.serviceType,
          tapes: {
            count: state.vhsCount,
            pricePerTape: totals.pricePerTape,
            subtotal: totals.tapeSubtotal,
            longMedCount: state.longMedCount,
            longMaxCount: state.longMaxCount,
            longSurcharge: totals.longSurcharge,
          },
          delivery: {
            method: state.deliveryMethod,
            sizeLabel: totals.deliverySizeLabel,
            price: totals.deliveryPrice,
          },
          contact: {
            name: state.name,
            email: state.email,
            phone: state.phone,
            address: isMail ? state.address : null,
            city: isMail ? state.city : null,
            state: isMail ? state.state : null,
            zip: isMail ? state.zip : null,
          },
          grandTotal: totals.grandTotal,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setOrderNumber(data.orderNumber);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong submitting your order. Please try again, or email Jack directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted && orderNumber) {
    return (
      <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
        <Header variant="order" />
        <div className="max-w-[760px] mx-auto px-8 py-14 pb-[120px]">
          <Confirmation
            orderNumber={orderNumber}
            name={state.name}
            email={state.email}
            grandTotal={totals.grandTotal}
            isMail={isMail}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
      <Header variant="order" />
      <div className="max-w-[760px] mx-auto px-8 py-14 pb-[120px]">
        <Stepper step={step} />

        {step === 0 && (
          <StepService
            serviceType={state.serviceType}
            onSelect={(value) => update("serviceType", value)}
          />
        )}
        {step === 1 && (
          <StepTapes
            vhsCount={state.vhsCount}
            longMedCount={state.longMedCount}
            longMaxCount={state.longMaxCount}
            pricePerTape={totals.pricePerTape}
            tapeSubtotal={totals.tapeSubtotal}
            onVhsChange={(v) => update("vhsCount", v)}
            onLongMedChange={(v) => update("longMedCount", v)}
            onLongMaxChange={(v) => update("longMaxCount", v)}
          />
        )}
        {step === 2 && (
          <StepDelivery
            deliveryMethod={state.deliveryMethod}
            usbSize={state.usbSize}
            hddSize={state.hddSize}
            onSelectMethod={(m) => update("deliveryMethod", m)}
            onSelectUsbSize={(id) => update("usbSize", id)}
            onSelectHddSize={(id) => update("hddSize", id)}
          />
        )}
        {step === 3 && <StepDetails state={state} onChange={update} />}
        {step === 4 && (
          <StepReview
            serviceLabel={serviceLabel}
            totalTapes={totals.totalTapes}
            tapeSubtotal={totals.tapeSubtotal}
            longSummary={longSummary}
            deliverySummary={deliverySummary}
            name={state.name}
            email={state.email}
            grandTotal={totals.grandTotal}
          />
        )}

        {submitError && (
          <p className="text-[13px] text-[#bf4e2a] mt-4 mb-0">{submitError}</p>
        )}

        <div className="flex justify-between mt-10">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="font-[family-name:var(--font-lato)] font-semibold text-[15px] bg-transparent border border-[#2b2016] text-[#2b2016] py-[14px] px-[26px] rounded-[30px] cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step === 4 ? (
            <button
              type="button"
              onClick={submitOrder}
              disabled={submitting}
              className="font-[family-name:var(--font-lato)] font-bold text-[15px] bg-[#bf4e2a] text-[#fffaf0] border-none py-[14px] px-[30px] rounded-[30px] cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit order"}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              disabled={!valid}
              className="font-[family-name:var(--font-lato)] font-semibold text-[15px] text-[#fffaf0] border-none py-[14px] px-[30px] rounded-[30px]"
              style={{
                background: valid ? "#bf4e2a" : "rgba(43,32,22,0.3)",
                cursor: valid ? "pointer" : "not-allowed",
              }}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
