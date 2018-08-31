import React from 'react';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import Characters from './Characters';

const Routes = () => {
   return (
      <BrowserRouter>
         <ScrollToTop>
            <Switch>
               <Redirect exact from='/' to='/characters' />
               <Route exact path='/characters' component={Characters} />
            </Switch>
         </ScrollToTop>
      </BrowserRouter>
   );
};

export default Routes;
