"use strict";
import Provider from "./provider.js";

class ChatBotRuProvider extends Provider {
  async chatCompletion(messages, options) {
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
          headers: {
            accept: "application/json, text/event-stream",
            "accept-language": "ru,en;q=0.9",
            "content-type": "application/json",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="124", "YaBrowser";v="24.6", "Not-A.Brand";v="99", "Yowser";v="2.5"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            Referer: "https://gpt-chatbotru-chat-main.ru/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
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

      const text = await response.json();
      return text.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default ChatBotRuProvider;
