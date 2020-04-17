const initialState = {
    data: []
  };
  
  export default function UserReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_LIST_RS':
        return {
          ...state,
          data: action.payload.data
        };
      default:
        return state;
    }
  }
  