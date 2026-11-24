// One-line houseplant out-of-office reply.
// The plant speaks for itself: it is away soaking up sun, and the inbox
// will have to wait its turn behind the watering can.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "I'm out photosynthesizing. I'll water your emails when I'm back. Please hold all meetings until further sunlight.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

const written = readFileSync(target, "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the houseplant line exactly");
}
if (written.length > 120 || written.includes("\n")) {
  throw new Error("entry must be one line of at most 120 characters");
}
if (!written.endsWith(".")) {
  throw new Error("entry must end with a full stop, with no trailing newline");
}

console.log(`Wrote ${written.length} characters to ${target}`);
