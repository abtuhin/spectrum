import axios from "axios";

class DataService {
  async getSensorData() {
    const res = await axios.get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus");
    return res;
  }

  async actOnSensor() {
    const res = await axios.get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum");
    return res;
  }
}

export default new DataService();