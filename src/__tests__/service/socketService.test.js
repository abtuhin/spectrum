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
      // Given
      const streamCallback = jest.fn();
      const handleActionCallback = jest.fn();
      socketService = new SocketService(streamCallback, handleActionCallback);
      // When
      socketService.connect();
      const eventData = { IsActionRequired: true, StatusMessage: 'Test Message' };
      server.send(JSON.stringify(eventData));
      // Then
      expect(streamCallback).toHaveBeenCalledWith(eventData);
      expect(handleActionCallback).toHaveBeenCalledWith('Test Message');
    });
    it('should connect to WebSocket and invoke only streamCallback', () => {
      // Given
      const streamCallback = jest.fn();
      const handleActionCallback = jest.fn();
      socketService = new SocketService(streamCallback, handleActionCallback);
      // When
      socketService.connect();
      const eventData = { IsActionRequired: false };
      server.send(JSON.stringify(eventData));
      // Then
      expect(streamCallback).toHaveBeenCalledWith(eventData);
      expect(handleActionCallback).not.toHaveBeenCalled();
    });
    it('should close the WebSocket connection', () => {
      // Given
      socketService.connect();
      // When
      socketService.close();
      // Then
      expect(server.closed).toBeTruthy();
    });
  });
});
