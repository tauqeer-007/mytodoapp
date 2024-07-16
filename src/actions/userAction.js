import axios from "axios";
import { toast } from "react-toastify";

export const USER_REGISTER = "USER_REGISTER";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const MAKE_REQUEST = "MAKE_REQUEST";
export const FAIL_REQUEST = "FAIL_REQUEST";

const API_URL = "http://localhost:3000/users/";

export const register = () => {
  return {
    type: USER_REGISTER,
  };
};

export const login = () => {
  return {
    type: USER_LOGIN,
  };
};

export const logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};

export const userLogin = (data, props) => {
  return (dispatch) => {
    dispatch(makeRequest());
    setTimeout(() => {
      axios
        .get(API_URL + "?email=" + data.email)
        .then((response) => {
          const user = response.data;
          if (Object.keys(user).length === 0) {
            toast.error("Please enter valid email");
          } else {
            if (user[0].password === data.password) {
              localStorage.setItem("user", JSON.stringify(user[0]));
              props.router.navigate("/home");
              window.location.reload();
            } else {
              toast.error("Please enter valid credentials");
            }
          }

          dispatch(login(user));
        })
        .catch((error) => {
          dispatch(failRequest(error.message));
        });
    }, 10);
  };
};

export const createUser = (data) => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .post(API_URL, data)
      .then((res) => {
        dispatch(register());
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};
