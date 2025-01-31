import OllamaProvider from "./Ollama.js";
import BlackBoxProvider from "./BlackBox.js";

export const ChatCompletionProviders = {
  Ollama: OllamaProvider,
  BlackBox: BlackBoxProvider,
};
