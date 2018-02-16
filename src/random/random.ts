import { rand } from "mersenne";

function pick(array: number[]): number {
  return array[rand(array.length)];
}

export { pick };
