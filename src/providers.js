"use strict";
import AryahcrProvider from "./Providers/ChatCompletion/Aryahcr.js";
import BlackBoxProvider from "./Providers/ChatCompletion/BlackBox.js";
import NextwayProvider from "./Providers/ChatCompletion/Nextway.js";
import ChromeProvider from "./Providers/ChatCompletion/Chrome.js";

import DALLE2Provider from "./Providers/ImageGeneration/DALLE.js";
import StableDiffusionProvider from "./Providers/ImageGeneration/StableDiffusion.js";

class GPT4Free {
  static createProvider(providerName) {
    switch (providerName) {
      case "Aryahcr":
        return new AryahcrProvider();
      case "BlackBox":
        return new BlackBoxProvider();
      case "Nextway":
        return new NextwayProvider();
      case "Chrome":
        return new ChromeProvider();
      case "DALLE2":
        return new DALLE2Provider();
      case "StableDiffusion":
        return new StableDiffusionProvider();
      default:
        throw new Error(`Provider ${providerName} is not supported.`);
    }
  }
}

export default GPT4Free;
