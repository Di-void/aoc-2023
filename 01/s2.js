import fs from "node:fs/promises";

const file = await fs.open("input.txt").catch((err) => console.log(err));

let total = 0;
const lookup = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const keys = Object.keys(lookup);
for await (const line of file.readLines()) {
  let i = 0;
  let first = -1;
  let last = -1;

  //   I'm tired
  loop1: while (i <= line.length - 1) {
    const substr = line.slice(i);
    for (let j = 0; j < keys.length - 1; j++) {
      if (substr.length < 3) break;
      if (keys[j].length <= substr.length) {
        const str = substr.slice(0, keys[j].length);
        if (lookup[str]) {
          if (first === -1) {
            first = lookup[str];
            last = lookup[str];
            i = keys[j].length;
            continue loop1;
          } else {
            last = lookup[str];
            i = i + (keys[j].length - 1);
            // check whether this slice is at dead end of line
            if (str === line.slice(-str.length)) {
              break loop1;
            } else {
              continue loop1;
            }
          }
        }
      }
    }
    if (first === -1) {
      if (isNaN(line[i])) {
        i++;
        continue;
      } else {
        first = line[i];
        last = line[i];
      }
    } else {
      if (isNaN(line[i])) {
        i++;
        continue;
      } else {
        last = line[i];
      }
    }
    i++;
  }

  total += Number(`${first}${last}`);
}

console.log(total);
