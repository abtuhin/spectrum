import React, { useEffect } from 'react';

const socketString = "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS";

const SocketComponent = ({ streamCallback = () => {}, handleActionCallback = () => {} }) => {

  useEffect(() => {
    const newSocket = new WebSocket(socketString);

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

