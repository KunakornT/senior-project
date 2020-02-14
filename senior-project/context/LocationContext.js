import CreateDataContext from '../context/createDataContext';
import url from '../constants/url-constant';

const locationReducer = (state,action) => {
  switch (action.type) {

    case 'add_current_location':
      return {...state, currentLocation: action.payload};
    default:
      return state;

  }
};

const getField = dispatch => {};
const stopRecording = dispatch => () => {};
const addLocation = dispatch => (location) => {
  dispatch({type: 'add_current_location', payload: location});
};

export const {Context,Provider} = CreateDataContext(
  locationReducer,
  {getField,stopRecording,addLocation},
  {recording: false,locations:[],currentLocation: null}
);
