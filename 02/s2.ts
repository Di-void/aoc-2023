import fs from "node:fs/promises";

try {
  let sum = 0;
  const fh = await fs.open("input.txt");
  for await (const line of fh.readLines()) {
    sum += getMinSetsPw(parseLines(line)!);
  }

  console.log(sum);
} catch (error) {
  console.log(error);
}

function parseLines(line: string) {
  return line
    .split(": ")
    .at(1)
    ?.split("; ")
    .flatMap((str) =>
      str.split(", ").map((str) => ({
        [str.slice(2).trim()]: Number(str.split(" ").at(0)),
      }))
    );
}

function getMinSetsPw(
  game: Partial<Record<"blue" | "red" | "green", number>>[]
) {
  const minSets = {
    red: 0,
    green: 0,
    blue: 0,
  };

  game.forEach((item) => {
    // less is more
    // perf comes later
    for (const color of ["red", "green", "blue"]) {
      if (!!item[color] && minSets[color] < item[color]) {
        minSets[color] = item[color];
      }
    }
  });

  return minSets.red * minSets.blue * minSets.green;
}
