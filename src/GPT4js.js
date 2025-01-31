import { ChatCompletionProviders } from "./providers/chatCompletion/index.js";

const PROVIDERS = {
  ...ChatCompletionProviders,
};

class GPT4js {
  static createProvider(providerName) {
    const Provider = PROVIDERS[providerName];
    if (!Provider) {
      throw new Error(`Provider "${providerName}" is not supported.`);
    }
    return new Provider();
  }
}

export default GPT4js;
