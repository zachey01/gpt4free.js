"use strict";

export const request = async (url, options) => {
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json, text/event-stream",
    "accept-language": "ru,en;q=0.9",
    "content-type": "application/json",
    priority: "u=1, i",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    plugins: "0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    Referer: url,
    "Referrer-Policy": "strict-origin-when-cross-origin",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch data");
  }
};
