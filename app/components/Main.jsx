const React = require("react");

const LineChart = require('./LineChart')
const Loading = require('./Loading')
const {DataContext} = require('../DataContext')
const {SET_DATA} = require('../DataReducer')
const getData = require("../client");
const {states} = require('../utils')


const Main = function() {
  const [stateName, setStateName] = React.useState('Colorado') // default to random from top states
  const { state, dispatch } = React.useContext(DataContext)
  const data = getData().then(() => {
    dispatch({ type: SET_DATA, payload: { data } })
  })

  const handleSelect = event => setStateName(event.target.value)
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

        {fullyLoaded ? (
          <LineChart data={data} stateName={stateName} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

module.exports = Main;
