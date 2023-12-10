import SocketService from '../../service/socketService';
import WebSocket from 'jest-websocket-mock';

describe('SocketService', () => {
  let socketService;
  let server;

  beforeEach(() => {
    server = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS');
    socketService = new SocketService(jest.fn(), jest.fn());
  });

  afterEach(() => {
    WebSocket.clean();
  });

  describe('connect', () => {
    it('should connect to WebSocket and invoke both callbacks', () => {
      const streamCallback = jest.fn();
      const handleActionCallback = jest.fn();
      socketService = new SocketService(streamCallback, handleActionCallback);

      socketService.connect();

      const eventData = { IsActionRequired: true, StatusMessage: 'Test Message' };
      server.send(JSON.stringify(eventData));

      expect(streamCallback).toHaveBeenCalledWith(eventData);
      expect(handleActionCallback).toHaveBeenCalledWith('Test Message');
    });
    it('should connect to WebSocket and invoke only streamCallback', () => {
      const streamCallback = jest.fn();
      const handleActionCallback = jest.fn();
      socketService = new SocketService(streamCallback, handleActionCallback);

      socketService.connect();

      const eventData = { IsActionRequired: false };
      server.send(JSON.stringify(eventData));

      expect(streamCallback).toHaveBeenCalledWith(eventData);
      expect(handleActionCallback).not.toHaveBeenCalled();
    });
    it('should close the WebSocket connection', () => {
      socketService.connect();
      socketService.close();
      expect(server.closed).toBeTruthy();
    });
  });
});
