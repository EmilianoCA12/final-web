import React from "react";

import { getFrequencies, getOrbits } from "../../../lib/querys";

import FormParam from "../../components/FormParam";

const ParamSelect = () => {
  const frequencies = getFrequencies();
  const orbits = getOrbits();

  return (
    <div>
      <FormParam frequencies={frequencies} orbits={orbits}></FormParam>
    </div>
  );
};

export default ParamSelect;
