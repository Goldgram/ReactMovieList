import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './resources/index.css';
import './../node_modules/font-awesome/css/font-awesome.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './header';
import { ItemController } from './item';
import { ListController } from './list';
// import registerServiceWorker from './registerServiceWorker';

export const Routes = () => {
  return <BrowserRouter>
    <React.Fragment>
      <Header />
      <Route path="/" exact={true} component={ListController} />
      <Route path="/:movieId" component={ItemController} />
    </React.Fragment>
  </BrowserRouter>;
};

ReactDOM.render(
  <Routes/>,
  document.getElementById('root') as HTMLElement
);
