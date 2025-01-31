"use strict";
import ChatCompletionProvider from "./baseChatCompletionProvider.js";
import { request } from "../../utils/fetch.js";
import startStreaming from "../../utils/stream.js";

class OllamaProvider extends ChatCompletionProvider {
  async chatCompletion(messages, options, onData) {
    try {
      const response = await request(
        `${options.ollama_url || "http://localhost:11434"}/api/chat`,
        {
          body: JSON.stringify({
            messages: messages,
            stream: options.stream || false,
            model: options.model,
          }),
          method: "POST",
        }
      );

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
      console.error("Error with Ollama provider:", error.message);
    }
  }

  static getConfig() {
    return {
      isWorking: true,
      supportedModels: ["All from https://ollama.com/library"],
      supportsStreaming: true,
      supportsHistory: true,
      supportsSystemPrompt: true,
      customOptions: [null],
    };
  }
}

export default OllamaProvider;
