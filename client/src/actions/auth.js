import { signIn, signUp } from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await signIn(formData);

    dispatch({ type: "AUTH", data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    console.log("line 17: " + formData)
    const { data } = await signUp(formData);

    dispatch({ type: "AUTH", data });

    router.push('/');
  } catch (error) {
    dispatch({
      type: "error", payload: error.response.data.messege
    });
    console.log(error.response);
  }
};