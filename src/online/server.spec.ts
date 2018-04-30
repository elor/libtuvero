import { expect } from "chai";

import server from "./server";

describe("online/server.ts", () => {
  describe("construction", () => {
    it("empty constructs", () => {
      expect(new server());
    });
  });
});
