import React from "react";
<<<<<<< HEAD
import { RestfulProvider } from 'restful-react';
import Demo from "./Demo";

const isProductionEnv = process.env.NODE_ENV === 'production';
const devApiUrl = 'http://localhost:8000';
const baseApiUrl = isProductionEnv ? process.env.REACT_APP_PRODUCTION_API_URL ?? devApiUrl : devApiUrl;
=======
import logo from "./logo.svg";
import "./App.css";
import { useHealthcheckControllerCheck } from "./api";
import Example from "./components/forms/Example";
>>>>>>> CheckboxGroup finished

function App() {

  return (
<<<<<<< HEAD
    <RestfulProvider base={baseApiUrl}>
      <Demo />
    </RestfulProvider>
=======
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Example />
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
>>>>>>> CheckboxGroup finished
  );
}

export default App;
