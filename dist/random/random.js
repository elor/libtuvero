"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mersenne_1 = require("mersenne");
var lodash_1 = require("lodash");
var random = {
    /**
     * Return a single integer within the given range.
     * Will be swapped if min > max.
     *
     * @param min Inclusive minimum.
     * @param max Optional. Exclusive maximum.
     * @returns a random integer in [min, max) or [max, min), if max < min
     */
    int: function (min, max) {
        if (max === void 0) { max = 0; }
        if (min > max) {
            return random.int(max, min);
        }
        if (min == max) {
            return min;
        }
        return min + mersenne_1.rand(max - min);
    },
    /**
     * Randomly pick an element from an array.
     * Will not remove the element from the array.
     * See pluck() for that.
     *
     * @param array The array to pick from
     * @returns a random element from the array.
     */
    pick: function (array) {
        if (array.length === 0) {
            throw new RangeError();
        }
        return array[random.int(array.length)];
    },
    /**
     * Randomly pluck an element from an array.
     * Will remove the element from the array.
     * See pick() otherwise
     *
     * @param array The array to pick and remove from
     * @returns a random element from the array.
     */
    pluck: function (array) {
        if (array.length === 0) {
            throw new RangeError();
        }
        return array.splice(random.int(array.length), 1)[0];
    },
    range: function (from, to) {
        var indices = lodash_1.range(from, to);
        return indices.slice().map(function () { return random.pluck(indices); });
    },
    shuffle: function (array) {
        return random.range(array.length).map(function (i) { return array[i]; });
    }
};
exports.default = random;
//# sourceMappingURL=random.js.map