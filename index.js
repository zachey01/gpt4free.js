import GPT4js from "./src/index.js";

const isCommonJS = typeof module !== 'undefined' && module.exports;

if (isCommonJS) {
  module.exports = GPT4js;
}

export default GPT4js;
