import React from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom'
import LayoutProfile from '../components/Layout';
import Home from '../Container/Home';
import Login from '../Container/Login';
import NotFound from '../Container/NotFound';
import Profile from '../Container/Profile';
import Record from '../Container/Record';
import Register from '../Container/Register';

const AppRoute = () => {
    return ( 
       <HashRouter>
       {/* <LayoutProfile> */}
        <Switch>
            <Route exact component={Home} path='/' />
            <Route exact component={Login} path='/login'/>
            <Route exact component={Register} path='/register'/>
            <Route exact component={Profile} path='/profile'/>
            <Route exact component={Record} path='/profile/record'/>
            <Route component={NotFound} />
        </Switch>
        {/* </LayoutProfile> */}
       </HashRouter>
     );
}
 
export default AppRoute;