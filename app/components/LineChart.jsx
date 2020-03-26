const React = require('react')
const {LineChart, Line, Tooltip, Legend, YAxis, XAxis} = require('recharts');

const chart = function(props) {
  return (
    <LineChart width={1000} height={600} data={props.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
      <YAxis type="number" dataKey="cases" yAxisId="cases" domain={[0, 'dataMax']}/>
      <XAxis type="category" dataKey="date" />
      <Tooltip />
      <Legend wrapperStyle={{position: 'relative'}}/>
      <Line type="monotone" dataKey="cases" stroke="#8884d8" yAxisId="cases" />
      <Line type="monotone" dataKey="active" stroke="#d88488" yAxisId="cases" />
      <Line type="monotone" dataKey="deaths" stroke="#111111" yAxisId="cases" />
      <Line type="monotone" dataKey="recovered" stroke="#88d884" yAxisId="cases" />
    </LineChart>
  );
};

module.exports = chart

