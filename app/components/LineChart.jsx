const React = require('react')
const {LineChart, Line, Tooltip, Legend, YAxis, XAxis} = require('recharts');

const chart = function(props) {
  // const maxByConfirmed = maxBy(props.data, datum => parseInt(datum['Confirmed']))
  // const maxConfirmedNumber = parseInt(maxByConfirmed["Confirmed"], 10)
  return (
    <LineChart width={1000} height={600} data={props.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
      {/* <YAxis type="number" dataKey="Confirmed" yAxisId="cases" domain={[0, maxConfirmedNumber]}/> */}
      <XAxis type="category" dataKey="date" />
      <Tooltip />
      <Legend wrapperStyle={{position: 'relative'}}/>
      <Line type="monotone" dataKey="Confirmed" stroke="#8884d8" yAxisId="cases" />
      <Line type="monotone" dataKey="Deaths" stroke="#d88884" yAxisId="cases" />
      <Line type="monotone" dataKey="Recovered" stroke="#84d888" yAxisId="cases" />
    </LineChart>
  );
};

module.exports = chart

