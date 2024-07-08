"use strict";
import Provider from "./provider.js";

class BlackBoxProvider extends Provider {
  async chatCompletion(messages, options = {}) {
    let randomID = () =>
      [...Array(7)]
        .map(
          () =>
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[
              Math.floor(Math.random() * 36)
            ]
        )
        .join("");

    let randomUserID =
      Math.random().toString(16).substring(2, 8) +
      "-" +
      Math.random().toString(16).substring(2, 4) +
      "-" +
      Math.random().toString(16).substring(2, 4) +
      "-" +
      Math.random().toString(16).substring(2, 4) +
      "-" +
      Math.random().toString(16).substring(2, 12);

    const body = {
      messages: messages,
      id: randomID,
      previewToken: null,
      userId: randomUserID,
      codeModelMode: options.codeModelMode || true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: options.isChromeExt || false,
      githubToken: null,
      clickedAnswer2: false,
      clickedAnswer3: false,
      clickedForceWebSearch: options.webSearch || false,
      visitFromDelta: options.visitFromDelta || null,
    };

    let url;
    if (typeof window !== "undefined") {
      url = "https://proxy.zachey.space/?url=http://www.blackbox.ai/api/chat";
    } else {
      url = "https://www.blackbox.ai/api/chat";
    }

    const response = await fetch(url, {
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawText = await response.text();
    let lastIndex = rawText.lastIndexOf("$");

    let cleanedText = rawText.slice(lastIndex + 1);

    return cleanedText;
  }
}

export default BlackBoxProvider;
