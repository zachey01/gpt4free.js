"use strict";
import Provider from "./provider.js";
import baseHeaders from "../../Utils/baseHeaders.js";
import startStreaming from "../../Utils/stream.js";

class AlibabaProvider extends Provider {
  async chatCompletion(messages, options) {
    try {
      const response = await fetch(
        "https://chat.chatgpt.org.uk/api/openai/v1/chat/completions",
        {
          headers: baseHeaders(
            "https://chat.chatgpt.org.uk/api/openai/v1/chat/completions"
          ),
          body: JSON.stringify({
            messages: messages,
            stream: options.stream || false,
            model: options.model || "gpt-3.5-turbo",
            temperature: options.temperature || 0.5,
            presence_penalty: options.presence_penalty || 0,
            frequency_penalty: options.frequency_penalty || 0,
            top_p: options.top_p || 1,
          }),
          method: "POST",
        }
      );

      if (options.stream === true) {
        startStreaming(response).then((chunk) => {
          return chunk;
        });
      } else {
        const text = await response.json();
        return text.choices[0].message.content;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default AlibabaProvider;
