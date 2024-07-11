"use strict";
import Provider from "./provider.js";

class NextwayProvider extends Provider {
  async chatCompletion(messages, options) {
    const response = await fetch(
      "https://chat.eqing.tech/api/openai/v1/chat/completions",
      {
        headers: {
          accept: "text/event-stream",
          "content-type": "application/json",
          usesearch: "false",
        },
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
      }
    );
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
