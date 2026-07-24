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

export interface PartnerVertical {
  slug: string;
  title: string;
  teaser: string;
  heroHeadline: string;
  paragraphs: string[];
}

export const partnerVerticals: PartnerVertical[] = [
  {
    slug: "funeral-homes",
    title: "Funeral homes",
    teaser:
      "Families preparing a tribute video or memorial slideshow often turn up tapes of the person being remembered, a wedding, a birthday, a Christmas morning, that haven't been watched in years. Getting that footage into a shareable digital file means it can actually make it into the service instead of sitting untouched in a drawer.",
    heroHeadline:
      "Helping the families you serve bring old tapes into the tribute",
    paragraphs: [
      "When a family comes to you to plan a tribute video or memorial slideshow, there's often a box of old tapes sitting in the mix, a wedding video, a Christmas morning, a voice nobody's heard in years. Those tapes are usually the most meaningful part of the whole tribute, but they're also the hardest part to actually use, since most families don't have a working VCR anymore, let alone the patience to dig one out mid-arrangement.",
      "That's where I come in. You send the tapes my way, I convert them by hand on my own decks, and the digital files come back to you ready to drop straight into the tribute. If there's a service date to work around, tell me and I'll do what I can to get it back to you in time. Your name stays on the relationship, I just handle the part in between.",
    ],
  },
  {
    slug: "senior-living",
    title: "Senior living & memory care",
    teaser:
      "Move-in day and memory programs both tend to surface boxes of family tapes that residents and their families haven't seen in decades. Turning them into digital files gives residents something real to watch during memory care activities, and gives families an easy way to revisit those moments together.",
    heroHeadline:
      "Turning old family tapes into something residents can watch again",
    paragraphs: [
      "Move-in day and memory programs both have a way of surfacing boxes of family tapes, birthdays, holidays, home movies nobody in the family has watched since they were recorded. For residents living with memory loss, seeing that footage again can mean a lot more than a photo ever could.",
      "I convert those tapes into digital files your team or the resident's family can actually play, on a laptop, a TV, a tablet during a visit. If you're running memory programs or just want an easy way to help families preserve what they bring in, I can take the tape-handling part off your plate entirely.",
    ],
  },
  {
    slug: "genealogy",
    title: "Genealogy services",
    teaser:
      "Family history research doesn't stop at documents and photographs. Client families frequently hand over VHS and camcorder tapes discovered mid-search, hoping they hold footage of relatives now gone. Converting those tapes turns a fragile, unplayable artifact into something that can be shared with the whole family.",
    heroHeadline:
      "When the family history you're building turns up a tape nobody can play",
    paragraphs: [
      "Family history research has a habit of turning up more than documents and photographs. Client families often hand over a VHS or camcorder tape mid-search, hoping it holds footage of a relative who's since passed, sometimes not even sure what's actually on it.",
      "I convert those tapes into digital files that can be added straight into the family record you're building, and returned to your client in a format they can actually watch and share. If a tape shows up partway through a project, send it my way and I'll get it back to you without holding up your research.",
    ],
  },
  {
    slug: "professional-organizers",
    title: "Professional organizers",
    teaser:
      "Old tapes turn up constantly during decluttering and downsizing jobs, usually in a box nobody's opened in years, and clients rarely know what to do with them. Instead of the tapes going to landfill or back into storage, I can convert them so your client keeps the memories and still gets rid of the clutter.",
    heroHeadline:
      "That box of tapes your client can't part with? I'll take it from here",
    paragraphs: [
      "Old tapes turn up constantly during decluttering and downsizing jobs, usually forgotten at the bottom of a box, and clients rarely know what to do with them on the spot. It's an awkward moment: too meaningful to throw out, but not something anyone has a way to actually watch.",
      "Instead of that box going to landfill or straight into storage, I can convert the tapes so your client keeps the memories and you get to finish the job properly. You don't need to become the expert on old tape formats, just point them my way.",
    ],
  },
  {
    slug: "wedding-videographers",
    title: "Wedding & event videographers",
    teaser:
      "When a booking calls for converting an older format you don't shoot on anymore, or your schedule is already full, I can take that job on as overflow work without it ever looking like it left your studio. It's a straightforward way to say yes to a client's older tapes without adding to your own workload.",
    heroHeadline:
      "A quiet overflow partner for the tape conversion jobs you'd rather not take on",
    paragraphs: [
      "Every so often a client shows up with a request outside what you shoot day to day, an older tape format you don't have the gear for anymore, or simply more conversion work than your schedule has room for that week.",
      "I can take that job on as overflow, working quietly in the background so it never looks like it left your studio. You keep the client relationship and hand off only the part you don't want to deal with yourself.",
    ],
  },
  {
    slug: "photo-studios",
    title: "Photo studios & scanning shops",
    teaser:
      "Many photo and film scanning shops don't offer video tape conversion, which means a customer walks in with tapes and has to be turned away or sent elsewhere. Partnering means you can say yes to the whole box, photos, film, and tapes, while I handle the tape conversion quietly behind the scenes.",
    heroHeadline: "Say yes to the whole box, tapes included",
    paragraphs: [
      "A lot of photo and film scanning shops don't offer video tape conversion, which puts you in an awkward spot when a customer walks in with a box that's photos, film, and a few old VHS tapes mixed together. Turning away the tapes means turning away part of the job.",
      "Partnering with me means you can say yes to the whole box. I handle the tape conversion side quietly behind the scenes, and the finished files come back to you to hand over however you normally would.",
    ],
  },
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
  {
    name: "Flora",
    text: "I found an old box of family VHS tapes and wasn't sure what to expect. The transfers came back looking great and everything was organised nicely. It was an easy process from start to finish.",
  },
  {
    name: "Meg",
    text: "Really impressed with the quality of the digitised videos. Communication was clear, the turnaround was quick, and it was great seeing these memories again after so many years.",
  },
  {
    name: "Justin",
    text: "Fantastic service. My tapes were handled with care and the digital files were easy to access. It means a lot to have these family moments preserved.",
  },
  {
    name: "Sarah",
    text: "I had several old VHS tapes converted and the whole experience was smooth. Everything was completed on time and the results were exactly what I was hoping for. I would happily use this service again.",
  },
  {
    name: "Elsie",
    text: "Professional, reliable, and straightforward. The videos turned out better than I expected and it was wonderful being able to share them with my family. Highly recommended.",
  },
  {
    name: "Matthew",
    text: "Good service, fast turn around. Cheers!",
  },
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
