const React = require('react');
const {DataReducer} = require('./DataReducer')

const DataContext = React.createContext({
  statesByDate: {}
});
const DataContextProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    DataReducer,
    { data: {} } // default
  );

  const contextValue = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

module.exports = { DataContext, DataContextProvider }