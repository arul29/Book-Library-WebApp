import Axios from "axios";

export const registUser = newUser => {
  return {
    type: "REGIST_USER",
    payload: Axios.post(
      "https://nameless-plateau-17084.herokuapp.com/user/register",
      newUser
    )
  };
};

export const addAdmin = newUser => {
  return {
    type: "ADD_ADMIN",
    payload: Axios.post(
      "https://nameless-plateau-17084.herokuapp.com/user/add",
      newUser,
      {
        headers: {
          Authorization: "bearer " + localStorage.id_token
        }
      }
    )
  };
};
