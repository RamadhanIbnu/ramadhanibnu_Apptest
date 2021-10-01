import axios from 'axios';

export const GET_ALL_CONTACT_REQUEST = 'GET_ALL_CONTACT_REQUEST';
export const GET_ALL_CONTACT_SUCCESS = 'GET_ALL_CONTACT_SUCCESS';
export const GET_ALL_CONTACT_FAILED = 'GET_ALL_CONTACT_FAILED';

export const GET_CONTACT_BY_ID_REQUEST = 'GET_CONTACT_BY_ID_REQUEST';
export const GET_CONTACT_BY_ID_SUCCESS = 'GET_CONTACT_BY_ID_SUCCESS';
export const GET_CONTACT_BY_ID_FAILED = 'GET_CONTACT_BY_ID_FAILED';

export const EDIT_CONTACT_REQUEST = 'EDIT_CONTACT_REQUEST';
export const EDIT_CONTACT_SUCCESS = 'EDIT_CONTACT_SUCCESS';
export const EDIT_CONTACT_FAILED = 'EDIT_CONTACT_FAILED';

export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILED = 'CREATE_CONTACT_FAILED';

export const DELETE_CONTACT_REQUEST = 'DELETE_CONTACT_REQUEST';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAILED = 'DELETE_CONTACT_FAILED';

export const EDIT_PROFILE_USER = 'EDIT_PROFILE_USER';

export const getAllContactRequest = value => {
  return {
    type: GET_ALL_CONTACT_REQUEST,
    payload: value,
  };
};

export const getAllContactSuccess = value => {
  return {
    type: GET_ALL_CONTACT_SUCCESS,
    payload: value,
  };
};

export const getAllContactFailed = value => {
  return {
    type: GET_ALL_CONTACT_FAILED,
    payload: value,
  };
};

export const getContactByIdRequest = value => {
  return {
    type: GET_CONTACT_BY_ID_REQUEST,
    payload: value,
  };
};

export const getContactByIdSuccess = value => {
  return {
    type: GET_CONTACT_BY_ID_SUCCESS,
    payload: value,
  };
};

export const getContactByIdFailed = value => {
  return {
    type: GET_CONTACT_BY_ID_FAILED,
    error: value,
  };
};

export const editContactRequest = () => {
  return {
    type: EDIT_CONTACT_REQUEST,
  };
};

export const editContactSuccess = result => {
  return {
    type: EDIT_CONTACT_SUCCESS,
    result,
  };
};

export const editContactFailed = error => {
  return {
    type: EDIT_CONTACT_FAILED,
    error,
  };
};

export const createContactRequest = () => {
  return {
    type: CREATE_CONTACT_REQUEST,
  };
};

export const createContactSuccess = result => {
  return {
    type: CREATE_CONTACT_SUCCESS,
    result,
  };
};

export const createContactFailed = error => {
  return {
    type: CREATE_CONTACT_FAILED,
    error,
  };
};

export const deleteContactRequest = () => {
  return {
    type: DELETE_CONTACT_REQUEST,
  };
};

export const deleteContactSuccess = result => {
  return {
    type: DELETE_CONTACT_SUCCESS,
    result,
  };
};

export const deleteContactFailed = error => {
  return {
    type: DELETE_CONTACT_FAILED,
    error,
  };
};

export const getAllContactActions = () => dispatch => {
  // event.preventDefault();

  console.log('masuk');
  const uri = 'https://simple-contact-crud.herokuapp.com/contact';

  return axios
    .get(uri)
    .then(response => {
      console.log('res', response);
      dispatch(getAllContactSuccess(response));
    })
    .catch(error => {
      dispatch(getAllContactFailed(error));
      console.log(error);
      alert(error.response.data.message);
    });
};

export const getContactByIdActions = id => dispatch => {
  // event.preventDefault();
  // console.log("id", id);
  const uri = `https://simple-contact-crud.herokuapp.com/contact/${id}`;

  return axios
    .get(uri)
    .then(response => {
      console.log('res', response);
      dispatch(getContactByIdSuccess(response));
    })
    .catch(error => {
      dispatch(getContactByIdFailed(error));
      console.log(error);
      alert(error.response.data.message);
    });
};

export const editContactAction = (value, id) => dispatch => {
  const uri = `https://simple-contact-crud.herokuapp.com/contact/${id}`;
  axios
    .put(`${uri}`, value)
    .then(response => {
      console.log('response edit contact', response);
      dispatch(editContactSuccess(response));
      alert(response.data.message);
    })
    .catch(error => {
      dispatch(editContactFailed(error));
      alert(error.response.data.message);
    });
};

export const createContactAction = value => dispatch => {
  console.log('success');
  const uri = 'https://simple-contact-crud.herokuapp.com/contact';
  axios
    .post(`${uri}`, value)
    .then(response => {
      console.log('response create contact', response);
      dispatch(createContactSuccess(response));
      alert(response.data.message);
    })
    .catch(error => {
      dispatch(createContactFailed(error));
      alert(error.response.data.message);
    });
};

export const deleteContactAction = id => dispatch => {
  const uri = `https://simple-contact-crud.herokuapp.com/contact/${id}`;
  console.log('in delete action');
  console.log('id: ', id);
  axios
    .delete(uri)
    .then(response => {
      console.log('response delete: ', response);
      dispatch(deleteContactSuccess(response));
      alert(response.data.message);
    })
    .catch(error => {
      dispatch(deleteContactFailed(error));
      console.log('error delete: ', error.response);
      alert(error.response.data.message);
    });
};
