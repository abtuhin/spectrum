import FlexChartContainer from '@/components/FlexContainer';
import useSensors from '@/hooks/useSensors';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const initialData = [];
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
          <FlexChartContainer
            data={sensorData}
          />
        )}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div
            onClick={() => refetch()} 
            style={{
              display: 'flex', 
              width: 200, 
              background: '#FFD700',
              padding: '1%',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          >
            Refresh Sensor
          </div>
        </div>
    </div>
    
  );
};

export default Home;
