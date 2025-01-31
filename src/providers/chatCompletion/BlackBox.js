"use strict";
import ChatCompletionProvider from "./baseChatCompletionProvider.js";
import { request } from "../../utils/fetch.js";
import startStreaming from "../../utils/stream.js";

class BlackBoxProvider extends ChatCompletionProvider {
  async chatCompletion(messages, options, onData) {
    try {
      const response = await request("https://api.blackbox.ai/api/chat", {
        body: JSON.stringify({
          messages: messages,
          codeModelMode: options.codeMode || true,
          isMicMode: options.micMode || false,
          userSystemPrompt: options.systemPrompt || null,
          maxTokens: options.maxTokens || 1024,
          playgroundTopP: options.topP || null,
          isChromeExt: options.chromeExtMode || false,
          clickedForceWebSearch: options.webMode || false,
          visitFromDelta: false,
          isMemoryEnabled: options.memory || false,
          imageGenerationMode: options.imageGenerationMode || false,
          webSearchModePrompt: false,
          deepSearchMode: options.deepSearchMode || false,
          codeInterpreterMode: options.codeMode || false,
        }),
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (options.stream) {
        await startStreaming(response, onData);
      } else {
        const responseData = await response.json();
        return responseData.message.content;
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  static getConfig() {
    return {
      supportedModels: ["blackbox"],
      isWorking: true,
      supportsStreaming: false,
      supportsHistory: true,
      supportsSystemPrompt: true,
    };
  }
}

export default BlackBoxProvider;
