// Errata Weaves 02 — p5.js sketch
// Rule: PK-keyed dict storage; scan() returns rows in primary-key order (Sam Pager, tinysql milestone 3)
// Flaw: sorting keys on every scan is not free — two adjacent insertions keep insertion-order slots
// instead of PK-ranked rows, so insertion order leaks through the scan.

const COLS = 16, ROWS = 13, CELL = 20;
// column -> PK-rank row; columns 5 and 6 are the flaw (insertion order showing: rows 6, 5)
const ranks = [2, 9, 4, 11, 7, 6, 5, 1, 10, 3, 12, 0, 8, 2, 9, 4];
const flaw = [5, 6];

function setup() {
  createCanvas(COLS * CELL, ROWS * CELL);
  noLoop();
}

function draw() {
  background('#f7f5f0');
  stroke('#d8d4cc');
  strokeWeight(1);
  for (let c = 0; c <= COLS; c++) line(c * CELL, 0, c * CELL, ROWS * CELL);
  for (let r = 0; r <= ROWS; r++) line(0, r * CELL, COLS * CELL, r * CELL);
  noStroke();
  for (let c = 0; c < COLS; c++) {
    fill(flaw.includes(c) ? '#d97706' : '#1a1a26');
    rect(c * CELL + 2, ranks[c] * CELL + 2, CELL - 4, CELL - 4);
  }
}
