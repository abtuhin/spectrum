import dataService from "@/service/dataService";
import { useQuery } from "react-query";

export default function useSpectrumAction() {
  return useQuery("sensor-action", async () => {
    const { data } = await dataService.actOnSensor();
    return data;
  });
}