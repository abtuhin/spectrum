class SocketService {
  constructor(streamCallback, handleActionCallback) {
    this.socketString = "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS";
    this.streamCallback = streamCallback;
    this.handleActionCallback = handleActionCallback;
    this.socket = null;
  }

  connect() {
    this.socket = new WebSocket(this.socketString);

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.IsActionRequired) {
        this.handleActionCallback(data.StatusMessage);
      } else {
        this.streamCallback(data);
      }
    });
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default SocketService;
