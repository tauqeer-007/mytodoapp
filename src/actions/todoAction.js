import axios from "axios";
import { toast } from "react-toastify";

export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const REMOVEALL_TODO = "REMOVEALL_TODO";
export const GET_TODO_LIST = "GET_TODO_LIST";
export const MAKE_REQUEST = "MAKE_REQUEST";
export const FAIL_REQUEST = "FAIL_REQUEST";
const API_URL = 'http://localhost:3000/todos/'

export const addTodo = (payload) => {
  return {
    type: ADD_TODO
  };
};

export const updateTodo = () => {
  return {
    type: UPDATE_TODO,
  };
};

export const deleteTodo = () => {
  return {
    type: DELETE_TODO,
  };
};

export const removeAllTodo = () => {
  return {
    type: REMOVEALL_TODO,
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

export const getTodoList = (data) => {
  return {
    type: GET_TODO_LIST,
    payload: data,
  };
};


export const fetchTodoList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    setTimeout(()=>{
      axios
      .get(API_URL)
      .then((response) => {
        const todolist = response.data;
        dispatch(getTodoList(todolist));
      })
      .catch((error) => {
        dispatch(failRequest(error.message));
      });
    },10)
  };
};

export const removeTodo = (id) => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .delete(API_URL + id)
      .then((res) => {
        dispatch(deleteTodo());
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const createTodo = (data) => {
    return (dispatch) => {
      dispatch(makeRequest());
      axios
        .post(API_URL,data)
        .then((res) => {
          dispatch(addTodo(data));
          toast.success("todo created successfully")
        })
        .catch((err) => {
          dispatch(failRequest(err.message));
        });
    };
  };
  
  export const editTodo =(data)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
        axios.put(API_URL+data.id,data).then(res=>{
            dispatch(updateTodo());
            toast.success('Todo Updated successfully.')
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
    }
}


export const deleteAllTodo = (ids) => {
  const deleteTasks = ids.map((id) => {
    return axios.delete(API_URL + id, {
        method: "DELETE"
      })
    })
  return (dispatch) => {
    dispatch(makeRequest());
    Promise.all([deleteTasks])
      .then((res) => {
        dispatch(removeAllTodo());
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};