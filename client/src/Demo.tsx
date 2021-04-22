import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGetManyBaseUsersControllerUserDTO, UserDTO, useCreateOneBaseUsersControllerUserDTO } from "./api";
import { RequestQueryBuilder } from "@nestjsx/crud-request";

const useQueryParams = () => {
  const qb = RequestQueryBuilder.create();
  const queryParams = qb.select(['name', 'email', 'projects'])
    .setJoin({ field: 'projects', select: ['name'] })
    .queryObject
  const { data, ...rest } = useGetManyBaseUsersControllerUserDTO({ queryParams });
  const data2 = data as UserDTO[];
  return { data: data2, ...rest }
}

function Demo() {
  const { data } = useQueryParams()
  const { mutate } = useCreateOneBaseUsersControllerUserDTO({});

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
        <button onClick={() => mutate({ email: 'elo@elo.elo', password: 'eloeloelo' })}>Załóż konto</button>
      </header>
    </div>
  );
}

export default Demo;
