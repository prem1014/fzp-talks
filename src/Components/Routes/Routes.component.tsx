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
            <div className="footer">
                <h5>Designed and Developed By</h5>
                <h6>NR Infotech</h6>
                <h6>मुखिया, जिला पार्षद, पंचायत समिति तथा सरपंच के पद का ऑनलाइन सर्वे कराने के लिए हमे संपर्क करें</h6>
                <h6>Mob No: 9304512957</h6>
            </div>
        </Router>
    )
}

export default AppRoute;