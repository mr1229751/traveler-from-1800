// Entry point for the "One Sentence for a Traveler from 1800" bounty.
// Emits one fixed explanatory sentence into the scorer's output
// directory. Uses only the Node standard library; output never varies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "Picture every town's letters, books and talk carried on one road no eye can see: a note you write at breakfast is read across the sea before supper, and every book ever printed lies open to you.";

const MAX_CHARS = 200;

function assertGateOk(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`sentence must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("sentence must fit on a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("sentence must not be blank");
  }
}

assertGateOk(SENTENCE);

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), SENTENCE, { encoding: "utf8" });
