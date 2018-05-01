"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var lodash_1 = require("lodash");
var utf8_1 = require("./utf8");
function code_to_utf8(code) {
    var buffer = [];
    if (code <= 0x7f) {
        buffer[0] = code;
    }
    else if (code <= 0x7ff) {
        buffer[0] = 0xc0 | (code >> 6); /* 110xxxxx */
        buffer[1] = 0x80 | (code & 0x3f); /* 10xxxxxx */
    }
    else if (code <= 0xffff) {
        buffer[0] = 0xe0 | (code >> 12); /* 1110xxxx */
        buffer[1] = 0x80 | ((code >> 6) & 0x3f); /* 10xxxxxx */
        buffer[2] = 0x80 | (code & 0x3f); /* 10xxxxxx */
    }
    else if (code <= 0x10ffff) {
        buffer[0] = 0xf0 | (code >> 18); /* 11110xxx */
        buffer[1] = 0x80 | ((code >> 12) & 0x3f); /* 10xxxxxx */
        buffer[2] = 0x80 | ((code >> 6) & 0x3f); /* 10xxxxxx */
        buffer[3] = 0x80 | (code & 0x3f); /* 10xxxxxx */
    }
    return buffer;
}
describe("io/unicode.ts", function () {
    it("preserves empty and whitespace strings", function () {
        chai_1.expect(utf8_1.default.latin2utf8("")).to.equal("");
        chai_1.expect(utf8_1.default.latin2utf8("  \t ")).to.equal("  \t ");
        chai_1.expect(utf8_1.default.latin2utf8("  \r\n\t\r\n ")).to.equal("  \r\n\t\r\n ");
    });
    it("preserves ascii strings", function () {
        var ascii_chars = lodash_1.range(32, 127)
            .map(function (dec) { return String.fromCharCode(dec); })
            .join("\t");
        chai_1.expect(utf8_1.default.latin2utf8(ascii_chars)).to.equal(ascii_chars);
    });
    it("preserves native javascript code points", function () {
        var umlauts = "öäüÖÄÜß";
        chai_1.expect(utf8_1.default.latin2utf8(umlauts)).to.equal(umlauts);
    });
    it("converts pure utf-8", function () {
        chai_1.expect(utf8_1.default.latin2utf8("Ã¤Ã¶Ã¼ÃÃÃÃ")).to.equal("äöüÄÖÜß");
    });
    it("converts mixed utf-8", function () {
        chai_1.expect(utf8_1.default.latin2utf8("ÃtheriÃ¶l FuÃlÃ¤ufig BÃ¶ttcher")).to.equal("Ätheriöl Fußläufig Böttcher");
    });
    it("converts multibyte utf-8 points", function () {
        [0x10ffff, 0xffff, 0x7ff, 0x7f].forEach(function (point) {
            [1, 2, 3].forEach(function (divisor) {
                var ascii = code_to_utf8(point / divisor)
                    .map(function (num) { return String.fromCharCode(num); })
                    .join("");
                var unicode = String.fromCharCode(point / divisor);
                chai_1.expect(utf8_1.default.latin2utf8(ascii)).to.equal(unicode);
            });
        });
    });
});
//# sourceMappingURL=utf8.spec.js.map