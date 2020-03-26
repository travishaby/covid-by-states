const React = require("react");

const LineChart = require('./LineChart')
const Loading = require('./Loading')
const {DataContext} = require('../DataContext')
const {SET_DATA} = require('../DataReducer')
const getData = require("../client");
const {states, stateToAbbreviation} = require('../utils')

const STATE = 'state'

const Main = function() {
  const params = (new URL(document.location)).searchParams;
  const nameFromUrl = params.get(STATE);
  const [stateName, setStateName] = React.useState(nameFromUrl || 'Colorado') // default to random from top states
  const { state, dispatch } = React.useContext(DataContext)

  // when component mounts
  React.useEffect(() => {
    getData().then(data => {
      dispatch({ type: SET_DATA, payload: data })
    })
  }, []);

  const handleSelect = ({target: {value: stateName}}) => {
    // set url
    const newSearch = new URLSearchParams(window.location.search)
    newSearch.set(STATE, stateName)
    window.history.replaceState({}, '', `?${newSearch.toString()}`)
    // set state
    return setStateName(stateName)
  }

  const currentStateKey = `${stateToAbbreviation[stateName]}, USA`
  const currentStateData = state.data[currentStateKey]
  return (
    <div className="container">
      <div className="row">
        <h1>Cumulative COVID-19 cases by US State</h1>
      </div>
      <div className="row">
        <p>
          This is an app to visualize the COVID trends in a given US state. Data is
          sourced from <a href="https://coronadatascraper.com">Corona Data Scraper</a>
        </p>
      </div>
      <div className="row">
        <div>
          Choose a state from the dropdown&nbsp;
          <select name="choice" onChange={handleSelect} defaultValue={stateName}>
            {states.map(state => {
              return <option key={`select-state-option-${state}`} value={state}>{state}</option>
            })}
          </select>
        </div>
        <br/>
      </div>
      <div className="row align-items-center">
        <h2 className="m-3">
          Cases in <b>{stateName}</b>
        </h2>

        { currentStateData ? (
          <LineChart data={buildChartData(currentStateData.dates)} stateName={stateName} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

const defaults = { cases: 0, active: 0, recovered: 0, deaths: 0, growthFactor: 0 }

function buildChartData(data) {
  return Object.entries(data).reduce((agg, [date, dayData]) => {
    agg.push({ ...defaults, ...dayData, date })
    return agg
  }, [])
}

module.exports = Main;
