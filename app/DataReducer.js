const SET_DATA = 'SET_DATA'

const DataReducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    default:
      return state;
  }
};

module.exports = { DataReducer, SET_DATA }