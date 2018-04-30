import { expect } from "chai";

import csv from "./csv";

describe("io/csv.ts", () => {
  describe("read()", () => {
    it("is empty for read('')", () => {
      expect(csv.read("")).to.have.length(0);
    });

    it("extracts unescaped CSV fields", () => {
      expect(csv.read("  It, extracts, 4,Fields!  ")).to.deep.equal([
        ["It", "extracts", "4", "Fields!"]
      ]);

      expect(csv.read("  It; extracts; 4;Fields!  ")).to.deep.equal([
        ["It", "extracts", "4", "Fields!"]
      ]);
    });

    it("reads empty field sequences", () => {
      expect(csv.read(",")).to.deep.equal([["", ""]]);
      expect(csv.read(",,")).to.deep.equal([["", "", ""]]);
      expect(csv.read(",,,,")).to.deep.equal([["", "", "", "", ""]]);

      expect(csv.read(";")).to.deep.equal([["", ""]]);
      expect(csv.read(";;")).to.deep.equal([["", "", ""]]);
      expect(csv.read(";;;;")).to.deep.equal([["", "", "", "", ""]]);

      expect(csv.read(",;,;")).to.deep.equal([["", "", "", "", ""]]);
    });

    it("parses multiple lines", () => {
      expect(csv.read("Firstline\nSecondline")).to.deep.equal([
        ["Firstline"],
        ["Secondline"]
      ]);

      expect(csv.read("1, A\r\n2;B")).to.deep.equal([["1", "A"], ["2", "B"]]);
    });

    it("ignores empty lines", () => {
      expect(csv.read("\r\n1, A\r\n\r\n2;B")).to.deep.equal([
        ["1", "A"],
        ["2", "B"]
      ]);
    });

    it("parses escaped fields", () => {
      expect(
        csv.read(
          `unescaped, "escaped field", "escaped, field, with, commas", trailing_unescaped`
        )
      ).to.deep.equal([
        [
          "unescaped",
          "escaped field",
          "escaped, field, with, commas",
          "trailing_unescaped"
        ]
      ]);

      expect(
        csv.read(
          `unescaped; "escaped field"; "escaped, field, with, commas"; trailing_unescaped`
        )
      ).to.deep.equal([
        [
          "unescaped",
          "escaped field",
          "escaped, field, with, commas",
          "trailing_unescaped"
        ]
      ]);
    });

    it("parses unescaped spaced fields (nonstandard)", () => {
      expect(csv.read("unescaped, unescaped with spaces")).to.deep.equal([
        ["unescaped", "unescaped with spaces"]
      ]);

      expect(csv.read("unescaped; unescaped with spaces")).to.deep.equal([
        ["unescaped", "unescaped with spaces"]
      ]);
    });
  });
});
