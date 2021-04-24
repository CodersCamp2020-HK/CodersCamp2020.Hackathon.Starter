import React from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import HomePage from '../components/homePage/HomePage';

const Home = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <HomePage />
            </Route>
            <Redirect to={`/404/${path}`} />
        </Switch>
    );
};

export default Home;