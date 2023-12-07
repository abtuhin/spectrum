import SensorLineChart from "./SensorLineChart";

const FlexChartContainer = ({ data }) => {
  const lastData = data[data.length - 1];
  return (
    <div style={{ width: "100%", display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <div style={{ flex: 1 }}>
        <SensorLineChart data={data} category="velocity" />
        <div style={{ display: 'flex', justifyContent: 'center'}} >
            <h4>{lastData?.statusMessage}</h4>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <SensorLineChart data={data} category="altitude" />
        <div style={{ display: 'flex', justifyContent: 'center' }} >
          <h4>{lastData?.isAscending ? "Ascending" : "Descending"}</h4>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <SensorLineChart data={data} category="temperature" />
        <div style={{ display: 'flex', justifyContent: 'center' }} >
          <h4>{lastData?.isActionRequired ? "Action needed" : "No action needed"}</h4>
        </div>
      </div>
    </div>
  );
};

export default FlexChartContainer;