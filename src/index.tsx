import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './resources/index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './header';
import { ItemController } from './item';
import { ListController } from './list';
import registerServiceWorker from './registerServiceWorker';

export const Routes = () => {
  return <React.Fragment>
    <Header />
    <Route path="/" exact={true} component={ListController} />
    <Route path="/:movieId" component={ItemController} />
  </React.Fragment>;
};

ReactDOM.render(
  <BrowserRouter>
    <Routes/>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
