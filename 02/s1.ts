import fs from "node:fs/promises";

// config
// red: 12, green: 13, blue: 14

const config = {
  red: 12,
  green: 13,
  blue: 14,
};

try {
  let sum = 0;
  let count = 1;
  const fh = await fs.open("input.txt");
  for await (const line of fh.readLines()) {
    if (isGameQualified(line)) {
      sum += count;
    }

    count++;
  }

  console.log(sum);
} catch (error) {
  console.log(error);
}

function isGameQualified(line: string) {
  // chain madness
  const gameSets = line
    .split(": ")
    .at(1)
    ?.split("; ")
    .map((str) =>
      str
        .split(", ")
        .map((str) => ({ [str.slice(2).trim()]: Number(str.split(" ").at(0)) }))
    )
    .map((arr) =>
      arr.reduce(
        (acc, curr) => {
          if (curr["red"]) {
            acc["red"] += curr["red"];
            return acc;
          } else if (curr["green"]) {
            acc["green"] += curr["green"];
            return acc;
          } else {
            acc["blue"] += curr["blue"];
            return acc;
          }
        },
        { red: 0, green: 0, blue: 0 }
      )
    ) as { red: number; green: number; blue: number }[];

  for (const set of gameSets) {
    // this is fine
    for (const key of Object.keys(set)) {
      if (set[key] > config[key]) {
        return false;
      }
    }
  }

  return true;
}
