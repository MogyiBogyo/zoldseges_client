import React from 'react';
import './App.scss';
import { Route, Switch, Router} from 'react-router-dom';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Stocks from './components/Stocks/Stocks';
import LoggedOutRoute from './routers/LoggedOut';
import LoggedInRoute from './routers/LoggedIn';
import Login from './components/Login/Login';

const createBrowserHistory = require("history").createBrowserHistory;
export const history = createBrowserHistory();

export const navigateToCustomPath = (path) => {
  return history.push({
    pathname: path
  });
};


function App() {
  return (
    <Router history={history}>
      <Switch>
        <LoggedOutRoute exact path="/" component={Login} />
        <LoggedInRoute exact path="/stocks" component={Stocks} />
        <LoggedInRoute exact path="/products" component={Stocks} />
        <LoggedInRoute exact path="/order" component={Stocks} />
        <LoggedInRoute exact path="/sell" component={Stocks} />
        <LoggedInRoute exact path="/users" component={Stocks} />
      </Switch>
    </Router>
  );
}

export default App;
