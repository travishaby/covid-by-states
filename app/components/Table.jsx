const React = require("react");
const {states} = require('../utils')

function calculateRateOfChange(data) {
  const [third, second, last] = data.slice(data.length - 3, data.length).map(el => el["Confirmed"])
  const secondRate = Math.round(( (second - third) / third ) * 100)
  const firstRate = Math.round(( (last - second) / second ) * 100)
  return {secondRate, firstRate}
}

const table = function(props) {
  const dataSize = props.data.length
  const lastDates = props.data.slice(dataSize - 5, dataSize)
  const aggWithInitializedKeys = states.reduce((agg, state) => {
    agg[state] = { data: [], metadata: {} }
    return agg
  }, {})
  const datesByStates = lastDates.reduce((agg, dayData) => {
    Object.entries(dayData).forEach(([state, data]) => {
      if(!agg[state]) return
      agg[state].data.push({ ...data, date: dayData.date })
    })
    return agg
  }, aggWithInitializedKeys)
  // add in rate of change analytics
  for (const stateName in datesByStates) {
    const rates = calculateRateOfChange(datesByStates[stateName].data)
    datesByStates[stateName].metadata = { ...rates }
  }
  const topFiveRates = Object.entries(datesByStates)
    .filter(([state, item]) => {
      return item.data[item.data.length - 1]['Confirmed'] > 300
    })
    .sort(([stateA, dataA], [stateB, dataB]) => { 
      const avgRateA = ((dataA.metadata.firstRate + dataA.metadata.secondRate) / 2)
      const avgRateB = ((dataB.metadata.firstRate + dataB.metadata.secondRate) / 2)
      return avgRateB - avgRateA
    })
    .slice(0, 5)
  return (
    <div class="container">
      <div class="row">
        <h3>Leading states</h3>
      </div>
      <div class="row mb-3">
        <i>Top 5 rate of change avg. over the last two days, with more than 300 confirmed cases</i>
      </div>
      <div class="row">
        <table style={{width: '100%'}}>
          <thead>
            <tr>
              <th>State</th>
              {lastDates.map(datum => (
                <th key={datum.date}>{datum.date}</th>
              ))}
              <th>Change yesterday</th>
              <th>Change today</th>
            </tr>
          </thead>
          <tbody>
            {
              topFiveRates.map(([state, item], i) => {
                return <tr key={`row-${state}-${i}`}>
                  <td>{state}</td>
                  {console.log('cell length: ', item.data.length)}
                  {
                    item.data.map((dayData, index) => {
                      return <td key={`cell-${state}-${index}`}>{dayData['Confirmed']}</td>
                    })
                  }
                  <td>{item.metadata.secondRate} %</td>
                  <td>{item.metadata.firstRate} %</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

module.exports = table


