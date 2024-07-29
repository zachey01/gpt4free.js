// not working
"use strict";
import Provider from "./provider.js";
import baseHeaders from "../../Utils/baseHeaders.js";
import startStreaming from "../../Utils/stream.js";

class ChatBotRuProvider extends Provider {
  async chatCompletion(messages, options, onData) {
    try {
      const models = {
        "gpt-4o": "gpt-4o-2024-05-13",
        "gpt-4": "gpt-4-32k",
        "gpt-4-turbo": "gpt-4-32k-0613",
      };

      const model = models[options.model] || models["gpt-4o"];

      const response = await fetch(
        "https://gpt-chatbotru-chat-main.ru/api/openai/v1/chat/completions",
        {
          headers: baseHeaders(
            "https://gpt-chatbotru-chat-main.ru/api/openai/v1/chat/completions"
          ),
          body: JSON.stringify({
            messages: messages,
            stream: options.stream || false,
            model: model,
            temperature: options.temperature || 0.5,
            presence_penalty: options.presence_penalty || 0,
            frequency_penalty: options.frequency_penalty || 0,
            top_p: options.top_p || 1,
          }),
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      if (options.stream === true) {
        await startStreaming(response, onData);
      } else {
        const responseData = await response.text();
        console.log(responseData);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default ChatBotRuProvider;
