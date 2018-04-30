"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var csv_1 = require("./csv");
describe("io/csv.ts", function () {
    describe("read()", function () {
        it("is empty for read('')", function () {
            chai_1.expect(csv_1.default.read("")).to.have.length(0);
        });
        it("extracts unescaped CSV fields", function () {
            chai_1.expect(csv_1.default.read("  It, extracts, 4,Fields!  ")).to.deep.equal([
                ["It", "extracts", "4", "Fields!"]
            ]);
            chai_1.expect(csv_1.default.read("  It; extracts; 4;Fields!  ")).to.deep.equal([
                ["It", "extracts", "4", "Fields!"]
            ]);
        });
        it("reads empty field sequences", function () {
            chai_1.expect(csv_1.default.read(",")).to.deep.equal([["", ""]]);
            chai_1.expect(csv_1.default.read(",,")).to.deep.equal([["", "", ""]]);
            chai_1.expect(csv_1.default.read(",,,,")).to.deep.equal([["", "", "", "", ""]]);
            chai_1.expect(csv_1.default.read(";")).to.deep.equal([["", ""]]);
            chai_1.expect(csv_1.default.read(";;")).to.deep.equal([["", "", ""]]);
            chai_1.expect(csv_1.default.read(";;;;")).to.deep.equal([["", "", "", "", ""]]);
            chai_1.expect(csv_1.default.read(",;,;")).to.deep.equal([["", "", "", "", ""]]);
        });
        it("parses escaped fields", function () {
            chai_1.expect(csv_1.default.read("unescaped, \"escaped field\", \"escaped, field, with, commas\", trailing_unescaped")).to.deep.equal([
                [
                    "unescaped",
                    "escaped field",
                    "escaped, field, with, commas",
                    "trailing_unescaped"
                ]
            ]);
            chai_1.expect(csv_1.default.read("unescaped; \"escaped field\"; \"escaped, field, with, commas\"; trailing_unescaped")).to.deep.equal([
                [
                    "unescaped",
                    "escaped field",
                    "escaped, field, with, commas",
                    "trailing_unescaped"
                ]
            ]);
        });
        it("parses unescaped spaced fields (nonstandard)", function () {
            chai_1.expect(csv_1.default.read("unescaped, unescaped with spaces")).to.deep.equal([
                ["unescaped", "unescaped with spaces"]
            ]);
            chai_1.expect(csv_1.default.read("unescaped; unescaped with spaces")).to.deep.equal([
                ["unescaped", "unescaped with spaces"]
            ]);
        });
    });
});
//# sourceMappingURL=csv.spec.js.map