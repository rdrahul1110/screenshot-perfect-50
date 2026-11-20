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

export interface ProductionBrief {
  id: string;
  rank: number;
  title: string;
  category: string;
  dimension: string;
  type: GapType;
  concept: string;
  format: string;
  storyboard: Array<{
    title: string;
    visual: string;
    overlay: string;
    audio: string;
    image: number;
  }>;
  hooks: Array<{ type: string; text: string }>;
  remixedHooks: string[];
  copyOptions: Array<{ title: string; text: string; limit: number }>;
  launch: {
    name: string;
    utm: string;
    audience: string;
    budget: number;
    days: number;
    kill: string;
    scale: string;
  };
  rationale: string;
}

// 100% Real Ad Gap Opportunities from 872 Classified Ads (Google Sheet: Top 5 Gaps Summary & Gap Matrix v2)
export const gaps: Opportunity[] = [
  {
    id: "1",
    rank: 1,
    name: "Bundle Combos",
    category: "bundle_combo",
    dimension: "Offer",
    snitch: 1.1,
    competitor: 20.4,
    index: 6,
    lift: 1.28,
    evidence: "Strong",
    type: "CATCH_UP",
    priority: 99,
    recommendation: "Launch a value-led 3-piece bundle carousel. Lead with two shirts for ₹1,999, then expand into a full weekend outfit. Prioritize this proven offer gap.",
    brands: [
      { name: "Beyoung", count: 38, share: 24.5 },
      { name: "Bewakoof", count: 22, share: 20.4 },
      { name: "The Souled Store", count: 25, share: 16.3 },
      { name: "Snitch", count: 5, share: 1.1 },
    ],
  },
  {
    id: "3",
    rank: 2,
    name: "Brand Story",
    category: "brand_story",
    dimension: "Angle",
    snitch: 2.4,
    competitor: 14.0,
    index: 17,
    lift: 1.39,
    evidence: "Strong",
    type: "CATCH_UP",
    priority: 98,
    recommendation: "Tell the story behind the fit. Test founder-led storytelling and craftsmanship against product-only creative.",
    brands: [
      { name: "The Souled Store", count: 63, share: 40.3 },
      { name: "Snitch", count: 11, share: 2.6 },
      { name: "Beyoung", count: 1, share: 0.9 },
      { name: "Bewakoof", count: 0, share: 0.4 },
    ],
  },
  {
    id: "4",
    rank: 3,
    name: "Identity-Led Hooks",
    category: "identity",
    dimension: "Hook",
    snitch: 2.1,
    competitor: 7.6,
    index: 27,
    lift: 1.19,
    evidence: "Moderate",
    type: "CATCH_UP",
    priority: 97,
    recommendation: "Lead with the wearer, not the product. Build three persona-led variants for weekend, work, and date-night wardrobes.",
    brands: [
      { name: "The Souled Store", count: 37, share: 23.7 },
      { name: "Snitch", count: 7, share: 1.5 },
      { name: "Bewakoof", count: 4, share: 3.9 },
      { name: "Beyoung", count: 0, share: 0.3 },
    ],
  },
  {
    id: "2",
    rank: 4,
    name: "Flat Discounts",
    category: "flat_discount",
    dimension: "Offer",
    snitch: 1.8,
    competitor: 12.4,
    index: 14,
    lift: 0.90,
    evidence: "Moderate",
    type: "WHITESPACE_TEST",
    priority: 96,
    recommendation: "Run a small, time-boxed discount pilot. The volume gap is real, but competitor survival does not justify scaling yet.",
    brands: [
      { name: "Beyoung", count: 22, share: 14.2 },
      { name: "Bewakoof", count: 13, share: 12.4 },
      { name: "The Souled Store", count: 17, share: 10.6 },
      { name: "Snitch", count: 8, share: 1.8 },
    ],
  },
  {
    id: "5",
    rank: 5,
    name: "Carousels",
    category: "carousel",
    dimension: "Format",
    snitch: 16.4,
    competitor: 50.3,
    index: 33,
    lift: 0.88,
    evidence: "Strong",
    type: "WHITESPACE_TEST",
    priority: 95,
    recommendation: "Test a five-card carousel with one clear narrative. Keep initial spend low and evaluate against your video control.",
    brands: [
      { name: "Bewakoof", count: 63, share: 58.0 },
      { name: "The Souled Store", count: 90, share: 57.5 },
      { name: "Beyoung", count: 54, share: 35.0 },
      { name: "Snitch", count: 74, share: 17.0 },
    ],
  },
];

