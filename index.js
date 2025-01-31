import GPT4js from "./src/GPT4js.js";

const isCommonJS = typeof module !== "undefined" && module.exports;

if (isCommonJS) {
  module.exports = GPT4js;
}

export default GPT4js;
