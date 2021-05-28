import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LayoutProfile from '../components/Layout';
import Home from '../Container/Home';
import Login from '../Container/Login';
import Profile from '../Container/Profile';
import Record from '../Container/Record';
import Register from '../Container/Register';

const AppRoute = () => {
    return ( 
       <BrowserRouter>
       {/* <LayoutProfile> */}
        <Switch>
            <Route exact component={Home} path='/' />
            <Route exact component={Login} path='/login'/>
            <Route exact component={Register} path='/register'/>
            <Route exact component={Profile} path='/profile'/>
            <Route exact component={Record} path='/profile/record'/>
        </Switch>
        {/* </LayoutProfile> */}
       </BrowserRouter>
     );
}
 
export default AppRoute;