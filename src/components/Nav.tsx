import * as React from "react";
//import { Link } from "react-router-dom";
import history from "../routes/history";
import { Link, Stack } from "@chakra-ui/core";

const Nav = () => (
  <Stack direction="row" spacing={10}>
    <Link onClick={() => history.push("cost")}>Delivery Cost</Link>
    <Link onClick={() => history.push("routes")}>Routes</Link>
    <Link onClick={() => history.push("cheapest")}>Cheapest Cost</Link>
    <Link onClick={() => history.push("add")}>Add New Route</Link>
  </Stack>
);

export default Nav;
