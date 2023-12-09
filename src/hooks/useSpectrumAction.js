import axios from "axios";
import { useQuery } from "react-query";

export default function useSpectrumAction() {
  return useQuery("sensor-action", async () => {
    const { data } = await axios.get(
      "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum"
    );
    return data;
  });
}