"use strict";
import Provider from "./provider.js";

class DALLEProvider extends Provider {
  async imageGeneration(prompt) {
    try {
      const response = await fetch(
        "https://nexra.aryahcr.cc/api/image/complements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
            model: "dalle",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const textResponse = await response.text();
      const cleanedResponse = textResponse.trim().replace(/^_+/, "");
      const responseData = JSON.parse(cleanedResponse);

      if (responseData.code === 200 && responseData.status) {
        return responseData.images;
      } else {
        throw new Error("Server returned unsuccessful response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data. Please try again later.");
    }
  }
}

export default DALLEProvider;
