import { SIGN_IN, SIGN_OUT } from './types';

import streams from '../apis/streams';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

//we are createing asynchronus action creator so using Thunk (function returns function)
export const createStream = (formValues) => async (dispatch) => {
  //POST request to server
  streams.post('/streams', formValues);
};
