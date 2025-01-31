# GPT4js 🔮

GPT4js is a package that simplifies interaction with various AI models, eliminating the need for an API Key or any other authorization method to access these chat completions and image generation models.

This package can be used in Node.js or Browser environments.

![Static Badge](https://img.shields.io/badge/Zachey-GPT4js-GPT4js)
![GitHub top language](https://img.shields.io/github/languages/top/zachey01/gpt4free.js)
![GitHub Repo stars](https://img.shields.io/github/stars/zachey01/gpt4free.js)
![GitHub issues](https://img.shields.io/github/issues/zachey01/gpt4free.js)
![NPM Downloads](https://img.shields.io/npm/dm/gpt4js)

## 📚 Table of Contents

- [GPT4js 🔮](#gpt4js-)
  - [📚 Table of Contents](#-table-of-contents)
  - [🛠️ Installation](#️-installation)
    - [Using NPM](#using-npm)
    - [Using Yarn](#using-yarn)
    - [Using Bun](#using-bun)
- [🧩 Examples](#-examples)
  - [📤 Chat Completion](#-chat-completion)
    - [⚙️ Basic Usage](#️-basic-usage)
      - [Simple Fetch](#simple-fetch)
      - [Give Your Instructions](#give-your-instructions)
      - [Conversation Roles](#conversation-roles)
    - [🔩 Configurable Options](#-configurable-options)
    - [🚀 Chat Completion Providers](#-chat-completion-providers)
    - [📚 Chat Completion Models](#-chat-completion-models)
- [📷 Image Generation](#-image-generation)
  - [📹 Example usage](#-example-usage)
  - [🌐 Image Generation Provider Options](#-image-generation-provider-options)
  - [🧮 Number Type Options](#-number-type-options)
  - [🖼️ Image Generation Providers](#️-image-generation-providers)
  - [🧠 Google Chrome AI](#-google-chrome-ai)
    - [Setting Browser](#setting-browser)
      - [Simple Usage](#simple-usage)
- [🧪 Testing](#-testing)
- [🚧 Building](#-building)
  - [Webpack](#webpack)
  - [Bun](#bun)
- [🤝 Contribute](#-contribute)

<a id="installation"></a>

## 🛠️ Installation

<a id="using-npm"></a>

### Using NPM

```sh
npm install gpt4js
```

<a id="using-yarn"></a>

### Using Yarn

```sh
yarn add gpt4js
```

<a id="using-bun"></a>

### Using Bun

```sh
bun add gpt4js
```

<a id="examples"></a>

# 🧩 Examples

<a id="chat-completion"></a>

## 📤 Chat Completion

With the `chatCompletion` function, you can obtain a textual response to a conversation with some context, using providers and models designed for this task. Additionally, you can manipulate the answer before converting it to a stream or force the AI to give you a certain answer by generating several retries.

<a id="basic-usage"></a>

### ⚙️ Basic Usage

<a id="simple-fetch"></a>

#### Simple Fetch

It will capture the messages and the context, and any provider will respond with a string.

```js
// CommonJS
const GPT4js = require("gpt4js");
// ESM
import GPT4js from "gpt4js";

const messages = [{ role: "user", content: "hi!" }];
const options = {
  provider: "BlackBox",
  model: "BlackBox",
};

(async () => {
  const provider = GPT4js.createProvider(options.provider);
  try {
    const text = await provider.chatCompletion(messages, options, (data) => {
      console.log(data);
    });
    console.log(text);
  } catch (error) {
    console.error("Error:", error);
  }
})();
```

**Note:** The conversation needs to include at least one message with the role **user** to provide a proper answer.

<a id="give-your-instructions"></a>

#### Give Your Instructions

You can provide your own instructions for the conversation before it starts using the **system** role.

```js
const messages = [
  { role: "system", content: "You're an expert bot in programming." },
  { role: "user", content: "Hi, write me something." },
];
const options = {
  provider: "BlackBox",
};

(async () => {
  const provider = GPT4js.createProvider(options.provider);
  try {
    const text = await provider.chatCompletion(messages, options, (data) => {
      console.log(data);
    });
    console.log(text);
  } catch (error) {
    console.error("Error:", error);
  }
})();
```

<a id="conversation-roles"></a>

#### Conversation Roles

| Role        | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| `system`    | Used for providing instructions and context prior to the conversation. |
| `user`      | Used to identify user messages                                         |
| `assistant` | Used to identify AI messages                                           |

<a id="configurable-options"></a>

### 🔩 Configurable Options

| Option          | Type    | Description                                                                                                                                                                                                    |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`      | string  | Choose the provider to use for chat completions. Possible values include `Nextway`, `BlackBox`, etc. This determines which service will handle the request.                                                    |
| `model`         | string  | Choose the model to use by a provider that supports it. For example, `gpt-4`, `gpt-3.5-turbo`, etc. This specifies the particular language model for generating completions.                                   |
| `stream`        | boolean | Determine if the data should be streamed in parts or not. If `true`, the response will be streamed in real-time as it's generated. If `false`, the response will be sent all at once.                          |
| `temperature`   | number  | Set the temperature to control the randomness of the output. A value between 0 and 1 where higher values (closer to 1) make the output more random, and lower values (closer to 0) make it more deterministic. |
| `webSearch`     | boolean | Enable or disable web search functionality. If `true`, the system can perform web searches to gather real-time information. If `false`, it relies solely on pre-existing data.                                 |
| `codeModelMode` | boolean | Enable or disable the code model mode. If `true`, the system will use a model optimized for understanding and generating code. If `false`, it uses the general-purpose language model.                         |
| `isChromeExt`   | boolean | Specify whether the system is being used as a Chrome extension. If `true`, it indicates integration with Chrome, possibly affecting certain functionalities and permissions.                                   |

<a id="chat-completion-providers"></a>

### 🚀 Chat Completion Providers

| Website                                                                      | Provider    | GPT-3.5 | GPT-4 | Stream | Status                                                     |
| ---------------------------------------------------------------------------- | ----------- | ------- | ----- | ------ | ---------------------------------------------------------- |
| [Aryahcr](https://nexra.aryahcr.cc)                                          | `Aryahcr`   | ✔️      | ✔️    | ✔️     | ![Active](https://img.shields.io/badge/Active-brightgreen) |
| [BlackBox](https://www.blackbox.ai)                                          | `BlackBox`  | ❌      | ❌    | ❌     | ![Active](https://img.shields.io/badge/Active-brightgreen) |
| [Nextway](https://chat.eqing.tech)                                           | `Nextway`   | ✔️      | ✔️    | ✔️     | ![Active](https://img.shields.io/badge/Active-brightgreen) |
| [Chrome](https://www.google.ru/chrome/)                                      | `Chrome`    | ❌      | ❌    | ✔️     | ![Active](https://img.shields.io/badge/Active-brightgreen) |
| [Ollama](https://ollama.com/)                                                | `Ollama`    | ❌      | ❌    | ✔️     | ![Active](https://img.shields.io/badge/Active-brightgreen) |
| [Alibaba](https://chat.chatgpt.org.uk/)                                      | `Alibaba`   | ✔️      | ❌    | ✔️     | ![Active](https://img.shields.io/badge/Active-brightgreen) |
| [ChatBotRu](https://gpt-chatbot.ru/chat-gpt-ot-openai-dlya-generacii-teksta) | `ChatBotRu` | ❌      | ✔️    | ✔️     | ![Inactive](https://img.shields.io/badge/Inactive-red)     |

<a id="chat-completion-models"></a>

### 📚 Chat Completion Models

| Model                                                | Providers that support it |
| ---------------------------------------------------- | ------------------------- |
| All from [Ollama libary](https://ollama.com/library) | `Ollama`                  |
| BlackBox                                             | `BlackBox`                |

<a id="image-generation"></a>

# 📷 Image Generation

<a id="image-gen-usage"></a>

## 📹 Example usage

```js
const options = {
  provider: "DALLE2",
};

(async () => {
  const provider = GPT4js.createProvider(options.provider);
  try {
    const base64 = await provider.imageGeneration("wood", options);
    console.log(base64);
  } catch (error) {
    console.error("Error:", error);
  }
})();
```

With the `imageGeneration` function, you can generate images from textual input along with optional parameters to customize and stylize the images in various artistic styles.

<a id="image-generation-provider-options"></a>

## 🌐 Image Generation Provider Options

| Option           | Type   | Description                                                                                                         |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| `negativePrompt` | string | Indicates the direction not to take in production.                                                                  |
| `height`         | number | Specifies the image height.                                                                                         |
| `width`          | number | Specifies the image width.                                                                                          |
| `samplingSteps`  | number | Specifies the number of iterations. A higher number results in higher quality.                                      |
| `samplingMethod` | string | Selects a sampling method to control the diversity, quality, and coherence of images.                               |
| `cfgScale`       | number | Specifies the Classifier-Free Guidance to control how closely the generated image adheres to the given text prompt. |

<a id="number-type-options"></a>

## 🧮 Number Type Options

| Provider          | Supported Number Type Options and Values                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `StableDiffusion` | - `height`: Default 512, Min 50, Max 1024<br>- `width`: Default 512, Min 50, Max 1024<br>- `samplingSteps`: Default 25, Min 1, Max 30<br>- `cfgScale`: Default 7, Min 1, Max 20 |

<a id="image-generation-providers"></a>

## 🖼️ Image Generation Providers

| Provider          | Status                                                     | Default Style                                                                     |
| ----------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Dalle2`          | ![Active](https://img.shields.io/badge/Active-brightgreen) | Semi-realistic, detailed with vivid colors and natural lighting.                  |
| `StableDiffusion` | ![Active](https://img.shields.io/badge/Active-brightgreen) | Photorealistic, capturing fine details and textures to simulate real-life scenes. |

<a id="google-chrome-ai"></a>

## 🧠 Google Chrome AI

> Warning: This is an experimental feature and may not work correctly, it only works in Google Chrome 127 or higher (Chrome Dev). Also history is not supported

### Setting Browser

1. [chrome://flags/#prompt-api-for-gemini-nano](chrome://flags/#optimization-guide-on-device-model) Select 'Enabled'

2. [chrome://flags/#optimization-guide-on-device-model](chrome://flags/#optimization-guide-on-device-model) Select 'Enabled BypassPrefRequirement'

3. [chrome://components](chrome://flags/#optimization-guide-on-device-model) Click 'Check for Update' on Optimization Guide On Device Model to download the model. If you don't see Optimization Guide, ensure you have set the flags correctly above, relaunch your browser, and refresh the page.

#### Simple Usage

```js
const messages = [{ role: "user", content: "hi!" }];
const options = {
  provider: "Chrome",
};

(async () => {
  const provider = GPT4js.createProvider(options.provider);
  try {
    const text = await provider.chatCompletion(messages, options, (data) => {
      console.log(data);
    });
    console.log(text);
  } catch (error) {
    console.error("Error:", error);
  }
})();
```

<a id="testing"></a>

# 🧪 Testing

Running: `npm test`

<a id="building"></a>

# 🚧 Building

<a id="webpack"></a>

## Webpack

- `npm run build` - Build using Webpack.
- `npm run dev` - Live development build with Webpack.

<a id="bun"></a>

## Bun

- `npm run build:bun` - Build using Bun.
- `npm run dev:bun` - Live development build with Bun.

<a id="contribute"></a>

# 🤝 Contribute

If you'd like to contribute to this project, you can do so directly on [GitHub](https://github.com/zachey01/gpt4free.js/g4f-ts). Additionally, if you encounter any errors that hinder your use of any project functionality, please [report them here](https://github.com/zachey01/gpt4free.js/issues). Your feedback helps our community access AI tools freely!

---

<center>
  <div align="center">
    <img src="https://github.com/zachey01/gpt4free.js/assets/63107653/a605f58f-1090-4f88-b3fc-30929b410404" alt="logo" width="300"/>
  </div>
</center>
