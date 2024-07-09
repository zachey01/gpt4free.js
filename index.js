import GPT4js from "./src/providers.js";
import "./src/Utils/redCross.js";

if (typeof window !== "undefined") {
  window.GPT4js = GPT4js;
}

export default GPT4js;
