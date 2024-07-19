"use strict";
import Provider from "./provider.js";
import baseHeaders from "../../Utils/baseHeaders.js";
import startStreaming from "../../Utils/stream.js";

class OllamaProvider extends Provider {
  async chatCompletion(messages, options, onData) {
    try {
      const response = await fetch(
        `${options.ollama_url || "http://localhost:11434"}/api/chat`,
        {
          headers: baseHeaders(
            `${options.ollama_url || "http://localhost:11434"}`
          ),
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
      console.error("Error fetching data:", error.message);
    }
  }
}

export default OllamaProvider;