// 100% Real Snitch Moats (Snitch Strength Map)
export const moats: Opportunity[] = [
  {
    id: "video",
    rank: 6,
    name: "High-Volume Video Dominance",
    category: "video",
    dimension: "Format",
    snitch: 60.8,
    competitor: 11.2,
    index: 545,
    lift: 1.12,
    evidence: "Strong",
    type: "DEFEND",
    priority: 94,
    recommendation: "Swap audio loops every 10 days; rotate 3 model faces every 14 days.",
    brands: [
      { name: "Snitch", count: 265, share: 60.8 },
      { name: "The Souled Store", count: 34, share: 21.9 },
      { name: "Beyoung", count: 10, share: 6.8 },
      { name: "Bewakoof", count: 7, share: 6.8 },
    ],
  },
  {
    id: "outfit",
    rank: 7,
    name: "Complete Lookbook / Full Outfits",
    category: "full_outfit",
    dimension: "Category",
    snitch: 8.8,
    competitor: 0.2,
    index: 4034,
    lift: 1.06,
    evidence: "Strong",
    type: "DEFEND",
    priority: 93,
    recommendation: "Scale budget 12–15% weekly; seed lookalikes from multi-SKU purchasers.",
    brands: [
      { name: "Snitch", count: 38, share: 8.8 },
      { name: "Beyoung", count: 1, share: 0.6 },
      { name: "The Souled Store", count: 0, share: 0.0 },
      { name: "Bewakoof", count: 0, share: 0.0 },
    ],
  },
  {
    id: "creator",
    rank: 8,
    name: "Creator & Influencer Fit-Checks",
    category: "creator_led",
    dimension: "Angle",
    snitch: 11.7,
    competitor: 2.7,
    index: 426,
    lift: 1.27,
    evidence: "Strong",
    type: "DEFEND",
    priority: 92,
    recommendation: "Lock top creators on 6-month retainers. Keep a fresh bench of emerging faces.",
    brands: [
      { name: "Snitch", count: 51, share: 11.7 },
      { name: "The Souled Store", count: 6, share: 3.8 },
      { name: "Beyoung", count: 4, share: 2.6 },
      { name: "Bewakoof", count: 2, share: 1.9 },
    ],
  },
  {
    id: "bold",
    rank: 9,
    name: "Bold Declarative Front-End Hooks",
    category: "bold_statement",
    dimension: "Hook",
    snitch: 51.7,
    competitor: 32.4,
    index: 160,
    lift: 1.17,
    evidence: "Strong",
    type: "DEFEND",
    priority: 91,
    recommendation: "Protect the direct, confident brand voice. Rotate statements without diluting the angle.",
    brands: [
      { name: "Snitch", count: 225, share: 51.7 },
      { name: "The Souled Store", count: 58, share: 37.2 },
      { name: "Beyoung", count: 49, share: 31.8 },
      { name: "Bewakoof", count: 33, share: 30.6 },
    ],
  },
  {
    id: "occasion",
    rank: 10,
    name: "Occasion Dressing",
    category: "occasion",
    dimension: "Angle",
    snitch: 13.1,
    competitor: 3.1,
    index: 420,
    lift: 1.06,
    evidence: "Strong",
    type: "DEFEND",
    priority: 90,
    recommendation: "Create a recurring date-night and party capsule. Diversify occasions before increasing spend.",
    brands: [
      { name: "Snitch", count: 57, share: 13.1 },
      { name: "Bewakoof", count: 4, share: 4.0 },
      { name: "Beyoung", count: 3, share: 2.2 },
      { name: "The Souled Store", count: 0, share: 0.3 },
    ],
  },
];

