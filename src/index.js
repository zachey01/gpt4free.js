import ChromeProvider from "./providers/chatCompletion/Chrome.js";
import OllamaProvider from "./providers/chatCompletion/Ollama.js";

const PROVIDERS = {
  Chrome: ChromeProvider,
  Ollama: OllamaProvider,
};

class GPT4js {
  static createProvider(providerName) {
    const Provider = PROVIDERS[providerName];
    if (!Provider) {
      throw new Error(`Provider ${providerName} is not supported.`);
    }
    return new Provider();
  }
}

export default GPT4js;
