const React = require("react");
const parse = require('csv-parse/lib/sync')

const LineChart = require('./LineChart')
const Loading = require('./Loading')
const {DataContext} = require('../DataContext')
const {SET_STATES_BY_DATE} = require('../DataReducer')
const getHopkinsCsvs = require("../client");
const {states, topStates} = require('../utils')

const Main = function() {
  const [csvLocations, setCsvLocations] = React.useState([])
  const [stateName, setStateName] = React.useState(topStates[Math.floor(Math.random() * topStates.length)]) // default to random from top states
  const { state, dispatch } = React.useContext(DataContext)

  // on compnent mount
  React.useEffect(() => {
    getHopkinsCsvs()
      .then(response => setCsvLocations(response))
      .catch(console.error)
  }, [])

  React.useEffect(() => {
    // Don't run if the locations array is empty
    if (csvLocations.length !== 0) {
      csvLocations.forEach(location => {
        const pathParts = location.split('/')
        const date = pathParts[pathParts.length - 1].split('.')[0]
        fetch(location)
          .then(res => res.blob())
          .then(blob => blob.text())
          .then(text => parse(text, {columns: true}))
          .then(csv => csv.reduce((agg, row) => {
            if (row["Country/Region"] === "US") agg[row["Province/State"]] = row
            return agg
          }, {}))
          .then(data => {
            dispatch({ type: SET_STATES_BY_DATE, payload: { [date]: data } })
          })
          .catch(console.error)
        })
    }
  }, [csvLocations])

  const dateKeys = Object.keys(state.statesByDate)
  const dates = dateKeys.sort((a, b) => {
    return new Date(a.replace('-', ' ')) - new Date(b.replace('-', ' '))
  })
  const data = dates.reduce((agg, date) => {
    const stateData = state.statesByDate[date][stateName]
    if (stateData) agg.push({ ...stateData, date })
    return agg
  }, [])
  const fullyLoaded = (dateKeys.length !== 0) && (dateKeys.length === csvLocations.length)
  const handleSelect = event => setStateName(event.target.value)
  return (
    <div>
      <h1>Cumulative COVID-19 cases by US State, by date, starting in March</h1>
      <p>
        This is an app to visualize the COVID trends in a given state. Data is
        sourced from Johns Hopkins, specifically the csvs that are uploaded
        <a href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports">
        &nbsp;here
        </a>
      </p>
      <div>
        Choose a state from the dropdown&nbsp;
        <select name="choice" onChange={handleSelect} defaultValue={stateName}>
          {states.map(state => {
            return <option key={`select-state-option-${state}`} value={state}>{state}</option>
          })}
        </select>
      </div>
      <br/>
      <h2>
        Cases in <b>{stateName}</b>
      </h2>

      {fullyLoaded ? (
        <LineChart data={data} stateName={stateName} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

module.exports = Main;
