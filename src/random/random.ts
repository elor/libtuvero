import { rand } from "mersenne";
import { range as _range } from "lodash";

function int(min: number, max: number = 0): number {
  if (max < min) {
    return int(max, min);
  }

  if (max == min) {
    return min;
  }

  return min + rand(max - min);
}

function pick<T>(array: T[]): T {
  return array[rand(array.length)];
}

function pluck<T>(array: T[]): T {
  return array.splice(rand(array.length), 1)[0];
}

function range(from: number, to?: number): number[] {
  const indices = _range(from, to);

  return indices.slice().map(i => pluck(indices));
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
