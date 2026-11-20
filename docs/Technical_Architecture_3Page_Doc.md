# Competitive Ad Intelligence Platform for Indian D2C Menswear
## 3-Page Technical Architecture & Build Document

---

# Page 1: Foundations, Infrastructure & System Setup

### Limitations of a $0 Free-Tier Stack (Read This First)

We built this whole system without paying for any tool. That choice shaped many of our design decisions, so you should know the trade-offs before reading the rest:

* **Free AI models have speed limits:** Groq (Llama-3) and Google Gemini both cap how many requests you can send per minute (RPM) and how much text you can send per minute (TPM). They also have a “context window,” which is the maximum amount of text the AI can read in a single request. If we send too much too fast, the AI refuses with a “429 Too Many Requests” error. Our pipeline is built around this, so it works in small, slow batches rather than all at once.
* **Free scrapers have limited fuel and can be blocked:** Apify gives a small monthly credit allowance ($5). Once it runs out, scraping stops until next month. Meta can also block scrapers by recognizing and refusing their internet address (an “IP block”), which can make a collection run fail or return incomplete data.
* **Free cloud hosting is small:** Oracle Cloud’s “Always Free” tier gives us one Ubuntu Linux virtual machine (VM) with modest processing power and memory. It cannot run many heavy programs at once, so we run only what we need (Docker and n8n) and keep every workflow lightweight.
* **Google Sheets is not a real database:** It is easy to read and share, but it has write limits (about 60 requests per minute), so we write data in bulk instead of one row at a time.

---

### 1. What the System Does

The platform collects Meta (Facebook/Instagram) ads from five brands, cleans them, uses AI to label each ad on five strategic dimensions, calculates comparison metrics, and shows everything on a live dashboard. Think of it as an assembly line: raw ads go in one end, labeled and measured ads come out the other, and a dashboard displays them.

The five brands are **Snitch** (our client) and four rivals: **Bewakoof**, **The Souled Store**, **Beyoung**, and **Urbanic Men**. In total, **872 ads** were collected and classified.

---

### 2. The Technology Stack

| Layer | Tool | What it does (in plain English) | Cost |
| :--- | :--- | :--- | :--- |
| **Computer in the cloud** | Oracle Cloud Always Free VM (Ubuntu + Docker) | A small always-on computer that runs everything. Docker packages software into neat, self-contained boxes so it runs the same anywhere. | **$0** |
| **Workflow manager** | n8n Community Edition | A visual “connect-the-boxes” tool that moves data from step to step. Runs inside Docker on the Oracle VM. | **$0** |
| **Data collection** | Apify Meta Ad Scraper (or manual CSV from Meta Ad Library) | Pulls public ads from Meta’s Ad Library, which is Meta’s open archive of all running ads. | **$0** *(free credits)* |
| **AI brain** | Groq (Llama-3-70b / 8b) & Google Gemini 1.5 Flash | Reads each ad and decides what type of ad it is. | **$0** *(free tiers)* |
| **Database** | Google Sheets via official API | Stores all ads and results in spreadsheet tabs that anyone can open. | **$0** |
| **Dashboard** | React + Vite + TanStack Start, connected to Lovable | The website people look at. It pulls live data from our pipeline. | **$0** |

---

### 3. How the Pieces Connect

1. Apify (or a CSV upload) sends raw ads to an n8n “webhook,” which is simply a web address that waits to receive data.
2. Four separate n8n workflows process the data one after another, handing off to each other through internal webhooks.
3. Results are saved into Google Sheets.
4. The dashboard asks n8n for the latest numbers through a live web address (`GET /webhook/snitch-dashboard-data`) and displays them.

> **Why four workflows instead of one big one?**  
> A single giant workflow is fragile: if one step breaks, everything breaks, and finding the problem is painful. By splitting the job into four small, single-purpose workflows, each can be tested, fixed, or re-run on its own.

---
---

# Page 2: Data Ingestion, Workflow Automation & Storage

### 4. The Raw Data We Collect

For every ad, we pull these fields from Meta Ad Library:

* **Ad Body Copy:** The main caption and text of the ad.
* **Ad Headline:** The title shown under the image or video.
* **CTA Button Label:** The button text, such as “Shop Now,” “Learn More,” or “Get Offer.”
* **Ad Creative Format:** Video, static image, or multi-card carousel.
* **Start Date and End Date:** Used to measure how long an ad ran.
* **Asset URLs:** Links to the video, thumbnail image, and product page the ad points to.

Data enters in one of two ways: an automated Apify trigger that sends results straight to n8n, or a batch CSV upload exported by hand from Meta Ad Library.

---

### 5. The Four n8n Workflows, Step by Step

#### **WF-01: Ingestion & Text Normalization (The Cleaning Station)**
Raw ad data is messy. This workflow takes each incoming ad, removes emoji clutter, fixes broken characters caused by text-encoding glitches, and reshapes every ad into one consistent layout (called a “unified schema”). After this step, every ad looks the same no matter where it came from.

#### **WF-02: Deduplication & Durability Math (The Sorting Station)**
Brands often run the same creative across 10 or more different ad sets. If we counted each one separately, the data would be inflated. To fix this:
* **Concept ID:** We combine the ad copy and headline and run them through an MD5 hash. A hash is a “digital fingerprint”: identical text always produces the identical fingerprint, and any change produces a different one. Ads with the same fingerprint are grouped into one unique Concept ID.
* **Durability:** This means how many days an ad stayed active, calculated as `end_date − start_date`. If the ad is still running, we count from its start date to the current sync date. The idea is that an ad that keeps running is probably working well enough to keep paying for.

