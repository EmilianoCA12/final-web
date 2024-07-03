import FormNoise from "@/components/FormNoise";
import React from "react";
import { getAntennas } from "../../../lib/querys";

const page = () => {
  const antennas = getAntennas();

  return <FormNoise antennas={antennas}></FormNoise>;
};

export default page;
