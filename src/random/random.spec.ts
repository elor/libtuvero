import * as chai from "chai";

import random from "./random";

describe("Test Test", function () {
  describe("random()", function () {
    it('should equal 0 for random(0)', function () {
      chai.assert.equal(random.int(0), 0);
    });
  });
});
