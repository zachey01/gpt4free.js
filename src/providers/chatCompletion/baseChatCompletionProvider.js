"use strict";
import BaseProvider from "../baseProvider.js";

class ChatCompletionProvider extends BaseProvider {
  async chatCompletion(messages, options, onData) {
    throw new Error("Method 'chatCompletion()' must be implemented.");
  }

  static getConfig() {
    return {};
  }
}

export default ChatCompletionProvider;
