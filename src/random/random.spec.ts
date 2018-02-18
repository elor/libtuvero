import * as chai from "chai";
import { range } from "lodash";

import random from "./random";

describe("random/random.ts", () => {
  describe("int()", () => {
    it("int(0) equals 0", () => {
      chai.assert.equal(random.int(0), 0);
    });

    it("stays in range", () => {
      range(1, 1000).forEach(max => chai.assert.include(range(max), random.int(max), `max=${max}`));
    });

    it("swaps max and min if necessary", () => {
      const min = 10;
      const max = 0;
      range(100).forEach(() => chai.assert.isBelow(random.int(min, max), min));
      range(100).forEach(() => chai.assert.isAtLeast(random.int(min, max), max));
    });
  });
});
