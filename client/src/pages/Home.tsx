import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

const Home = () => {
    const { path } = useRouteMatch();
    return (
        <Route exact path={`${path}`}>
            <div>ELO HOME</div>
        </Route>
    );
};

export default Home;