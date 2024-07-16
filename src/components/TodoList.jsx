import React, { useState, useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import "../style/Todo.css";
import FormComp from "./FormComp.tsx";
import { connect } from "react-redux";
import useDebounce from '../custom-hooks/useDebounce.js'

import {
  removeTodo,
  fetchTodoList,
  deleteAllTodo,
} from "../actions/todoAction";
import { toast } from "react-toastify";

const TodoList = (props) => {
  const [isEdit, setIsEdit] = useState([]);
  const [clearToggle, setClearToggle] = useState(true);
  const childRef = useRef(null);

  const [data, setData] = useState(null);

  const loadData = async (event) => {
    const value=event.target.value
    if(value === '') {
        setData(null)
        return
    }
    const response=await fetch(`http://localhost:3000/todos?text=${value}`)
    const res=await response.json()
    setData(res)
  };

  useEffect(() => {
    props.loadTodo();
  }, []);

  const handleEdit = (index) => {
    const inputEdit = props.todo.list.find((elem) => {
      return index === elem.id;
    });
    childRef.current.setValues(index, inputEdit);
    setIsEdit(inputEdit);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to remove")) {
      props.deleteTodo(id);
      props.loadTodo();
      toast.success("Todo removed successfully");
    }
  };

  const handleClearAll = () => {
    const ids = props.todo.list.map((task) => {
      return task.id;
    });
    deleteAllTodo(ids);
    props.loadTodo();
    setClearToggle(false);
    toast.success("All todos removed successfully");
  };

  const loadDataDebounced = useDebounce(loadData, 400)

  return props.todo.loading ? (
    <div>
      {" "}
      <h2> Loading.......</h2>
    </div>
  ) : props.todo.errMessage ? (
    <div>
      {" "}
      <h2>{props.todo.errMessage} </h2>
    </div>
  ) : (
    <div className="main_div">
      <div className="todo_contents">
        <div className="todo_content_inner">
          <h1>To-do List</h1>
          <img src="../images/bAndwlogo.png" alt="" className="todo_logo" />
          <br />
          <input type="text" onChange={(e) => loadData(e)} />
          <input type="text" onChange={(e) => loadDataDebounced(e)}/>
          <br />
          <FormComp ref={childRef} todo={props} isEdit={isEdit} />
          <br />
          <Col md={{ span: 6 }}>
                  
          {data && data.length !== 0 && (
                          <div className="results-container">
                            {data.map((item) => (
                              <div key={item.id} className="result-item">
                                <p> {item.text} </p>
                              </div>
                            ))}
                          </div>
                        )}
            {/* <ListGroup>
              {props.todo.list &&
                props.todo.list.map((task, index) => {
                  return (
                    <div className="output_box" key={index}>
                     
                      <ListGroup.Item
                        variant="dark"
                        action
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
               
                        {task.text}
                        <span>
                          <button
                            className="edit_btn"
                            onClick={(e) => handleEdit(task.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete_btn"
                            onClick={(e) => handleDelete(task.id)}
                          >
                            Delete
                          </button>
                        </span>
                      </ListGroup.Item>
                    </div>
                  );
                })}
            </ListGroup> */}
          </Col>
          <br />
          {clearToggle ? (
            <button className="clearAll_btn" onClick={handleClearAll}>
              Clear All
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTodo: () => dispatch(fetchTodoList()),
    deleteTodo: (id) => dispatch(removeTodo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
