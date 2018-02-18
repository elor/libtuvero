import { rand } from "mersenne";
import { range as _range } from "lodash";

/**
 * Return a single integer within the given range.
 * Will be swapped if min > max.
 *
 * @param min Inclusive minimum.
 * @param max Optional. Exclusive maximum.
 * @returns a random integer in [min, max) or [max, min), if max < min
 */
function int(min: number, max: number = 0): number {
  if (min > max) {
    return int(max, min);
  }

  if (min == max) {
    return min;
  }

  return min + rand(max - min);
}

/**
 * Randomly pick an element from an array.
 * Will not remove the element from the array.
 * See pluck() for that.
 *
 * @param array The array to pick from
 * @returns a random element from the array.
 */
function pick<T>(array: T[]): T {
  if (array.length === 0) {
    throw new RangeError();
  }
  return array[int(array.length)];
}

/**
 * Randomly pluck an element from an array.
 * Will remove the element from the array.
 * See pick() otherwise
 *
 * @param array The array to pick and remove from
 * @returns a random element from the array.
 */
function pluck<T>(array: T[]): T {
  if (array.length === 0) {
    throw new RangeError();
  }
  return array.splice(int(array.length), 1)[0];
}

function range(from: number, to?: number): number[] {
  const indices = _range(from, to);

  return indices.slice().map(() => pluck(indices));
}

function shuffle<T>(array: T[]): T[] {
  return range(array.length).map(i => array[i]);
}

export default {
  int,
  pick,
  pluck,
  range,
  shuffle
};
