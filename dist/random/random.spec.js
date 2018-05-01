"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var lodash_1 = require("lodash");
var random_1 = require("./random");
var ITERATIONS = 100;
var repeat = function (fn, start) { return lodash_1.range(start || 0, ITERATIONS).map(fn); };
var numerically = function (a, b) { return a - b; };
describe("random/random.ts", function () {
    describe("int()", function () {
        it("int(0) equals 0", function () {
            repeat(function () { return chai_1.expect(random_1.default.int(0)).to.equal(0); });
        });
        it("int(1) always equals 0", function () {
            repeat(function () { return chai_1.expect(random_1.default.int(1)).to.equal(0); }, 1);
        });
        it("stays in range", function () {
            repeat(function (max) { return chai_1.expect(lodash_1.range(max)).to.include(random_1.default.int(max), "max=" + max); }, 1);
        });
        it("swaps max and min if necessary", function () {
            var min = 0;
            var max = 10;
            repeat(function () { return chai_1.expect(lodash_1.range(min, max)).to.contain(random_1.default.int(max, min)); });
        });
        it("is min if max=min", function () {
            repeat(function (min) { return chai_1.expect(random_1.default.int(min, min)).to.equal(min); }, 10);
        });
    });
    describe("range()", function () {
        it("is empty for range(0)", function () {
            chai_1.expect(random_1.default.range(0)).to.be.empty;
        });
        it("range(1) to contain only 0", function () {
            chai_1.expect(random_1.default.range(1)).to.deep.equal([0]);
        });
        it("to contain every index once", function () {
            chai_1.expect(random_1.default.range(ITERATIONS).sort(numerically)).to.deep.equal(lodash_1.range(ITERATIONS));
        });
        it("to not be sorted", function () {
            chai_1.expect(random_1.default.range(ITERATIONS)).to.not.deep.equal(lodash_1.range(ITERATIONS));
        });
    });
    describe("pick()", function () {
        it("throws RangeError on empty arrays", function () {
            chai_1.expect(function () { return random_1.default.pick([]); }).to.throw(RangeError);
        });
        it("really picks an element from the array", function () {
            var array = lodash_1.range(10, 20).map(function (i) { return i * i; });
            repeat(function () { return chai_1.expect(array).to.contain(random_1.default.pick(array)); });
        });
        it("does not alter the array", function () {
            var array = lodash_1.range(10);
            var original = array.slice();
            repeat(function () { return random_1.default.pick(array); });
            chai_1.expect(array).to.deep.equal(original);
        });
        it("picks every element eventually", function () {
            var array = lodash_1.range(10, 20);
            var copy = [];
            lodash_1.range(Math.pow(array.length, 2))
                .map(function () { return random_1.default.pick(array); })
                .forEach(function (i) { return copy[i - 10] = i; });
            chai_1.expect(copy).to.deep.equal(array);
        });
    });
    describe("pluck()", function () {
        it("throws RangeError on empty arrays", function () {
            chai_1.expect(function () { return random_1.default.pluck([]); }).to.throw(RangeError);
        });
        it("really plucks an element from the array", function () {
            var array = random_1.default.range(10, 20).map(function (i) { return i * i; });
            lodash_1.range(array.length - 1).forEach(function () { return chai_1.expect(array).to.not.contain(random_1.default.pluck(array)); });
        });
        it("alters the array", function () {
            var array = lodash_1.range(10);
            var original = array.slice();
            var plucked = random_1.default.pluck(array);
            chai_1.expect(array.length).to.equal(original.length - 1);
            chai_1.expect(array.concat(plucked).sort(numerically)).to.deep.equal(original.sort(numerically));
        });
        it("plucks every element eventually", function () {
            var array = lodash_1.range(10, 20);
            var original = array.slice();
            var copy = [];
            lodash_1.range(array.length)
                .map(function () { return random_1.default.pluck(array); })
                .forEach(function (i) { return copy[i - 10] = i; });
            chai_1.expect(array).to.be.empty;
            chai_1.expect(copy).to.deep.equal(original);
        });
    });
    describe("shuffle()", function () {
        it("works with empty arrays", function () {
            chai_1.expect(random_1.default.shuffle([])).to.deep.equal([]);
        });
        it("preserves single-element arrays", function () {
            chai_1.expect(random_1.default.shuffle([5])).to.deep.equal([5]);
        });
        it("preserves array length", function () {
            repeat(function (length) { return chai_1.expect(random_1.default.shuffle(lodash_1.range(length))).to.be.of.length(length); });
        });
        it("returns a copy of the array", function () {
            chai_1.expect(random_1.default.shuffle([])).to.not.equal([]);
            chai_1.expect(random_1.default.shuffle([6])).to.not.equal([6]);
        });
        it("contains the original elements", function () {
            repeat(function (length) { return chai_1.expect(random_1.default.shuffle(lodash_1.range(length)).sort(numerically)).to.deep.equal(lodash_1.range(length)); }, 10);
        });
        it("returns an unsorted array", function () {
            repeat(function (length) { return chai_1.expect(random_1.default.shuffle(lodash_1.range(length))).to.not.deep.equal(lodash_1.range(length)); }, 10);
        });
    });
});
//# sourceMappingURL=random.spec.js.map