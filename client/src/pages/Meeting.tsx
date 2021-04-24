import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

const Home = () => {
    const { path } = useRouteMatch();
    return (
        <Route exact path={`${path}/meeting/:name`}>
            <div>ELO MEETING </div>
        </Route>
    );
};

export default Home;