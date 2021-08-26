import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import routesConfig from '../Routes/Config';
import ElevateAppBar from '../Shared/Navbar/Navbar';

const AppRoute: React.FC = () => {
    return (
        <Router>
            <ElevateAppBar><></></ElevateAppBar>
            <Switch>
                {
                    routesConfig.map((route, i) => (
                        <Route key={i}
                            path={route.path}
                            component={route.component}
                        ></Route>
                    ))
                }
                <Redirect from="/" exact to="survey" />
            </Switch>
        </Router>
    )
}

export default AppRoute;