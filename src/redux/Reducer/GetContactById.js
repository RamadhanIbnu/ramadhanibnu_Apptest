import {
  GET_CONTACT_BY_ID_REQUEST,
  GET_CONTACT_BY_ID_SUCCESS,
  GET_CONTACT_BY_ID_FAILED,
} from '../Action/Contact';

const initialState = {
  dataContactById: [],
  isLoading: true,
  error: null,
};

const GetContactById = (state = initialState, action) => {
  switch (action.type) {
    // register
    case GET_CONTACT_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CONTACT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataContactById: action.payload,
      };
    case GET_CONTACT_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default GetContactById;
