import { describe, it, expect } from "vitest";
import { getDictionary } from "@/lib/i18n";

describe("i18n Dictionary", () => {
  it("should return the Hindi dictionary when 'hi' is requested", () => {
    const dict = getDictionary("hi");
    expect(dict.welcome).toContain("स्वागत");
  });

  it("should return the English dictionary when 'en' is requested", () => {
    const dict = getDictionary("en");
    expect(dict.welcome).toContain("Welcome");
  });

  it("should contain matching keys for both languages", () => {
    const hiKeys = Object.keys(getDictionary("hi"));
    const enKeys = Object.keys(getDictionary("en"));
    expect(hiKeys).toEqual(enKeys);
  });
});
