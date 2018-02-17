import { rand } from "mersenne";

function int(min: number, max: number = 0): number {
  if (max < min) {
    return int(max, min);
  }

  return min + rand(max - min);
}

function pick(array: number[]): number {
  return array[rand(array.length)];
}

export {
  int,
  pick,
};
