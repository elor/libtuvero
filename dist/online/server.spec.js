"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var server_1 = require("./server");
describe("online/server.ts", function () {
    describe("construction", function () {
        it("default construction", function () {
            chai_1.expect(new server_1.default());
            chai_1.expect(new server_1.default("token123").token).to.equal("token123");
        });
    });
});
//# sourceMappingURL=server.spec.js.map