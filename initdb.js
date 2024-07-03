const sql = require("better-sqlite3");
const db = sql("base.db");

const dummyFrequencies = [
  {
    letterBand: "HF",
    baseFrequency: 3000000,
    topFrequency: 30000000,
    description: "3 - 30 MHz",
  },
  {
    letterBand: "VHF",
    baseFrequency: 30000000,
    topFrequency: 300000000,
    description: "30 - 300 MHz",
  },
  {
    letterBand: "UHF",
    baseFrequency: 300000000,
    topFrequency: 1000000000,
    description: "300 MHz - 1 GHz",
  },
  {
    letterBand: "L",
    baseFrequency: 1000000000,
    topFrequency: 2000000000,
    description: "1 - 2 GHz",
  },
  {
    letterBand: "S",
    baseFrequency: 2000000000,
    topFrequency: 4000000000,
    description: "2 - 4 GHz",
  },
  {
    letterBand: "C",
    baseFrequency: 4000000000,
    topFrequency: 8000000000,
    description: "4 - 8 GHz",
  },
  {
    letterBand: "X",
    baseFrequency: 8000000000,
    topFrequency: 12000000000,
    description: "8 - 12 GHz",
  },
  {
    letterBand: "Ku",
    baseFrequency: 12000000000,
    topFrequency: 18000000000,
    description: "12 - 18 GHz",
  },
  {
    letterBand: "K",
    baseFrequency: 18000000000,
    topFrequency: 27000000000,
    description: "18 - 27 GHz",
  },
  {
    letterBand: "Ka",
    baseFrequency: 27000000000,
    topFrequency: 40000000000,
    description: "27 - 40 GHz",
  },
  {
    letterBand: "V",
    baseFrequency: 40000000000,
    topFrequency: 75000000000,
    description: "40 - 75 GHz",
  },
  {
    letterBand: "mm wave",
    baseFrequency: 110000000000,
    topFrequency: 500000000000,
    description: "110 - 500 GHz",
  },
];

const dummyOrbits = [
  {
    orbit: "LEO",
    baseAltitude: 0,
    topAltitude: 2000,
  },
  {
    orbit: "MEO",
    baseAltitude: 2000,
    topAltitude: 35786,
  },
  {
    orbit: "GEO",
    baseAltitude: 35786,
    topAltitude: 35786,
  },
  {
    orbit: "HEO",
    baseAltitude: 35786,
    topAltitude: Infinity,
  },
];

const dummyAntennas = [
  {
    route: "/images/1.png",
    antennaName: "R&S\u00AE HE010D ACTIVE HF DIPOLE",
    baseFrequency: 100000,
    topFrequency: 100000000,
    diameter: 1.75,
    description: "100 kHz - 100 MHz - 1.75 m",
  },
  {
    route: "/images/2.png",
    antennaName: "R&S\u00AE HE010E ACTIVE ROD ANTENNA",
    baseFrequency: 8300,
    topFrequency: 100000000,
    diameter: 1,
    description: "8.3 kHz - 100 MHz - 1 m",
  },
  {
    route: "/images/3.png",
    antennaName: "R&S\u00AE HE016 ACTIVE ANTENNA SYSTEM",
    baseFrequency: 9000,
    topFrequency: 80000000,
    diameter: 2.85,
    description: "9 kHz - 80 MHz - 2.85 m",
  },
  {
    route: "/images/4.png",
    antennaName: "R&S\u00AE HA104/512 HF WHIP ANTENNA",
    baseFrequency: 1500000,
    topFrequency: 30000000,
    diameter: 5,
    description: "1.5 MHz - 30 MHz - 5 m",
  },
  {
    route: "/images/5.png",
    antennaName: "R&S\u00AE HK309 PASSIVE RECEIVING DIPOLE",
    baseFrequency: 20000000,
    topFrequency: 1300000000,
    diameter: 1.7,
    description: "20 MHz - 1.3 GHz - 1.7 m",
  },
];

db.prepare(
  `CREATE TABLE IF NOT EXISTS frequencyBands (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                letterBand VARCHAR(40) NOT NULL,
                baseFrequency BIGINT NOT NULL,
                topFrequency BIGINT NOT NULL,
                description VARCHAR(40) NOT NULL)`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS orbits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                orbit VARCHAR(40) NOT NULL,
                baseAltitude INTEGER NOT NULL,
                topAltitude INTEGER NOT NULL)`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS antennas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                route VARCHAR(100) NOT NULL,
                antennaName VARCHAR(100) NOT NULL,
                baseFrequency BIGINT NOT NULL,
                topFrequency BIGINT NOT NULL,
                diameter FLOAT NOT NULL,
                description VARCHAR(100))`
).run();

async function initData() {
  const stmt = db.prepare(`
                        INSERT INTO frequencyBands VALUES (
                           null,
                           @letterBand,
                           @baseFrequency,
                           @topFrequency,
                           @description
                        )
                     `);

  const stmt2 = db.prepare(`
                        INSERT INTO orbits VALUES(
                            null,
                            @orbit,
                            @baseAltitude,
                            @topAltitude
                        )
                      `);

  const stmt3 = db.prepare(`
                        INSERT INTO antennas VALUES(
                          null,
                          @route,
                          @antennaName,
                          @baseFrequency,
                          @topFrequency,
                          @diameter,
                          @description
                        )
                      `);

  for (const frequency of dummyFrequencies) {
    stmt.run(frequency);
  }

  for (const orbit of dummyOrbits) {
    stmt2.run(orbit);
  }

  for (const antenna of dummyAntennas) {
    stmt3.run(antenna);
  }
}

initData();
