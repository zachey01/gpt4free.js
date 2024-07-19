"use strict";
import Provider from "./provider.js";
import baseHeaders from "../../Utils/baseHeaders.js";
import startStreaming from "../../Utils/stream.js";

class NextwayProvider extends Provider {
  async chatCompletion(messages, options, onData) {
    const proxyUrl = options.use_proxy
      ? "https://proxy.zachey.space/?url=https://chat.eqing.tech/api/openai/v1/chat/completions"
      : "https://origin.eqing.tech/api/openai/v1/chat/completions";

    const response = await fetch(proxyUrl, {
      headers: {
        ...baseHeaders("https://origin.eqing.tech/"),
        usesearch: [options.webSearch].toString(),
      },
      body: JSON.stringify({
        messages: messages,
        stream: options.stream,
        model: options.model || "gpt-4o-free",
        temperature: options.temperature || 0.5,
        max_tokens: 4000 || options.maxTokens,
        captchaToken: `P1_${[...Array(30)].map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(Math.floor(Math.random() * 64))).join("")}.${[...Array(256)].map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(Math.floor(Math.random() * 64))).join("")}.${[...Array(43)].map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(Math.floor(Math.random() * 64))).join("")}`,
      }),
      method: "POST",
    });

    if (!response.ok) {
      console.error("Network response was not ok");
      return;
    }

    if (options.stream) {
      await startStreaming(response, onData);
    } else {
      try {
        const jsonData = await response.json();
        if (
          jsonData.choices &&
          jsonData.choices.length > 0 &&
          jsonData.choices[0].message &&
          jsonData.choices[0].message.content
        ) {
          return jsonData.choices[0].message.content.trim();
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    }
  }
}

export default NextwayProvider;
