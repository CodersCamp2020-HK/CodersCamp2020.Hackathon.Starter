import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGetManyBaseUsersControllerUserDTO } from "./api";

function App() {
  const { data } = useGetManyBaseUsersControllerUserDTO({
    base: "http://localhost:8000",
    queryParams: {
      join: ["projects"],
    },
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{JSON.stringify(data)}</p>
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
