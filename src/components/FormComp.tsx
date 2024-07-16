import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { createTodo, editTodo } from "../actions/todoAction";

const FormComp = forwardRef((props, ref) => {
 
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();

  // normal add todo submit
  const handleSubmit = () => {
    let date = Date.now().toString();
    let todoObj = {
      id: date,
      text: text,
      completed: false,
    };
    setText("");
    dispatch(createTodo(todoObj));
    props.todo.loadTodo()
  };

  // update form submit
  const editSubmit = () => {
    let editedObj = {
      id: props.isEdit.id,
      text: text,
      completed: props.isEdit.completed,
    };
    setText("");
    dispatch(editTodo(editedObj));
    props.todo.loadTodo()
  };

  useImperativeHandle(ref,()=>({

    setValues(values) {
      setText(values.text)
      setToggle(false)
    }

  }))


  return (
    <div className="input_form">
      <span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {toggle ? (
          <button className="add_btn" onClick={handleSubmit}>
            Add
          </button>
        ) : (
          <button
            className="add_btn"
            onClick={editSubmit}
          >
            Update
          </button>
        )}
      </span>
    </div>
  );
})

export default FormComp;
