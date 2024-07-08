"use strict";
import Provider from "./provider.js";

class AryahcrProvider extends Provider {
  async chatCompletion(messages, options) {
    try {
      const response = await fetch("https://nexra.aryahcr.cc/api/chat/gpt", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
          model: options.model || "gpt-4",
          temperature: options.temperature || 0.5,
          stream: options.stream || false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.status && responseData.gpt) {
        return responseData.gpt;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default AryahcrProvider;
