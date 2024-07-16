import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  MAKE_REQUEST,
  FAIL_REQUEST,
} from "../actions/userAction";

const initialData = {
  loading: true,
  errMessage: "",
};

const authReducer = (state = initialData, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        loading: false,
      };
    case USER_LOGIN:
      return {
        ...state,
        loading: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
      };
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
