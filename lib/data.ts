export type FormatSlug =
  | "vhs"
  | "vhs-c"
  | "hi8-video8"
  | "minidv"
  | "other";

export interface FormatEntry {
  slug: FormatSlug;
  title: string;
  placeholder: string;
  image: string;
  description: string;
}

export const formatData: Record<FormatSlug, FormatEntry> = {
  vhs: {
    slug: "vhs",
    title: "VHS",
    placeholder: "Photo of a VHS tape",
    image: "/formats/vhs.png",
    description:
      "VHS was the standard videotape format in most home camcorders and VCRs from the late 1970s through the 2000s, storing video on a reel of magnetic tape inside a plastic cassette. This includes S-VHS (Super VHS), a higher-resolution version used by more serious home videographers from the late 1980s onward, which I convert the same way. The tape degrades a little more every time it's played and simply from sitting in storage, which is why converting to digital now preserves what's left of the picture and sound before further loss.",
  },
  "vhs-c": {
    slug: "vhs-c",
    title: "VHS-C",
    placeholder: "Photo of a VHS-C tape",
    image: "/formats/vhs-c.png",
    description:
      "VHS-C is the compact version of VHS, made for smaller camcorders and playable in a standard VCR with an adapter. It uses the same magnetic tape and is prone to the same age-related picture loss, so the transfer process is the same careful frame-by-frame capture as full-size VHS.",
  },
  "hi8-video8": {
    slug: "hi8-video8",
    title: "Hi8 & Video8",
    placeholder: "Photo of a Hi8 tape",
    image: "/formats/hi8-video8.png",
    description:
      "Hi8 and Video8 were Sony's compact camcorder tape formats from the 1980s and 90s, with Hi8 offering a sharper, higher-resolution image than standard Video8. This also covers Digital8, which recorded a digital signal onto the same style of tape for cleaner picture quality with less generational loss. All three share the same small cassette shell, and playback decks for them are increasingly hard to find in good condition, which makes transferring sooner rather than later worthwhile.",
  },
  minidv: {
    slug: "minidv",
    title: "MiniDV",
    placeholder: "Photo of a MiniDV tape",
    image: "/formats/minidv.png",
    description:
      "MiniDV was the dominant digital camcorder tape format through the 2000s, known for sharp, stable picture quality. While the digital recording holds up well, the tapes and the decks that play them are aging, so transferring now protects the footage against a mechanical failure down the line.",
  },
  other: {
    slug: "other",
    title: "Something else",
    placeholder: "Photo of assorted cassette tapes",
    image: "/formats/other.png",
    description:
      "Got a format that's not listed here? Camcorder and video technology varied a lot over the decades, and there are more variants out there than most people expect. Get in touch with a photo of what you have and I'll let you know whether it's something I can convert.",
  },
};

export const formatSlugs = Object.keys(formatData) as FormatSlug[];

export const formatNavItems: { slug: FormatSlug; label: string }[] = [
  { slug: "vhs", label: "VHS" },
  { slug: "vhs-c", label: "VHS-C" },
  { slug: "hi8-video8", label: "Hi8 & Video8" },
  { slug: "minidv", label: "MiniDV" },
  { slug: "other", label: "Other" },
];

export type FaqCategory =
  | "Tapes & formats"
  | "Process & timing"
  | "Delivery & payment";

export const faqCategories: FaqCategory[] = [
  "Tapes & formats",
  "Process & timing",
  "Delivery & payment",
];

export interface FaqEntry {
  cat: FaqCategory;
  q: string;
  a: string;
}

