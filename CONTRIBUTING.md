## Example Chat Provider

```js
"use strict";
class ExapmleProvider {
  async chatCompletion(messages, options) {
    return "Output";
  }
}

export default ExapmleProvider;
```

## Example Image Provider

```js
"use strict";
class ExapmleProvider {
  async imageGeneration(prompt, options) {
    return "base64image";
  }
}

export default ExapmleProvider;
```

Add your provider in `src/providers.js`
