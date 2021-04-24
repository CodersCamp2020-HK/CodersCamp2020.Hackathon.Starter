import React from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';

const Unauth = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <div>ELO UNAUTH</div>
            </Route>
            <Redirect to={`/404/${path}`} />
        </Switch>
    );
};

export default Unauth;