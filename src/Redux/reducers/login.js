const initialState = {
  token: '',
  userData: {}
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.userData
      };
    default:
      return state;
  }
}