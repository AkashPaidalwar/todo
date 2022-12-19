import React from "react";
import "./Home.css";
import { userContext } from "../Context/Context";

//const API_BASE = "http://localhost:3001";

function Home() {
  let [todos, setTodos] = React.useState([]);
  const [popupActive, setPopupActive] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState("");
  const { user, setUser } = React.useContext(userContext);

  React.useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = async () => {
    try {
      const res = await fetch(`/todos/${user.username}`);
      const data = await res.json();
      data && setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const completeTodo = async (id) => {
    const res = await fetch(`/${id}`, { method: "PATCH" });
    const data = await res.json();
    setTodos(
      todos.map((todo) => {
        if (todo._id === id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const res = await fetch(`/${id}`, { method: "DELETE" });
    const data = await res.json();
    setTodos((todos = todos.filter((todo) => todo._id !== data._id)));
  };

  const addTodo = async () => {
    const res = await fetch("/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        username: user.username,
      }),
    });
    res.json();
    GetTodos();
    setPopupActive(false);
    setNewTodo("");
  };

  const signOut = () => {
    setUser(null);
  };
  return (
    <div className="App">
      <div className="App">
        <h1>Welcome {user.username}</h1>
        <h4>These are your tasks</h4>
        <div className="todos">
          {todos.map((todo) => (
            <div
              className={"todo " + (todo.complete ? "is-complete" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"> </div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                X
              </div>
            </div>
          ))}
        </div>

        <div className="addpopup" onClick={() => setPopupActive(true)}>
          +
        </div>
        <button className="Signout" onClick={signOut}>
          Sign Out
        </button>
        {popupActive ? (
          <div className="popup">
            <div className="closepopup" onClick={() => setPopupActive(false)}>
              X
            </div>
            <div className="content">
              <h3>Enter the new Task</h3>
              <input
                type="text"
                className="add-todo-input"
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              ></input>
              <button className="button" onClick={addTodo}>
                Create Task
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
