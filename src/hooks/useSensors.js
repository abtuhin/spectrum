import dataService from "@/service/dataService";
import { useQuery } from "react-query";

export default function useSensors({ onSuccess }) {
  return useQuery("sensors", async () => {
    const { data } = await dataService.getSensorData()
    return data;
  },{
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
}