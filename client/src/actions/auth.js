import { signIn, signUp } from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await signIn(formData);

    dispatch({ type: "AUTH", data });

    router.push('/');
  } catch (error) {
    dispatch({
      type: "ERROR_SIGN_IN", payload: error.response.data.messege
    });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await signUp(formData);

    dispatch({ type: "AUTH", data });

    router.push('/');
  } catch (error) {
    dispatch({
      type: "ERROR_SIGN_UP", payload: error.response.data.messege
    });
  }
};