#### **WF-03: AI Classification Engine (The Labeling Station)**
This workflow collects ads that have no labels yet and sends them to the AI in micro-batches of 5 to 10 ads. Between batches it pauses on purpose (a “sleep delay”) so we never exceed the free AI limits and trigger 429 errors. The AI is told to answer in a strict format (JSON, a structured text format that computers can read reliably), and the answers are written into the Google Sheet.

#### **WF-04: Metric Aggregation & Live API (The Math & Delivery Station)**
This workflow reads the labeled ads from Google Sheets and calculates four core metrics:
* **Brand Share %:** What portion of one brand’s total ads belongs to a given subcategory.
* **Market Share %:** The average of that same share across all four competitors combined.
* **Gap Index:** `(Snitch Share % ÷ Market Share %) × 100`. Below 100 means Snitch is under-represented in that subcategory (a “gap”). Above 100 means Snitch uses it more than the market does (a “moat”).
* **30-Day Durability Lift:** `Subcategory Average Survival Days ÷ Global Benchmark Average Days`. A value above 1.0x means ads of that type tend to stay live longer than average.

It then refreshes the summary tabs in Google Sheets (*Top 5 Gaps Summary*, *Gap Matrix v2*, *Snitch Strength Map*, *Cross Tabs*) and serves a live address, `GET /webhook/snitch-dashboard-data`, which returns clean JSON straight to the dashboard.

---

### 6. Why Google Sheets Works as Our Database

Sheets is free, visible to non-technical teammates, easy to share, and connects to n8n through Google’s official integration. The trade-off, as noted on Page 1, is its write-rate limit, which we handle through batching (see Section 9).

---
---

# Page 3: Classification Logic, Quality Control & System Costs

### 7. How the AI Classifies Each Ad

Every ad is scored on five strategic dimensions, covering 15 subcategories in total:

1. **Ad Format:** Single Video, Static Image, Multi-Card Carousel.
2. **Offer Signal:** Value Bundle Combo (e.g., 2 for ₹1,999), Flat Discount (e.g., Flat ₹500 OFF), Buy-X-Get-Y, or Standard Full Price.
3. **Creative Angle:** Brand Story / Craftsmanship, Product-Only Showcase, Creator / Influencer Fit-Check, Problem-Solution (e.g., anti-wrinkle).
4. **Hook Type (The Opening Line):** Bold Declarative Statement, Question Hook, Social Proof Hook, Persona / Identity-Led Hook (“For guys who...”).
5. **Product Category:** Topwear (shirts, polos), Bottomwear (jeans, chinos), Full Outfit Lookbooks, Solo Footwear, Solo Accessories.

#### How we instruct the AI (Prompt Engineering):
* **Strict JSON mode (`response_format: { type: "json_object" }`):** Forces the AI to reply in a fixed, machine-readable shape.
* **Temperature set to 0.0:** Temperature controls how “creative” the AI gets. Zero makes it consistent, so the same ad gets the same label every time.
* **One example per dimension inside the instructions:** Gives the AI a clear reference for what a correct answer looks like.
* **A “do not guess” rule:** If the ad text gives no clear evidence for a dimension, the AI must answer “None” or “General” instead of inventing a label.

---

### 8. How We Checked the AI Was Accurate

* **10% Human Audit:** We randomly picked 87 ads across all five brands. A person labeled them independently without seeing the AI’s answers. Comparing the two showed over **92% agreement**.
* **Rule-Based Safety Checks (Regex Guardrails):** Small code steps double-check risky labels using simple keyword searches. For example, an ad labeled “Flat Discount” must contain words like “% off,” “₹ off,” or “sale.” If it does not, the label is rejected or downgraded.
* **Confidence Flags:** Ads with ultra-short copy (under 5 words) are marked “Directional Evidence” instead of “Strong Evidence,” since there is little text to judge from.

---

### 9. What Can Break, and How We Handled It

| Problem | What happens | Our fix |
| :--- | :--- | :--- |
| **Meta layout changes or scraper IP blocks** | Fields go missing or collection fails | Apify rotates its internet addresses (proxy rotation). Our pipeline checks every ad for missing fields and fills safe defaults such as `"text unavailable"` so nothing crashes. |
| **AI rate limits (429 errors)** | The AI refuses requests when we go too fast | n8n retries automatically with growing waits (exponential backoff): 3 retries after 5, 15, then 30 seconds. |
| **Broken AI output** | The AI returns text that is not valid JSON | A check step tries to read the output with `JSON.parse()`. On failure, the ad goes to a fallback step that retries with a simpler prompt. |
| **Google Sheets write limits** | Row-by-row saving hits the 60-per-minute cap | n8n collects results and writes 50 rows per API call. |

---

### 10. Operating Costs

#### Current Monthly Operating Cost: **$0.00**

| Item | Monthly Cost |
| :--- | :--- |
| Oracle Cloud VM (Always Free E2.1.Micro / Ampere) | **$0.00** |
| n8n Community Edition (Self-hosted on Docker) | **$0.00** |
| Groq API / Google Gemini Free Tiers | **$0.00** |
| Apify Free Tier ($5 monthly credit) | **$0.00** |
| Google Sheets API (Google Cloud Free Tier) | **$0.00** |
| Frontend Hosting & GitHub CI | **$0.00** |
| **Total Current Cost** | **$0.00 / month** |

#### If Scaled to 50 Brands and 10,000 Ads per Month:

| Item | Estimated Cost |
| :--- | :--- |
| Apify Paid Tier (Residential proxies, higher volume) | ~$10–$15 / month |
| Paid LLM Usage (Gemini Flash or Groq) for 10k ads | ~$2–$5 / month |
| Larger VPS (if needed beyond Oracle free tier) | ~$5–$10 / month |
| **Estimated Total at Scale** | **~$17–$30 / month** |
