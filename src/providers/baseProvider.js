"use strict";

class BaseProvider {
  constructor() {
    if (new.target === BaseProvider) {
      throw new TypeError("Cannot construct BaseProvider instances directly");
    }
  }

  static getConfig() {
    return {};
  }
}

export default BaseProvider;