// 100% Real Money Drains (Snitch Strength Map)
export const drains: Opportunity[] = [
  {
    id: "footwear",
    rank: 11,
    name: "Solo Footwear Ads",
    category: "solo_footwear",
    dimension: "Category",
    snitch: 4.1,
    competitor: 0.2,
    index: 2050,
    lift: 0.98,
    evidence: "Moderate",
    type: "TRIM",
    priority: 89,
    recommendation: "Stop solo ads. Bundle into full outfits only.",
    brands: [
      { name: "Snitch", count: 18, share: 4.1 },
      { name: "Beyoung", count: 1, share: 0.6 },
      { name: "The Souled Store", count: 0, share: 0.0 },
      { name: "Bewakoof", count: 0, share: 0.0 },
    ],
  },
  {
    id: "accessories",
    rank: 12,
    name: "Solo Accessories Ads",
    category: "solo_accessories",
    dimension: "Category",
    snitch: 1.8,
    competitor: 0.2,
    index: 900,
    lift: 0.26,
    evidence: "Strong",
    type: "TRIM",
    priority: 88,
    recommendation: "Kill standalone ad sets. Move to checkout upsell only.",
    brands: [
      { name: "Snitch", count: 8, share: 1.8 },
      { name: "Beyoung", count: 1, share: 0.6 },
      { name: "The Souled Store", count: 0, share: 0.0 },
      { name: "Bewakoof", count: 0, share: 0.0 },
    ],
  },
  {
    id: "emoji",
    rank: 13,
    name: "Emoji-Stuffed Hooks",
    category: "emoji_hooks",
    dimension: "Hook",
    snitch: 18.3,
    competitor: 11.4,
    index: 161,
    lift: 0.54,
    evidence: "Strong",
    type: "TRIM",
    priority: 87,
    recommendation: "Ban emoji spam; burns out 46% faster.",
    brands: [
      { name: "Snitch", count: 80, share: 18.3 },
      { name: "Beyoung", count: 20, share: 13.0 },
      { name: "Bewakoof", count: 12, share: 11.1 },
      { name: "The Souled Store", count: 14, share: 9.0 },
    ],
  },
];

// 100% Real 2D Interaction Moats (Cross Tabs & Strength Map)
export const combinations: Opportunity[] = [
  {
    id: "combo-1",
    rank: 1,
    name: "Bottoms × Creator-led",
    category: "bottoms × creator_led = yes",
    dimension: "Category × Angle",
    snitch: 8.2,
    competitor: 2.3,
    index: 357,
    lift: 1.31,
    evidence: "Strong",
    type: "DEFEND",
    priority: 99,
    recommendation: "Highest durability in the Indian market (1.31x). Invest in creator fit-checks on jeans and pants.",
    brands: [
      { name: "Snitch", count: 36, share: 8.2 },
      { name: "Competitors", count: 10, share: 2.3 },
    ],
  },
  {
    id: "combo-2",
    rank: 2,
    name: "Video × Product-only",
    category: "video × product_only",
    dimension: "Format × Angle",
    snitch: 26.1,
    competitor: 7.2,
    index: 363,
    lift: 1.13,
    evidence: "Strong",
    type: "DEFEND",
    priority: 98,
    recommendation: "Use clean product-focused video with fresh edits and varied audio loops.",
    brands: [
      { name: "Snitch", count: 114, share: 26.1 },
      { name: "Competitors", count: 31, share: 7.2 },
    ],
  },
  {
    id: "combo-3",
    rank: 3,
    name: "Video × Occasion",
    category: "video × occasion",
    dimension: "Format × Angle",
    snitch: 10.2,
    competitor: 2.1,
    index: 486,
    lift: 1.09,
    evidence: "Moderate",
    type: "DEFEND",
    priority: 97,
    recommendation: "Build video cuts around date nights, parties, and weekend plans.",
    brands: [
      { name: "Snitch", count: 44, share: 10.2 },
      { name: "Competitors", count: 9, share: 2.1 },
    ],
  },
];

export const allOpportunities = [...gaps, ...moats, ...drains];

// Exact Pipeline Dataset Totals
export const sync = { ads: 872, concepts: 556, competitors: 4 };

// 3 Executive Headline KPIs (Statistical Engine Calculation)
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

