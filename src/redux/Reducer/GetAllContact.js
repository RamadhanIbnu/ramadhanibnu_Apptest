import {
  GET_ALL_CONTACT_REQUEST,
  GET_ALL_CONTACT_SUCCESS,
  GET_ALL_CONTACT_FAILED,
} from '../Action/Contact';

const initialState = {
  dataAllContact: [],
  isLoading: true,
  error: null,
};

const GetAllContact = (state = initialState, action) => {
  switch (action.type) {
    // register
    case GET_ALL_CONTACT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataAllContact: action.payload,
      };
    case GET_ALL_CONTACT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default GetAllContact;
