import * as React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <div className="nav">
    <Link to="cost" className="nav-item">
      Delivery Cost
    </Link>
    <Link to="routes" className="nav-item">
      Routes
    </Link>
    <Link to="cheapest" className="nav-item">
      Cheapest Cost
    </Link>
  </div>
);

export default Nav;
