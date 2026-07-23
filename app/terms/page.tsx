import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | JR Vintage Media",
  description:
    "Terms and conditions for sending tapes to JR Vintage Media for digital conversion.",
};

const h2Class = "font-[family-name:var(--font-bitter)] font-normal text-[24px] mt-10 mb-3";
const pClass = "text-[15px] leading-[1.75] text-[rgba(43,32,22,0.75)] m-0 mb-4";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
      <Header variant="format" />
      <div className="max-w-[760px] mx-auto px-6 md:px-12 pt-16 pb-24">
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
          LEGAL
        </div>
        <h1 className="font-[family-name:var(--font-bitter)] font-normal text-[40px] m-0 mb-2">
          Terms and Conditions
        </h1>
        <p className="text-[13px] text-[rgba(43,32,22,0.5)] m-0 mb-8">
          Last updated: July 23, 2026
        </p>

        <p className={pClass}>
          These terms apply whenever you send tapes to JR Vintage Media
          (&quot;we&quot;, &quot;us&quot;) for conversion to digital format. By
          posting your tapes to us, you agree to these terms.
        </p>

        <h2 className={h2Class}>1. The service</h2>
        <p className={pClass}>
          We convert VHS, VHS-C, S-VHS, Video8, Hi8, Digital8 and MiniDV
          tapes to digital files. Every order is watched and logged by hand
          on our own decks.
        </p>
        <p className={pClass}>
          We do our best to produce the highest quality digital copy
          possible, but the final result depends entirely on the condition
          of the original tape. We cannot guarantee picture or sound quality
          where the original recording is degraded, damaged, or was recorded
          poorly to begin with.
        </p>

        <h2 className={h2Class}>2. Sending your tapes</h2>
        <p className={pClass}>
          You are responsible for packaging your tapes securely and for
          choosing an appropriate postage option, including tracking and
          insurance if you&apos;d like it. We recommend keeping your own
          tracking number for reference.
        </p>
        <p className={pClass}>
          Tapes are sent to us at your own risk while in transit. We are not
          responsible for tapes lost or damaged in the post before they
          reach us.
        </p>

        <h2 className={h2Class}>3. While your tapes are with us</h2>
        <p className={pClass}>
          Once your tapes arrive, we take reasonable care of them, including
          secure storage and handling by hand on well-maintained equipment.
        </p>
        <p className={pClass}>
          However, we work with old analogue media, some of which is
          decades old and inherently fragile. In rare cases, tape stock can
          fail during conversion regardless of the care taken. If this
          happens, we will let you know as soon as we become aware of it.
        </p>
        <p className={pClass}>
          Our liability for loss or damage to your tapes while in our care
          is limited to the cost of your order. We are not able to
          compensate for the sentimental or irreplaceable value of tape
          content, which is a key reason we recommend keeping any duplicate
          copies you may have.
        </p>

        <h2 className={h2Class}>4. Turnaround and communication</h2>
        <p className={pClass}>
          Estimated turnaround times are provided as a guide only and may
          vary depending on order volume and tape condition. We&apos;ll
          contact you using the email address or phone number you provide if
          there are any issues with your order.
        </p>

        <h2 className={h2Class}>5. Payment</h2>
        <p className={pClass}>
          Payment is due once your order is complete, before your files and
          original tapes are returned. Orders will not be returned until
          payment has been received in full.
        </p>

        <h2 className={h2Class}>6. Returning your tapes and files</h2>
        <p className={pClass}>
          Original tapes are returned to you along with your digital files,
          unless you request otherwise. We recommend checking your digital
          files as soon as you receive them.
        </p>

        <h2 className={h2Class}>7. Cancellations</h2>
        <p className={pClass}>
          If you&apos;d like to cancel an order, contact us as soon as
          possible. Once conversion work has begun, we may not be able to
          offer a full refund, as our time and equipment use to that point
          cannot be recovered.
        </p>

        <h2 className={h2Class}>8. Ownership and copyright</h2>
        <p className={pClass}>
          By sending us your tapes, you confirm that you own the content or
          have the right to have it copied, and that converting it does not
          infringe anyone else&apos;s copyright. We convert tapes as a
          service only and do not claim any ownership over your content.
        </p>

        <h2 className={h2Class}>9. Limitation of liability</h2>
        <p className={pClass}>
          To the extent permitted by law, our total liability to you in
          connection with any order is limited to the amount you paid for
          that order. Nothing in these terms limits any rights you have
          under the Australian Consumer Law that cannot be excluded.
        </p>

        <h2 className={h2Class}>10. Contact</h2>
        <p className={pClass}>
          Questions about these terms can be sent to{" "}
          <a href="mailto:jackrac@jrvintagemedia.com" className="jr-link">
            jackrac@jrvintagemedia.com
          </a>
          .
        </p>
      </div>
      <Footer prefixHome />
    </div>
  );
}
