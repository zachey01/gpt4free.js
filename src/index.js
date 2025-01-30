// src/index.js
import AryahcrProvider from "./providers/chatCompletion/Aryahcr.js";
import BlackBoxProvider from "./providers/chatCompletion/BlackBox.js";
import NextwayProvider from "./providers/chatCompletion/Nextway.js";
import ChromeProvider from "./providers/chatCompletion/Chrome.js";
import OllamaProvider from "./providers/chatCompletion/Ollama.js";
import AlibabaProvider from "./providers/chatCompletion/AliBaba.js";

import DALLEProvider from "./providers/imageGeneration/DALLE.js";
import StableDiffusionProvider from "./providers/imageGeneration/StableDiffusion.js";

const PROVIDERS = {
  Aryahcr: AryahcrProvider,
  BlackBox: BlackBoxProvider,
  Nextway: NextwayProvider,
  Chrome: ChromeProvider,
  Ollama: OllamaProvider,
  Alibaba: AlibabaProvider,
  DALLE: DALLEProvider,
  StableDiffusion: StableDiffusionProvider,
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
