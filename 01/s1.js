import fs from "node:fs/promises";

const file = await fs.open("input.txt").catch((err) => console.log(err));

let total = 0;
for await (const line of file.readLines()) {
  let i = 0;
  let first = -1;
  let last = -1;
  // walk through each char in string
  // to find first and last number
  while (i <= line.length - 1) {
    if (isNaN(line[i])) {
      i++;
      continue;
    }

    if (first === -1) {
      first = line[i];
      last = line[i];
    }

    if (i > line.indexOf(last)) {
      last = line[i];
    }
    i++;
  }

  total += Number(`${first}${last}`);
}

console.log(total);
