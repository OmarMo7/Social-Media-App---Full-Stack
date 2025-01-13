import { signIn, signUp } from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await signIn(formData);

    dispatch({ type: "AUTH", data });

    router('/');
  } catch (error) {
    const errorMessage = error.response?.data?.messege || "An unexpected error occurred.";
    console.log(error.response?.data?.messege)
    dispatch({
      type: "ERROR_SIGN_IN",  payload: errorMessage
    });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await signUp(formData);

    dispatch({ type: "AUTH", data });

    router('/');
  } catch (error) {
    const errorMessage = error.response?.data?.messege || "An unexpected error occurred.";
    console.log(error.response?.data?.messege)
    dispatch({ type: "ERROR_SIGN_UP", payload: errorMessage });
  }
};
