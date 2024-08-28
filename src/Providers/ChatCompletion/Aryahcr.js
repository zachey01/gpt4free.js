"use strict";
import Provider from "./provider.js";
import baseHeaders from "../../Utils/baseHeaders.js";
import startStreaming from "../../Utils/stream.js";

class AryahcrProvider extends Provider {
  async chatCompletion(messages, options, onData) {
    try {
      const response = await fetch("https://nexra.aryahcr.cc/api/chat/gpt", {
        method: "POST",
        headers: baseHeaders("https://nexra.aryahcr.cc/api/chat/gpt"),
        body: JSON.stringify({
          messages: messages,
          model: options.model || "gpt-4",
          stream: options.stream || false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (options.stream === true) {
        await startStreaming(response, onData);
      } else {
        let data = await response.json();
        data = data.gpt;
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default AryahcrProvider;
