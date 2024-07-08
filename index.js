import GPT4Free from "./src/providers.js";

if (typeof window !== "undefined") {
  window.GPT4Free = GPT4Free;
}

export default GPT4Free;
