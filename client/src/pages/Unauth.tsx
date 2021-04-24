import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

const Home = () => {
    const { path } = useRouteMatch();
    return (
        <Route exact path={`${path}/unauth`}>
            <div>ELO UNAUTH</div>
        </Route>
    );
};

export default Home;