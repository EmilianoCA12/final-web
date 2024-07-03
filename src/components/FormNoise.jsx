"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FormNoise = ({ antennas }) => {
  const router = useRouter();

  const [frequency, setFrequency] = useState(0);
  const [orbit, setOrbit] = useState(0);
  const [mulFreq, setMulFreq] = useState(0);
  const [waveLength, setWaveLength] = useState(0);

  const [antennaIndex, setAntennaIndex] = useState(0);
  const [gain, setGain] = useState(0);
  const [effectiveOpening, setEffectiveOpening] = useState(0);
  const [beamWidth, setBeamWidth] = useState(0);
  const [powerFlux, setPowerFlux] = useState(0);
  const [spreadingLoss, setSpreadingLoss] = useState(0);
  const [potency, setPotency] = useState(0);
  const [radius, setRadius] = useState(0);

  const [noisePower, setNoisePower] = useState(0);
  const [noisePowerSpectral, setNoisePowerSpectral] = useState(0);
  const [noiseFigure, setNoiseFigure] = useState(0);
  const [noiseOut, setNoiseOut] = useState(0);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("paramSelect"));
      console.log(storedData);
      if (storedData.gain == undefined) {
        alert("First select an antenna.");
        router.push("/antenna");
      } else {
        setFrequency(parseFloat(storedData.frequency));
        setOrbit(parseFloat(storedData.orbit));
        setMulFreq(parseInt(storedData.mulFreq));
        setWaveLength(parseFloat(storedData.waveLength));
        setAntennaIndex(parseInt(storedData.antennaIndex));
        setPotency(parseFloat(storedData.potency));
        setRadius(parseFloat(storedData.radius));
        setGain(parseFloat(storedData.gain));
        setEffectiveOpening(parseFloat(storedData.effectiveOpening));
        setBeamWidth(parseFloat(storedData.beamWidth));
        setPowerFlux(parseFloat(storedData.powerFlux));
        setSpreadingLoss(parseFloat(storedData.spreadingLoss));

        setNoisePower(
          -228.6 *
            5 *
            (antennas[antennaIndex].topFrequency -
              antennas[antennaIndex].baseFrequency)
        );

        setNoisePowerSpectral(-228.6 * 5);

        setNoiseFigure(10 * Math.log10(1 + 5 / 290));

        setNoiseOut(
          parseFloat(storedData.gain) *
            290 *
            (antennas[antennaIndex].topFrequency -
              antennas[antennaIndex].baseFrequency) +
            (10 * Math.log10(1 + 5 / 290) - 1) *
              (parseFloat(storedData.gain) *
                290 *
                (antennas[antennaIndex].topFrequency -
                  antennas[antennaIndex].baseFrequency))
        );
      }
    } catch (error) {
      alert("First select an frequency and an orbit.");
      router.push("/param");
    }
  }, []);

  return (
    <div className=" bg-white p-4 rounded-lg">
      <h2 className="font-bold">Basic Link Power Equation</h2>
      <div className="flex justify-center">
        <form className="flex flex-col justify-center items-center">
          <div className="m-2">
            <label>Noise power (nN): </label>
            <input
              className="rounded border"
              type="number"
              value={noisePower}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Noise power spectral density (n0): </label>
            <input
              className="rounded border"
              type="number"
              value={noisePowerSpectral}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Noise figure (nF): </label>
            <input
              className="rounded border"
              type="number"
              value={noiseFigure}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Noise out (nout): </label>
            <input
              className="rounded border"
              type="number"
              value={noiseOut}
              disabled
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormNoise;
