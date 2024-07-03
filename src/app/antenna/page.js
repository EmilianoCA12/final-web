import React from "react";

import { getAntennas } from "../../../lib/querys";
import FormAntenna from "@/components/FormAntenna";

const AntennaSelect = () => {
  const antennas = getAntennas();

  return <FormAntenna antennas={antennas}></FormAntenna>;
};

export default AntennaSelect;
