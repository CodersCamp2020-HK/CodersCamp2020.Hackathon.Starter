import React from "react";
import { RestfulProvider } from 'restful-react';
import Demo from "./Demo";

const isProductionEnv = process.env.NODE_ENV === 'production';
const devApiUrl = 'http://localhost:8000';
const baseApiUrl = isProductionEnv ? process.env.REACT_APP_PRODUCTION_API_URL ?? devApiUrl : devApiUrl;

function App() {

  return (
    <RestfulProvider base={baseApiUrl}>
      <Demo />
    </RestfulProvider>
  );
}

export default App;
