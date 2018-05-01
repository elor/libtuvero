const internal = {
  numutfbytes(character: string): number {
    const code = character.charCodeAt(0);

    switch (true) {
      case code < 0xc0:
        return 1;
      case code >= 0xc0 && code < 0xe0:
        return 2;
      case code >= 0xe0 && code < 0xf0:
        return 3;
      case code >= 0xf0 && code < 0xf8:
        return 4;
      case code >= 0xf8 && code < 0xfc:
        return 5;
      case code >= 0xfc && code < 0xfe:
        return 6;
    }

    return 0;
  },

  isutf8byte(character: string): boolean {
    const code = character.charCodeAt(0);

    return code >= 0x80 && code < 0xc0;
  },

  isutf8codepoint(string: string) {
    const bytes = internal.numutfbytes(string[0]);
    if (bytes <= 1) {
      return false;
    }
    if (bytes > string.length) {
      return false;
    }

    for (let byteindex = 1; byteindex < bytes; byteindex += 1) {
      if (!internal.isutf8byte(string[byteindex])) {
        return false;
      }
    }

    return true;
  },

  latin2utf8symbol(characters: string): string {
    const bytes = internal.numutfbytes(characters[0]);
    let symbol = characters.charCodeAt(0);

    switch (bytes) {
      case 1:
        return characters[0];
      case 2:
        symbol = symbol ^ 0xc0;
        break;
      case 3:
        symbol = symbol ^ 0xe0;
        break;
      case 4:
        symbol = symbol ^ 0xf0;
        break;
      case 5:
        symbol = symbol ^ 0xf8;
        break;
      case 6:
        symbol = symbol ^ 0xfc;
        break;
      default:
        return characters[0];
    }

    for (let byteindex = 1; byteindex < bytes; byteindex += 1) {
      symbol = symbol << 6;
      symbol += characters.charCodeAt(byteindex) ^ 0x80;
    }

    return String.fromCharCode(symbol);
  }
};

const unicode = {
  latin2utf8(string: string): string {
    let symbolindex, ret, symbol;
    ret = [];

    for (symbolindex = 0; symbolindex < string.length; symbolindex += 1) {
      symbol = string.substr(symbolindex, 6);
      if (internal.isutf8codepoint(symbol)) {
        // skip utf8 bytes
        symbolindex += internal.numutfbytes(symbol) - 1;
        // add utf-8 codepoint instead of its ansi representation
        ret.push(internal.latin2utf8symbol(symbol));
      } else {
        // just display the ansi symbol
        ret.push(string[symbolindex]);
      }
    }

    return ret.join("");
  }
};

export default unicode;
