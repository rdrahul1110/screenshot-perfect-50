import { describe, it, expect } from "vitest";
import { gaps, moats, drains, kpis, launch, launchSpec, canConfirmCut } from "@/data/mockData";
describe("Snitch operational brief", () => {
  it("preserves the exact three headline KPIs", () => {
    expect(kpis.map((k) => k.value)).toEqual(["41", "34.2", "24.2"]);
  });
  it("uses the exact specified gap indices", () => {
    expect(gaps.map((g) => [g.name, g.index])).toEqual([
      ["Bundle Combos", 6],
      ["Brand Story", 17],
      ["Identity-Led Hooks", 27],
      ["Flat Discounts", 14],
      ["Carousels", 33],
    ]);
  });
  it("separates catch-up lift at or above 1 from whitespace pilots below 1", () => {
    expect(gaps.filter((g) => g.type === "CATCH_UP").map((g) => g.lift)).toEqual([
      1.28, 1.39, 1.19,
    ]);
    expect(gaps.filter((g) => g.type === "WHITESPACE_TEST").map((g) => g.lift)).toEqual([
      0.9, 0.88,
    ]);
  });
  it("preserves moat indices", () => {
    expect(moats.map((m) => m.index)).toEqual([545, 4034, 426, 160, 420]);
  });
  it("keeps accessory durability at 0.26x", () => {
    expect(drains.find((d) => d.id === "accessories")?.lift).toBe(0.26);
  });
  it("defaults to ₹2500 per day for seven days", () => {
    expect(launch.budget).toBe(2500);
    expect(launch.days).toBe(7);
    expect(launchSpec(2500, 7)).toContain("₹2,500/day for 7 days");
  });
  it("copies edited budget and duration instead of defaults", () => {
    expect(launchSpec(3200, 10)).toContain("₹3,200/day for 10 days");
  });
  it("preserves kill thresholds of 1.1 percent CTR and ₹18 CPC after 72h", () => {
    expect(launch.kill).toBe("Pause if CTR < 1.1% or CPC > ₹18 after 72 hours");
  });
  it("preserves scale rule of 25 percent at 2.6x after five days", () => {
    expect(launch.scale).toBe("Scale 25% if Blended ROAS ≥ 2.6x after 5 days");
  });
  it("requires verified numeric ROAS before confirming cut recommendation", () => {
    expect(canConfirmCut("")).toBe(false);
    expect(canConfirmCut(" ")).toBe(false);
    expect(canConfirmCut("not verified")).toBe(false);
    expect(canConfirmCut("-1")).toBe(false);
    expect(canConfirmCut("1.20")).toBe(true);
    expect(canConfirmCut("0")).toBe(true);
  });
});
