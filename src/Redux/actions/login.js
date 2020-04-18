export const login = (token, userData) => ({
  type: 'LOGIN',
  payload: {
    token,
    userData
  },
});