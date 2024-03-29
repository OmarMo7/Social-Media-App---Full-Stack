export default (state = { authData: null, error: { exists: false, messege: '' } }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data };
    case "LOGOUT":
      localStorage.clear()
      return { ...state, authData: null };
    case "ERROR_SIGN_UP":
      return { ...state, error: {exists: true, messege: action?.payload} }
    case "ERROR_SIGN_IN":
      return { ...state, error: {exists: true, messege: action?.payload} }
    default:
      return state;
  }
};