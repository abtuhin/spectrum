import React, { useEffect } from 'react';

const socketString = "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS";

const SocketComponent = ({ streamCallback = () => {}, handleActionCallback = () => {} }) => {

  useEffect(() => {
    const newSocket = new WebSocket(socketString);

    newSocket.addEventListener('open', (event) => {
      console.log('socket opened:', event);
    });

    newSocket.addEventListener('error', (event) => {
      console.error('socket error:', event);
    });

    newSocket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
    });

    newSocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.IsActionRequired) {
        handleActionCallback(data.StatusMessage);
      } else {
        streamCallback(data);
      }
    });
    return () => {
      newSocket.close();
    };
  }, []);

};

export default SocketComponent;

