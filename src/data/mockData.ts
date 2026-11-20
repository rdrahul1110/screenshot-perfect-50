export type Evidence = "Strong" | "Moderate" | "Directional";
export type GapType = "CATCH_UP" | "WHITESPACE_TEST" | "DEFEND" | "TRIM";
export interface Opportunity {
  id: string;
  rank: number;
  name: string;
  category: string;
  dimension: string;
  snitch: number;
  competitor: number;
  index: number;
  lift: number;
  evidence: Evidence;
  type: GapType;
  priority: number;
  recommendation: string;
  brands: { name: string; count: number; share: number }[];
}
const brands = (s: number, c: number) => [
  { name: "Beyoung", count: 11, share: c * 1.2 },
  { name: "Bewakoof", count: 10, share: c },
  { name: "The Souled Store", count: 1, share: c * 0.8 },
  { name: "Snitch", count: 1, share: s },
];
function row(
  id: string,
  rank: number,
  name: string,
  category: string,
  dimension: string,
  snitch: number,
  competitor: number,
  index: number,
  lift: number,
  evidence: Evidence,
  type: GapType,
  recommendation: string,
): Opportunity {
  return {
    id,
    rank,
    name,
    category,
    dimension,
    snitch,
    competitor,
    index,
    lift,
    evidence,
    type,
    priority: 100 - rank,
    recommendation,
    brands: brands(snitch, competitor),
  };
}
export const gaps = [
  row(
    "1",
    1,
    "Bundle Combos",
    "bundle_combo",
    "Offer",
    1.1,
    20.4,
    6,
    1.28,
    "Strong",
    "CATCH_UP",
    "Launch a value-led 3-piece bundle carousel. Lead with two shirts for ₹1,999, then expand into a full weekend outfit. Prioritize this proven offer gap.",
  ),
  row(
    "3",
    2,
    "Brand Story",
    "brand_story",
    "Angle",
    2.4,
    14,
    17,
    1.39,
    "Strong",
    "CATCH_UP",
    "Tell the story behind the fit. Test founder-led storytelling and craftsmanship against product-only creative.",
  ),
  row(
    "4",
    3,
    "Identity-Led Hooks",
    "identity",
    "Hook",
    2.1,
    7.6,
    27,
    1.19,
    "Moderate",
    "CATCH_UP",
    "Lead with the wearer, not the product. Build three persona-led variants for weekend, work, and date-night wardrobes.",
  ),
  row(
    "2",
    4,
    "Flat Discounts",
    "flat_discount",
    "Offer",
    1.8,
    12.4,
    14,
    0.9,
    "Moderate",
    "WHITESPACE_TEST",
    "Run a small, time-boxed discount pilot. The volume gap is real, but competitor survival does not justify scaling yet.",
  ),
  row(
    "5",
    5,
    "Carousels",
    "carousel",
    "Format",
    16.4,
    50.3,
    33,
    0.88,
    "Strong",
    "WHITESPACE_TEST",
    "Test a five-card carousel with one clear narrative. Keep initial spend low and evaluate against your video control.",
  ),
];
export const moats = [
  row(
    "video",
    6,
    "High-Volume Video Dominance",
    "video",
    "Format",
    60.8,
    11.2,
    545,
    1.12,
    "Strong",
    "DEFEND",
    "Swap audio loops every 10 days; rotate 3 model faces every 14 days.",
  ),
  row(
    "outfit",
    7,
    "Complete Lookbook / Full Outfits",
    "full_outfit",
    "Category",
    8.8,
    0.2,
    4034,
    1.06,
    "Strong",
    "DEFEND",
    "Scale budget 12–15% weekly; seed lookalikes from multi-SKU purchasers.",
  ),
  row(
    "creator",
    8,
    "Creator & Influencer Fit-Checks",
    "creator_led",
    "Angle",
    11.7,
    2.7,
    426,
    1.27,
    "Strong",
    "DEFEND",
    "Lock top creators on 6-month retainers. Keep a fresh bench of emerging faces.",
  ),
  row(
    "bold",
    9,
    "Bold Declarative Front-End Hooks",
    "bold_statement",
    "Hook",
    51.7,
    32.4,
    160,
    1.17,
    "Strong",
    "DEFEND",
    "Protect the direct, confident brand voice. Rotate statements without diluting the angle.",
  ),
  row(
    "occasion",
    10,
    "Occasion Dressing",
    "occasion",
    "Angle",
    13.1,
    3.1,
    420,
    1.06,
    "Strong",
    "DEFEND",
    "Create a recurring date-night and party capsule. Diversify occasions before increasing spend.",
  ),
];
export const drains = [
  row(
    "footwear",
    11,
    "Solo Footwear Ads",
    "solo_footwear",
    "Category",
    4.1,
    0.2,
    2050,
    0.98,
    "Moderate",
    "TRIM",
    "Stop solo ads. Bundle into full outfits only.",
  ),
  row(
    "accessories",
    12,
    "Solo Accessories Ads",
    "solo_accessories",
    "Category",
    1.8,
    0.2,
    900,
    0.26,
    "Strong",
    "TRIM",
    "Kill standalone ad sets. Move to checkout upsell only.",
  ),
  row(
    "emoji",
    13,
    "Emoji-Stuffed Hooks",
    "emoji_hooks",
    "Hook",
    18.3,
    11.4,
    161,
    0.54,
    "Strong",
    "TRIM",
    "Ban emoji spam; burns out 46% faster.",
  ),
];
export const combinations = [
  row(
    "combo-1",
    1,
    "Bottoms × Creator-led",
    "bottoms × creator_led = yes",
    "Category × Angle",
    8.2,
    2.3,
    357,
    1.31,
    "Strong",
    "DEFEND",
    "Highest durability in the Indian market. Invest in creator fit-checks on jeans and pants.",
  ),
  row(
    "combo-2",
    2,
    "Video × Product-only",
    "video × product_only",
    "Format × Angle",
    26.1,
    7.2,
    363,
    1.13,
    "Strong",
    "DEFEND",
    "Use clean product-focused video with fresh edits and varied audio.",
  ),
  row(
    "combo-3",
    3,
    "Video × Occasion",
    "video × occasion",
    "Format × Angle",
    10.2,
    2.1,
    486,
    1.09,
    "Moderate",
    "DEFEND",
    "Build video cuts around date nights, parties, and weekend plans.",
  ),
];
export const allOpportunities = [...gaps, ...moats, ...drains];
export const sync = { ads: 872, concepts: 556, competitors: 3 };
export const kpis = [
  {
    name: "Creative Variety Score",
    label: "FATIGUE RISK",
    value: "41",
    unit: "/ 100",
    benchmark: "58 / 100",
    benchmarkLabel: "Market average",
    badge: "High Fatigue Risk",
    tone: "danger",
    description:
      "Snitch is 60.8% video & 86.5% no-offer. Creative mono-culture creates auction fatigue.",
    chart: [48, 55, 44, 57, 46, 39, 44, 38, 42, 35, 41],
  },
  {
    name: "30-Day Ad Survival Rate",
    label: "CREATIVE STAYING POWER",
    value: "34.2",
    unit: "%",
    benchmark: "44.8%",
    benchmarkLabel: "Competitor longevity",
    badge: "0.76x Market Durability",
    tone: "warning",
    description:
      "Competitors keep nearly half their concepts live 30+ days. Snitch cycles ads too fast.",
    chart: [20, 28, 22, 32, 29, 34, 30, 37, 32, 35, 34],
  },
  {
    name: "Creative Waste Exposure",
    label: "BUDGET DRAIN ALERT",
    value: "24.2",
    unit: "%",
    benchmark: "3",
    benchmarkLabel: "Money drains flagged",
    badge: "3 Money Drains Flagged",
    tone: "danger",
    description:
      "Solo accessories (0.26x lift), solo footwear (0.98x), and emoji spam burn budget prematurely.",
    chart: [12, 15, 14, 17, 16, 20, 18, 23, 20, 25, 24],
  },
] as const;
export const storyboard = [
  {
    title: "Hook frame",
    visual: "Crisp white linen button-up",
    overlay: "Upgrade Your Weekend",
    audio: "Lo-fi beat drop",
    image: 0,
  },
  {
    title: "Fit demo",
    visual: "Model in a street-style fit",
    overlay: "Two styles, one price",
    audio: "Voiceover: “Two styles, one price”",
    image: 1,
  },
  {
    title: "Value reveal",
    visual: "Second patterned shirt + price badge",
    overlay: "₹1,999 for 2",
    audio: "Beat continues",
    image: 2,
  },
  {
    title: "Combo expansion",
    visual: "Accessory montage: sneaker + belt",
    overlay: "Build Your 3-Pack",
    audio: "Quick-cut transitions",
    image: 3,
  },
  {
    title: "End slate",
    visual: "Snitch logo + full weekend fit",
    overlay: "Shop Now — Limited Batch",
    audio: "Brand sonic sign-off",
    image: 4,
  },
];
export const hooks = [
  { type: "Direct offer", text: "Buy 2 Shirts for ₹1,999 – Limited Time!" },
  { type: "Identity / persona", text: "For the guy who owns every weekend plan." },
  { type: "Curiosity / FOMO", text: "What's the secret to looking fresh all weekend? Find out." },
];
export const remixedHooks = [
  "Two shirts. ₹1,999. Your weekend just got a serious upgrade.",
  "Main character fits. Every weekend. No exceptions.",
  "Fresh fit energy all weekend? The bundle is the cheat code.",
];
export const copyOptions = [
  {
    title: "Direct value",
    text: "Grab the Weekend Warrior Bundle and get two premium shirts for just ₹1,999. Fresh fits for every plan. Shop the drop.",
    limit: 125,
  },
  {
    title: "Lifestyle story",
    text: "From brunch to night out, our curated combo has you covered. Two premium shirts. Endless weekend plans. Build your bundle and own the weekend.",
    limit: 150,
  },
];
export const launch = {
  name: "SNT_202611_GAP01_bundle-carousel_A_v1",
  utm: "utm_source=facebook&utm_medium=paid&utm_campaign=gap01_bundle_carousel",
  audience:
    "Broad Men 18–34, India; Interests: Streetwear, D2C Fashion; Exclude 30-day purchasers.",
  budget: 2500,
  days: 7,
  kill: "Pause if CTR < 1.1% or CPC > ₹18 after 72 hours",
  scale: "Scale 25% if Blended ROAS ≥ 2.6x after 5 days",
};
export function canConfirmCut(roas: string) {
  return roas.trim() !== "" && Number.isFinite(Number(roas)) && Number(roas) >= 0;
}
export function launchSpec(budget: number, days: number, name = launch.name, utm = launch.utm) {
  return `SNITCH — ADS MANAGER LAUNCH SPEC\nAd name: ${name}\nUTM: ${utm}\nAudience: ${launch.audience}\nTest budget: ₹${budget.toLocaleString("en-IN")}/day for ${days} days\nKill: ${launch.kill}\nScale: ${launch.scale}`;
}
