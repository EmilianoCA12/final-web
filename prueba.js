const sql = require("better-sqlite3");
const db = sql("base.db");

const resultado = db.prepare("SELECT * FROM frequencyBands").all();
const otro = db.prepare("SELECT * FROM orbits").all();
const otrootro = db.prepare("SELECT * FROM antennas").all();

console.log(resultado);
console.log(otro);
console.log(otrootro);
