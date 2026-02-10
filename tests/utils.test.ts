import { describe, expect, it } from "vitest";
import { toSafeExt, maskEmail } from "../src/lib/utils";

describe("utils", () => {
  it("extracts file extension", () => {
    expect(toSafeExt("file.PDF")).toBe("pdf");
    expect(toSafeExt("file")).toBe("");
  });

  it("masks email", () => {
    expect(maskEmail("hello@example.com")).toBe("he***@example.com");
  });
});
