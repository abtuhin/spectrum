import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Home = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socketInstance = io('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS');

    // Set up event listeners
    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketInstance.on('message', (newMessage) => {
      setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Save the socket instance to state
    setSocket(socketInstance);

    // Clean up on component unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example</h1>
      <div>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default Home;
