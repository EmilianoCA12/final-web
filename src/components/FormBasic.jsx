"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FormBasic = () => {
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

  const [freeSpaceLoss, setFreeSpaceLoss] = useState(0);
  const [effectiveIsotropicRadiatedU, setEffectiveIsotropicRadiatedU] =
    useState(0);
  const [gainTemp, setGainTemp] = useState(0);
  const [carrierNoiseU, setCarrierNoiseU] = useState(0);
  const [effectiveIsotropicRadiatedD, setEffectiveIsotropicRadiatedD] =
    useState(0);
  const [carrierNoiseD, setCarrierNoiseD] = useState(0);
  const [totalCarrier, setTotalCarrier] = useState(0);

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

        setFreeSpaceLoss(
          32.5 +
            20 * Math.log10(parseFloat(storedData.orbit)) +
            20 *
              Math.log10(
                (parseFloat(storedData.frequency) *
                  parseInt(storedData.mulFreq)) /
                  1000000
              )
        );

        setEffectiveIsotropicRadiatedU(
          10 * Math.log10(10 * Math.log10(parseFloat(storedData.potency))) +
            parseFloat(storedData.gain)
        );

        setGainTemp(parseFloat(storedData.gain) - 10 * Math.log10(5));

        setCarrierNoiseU(
          10 * Math.log10(10 * Math.log10(parseFloat(storedData.potency))) +
            parseFloat(storedData.gain) -
            (32.5 +
              20 * Math.log10(parseFloat(storedData.orbit)) +
              20 *
                Math.log10(
                  (parseFloat(storedData.frequency) *
                    parseInt(storedData.mulFreq)) /
                    1000000
                )) +
            (parseFloat(storedData.gain) - 10 * Math.log10(5)) +
            228.6
        );

        setEffectiveIsotropicRadiatedD(
          10 * Math.log10(10 * Math.log10(parseFloat(storedData.powerFlux))) +
            parseFloat(storedData.gain)
        );

        setCarrierNoiseD(
          10 * Math.log10(10 * Math.log10(parseFloat(storedData.powerFlux))) +
            parseFloat(storedData.gain) -
            (32.5 +
              20 * Math.log10(parseFloat(storedData.orbit)) +
              20 *
                Math.log10(
                  (parseFloat(storedData.frequency) *
                    parseInt(storedData.mulFreq)) /
                    1000000
                )) +
            (parseFloat(storedData.gain) - 10 * Math.log10(5)) +
            228.6
        );

        setTotalCarrier(
          1 /
            (1 /
              (10 *
                Math.log10(10 * Math.log10(parseFloat(storedData.potency))) +
                parseFloat(storedData.gain) -
                (32.5 +
                  20 * Math.log10(parseFloat(storedData.orbit)) +
                  20 *
                    Math.log10(
                      (parseFloat(storedData.frequency) *
                        parseInt(storedData.mulFreq)) /
                        1000000
                    )) +
                (parseFloat(storedData.gain) - 10 * Math.log10(5)) +
                228.6) +
              1 /
                (10 *
                  Math.log10(
                    10 * Math.log10(parseFloat(storedData.powerFlux))
                  ) +
                  parseFloat(storedData.gain) -
                  (32.5 +
                    20 * Math.log10(parseFloat(storedData.orbit)) +
                    20 *
                      Math.log10(
                        (parseFloat(storedData.frequency) *
                          parseInt(storedData.mulFreq)) /
                          1000000
                      )) +
                  (parseFloat(storedData.gain) - 10 * Math.log10(5)) +
                  228.6))
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
            <label>Transmitter power (Pt): </label>
            <input
              className="rounded border"
              type="number"
              value={potency}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Received potency (Pr): </label>
            <input
              className="rounded border"
              type="number"
              value={powerFlux}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Transmit Antenna Gain (Gt): </label>
            <input
              className="rounded border"
              type="number"
              value={gain}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Transmit Antenna Gain (Gr): </label>
            <input
              className="rounded border"
              type="number"
              value={gain}
              disabled
            ></input>
          </div>
          <h2 className="font-bold">Uplink calculus</h2>
          <div className="m-2">
            <label>Free Space Loss (FSL): </label>
            <input
              className="rounded border"
              type="number"
              value={freeSpaceLoss}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Effective Isotropic Radiated Power (EIRP): </label>
            <input
              className="rounded border"
              type="number"
              value={effectiveIsotropicRadiatedU}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Reception Potency (Pr): </label>
            <input
              className="rounded border"
              type="number"
              value={powerFlux}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Gain to Temparature ratio (G/T): </label>
            <input
              className="rounded border"
              type="number"
              value={gainTemp}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Carrier to Noise Ratio (C/N0u): </label>
            <input
              className="rounded border"
              type="number"
              value={carrierNoiseU}
              disabled
            ></input>
          </div>
          <h2 className="font-bold">Downlink calculus</h2>
          <div className="m-2">
            <label>Effective Isotropic Radiated Power (EIRP): </label>
            <input
              className="rounded border"
              type="number"
              value={effectiveIsotropicRadiatedD}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Reception Potency (Pr): </label>
            <input
              className="rounded border"
              type="number"
              value={potency}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label>Carrier to Noise Ratio (C/N0d): </label>
            <input
              className="rounded border"
              type="number"
              value={carrierNoiseD}
              disabled
            ></input>
          </div>
          <div className="m-2">
            <label className="font-bold">Carrier to Noise Ratio:</label>
            <input
              className="rounded border"
              type="number"
              value={carrierNoiseD}
              disabled
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormBasic;
