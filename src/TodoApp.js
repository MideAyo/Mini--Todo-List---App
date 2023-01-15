import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const getLocalStorage = () => {
  let item = localStorage.getItem("list");
  if (item) {
    return (item = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [items, setItems] = useState(getLocalStorage());
  const [edit, setEdit] = useState(false);
  const [editID, seteditID] = useState(null);
  const [clear, setClear] = useState(false);

  //   form submit
  const btnSubmit = (e) => {
    e.preventDefault();
    if (!task) {
    } else if (task && edit) {
      setEdit(false);
      setItems(
        items.map(function (item) {
          if (item.id === editID) {
            return { ...item, task };
          }
          return item;
        })
      );
      setTask("");
      seteditID(null);
    } else {
      const newTasks = { id: new Date().getTime().toString(), task };
      setItems([...items, newTasks]);
      setTask("");
    }
  };
  //  input onchange
  const changeValue = (e) => {
    setTask(e.target.value);
  };
  //   clearAllTasks
  const clearAll = () => {
    setItems([]);
  };
  //   delete Task
  const deleteTask = (id) => {
    const newID = items.filter(function (item) {
      return item.id !== id;
    });
    setItems(newID);
  };
  const editTask = (id) => {
    const sameID = items.filter(function (item) {
      return item.id === id;
    });
    setTask(sameID[0].task);
    setEdit(true);
    seteditID(id);
  };

  useEffect(() => {
    if (items.length > 0) {
      setClear(true);
    } else {
      setClear(false);
    }
    localStorage.setItem("list", JSON.stringify(items));
  });
  return (
    <section className="todo-section">
      <div className="list">
        <article className="todo">
          <div className="main-focus">
            <h1>Todays main Focus</h1>
          </div>
          <form className="form-control">
            <div className="circles">
              <div className="round-circle"></div>
              <div className="round-circle"></div>
              <div className="round-circle"></div>
            </div>
            <input
              type="text"
              id="formInput"
              placeholder=" whats your next task ?"
              value={task}
              onChange={changeValue}
            />
            <button className="icon" type="submit" onClick={btnSubmit}>
              {edit ? <FaEdit className="send" /> : <FiSend className="edit" />}
            </button>
          </form>

          <div className="task-list">
            {items.map(function (item) {
              const { id, task } = item;
              return (
                <article key={id} className="single-task">
                  <div className="task-name">
                    <div className="color-dot"></div>
                    <h2 className="text">{task}</h2>
                  </div>
                  <div className="icons">
                    <FaEdit onClick={() => editTask(id)} />
                    <AiFillDelete
                      className="delete"
                      onClick={() => deleteTask(id)}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </article>
        {clear && (
          <div className="clear-btn">
            <button className="btn" onClick={clearAll}>
              {" "}
              clear All Tasks
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TodoApp;
