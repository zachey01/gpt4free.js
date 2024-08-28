"use strict";
import AryahcrProvider from "./Providers/ChatCompletion/Aryahcr.js";
import BlackBoxProvider from "./Providers/ChatCompletion/BlackBox.js";
import NextwayProvider from "./Providers/ChatCompletion/Nextway.js";
import ChromeProvider from "./Providers/ChatCompletion/Chrome.js";
import OllamaProvider from "./Providers/ChatCompletion/Ollama.js";
import AlibabaProvider from "./Providers/ChatCompletion/Alibaba.js";

import DALLE2Provider from "./Providers/ImageGeneration/DALLE.js";
import StableDiffusionProvider from "./Providers/ImageGeneration/StableDiffusion.js";

const PROVIDERS = {
  Aryahcr: AryahcrProvider,
  BlackBox: BlackBoxProvider,
  Nextway: NextwayProvider,
  Chrome: ChromeProvider,
  Ollama: OllamaProvider,
  Alibaba: AlibabaProvider,
  DALLE2: DALLE2Provider,
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
