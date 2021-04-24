import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

const Home = () => {
    const { path } = useRouteMatch();
    return (
        <Route exact path={`${path}/404`}>
            <div>ELO 404</div>
        </Route>
    );
};

export default Home;