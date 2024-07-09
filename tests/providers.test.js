import GPT4js from "../src/providers.js";

describe("GPT4js", () => {
  const providers = [
    { name: "Aryahcr", className: "AryahcrProvider" },
    { name: "BlackBox", className: "BlackBoxProvider" },
    { name: "Nextway", className: "NextwayProvider" },
    { name: "Chrome", className: "ChromeProvider" },
    { name: "Ollama", className: "OllamaProvider" },
    { name: "DALLE2", className: "DALLEProvider" },
    { name: "StableDiffusion", className: "StableDiffusionProvider" },
  ];

  providers.forEach((provider) => {
    it(`should create a ${provider.name} provider`, () => {
      const createdProvider = GPT4js.createProvider(provider.name);
      expect(createdProvider).toBeDefined();
      expect(createdProvider.constructor.name).toBe(provider.className);
    });
  });

  it("should throw an error for unsupported providers", () => {
    expect(() => GPT4js.createProvider("Unknown")).toThrow(
      "Provider Unknown is not supported."
    );
  });
});