// 100% Real Production Briefs generated by Groq AI Creative Director (WF-04)
export const productionBriefs: Record<string, ProductionBrief> = {
  "1": {
    id: "1",
    rank: 1,
    title: "Weekend Warrior 3-Piece Bundle Carousel",
    category: "bundle_combo",
    dimension: "Offer Signal",
    type: "CATCH_UP",
    concept: "Weekend Warrior Combo – Upgrade Your Wardrobe, Double the Style",
    format: "5-Card Lookbook Carousel – 6 seconds per card (total ~30s)",
    storyboard: [
      {
        title: "Hook frame",
        visual: "Crisp white linen button-up on model stepping out in sunlight",
        overlay: "Buy 2 Shirts for ₹1,999",
        audio: "High-energy beat drop",
        image: 0,
      },
      {
        title: "Fit demo",
        visual: "Two contrasting shirts (solid & pattern) sliding into a sleek travel bag",
        overlay: "Mix & Match for Any Vibe",
        audio: "Voiceover: “Two styles, one price”",
        image: 1,
      },
      {
        title: "Lifestyle scene",
        visual: "Lifestyle shot at weekend brunch with friends",
        overlay: "Look Good, Feel Good",
        audio: "Upbeat ambient track continues",
        image: 2,
      },
      {
        title: "Value breakdown",
        visual: "Price comparison animation showing individual ₹2,499 vs bundle ₹1,999",
        overlay: "Save ₹500 Today",
        audio: "Quick-cut transition cue",
        image: 3,
      },
      {
        title: "End slate",
        visual: "Full weekend fit with Snitch logo and limited-edition badge",
        overlay: "Shop The Combo — Limited Batch",
        audio: "Brand sonic sign-off",
        image: 4,
      },
    ],
    hooks: [
      { type: "Direct offer", text: "Buy 2 Premium Shirts for just ₹1,999 – limited weekend deal!" },
      { type: "Identity / persona", text: "For the guy who owns every weekend plan – style that keeps up." },
      { type: "Curiosity / FOMO", text: "What's the secret combo top influencers are wearing? Find out now!" },
    ],
    remixedHooks: [
      "Two shirts. ₹1,999. Your weekend just got a serious upgrade.",
      "Main character fits. Every weekend. No exceptions.",
      "Fresh fit energy all weekend? The bundle is the cheat code.",
    ],
    copyOptions: [
      {
        title: "Direct value",
        text: "Upgrade your weekend wardrobe instantly. Choose any 2 shirts, pay only ₹1,999 and save ₹500. Limited stock – grab yours before the weekend ends!",
        limit: 125,
      },
      {
        title: "Lifestyle story",
        text: "From brunch to night out, our Weekend Warrior Combo gives you the flexibility to mix styles without breaking the bank. Pick your favorites, enjoy the discount, and step out confident.",
        limit: 150,
      },
    ],
    launch: {
      name: "SNT_202611_GAP01_bundle-carousel_A_v1",
      utm: "utm_source=facebook&utm_medium=paid&utm_campaign=gap01_bundle_carousel",
      audience: "Broad Men 18–34, India; Interests: Fast Fashion, Streetwear, Online Shopping; Lookalike 1% of 90d purchasers; Exclude 3+ order customers.",
      budget: 2500,
      days: 7,
      kill: "Pause if CTR < 1.1% OR CPC > ₹18 after 72 hours OR ROAS < 1.8x",
      scale: "Scale 25% if Blended ROAS ≥ 2.6x AND Thumb-stop rate ≥ 28% AND CPA ≤ ₹250",
    },
    rationale: "Bundling directly mirrors the competitor's high-performing offer signal, delivering a clear value proposition that lifts AOV. The carousel format showcases product variety and price savings, closing the 6-fold share gap.",
  },
  "2": {
    id: "2",
    rank: 4,
    title: "Denim Deal Drop – ₹500 OFF on ₹2,499+",
    category: "flat_discount",
    dimension: "Offer Signal",
    type: "WHITESPACE_TEST",
    concept: "Denim Deal Drop – Flat ₹500 OFF on ₹2,499+",
    format: "5-Card Lookbook Carousel – 3-4s per card",
    storyboard: [
      {
        title: "Hook frame",
        visual: "Close-up of model stepping into sleek Snitch denim jacket",
        overlay: "Flat ₹500 OFF",
        audio: "Heavy bass hit",
        image: 0,
      },
      {
        title: "Product reveal",
        visual: "Pan across three hero denim washes with price tags",
        overlay: "Premium Style, D2C Price",
        audio: "Voiceover: “Style that fits your vibe”",
        image: 1,
      },
      {
        title: "Discount proof",
        visual: "Model reveals checkout screen with code SNITCH500 applied",
        overlay: "On Orders > ₹2,499",
        audio: "Chime sound effect",
        image: 2,
      },
      {
        title: "Lifestyle fit",
        visual: "Rooftop golden-hour shot with friends laughing",
        overlay: "Dress Like You Mean It",
        audio: "Vibrant indie groove",
        image: 3,
      },
      {
        title: "End CTA",
        visual: "Shop Now button graphic with animated 48h timer",
        overlay: "Code: SNITCH500 · 48 Hours Only",
        audio: "Brand sonic outro",
        image: 4,
      },
    ],
    hooks: [
      { type: "Direct offer", text: "Flat ₹500 OFF on orders above ₹2,499 – Grab yours now!" },
      { type: "Identity / persona", text: "Upgrade your street-style game without breaking the bank." },
      { type: "Curiosity / FOMO", text: "Only 48 hours to claim this exclusive denim drop code!" },
    ],
    remixedHooks: [
      "₹500 off your next statement piece. Code SNITCH500 live now.",
      "Luxury denim feel. D2C price tag. Save ₹500 today.",
      "The fit you’ve been eyeing just got ₹500 cheaper.",
    ],
    copyOptions: [
      {
        title: "Direct value",
        text: "Snitch’s best-selling denim jackets are now ₹500 cheaper on orders above ₹2,499. Limited time – upgrade your wardrobe today with code SNITCH500!",
        limit: 125,
      },
      {
        title: "Lifestyle story",
        text: "From rooftop sunsets to city nightlife, our denim fits every vibe. Grab the look now and enjoy ₹500 off – because high-end style shouldn't wait.",
        limit: 150,
      },
    ],
    launch: {
      name: "SNT_202611_GAP02_flat-discount_A_v1",
      utm: "utm_source=facebook&utm_medium=paid&utm_campaign=gap02_flat_discount",
      audience: "Broad Men 18–34, India; Interests: Streetwear, Denim, D2C Fashion; Lookalike 1% 180d purchasers; Retarget 30d site visitors.",
      budget: 2500,
      days: 7,
      kill: "Pause if CTR < 1.1% OR CPC > ₹18 after 72 hours",
      scale: "Scale 25% if Blended ROAS ≥ 2.6x AND Thumb-stop rate ≥ 28%",
    },
    rationale: "Tests a controlled price-point discount against our no-offer baseline without eroding brand prestige. Small time-boxed pilot controls risk while measuring lift.",
  },
  "3": {
    id: "3",
    rank: 2,
    title: "FitCraft: Luxury Tailoring, D2C Price",
    category: "brand_story",
    dimension: "Creative Angle",
    type: "CATCH_UP",
    concept: "Crafted Edge – Luxury Fit, D2C Price (Founder Story)",
    format: "15-20s Founder Reel (Vertical 9:16) with subtitles",
    storyboard: [
      {
        title: "Sketching",
        visual: "Founder hands sketching jacket silhouette in workshop",
        overlay: "Behind The Fit",
        audio: "Ambient studio pencil and shears sounds",
        image: 0,
      },
      {
        title: "Fabric precision",
        visual: "Close-up of premium fabric cut on drafting table",
        overlay: "Designed in Bengaluru",
        audio: "Voiceover: “We design luxury fits in-house”",
        image: 1,
      },
      {
        title: "Final wear",
        visual: "Model steps into camera in crisp tailored blazer",
        overlay: "Runway Fit, D2C Price",
        audio: "Beat drop with lo-fi groove",
        image: 2,
      },
      {
        title: "Founder address",
        visual: "Founder speaking directly to camera holding fabric swatch",
        overlay: "Every Stitch Tells a Story",
        audio: "Voiceover: “Yours starts now”",
        image: 3,
      },
      {
        title: "End CTA",
        visual: "Snitch logo with limited 20% first-drop invitation",
        overlay: "Discover the Story · Code: FITCRAFT",
        audio: "Brand sonic sign-off",
        image: 4,
      },
    ],
    hooks: [
      { type: "Direct offer", text: "20% OFF – Use code FITCRAFT for instant luxury styling." },
      { type: "Identity / persona", text: "For the man who demands runway tailoring without the markup." },
      { type: "Curiosity / FOMO", text: "Ever wonder how raw fabric turns into the perfect fit in 48 hours?" },
    ],
    remixedHooks: [
      "We took the markup out of luxury menswear. Here’s how.",
      "Not imported. Not fast fashion. Tailored for you.",
      "The fit story your wardrobe has been missing.",
    ],
    copyOptions: [
      {
        title: "Craftsmanship narrative",
        text: "Our founder designs each piece from sketch to stitch. Experience runway tailoring at a genuine D2C price. Use code FITCRAFT for 20% off your first piece.",
        limit: 125,
      },
      {
        title: "Brand philosophy",
        text: "From our Bengaluru studio to your wardrobe, every Snitch fit is engineered for men who own the room. Discover the craftsmanship behind the cut today.",
        limit: 150,
      },
    ],
    launch: {
      name: "SNT_202611_GAP03_brand-story_A_v1",
      utm: "utm_source=facebook&utm_medium=paid&utm_campaign=gap03_brand_story",
      audience: "Men 20–35, Metro India; Interests: Tailoring, D2C Brands, Luxury Fashion; Lookalike 1% of 90d purchasers; Layered High-Income Urban.",
      budget: 2500,
      days: 7,
      kill: "Pause if CTR < 1.1% OR Video Completion < 25% after 48 hours",
      scale: "Scale 25% if Blended ROAS ≥ 2.6x AND Thumb-stop ≥ 28% AND CPA ≤ ₹120",
    },
    rationale: "Competitors hold a 14% vs 2.4% share advantage in story-driven creative, with a 1.39x 30-day durability lift. Founder-led narrative builds defensible brand equity.",
  },
  "4": {
    id: "4",
    rank: 3,
    title: "Fit Freedom – Own Your Summer Vibe",
    category: "identity",
    dimension: "Hook Type",
    type: "CATCH_UP",
    concept: "Fit Freedom – Wear the Summer You Deserve",
    format: "15-20s Founder Reel with dynamic product overlays",
    storyboard: [
      {
        title: "Problem hook",
        visual: "Guy fidgeting uncomfortably in stiff, boxy polyester shirt",
        overlay: "Tired of Shirts That Choke You?",
        audio: "Record scratch, exasperated voiceover",
        image: 0,
      },
      {
        title: "Solution drop",
        visual: "Breezy linen Snitch shirt flowing in sunny Mumbai breeze",
        overlay: "The Linen Fit Made for Indian Summers",
        audio: "Refreshing synth sweep and beat drop",
        image: 1,
      },
      {
        title: "Movement test",
        visual: "Stretch and breathability test showing drop-shoulder cut",
        overlay: "Zero Sweat, 100% Style",
        audio: "Fast rhythmic percussion",
        image: 2,
      },
      {
        title: "Founder demo",
        visual: "Quick 2-second outfit switch into evening date-night look",
        overlay: "Day to Night in One Shirt",
        audio: "Upbeat bassline",
        image: 3,
      },
      {
        title: "End slate",
        visual: "Snitch logo with limited discount badge",
        overlay: "Code: FREEDOM · 20% OFF First Order",
        audio: "Brand sonic outro",
        image: 4,
      },
    ],
    hooks: [
      { type: "Direct offer", text: "20% OFF your first summer fit – limited batch!" },
      { type: "Identity / persona", text: "For guys who refuse to let the Indian heat dictate their style." },
      { type: "Curiosity / FOMO", text: "What's the secret linen shirt Indian guys are wearing on every hot day?" },
    ],
    remixedHooks: [
      "Say goodbye to boxy, sweaty shirts forever.",
      "Engineered for 40°C Indian summers. Styled for date nights.",
      "Own the summer heat. Don't let your shirt ruin your fit.",
    ],
    copyOptions: [
      {
        title: "Direct comfort",
        text: "Say goodbye to boxy, sweaty shirts. Snitch’s summer-ready linen fits move with you, keep you cool, and look sharp. Grab 20% off with code FREEDOM!",
        limit: 125,
      },
      {
        title: "Lifestyle identity",
        text: "Imagine a shirt that feels like a breeze yet holds its shape all day. Designed specifically for Indian summers so you own every plan. Shop the Fit Freedom drop.",
        limit: 150,
      },
    ],
    launch: {
      name: "SNT_202611_GAP04_identity-hooks_A_v1",
      utm: "utm_source=facebook&utm_medium=paid&utm_campaign=gap04_identity_hooks",
      audience: "Broad Men 18–34 India; Interests: Streetwear, Summer Style, Fitness, D2C Apparel; Lookalike 1% of 180d purchasers.",
      budget: 2500,
      days: 7,
      kill: "Pause any ad set if CTR < 1.1% OR CPC > ₹18 after 72 hours",
      scale: "Scale 25% if Blended ROAS ≥ 2.6x AND Thumb-stop ≥ 28%",
    },
    rationale: "Front-loading a relatable persona pain point in the first 3 seconds mirrors the identity-led tactics that yield a 1.19x durability lift for rivals.",
  },
  "5": {
    id: "5",
    rank: 5,
    title: "Snap the Look – Full Outfit Carousel",
    category: "carousel",
    dimension: "Ad Format",
    type: "WHITESPACE_TEST",
    concept: "Snap the Look – Complete Lookbook Carousel",
    format: "5-Card Lookbook Carousel (3-4s per card)",
    storyboard: [
      {
        title: "Card 1: Top",
        visual: "Close-up of crisp cuban-collar white shirt on mannequin",
        overlay: "Card 1: Start Fresh",
        audio: "Punchy kick-drum loop",
        image: 0,
      },
      {
        title: "Card 2: Bottom",
        visual: "Smooth pan to tailored pleated chinos in olive green",
        overlay: "Card 2: Tailored Bottoms",
        audio: "Swipe transition whoosh",
        image: 1,
      },
      {
        title: "Card 3: Footwear",
        visual: "Reveal sleek low-top sneakers in clean white leather",
        overlay: "Card 3: Step Up",
        audio: "Dynamic spin sound effect",
        image: 2,
      },
      {
        title: "Card 4: Full Assembly",
        visual: "Model in complete ensemble mirror-turning with confident smile",
        overlay: "Card 4: From Desk to Night",
        audio: "Voiceover: “One swipe, whole look”",
        image: 3,
      },
      {
        title: "Card 5: Shop CTA",
        visual: "Full look card with 20% outfit bundle discount badge",
        overlay: "Card 5: Shop the Complete Look",
        audio: "Brand sonic sign-off",
        image: 4,
      },
    ],
    hooks: [
      { type: "Direct offer", text: "20% OFF Your First Full-Outfit Bundle – Today Only!" },
      { type: "Identity / persona", text: "For the modern man who wants head-to-toe style without the guesswork." },
      { type: "Curiosity / FOMO", text: "How top stylists assemble the perfect weekend fit in 3 cards." },
    ],
    remixedHooks: [
      "Swipe right to build your complete head-to-toe weekend fit.",
      "Stop buying separate shirts and pants. Own the whole look.",
      "3 items. 1 swipe. Complete style solved.",
    ],
    copyOptions: [
      {
        title: "Curated lookbook",
        text: "Grab the shirt, chinos, and sneakers that vibe together. Swipe through, shop the set, and save 20% instantly. Limited stock – upgrade now!",
        limit: 125,
      },
      {
        title: "Effortless styling",
        text: "From morning meetings to weekend hangs, Snitch curates the exact combo you need. See the full look, feel the confidence, and enjoy bundle pricing.",
        limit: 150,
      },
    ],
    launch: {
      name: "SNT_202611_GAP05_carousel-lookbook_A_v1",
      utm: "utm_source=facebook&utm_medium=paid&utm_campaign=gap05_carousel_lookbook",
      audience: "Broad Men 18–34, Feed + Stories; Lookalike 1% 90d purchasers; Retarget 30d product viewers who did not add to cart.",
      budget: 2500,
      days: 7,
      kill: "Pause if CTR < 1.1% OR CPC > ₹18 after 72 hours",
      scale: "Scale 25% if Blended ROAS ≥ 2.6x AND Thumb-stop ≥ 28%",
    },
    rationale: "Tests multi-card storytelling to challenge competitor carousel dominance (50.3% share) while curbing creative fatigue from single-product videos.",
  },
};

// Backwards-compatible exports matching Brief 1 default
export const storyboard = productionBriefs["1"].storyboard;
export const hooks = productionBriefs["1"].hooks;
export const remixedHooks = productionBriefs["1"].remixedHooks;
export const copyOptions = productionBriefs["1"].copyOptions;
export const launch = productionBriefs["1"].launch;

export function canConfirmCut(roas: string) {
  return roas.trim() !== "" && Number.isFinite(Number(roas)) && Number(roas) >= 0;
}

export function launchSpec(budget: number, days: number, name = launch.name, utm = launch.utm) {
  return `SNITCH — ADS MANAGER LAUNCH SPEC\nAd name: ${name}\nUTM: ${utm}\nAudience: ${launch.audience}\nTest budget: ₹${budget.toLocaleString("en-IN")}/day for ${days} days\nKill: ${launch.kill}\nScale: ${launch.scale}`;
}
