import { rand } from "mersenne";
import { range } from "lodash";

function int(min: number, max: number = 0): number {
  if (max < min) {
    return int(max, min);
  }

  return min + rand(max - min);
}

function pick(array: number[]): number {
  return array[rand(array.length)];
}

function pluck(array: number[]): number {
  return array.splice(rand(array.length), 1)[0];
}

function shuffle(array: number[]): number[] {
  let indices = range(array.length);
  let randomIndices = [];

  while (indices.length) {
    randomIndices.push(pluck(indices));
  }

  return randomIndices.map(i => array[i]);
}

export {
  int,
  pick,
  pluck,
  shuffle
};
