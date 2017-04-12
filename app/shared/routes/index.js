"use strict";

import { connected as AppComponent } from "../../app";
import HomeComponent from "../../home/containers/home";
import { connected as UniversalComponent } from "../../universal/containers/universal";

const routes = {
  path: "",
  component: AppComponent,
  childRoutes: [{
    path: "/",
    component: HomeComponent,
  }, {
    path: "/universal",
    component: UniversalComponent,
  }],
};

export { routes };
