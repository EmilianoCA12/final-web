import sql from "better-sqlite3";

const db = sql("base.db");

export function getFrequencies() {
  const res = db.prepare("SELECT * FROM frequencyBands").all();
  return res;
}

export function getOrbits() {
  const res = db.prepare("SELECT * FROM orbits").all();
  return res;
}

export function getAntennas() {
  const res = db.prepare("SELECT * FROM antennas").all();
  return res;
}
