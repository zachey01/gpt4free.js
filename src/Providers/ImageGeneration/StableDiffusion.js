"use strict";
import Provider from "./provider.js";

class StableDiffusionProvider extends Provider {
  async imageGeneration(prompt, options) {
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
            model: "stablediffusion-2.1",
            data: {
              prompt_negative: options.prompt_negative || "",
              width: options.width || 512,
              height: options.height || 512,
              sampling_method: options.sampling_method || "default",
              sampling_steps: options.sampling_steps || 1,
              cfg_scale: options.cfg_scale || 1,
            },
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

export default StableDiffusionProvider;
