"use strict";
import Provider from "./provider.js";
import baseHeaders from "../../Utils/baseHeaders.js";
import startStreaming from "../../Utils/stream.js";

class AlibabaProvider extends Provider {
  async chatCompletion(messages, options, onData) {
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

      if (!response.ok) {
        // Handle errors with the response
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }

      if (options.stream === true) {
        await startStreaming(response, onData);
      } else {
        let data = await response.json();
        data = data.choices[0].message.content || data.choices.message.content;
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default AlibabaProvider;
