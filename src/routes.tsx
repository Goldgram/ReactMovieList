import * as React from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { ListController } from "./list/controller";
import { ItemController } from "./item/controller";

export const Routes = () => {
  return <BrowserRouter>
    <React.Fragment>
      <Header />
      <Route path="/" exact={true} component={ListController} />
      <Route path="/:movieId" component={ItemController} />
    </React.Fragment>
  </BrowserRouter>;
};

const Header = () => <div className="content-container">
  <Link to="/">
    <div className="logo">
      <i className="fa fa-film padding-right-10"/> Top Movies
    </div>
  </Link>
</div>;
