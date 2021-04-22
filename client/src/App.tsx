import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGetManyBaseUsersControllerUser } from "./api";

function App() {
  const { data } = useGetManyBaseUsersControllerUser({
    base: "http://localhost:8000",
    queryParams: {
      fields: ["email"],
    },
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {JSON.stringify(data)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
