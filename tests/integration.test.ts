import { findSuggestions, search } from "../src";

describe("integration", () => {
  describe("findSuggestions", () => {
    it("should find suggestions", async () => {
      const suggestions = await findSuggestions("Rudsjöterrassen 2");
      expect(suggestions).toBeDefined();
      expect(suggestions.results.length).toEqual(1);
      expect(suggestions.results[0].address).toEqual("Rudsjöterrassen 2");
    });
  });

  describe("search", () => {
    it("should search for an address", async () => {
      const searchResults = await search("Rudsjöterrassen 2");
      expect(searchResults).toBeDefined();
      expect(searchResults.results.length).toEqual(1);
      expect(searchResults.results[0].address).toEqual("Rudsjöterrassen 2");
    });
  });
});
