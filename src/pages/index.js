import Button from '@/components/Button';
import FlexChartContainer from '@/components/FlexContainer';
import WebSocket from '@/components/Websocket';
import useSensors from '@/hooks/useSensors';
import useSpectrumAction from '@/hooks/useSpectrumAction';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const initialData = [];
  const [sensorData, setSensorData] = useState(initialData);
  const [socketData, setSocketData] = useState(initialData);
  const [action, setAction] = useState(false);
  const { _, isLoading, error, refetch } = useSensors({
    onSuccess: (data) => {
      const newData = {
        ...data,
        timestamp: new Date().toLocaleTimeString()
      }
      setSensorData([...sensorData, newData]);
    },
  });
  const { refetch: ActOnSpectrum } = useSpectrumAction();

  /**
   * Callback to get sensor data from socket
   * updating state array with new data from the socket
   */
  const streamCallback = (data) => {
    const newData = {
      velocity: data.Velocity,
      altitude: data.Altitude,
      temperature: data.Temperature,
      isActionRequired: data.IsActionRequired,
      isAscending: data.IsAscending,
      statusMessage: data.StatusMessage,
      timestamp: new Date().toLocaleTimeString()
    }
    setSocketData(prevSocketData => [...prevSocketData, newData]);
  }

  /**
   * Callback when action is required
   * showing status of the sensor in a toast
   * setting trigger action button visible
   */
  const handleActionCallback = (status) => {
    toast(status);
    setAction(true);
  };

  /**
   * trigger action to call ActOnSpectrum on api
   * setting trigger action button invisible
   */
  const triggerAction = () => {
    ActOnSpectrum();
    setAction(false);
  }

  return (
    <div>
        <h1 style={{ textAlign: 'center' }}>Spectrum</h1>
        <ToastContainer />
        <h4 style={{ textAlign: 'center' }}>Task 1</h4>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {sensorData && (
          <FlexChartContainer
            data={sensorData}
          />
        )}
        <Button name={"Refetch Data"} onClick={() => refetch()}/>
        <h4 style={{ textAlign: 'center' }}>Task 2</h4>
        <WebSocket
          streamCallback={streamCallback}
          handleActionCallback={handleActionCallback}
        />
        <FlexChartContainer
          data={socketData}
        />
        { action &&
          <Button name={"Trigger Action"} onClick={triggerAction}/>
        }
    </div>
    
  );
};

export default Home;
