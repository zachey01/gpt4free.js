"use strict";
import Provider from "./provider.js";

class ChromeProvider extends Provider {
  async chatCompletion(messages) {
    let message = messages[0].content;
    const aiObj = ai.createTextSession();
    const promptInt = await aiObj;
    let response = await promptInt.prompt(message);
    return response;
  }
}

export default ChromeProvider;
