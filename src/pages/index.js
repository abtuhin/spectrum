import SensorChart from '@/components/SensorChart';
import useSensors from '@/hooks/useSensors';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const initialData = [
    // {
    //   timestamp: new Date().toLocaleTimeString(),
    //   velocity: 0,
    //   altitude: 0,
    //   temperature: 0,
    //   isAscending: false,
    //   isActionRequired: false,
    //   statusMessage: ""
    // }
  ]
  const [sensorData, setSensorData] = useState(initialData);

  const { _, isLoading, error, refetch } = useSensors({
    onSuccess: (data) => {
      const newData = {
        ...data,
        timestamp: new Date().toLocaleTimeString()
      }
      setSensorData([...sensorData, newData]);
    },
  });

  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {sensorData && (
          <>
            <SensorChart data={sensorData} />
          </>
        )}
        <button onClick={() => refetch()}>Refresh sensor data</button>
    </div>
  );
};

export default Home;
