import { expect } from "chai";
import { range } from "lodash";

import random from "./random";

describe("random/random.ts", () => {
  describe("int()", () => {
    it("int(0) equals 0", () => {
      range(100).forEach(() => expect(random.int(0)).to.equal(0));
    });

    it("int(1) always equals 0", () => {
      range(1, 100).forEach(() => expect(random.int(1)).to.equal(0));
    });

    it("stays in range", () => {
      range(1, 1000).forEach(max => chai.assert.include(range(max), random.int(max), `max=${max}`));
    });

    it("swaps max and min if necessary", () => {
      const min = 0;
      const max = 10;
      range(100).forEach(() => expect(range(min, max)).to.contain(random.int(max, min)));
    });

    it("is min if max=min", () => {
      range(10, 200).forEach(min => expect(random.int(min, min)).to.equal(min));
    });
  });

  describe("pick()", () => {
    it("throws a range error on empty arrays", () => {
      expect(() => random.pick([])).to.throw(RangeError);
    });

    it("really picks an element from the array", () => {
      const array = random.range(10, 100).map(i => i * i);

      range(100).forEach(() => expect(array).to.contain(random.pick(array)));
    });

    it("does not alter the array", () => {
      const array = range(10);
      const original = array.slice();

      range(100).forEach(() => random.pick(array));

      expect(array).to.deep.equal(original);
    });

    it("picks every element eventually", () => {
      const array = range(10, 20);
      const copy: number[] = [];

      range(array.length ** 2)
        .map(() => random.pick(array))
        .forEach(i => copy[i - 10] = i);

      expect(array).to.deep.equal(copy);
    });
  });
});
