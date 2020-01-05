import * as React from "react";
import { Route, Switch } from "react-router-dom";

import PageNotFound from "../components/PageNotFound";
import DeliveryCost from "../components/DeliveryCost";
import PossibleDeliveryRoute from "../components/PossibleDeliveryRoute";
import CheapestDeliveryCost from "../components/CheapestDeliveryCost";
import Nav from "../components/Nav";
import TestGraph from "../components/TestGraph";
import AddRoute from "../components/AddRoute";

const Routes = (
  <>
    <Nav />
    <Switch>
      <Route path="/" exact component={DeliveryCost} />
      <Route path="/cost" exact component={DeliveryCost} />
      <Route path="/routes" exact component={PossibleDeliveryRoute} />
      <Route path="/cheapest" exact component={CheapestDeliveryCost} />
      <Route path="/test" exact component={TestGraph} />
      <Route path="/add" exact component={AddRoute} />
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default Routes;
