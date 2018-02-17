import * as chai from "chai";

import random from "./random";

describe("random/random.ts", () => {
  describe("int()", () => {
    it("int(0) equals 0", () => {
      chai.assert.equal(random.int(0), 0);
    });
  });
});
