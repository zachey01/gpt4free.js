"use strict";
import Provider from "./provider.js";

class SampleProvider extends Provider {
  async chatCompletion(messages, options) {
    return "Output";
  }
}

export default SampleProvider;
