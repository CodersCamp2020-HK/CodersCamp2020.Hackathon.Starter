import React from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';

const Home = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <div>ELO HOME</div>
            </Route>
            <Redirect to={`/404/${path}`} />
        </Switch>
    );
};

export default Home;