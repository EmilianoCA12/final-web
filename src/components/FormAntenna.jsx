"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FormAntenna = ({ antennas }) => {
  const router = useRouter();

  const [frequency, setFrequency] = useState(0);
  const [orbit, setOrbit] = useState(0);
  const [mulFreq, setMulFreq] = useState(0);
  const [waveLength, setWaveLength] = useState(0);

  const [antennaIndex, setAntennaIndex] = useState(0);
  const [isAntenna, setIsAntenna] = useState(false);
  const [potency, setPotency] = useState(0);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("paramSelect"));
      if (storedData.frequency == null) {
        alert("Frequency and orbit have not been selected.\nRedirecting...");
        router.push("/param");
      } else {
        setFrequency(parseFloat(storedData.frequency));
        setOrbit(parseFloat(storedData.orbit));
        setMulFreq(parseInt(storedData.mulFreq));
        setWaveLength(parseFloat(storedData.waveLength));
        if (storedData.antennaIndex != null) {
          setAntennaIndex(parseInt(storedData.antennaIndex));
          setPotency(parseFloat(storedData.potency));
          setRadius(parseFloat(storedData.radius));
        }
      }
      const base =
        parseFloat(storedData.frequency) * parseFloat(storedData.mulFreq);

      let IsAntenna = false;
      for (let i = 0; i < antennas.length; i++) {
        if (
          antennas[i].baseFrequency <= base &&
          base <= antennas[i].topFrequency
        ) {
          if (!IsAntenna && storedData.antennaIndex == undefined) {
            setAntennaIndex(i);
          }
          IsAntenna = true;
          setIsAntenna(true);
        }
      }
    } catch (error) {
      alert("First select an frequency and an orbit.");
      router.push("/param");
    }
  }, []);

  function handleAntennaChange(event) {
    setAntennaIndex(parseInt(event.target.value) - 1);
  }

  function handleRadiusChange(event) {
    setRadius(parseFloat(event.target.value));
  }

  function handlePotencyChange(event) {
    setPotency(parseFloat(event.target.value));
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    alert(radius);
    const gain =
      10 *
      Math.log10(
        109.66 *
          ((frequency * mulFreq) / 1000000000) ** 2 *
          antennas[antennaIndex].diameter ** 2 *
          0.55
      );
    const effectiveOpening =
      (Math.PI * antennas[antennaIndex].diameter ** 2) / 4;
    const beamWidth =
      22.5 /
      (((frequency * mulFreq) / 1000000000) * antennas[antennaIndex].diameter);
    const powerFlux =
      (potency * gain * gain * waveLength ** 2) /
      (4 * Math.PI * radius ** 2 * 4 * Math.PI);
    const spreadingLoss = -20 * Math.log10(frequency) - 21.45;
    alert(
      `${gain} - ${effectiveOpening} - ${beamWidth} - ${powerFlux} - ${spreadingLoss}`
    );
    localStorage.setItem(
      "paramSelect",
      JSON.stringify({
        frequency: frequency,
        mulFreq: mulFreq,
        orbit: orbit,
        waveLength: waveLength,
        antennaIndex: antennaIndex,
        gain: gain,
        effectiveOpening: effectiveOpening,
        beamWidth: beamWidth,
        powerFlux: powerFlux,
        spreadingLoss: spreadingLoss,
        radius: radius,
        potency: potency,
      })
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="font-bold">Antenna selection</h2>
      <form className="flex justify-items-center" onSubmit={handleOnSubmit}>
        {isAntenna ? (
          <div className="flex flex-col justify-center items-center">
            <label className="m-2">Select antenna:</label>
            <select
              className="border m-2 rounded-lg"
              onChange={handleAntennaChange}
              value="NaN"
            >
              <option disabled value="NaN">
                -- Select an option --
              </option>
              {antennas.map((antennaAux) =>
                antennaAux.baseFrequency <= frequency * mulFreq &&
                frequency * mulFreq <= antennaAux.topFrequency ? (
                  <option value={antennaAux.id} key={antennaAux.id}>
                    {antennaAux.antennaName}
                  </option>
                ) : null
              )}
            </select>
            <label className="m-2">Antenna Image</label>
            <Image
              className="m-2 rounded-lg"
              src={antennas[antennaIndex].route}
              width={100}
              height={100}
              alt={antennas[antennaIndex].description}
            ></Image>
            <p className="m-2">{antennas[antennaIndex].description}</p>
            <div>
              <label>Antenna radius</label>
              <input
                className="border rounded-lg mx-2"
                type="number"
                required
                value={radius}
                onChange={handleRadiusChange}
              ></input>
              <select disabled>
                <option>m</option>
              </select>
            </div>
            <div className="my-4">
              <label>Transmission Potency</label>
              <input
                className="border rounded-lg mx-2"
                type="number"
                required
                value={potency}
                onChange={handlePotencyChange}
              ></input>
              <select disabled>
                <option>W</option>
              </select>
            </div>
            <button
              className="bg-sky-700 text-white my-2 rounded-lg w-28"
              type="submit"
            >
              Save
            </button>
          </div>
        ) : (
          <p>No antennas available</p>
        )}
      </form>
    </div>
  );
};

export default FormAntenna;
