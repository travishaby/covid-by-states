const SET_STATES_BY_DATE = 'SET_STATES_BY_DATE'

const DataReducer = (state, action) => {
  switch (action.type) {
    case SET_STATES_BY_DATE:
      return {
        ...state,
        statesByDate: { ...state.statesByDate, ...action.payload },
      };
    default:
      return state;
  }
};

module.exports = { DataReducer, SET_STATES_BY_DATE }