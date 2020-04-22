const initialState = {
  isLogin: false,
  token: localStorage.getItem('token'),
  userData: {}
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        userData: action.payload.userData
      };
    default:
      return state;
  }
}