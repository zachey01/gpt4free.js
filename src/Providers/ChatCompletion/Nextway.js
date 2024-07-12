"use strict";
import Provider from "./provider.js";
import baseHeaders from "../../Utils/baseHeaders.js";

class NextwayProvider extends Provider {
  async chatCompletion(messages, options) {
    const proxyUrl = options.use_proxy
      ? "https://proxy.zachey.space/?url=https://chat.eqing.tech/api/openai/v1/chat/completions"
      : "https://chat.eqing.tech/api/openai/v1/chat/completions";

    const response = await fetch(proxyUrl, {
      headers: baseHeaders(
        "https://chat.eqing.tech/api/openai/v1/chat/completions"
      ),
      body: JSON.stringify({
        messages: messages,
        stream: options.stream,
        model: options.model || "gpt-4o-free",
        temperature: options.temperature,
        captchaToken:
          "P1_" +
          btoa(JSON.stringify({ typ: "JWT", alg: "HS256" })) +
          "." +
          btoa("hashedkey") +
          "." +
          btoa("signature"),
      }),
      method: "POST",
    });

    if (!response.ok) {
      console.error("Network response was not ok");
      return;
    }

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

export default NextwayProvider;
