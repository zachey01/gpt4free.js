import GPT4js from "../index.js";

const providers = [
  {
    name: "Nextway",
    models: ["gpt-4o-free", "gpt-3.5-turbo", "gemini-pro"],
    options: { maxTokens: 100, temperature: 0.5, stream: false },
  },
  {
    name: "BlackBox",
    models: [""],
    options: { codeModelMode: true, isChromeExt: false, webSearch: false },
  },
  {
    name: "Aryahcr",
    models: [
      "gpt-4",
      "gpt-4-0613",
      "gpt-4-32k",
      "gpt-4-0314",
      "gpt-4-32k-0314",
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-16k",
      "gpt-3.5-turbo-0613",
      "gpt-3.5-turbo-16k-0613",
      "gpt-3.5-turbo-0301",
      "text-davinci-003",
      "text-davinci-002",
      "code-davinci-002",
      "gpt-3",
      "text-curie-001",
      "text-babbage-001",
      "text-ada-001",
      "davinci",
      "curie",
      "babbage",
      "ada",
      "babbage-002",
      "davinci-002",
    ],
    options: { temperature: 0.5, stream: false },
  },
];

providers.forEach((provider) => {
  provider.models.forEach((model) => {
    describe(`GPT-4 Chat Completion Tests for ${provider.name} ${model}`, () => {
      it(`should complete chat using ${provider.name} ${model}`, async () => {
        const messages = [{ role: "user", content: "hi!" }];
        const options = { provider: provider.name, model, ...provider.options };
        const providerInstance = GPT4js.createProvider(provider.name);

        try {
          const text = await providerInstance.chatCompletion(messages, options);
          expect(text).toBeDefined();
          console.log(`Chat completion with ${provider.name} ${model}:`, text);
        } catch (error) {
          console.error(`Error with ${provider.name} ${model}:`, error);
          throw error;
        }
      });
    });
  });
});
