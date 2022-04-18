import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import NotFound from './NotFound';
import Landing from "./landings";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/restaurants/:restaurantId' component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>

  )
}

export default Router;