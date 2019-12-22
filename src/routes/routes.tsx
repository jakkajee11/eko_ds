import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "../components/Main";
import PageNotFound from "../components/PageNotFound";
import DeliveryCost from "../components/DeliveryCost";
import PossibleDeliveryRoute from "../components/PossibleDeliveryRoute";
import CheapestDeliveryCost from "../components/CheapestDeliveryCost";

const Routes = (
  <>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/cost" exact component={DeliveryCost} />
      <Route path="/routes" exact component={PossibleDeliveryRoute} />
      <Route path="/cheapest" exact component={CheapestDeliveryCost} />
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default Routes;
