import axios from "axios";

class DataService {
  async getSensorData() {
    try {
      const res = await axios.get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus");
      return res;
    } catch (error) {
      console.error('Error in getSensorData:', error);
      throw error;
    }
  }

  async actOnSensor() {
    try {
      const res = await axios.get("https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum");
      return res;
    } catch (error) {
      console.error('Error in actOnSensor:', error);
      throw error;
    }
  }
}

export default new DataService();