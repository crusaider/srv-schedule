import { concatPaths } from "./conactPaths";

describe("concatPaths", () => {
  it("should concatenate paths correctly", () => {
    const result = concatPaths("/users", "123", "profile");
    expect(result).toBe("users/123/profile");
  });

  it("should handle leading and trailing slashes", () => {
    const result = concatPaths("/users/", "/123/", "/profile/");
    expect(result).toBe("users/123/profile");
  });

  it("should handle empty paths", () => {
    const result = concatPaths("", "users", "", "123", "", "profile");
    expect(result).toBe("users/123/profile");
  });
});
