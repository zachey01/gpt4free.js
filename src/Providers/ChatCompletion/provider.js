"use strict";

class ChatCompletionProvider {
  async chatCompletion(messages, options, onData) {
    throw new Error("Method 'chatCompletion()' must be implemented.");
  }
}

export default ChatCompletionProvider;