export const faqData: FaqEntry[] = [
  {
    cat: "Tapes & formats",
    q: "What types of tapes can you convert?",
    a: "VHS makes up most of what comes through the door, but the other common home video formats are covered too, including S-VHS, VHS-C, Hi8, Video8, Digital8 and MiniDV. If your tape isn't listed here, get in touch with a photo of it and I'll let you know whether it's something I can handle.",
  },
  {
    cat: "Tapes & formats",
    q: "What if a tape doesn't play or looks damaged?",
    a: "I clean and, if needed, repair tapes at no extra cost before transferring. Some very old or heavily damaged tapes still won't play well, and I'll always let you know before charging for anything unexpected.",
  },
  {
    cat: "Tapes & formats",
    q: "Can I mix VHS and other tape types in one order?",
    a: "Yes. I work with VHS, VHS-C, MiniDV, and Hi8 camcorder tapes, and pricing is based on the total number of tapes across all of these formats.",
  },
  {
    cat: "Tapes & formats",
    q: "Do the lines at the bottom of my video mean something's wrong?",
    a: "Not at all. That strip of static is called overscan, and it exists on every VHS recording. Old CRT televisions trimmed a small border off the picture before displaying it, so nobody ever saw it. Flat screens don't trim anything, they show the full frame from edge to edge, which brings that hidden strip into view. The transfer hasn't introduced it, the tape has always carried it.",
  },
  {
    cat: "Tapes & formats",
    q: "Can you convert American NTSC tapes?",
    a: "Yes. NTSC VHS and camcorder tapes go through the same process as standard tapes, with nothing added to the price.",
  },
  {
    cat: "Tapes & formats",
    q: "Can you fix damaged or fragile tapes?",
    a: "Often, yes. Snapped tape, worn shells, and similar issues can usually be repaired free of charge before transferring. Every tape is assessed individually, and if one truly can't be saved, I'll let you know before doing any work.",
  },
  {
    cat: "Tapes & formats",
    q: "Will anything be cut from my tapes?",
    a: "Your home movies are left exactly as they are. The only material removed is taped TV shows and movies, along with blank or dead footage at the start and end. I'll only transfer TV content if you've asked me to.",
  },
  {
    cat: "Process & timing",
    q: "How do I send you my tapes?",
    a: "Pack them snugly in a sturdy box with some padding so they can't shift around in transit, and post them to me. Once your order arrives, I'll email you to confirm it's here safely. Prefer to skip the post? Local drop-off works too.",
  },
  {
    cat: "Process & timing",
    q: "How long does the whole process take?",
    a: "Most orders are converted and returned within one to two weeks of arriving, depending on how many tapes are in the queue ahead of yours. Larger orders or tapes needing repair can take a little longer, and you'll get updates so you always know where things stand.",
  },
  {
    cat: "Process & timing",
    q: "Why does digitising take a while?",
    a: "There's no way to speed up a tape. Capturing happens at playback speed, so an order of several two-hour tapes can take many hours before I've even started checking and preparing the files. Orders are worked through in the order they arrive.",
  },
  {
    cat: "Process & timing",
    q: "How do you protect my privacy?",
    a: "Everything is kept confidential. Your footage is only ever viewed as far as needed to check transfer quality. Files are handled on my own equipment, never shared or uploaded anywhere else, and your originals are returned to you along with your digital copies.",
  },
  {
    cat: "Delivery & payment",
    q: "What format will my videos be in?",
    a: "Everything is delivered as MP4, so the files open on Macs, Windows computers, phones and smart TVs without any fuss. Every tape gets its own file.",
  },
  {
    cat: "Delivery & payment",
    q: "Do I get my original tapes back?",
    a: "Yes. Your original tapes are returned to you along with your digital files, whether you dropped them off locally or mailed them in.",
  },
  {
    cat: "Delivery & payment",
    q: "Who covers return postage?",
    a: "The customer does, and it's billed on your final invoice. I use tracked postage so your tapes and files are covered the whole way back to you.",
  },
  {
    cat: "Delivery & payment",
    q: "When and how do I pay?",
    a: "Payment is only taken once your order is done. Card and bank deposit are both accepted, with no extra fees for bank deposit.",
  },
];

export interface ReviewEntry {
  name: string;
  text: string;
}

export const reviewData: ReviewEntry[] = [
  { name: "Customer name", text: "Add a customer review here." },
  { name: "Customer name", text: "Add a customer review here." },
  { name: "Customer name", text: "Add a customer review here." },
];

export const disclaimerText =
  "All tapes are handled with care. Due to the age and condition of some old VHS tapes, I cannot guarantee final quality or be liable for pre-existing damage or tape failure.";

export type DeliveryMethod = "usb" | "harddrive" | "youtube" | "drive";

export interface DeliveryCatalogEntry {
  id: DeliveryMethod;
  label: string;
  recommended?: boolean;
  desc: string;
}

export const deliveryCatalog: DeliveryCatalogEntry[] = [
  {
    id: "usb",
    label: "USB stick",
    recommended: true,
    desc: "A physical backup you can hold onto and hand down.",
  },
  {
    id: "harddrive",
    label: "External hard drive",
    desc: "Best for large or many-tape orders needing extra space.",
  },
  {
    id: "youtube",
    label: "Private YouTube link",
    desc: "Unlisted video links only you and family can view.",
  },
  {
    id: "drive",
    label: "Google Drive",
    desc: "Files uploaded to a shared Drive folder.",
  },
];

export interface SizeOption {
  id: string;
  label: string;
  price: number;
}

export const usbSizes: SizeOption[] = [
  { id: "32", label: "32GB", price: 18 },
  { id: "128", label: "128GB", price: 28 },
  { id: "256", label: "256GB", price: 40 },
];

export const hddSizes: SizeOption[] = [
  { id: "500gb", label: "500GB", price: 45 },
  { id: "1tb", label: "1TB", price: 60 },
];

export const stepLabels = ["Service", "Tapes", "Storage", "Details", "Review"];
