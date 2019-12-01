const initialState = {
  userData: [],
  // counter: 0,
  isLoading: false,
  isRejected: false,
  isFulfilled: false
};

const users = (prevState = initialState, action) => {
  switch (action.type) {
    case "REGIST_USER_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "REGIST_USER_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "REGIST_USER_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        userData: action.payload.data.response
      };
    case "ADD_ADMIN_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "ADD_ADMIN_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "ADD_ADMIN_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        userData: action.payload.data.response
      };

    default:
      return prevState;
  }
};

export default users;
