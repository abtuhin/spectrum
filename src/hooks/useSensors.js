import axios from "axios";
import { useQuery } from "react-query";

export default function useSensors({ onSuccess }) {
  return useQuery("sensors", async () => {
    const { data } = await axios.get(
      "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus"
    );
    return data;
  },{
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
}