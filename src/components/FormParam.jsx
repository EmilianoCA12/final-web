"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FormParam = ({ frequencies, orbits }) => {
  const router = useRouter();

  const [frequency, setFrequency] = useState(0);
  const [orbit, setOrbit] = useState(0);
  const [mulFreq, setMulFreq] = useState(1000000);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("paramSelect"));
      setFrequency(parseFloat(storedData.frequency));
      setOrbit(parseFloat(storedData.orbit));
      setMulFreq(parseInt(storedData.mulFreq));
    } catch (error) {
      setFrequency(0);
      setOrbit(0);
    }
  }, []);

  function handleFrequencyChange(event) {
    setFrequency(event.target.value);
  }

  function handleOrbitChange(event) {
    setOrbit(event.target.value);
  }

  function handleMulFreqChange(event) {
    setMulFreq(event.target.value);
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    const realFrequency = frequency * mulFreq;
    if (
      (3000000 <= realFrequency && realFrequency <= 75000000000) ||
      (110000000000 <= realFrequency && realFrequency <= 500000000000)
    ) {
      if (0 < orbit && orbit <= 37786) {
        const waveLength = 300000000 / realFrequency;
        alert("Selected frequency and orbit have been uploaded");
        localStorage.setItem(
          "paramSelect",
          JSON.stringify({
            frequency: frequency,
            mulFreq: mulFreq,
            orbit: orbit,
            waveLength: waveLength,
          })
        );
        router.push("/antenna");
      } else {
        alert("Selected orbit is not permited");
      }
    } else {
      alert("Selected frequency is not permited");
    }
  }

  return (
    <div className=" bg-white p-4 rounded-lg">
      <h2 className="font-bold">Parameter selection</h2>
      <div className="flex justify-center">
        <table className="table-auto border m-4">
          <caption>Frequency bands</caption>
          <thead>
            <tr>
              <th className="border p-2">Letter band</th>
              <th className="border p-2">Frequency range</th>
            </tr>
          </thead>
          <tbody>
            {frequencies.map((frequencyAux) =>
              frequencyAux.baseFrequency <= frequency * mulFreq &&
              frequency * mulFreq < frequencyAux.topFrequency ? (
                <tr key={frequencyAux.id} className="bg-sky-700 text-white">
                  <td className="border p-2">{frequencyAux.letterBand}</td>
                  <td className="border p-2">{frequencyAux.description}</td>
                </tr>
              ) : (
                <tr key={frequencyAux.id}>
                  <td className="border p-2">{frequencyAux.letterBand}</td>
                  <td className="border p-2">{frequencyAux.description}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <table className="table-auto border m-4">
          <caption>Orbits</caption>
          <thead>
            <tr>
              <th className="border p-2">Orbit</th>
              <th className="border p-2">Altitude</th>
            </tr>
          </thead>
          <tbody>
            {orbits.map((orbitAux) =>
              (orbitAux.baseAltitude == orbit &&
                orbitAux.topAltitude == orbit &&
                orbitAux.id == 3) ||
              (orbitAux.id != 3 &&
                orbitAux.baseAltitude < orbit &&
                orbit <= orbitAux.topAltitude &&
                orbit != 35786) ? (
                <tr key={orbitAux.id} className="bg-sky-700 text-white">
                  <td className="border p-2">{orbitAux.orbit}</td>
                  <td className="border p-2">
                    {orbitAux.baseAltitude} - {orbitAux.topAltitude} Km
                  </td>
                </tr>
              ) : (
                <tr key={orbitAux.id}>
                  <td className="border p-2">{orbitAux.orbit}</td>
                  <td className="border p-2">
                    {orbitAux.baseAltitude} - {orbitAux.topAltitude} Km
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleOnSubmit}
      >
        <div className="flex justify-center">
          <div>
            <label>Frequency: </label>
            <input
              className="border rounded-lg"
              type="number"
              value={frequency}
              onChange={handleFrequencyChange}
              required
            ></input>
            <select
              className="mr-3"
              name="multiplierFreq"
              onChange={handleMulFreqChange}
              value={mulFreq}
            >
              <option value={1000000}>MHz</option>
              <option value={1000000000}>GHz</option>
            </select>
          </div>
          <div>
            <label>Orbit: </label>
            <input
              className="border rounded-lg"
              type="number"
              value={orbit}
              onChange={handleOrbitChange}
              required
            ></input>
            <select name="multiplierFreq" disabled>
              <option value={1000000}>Km</option>
            </select>
          </div>
        </div>
        <button
          className="bg-sky-700 text-white my-2 rounded-lg w-28"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default FormParam;
