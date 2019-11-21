import * as React from "react";
import * as ReactDOM from "react-dom";
import { Routes } from "./routes";

import "whatwg-fetch"
import "core-js/fn/array/find";

import "./index.css";
import "./../node_modules/font-awesome/css/font-awesome.css";


ReactDOM.render(
  <Routes/>,
  document.getElementById("root") as HTMLElement
);
