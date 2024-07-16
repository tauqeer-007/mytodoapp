import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  REMOVEALL_TODO,
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_TODO_LIST,
} from "../actions/todoAction";

const initialData = {
  loading: true,
  list: [],
  todoObj: {},
  errMessage: "",
};

const todoReducers = (state = initialData, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        loading: false
      }
      case UPDATE_TODO:
        case UPDATE_TODO:
      return {
        ...state,
        loading:false
      }
    case DELETE_TODO:
      return {
        ...state,
        loading: false
      }
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
    case GET_TODO_LIST:
      return {
        ...state,
        loading: false,
        errMessage: '',
        list: action.payload,
        todoObj: {}
      };
      case REMOVEALL_TODO:
        return {
          ...state,
          loading: true,
        };
    default:
      return state;
  }
};

export default todoReducers;
