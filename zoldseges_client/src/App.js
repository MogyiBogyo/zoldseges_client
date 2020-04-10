import React from 'react';
import './App.scss';
import { Route, Switch, Router} from 'react-router-dom';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Stocks from './components/Stocks/Stocks';
import LoggedOutRoute from './routers/LoggedOut';
import LoggedInRoute from './routers/LoggedIn';
import Login from './components/Login/Login';
import PlannedOrders from './components/PlannedOrders/Plannedorders';
import Sales from './components/Sales/Sales';
import Users from './components/Users/Users';
import CreateCategory from './components/Categories/CreateCategory';

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
        <LoggedInRoute exact path="/products" component={Products} />
        {/* Category management pages */ }
        <LoggedInRoute exact path="/categories" component={Categories} />
        <LoggedInRoute exact path="/categories/new" component={CreateCategory} />
        <LoggedInRoute exact path="/categories/edit/:id" component={CreateCategory} />
        
        <LoggedInRoute exact path="/orders" component={PlannedOrders} />
        <LoggedInRoute exact path="/sales" component={Sales} />
        <LoggedInRoute exact path="/users" component={Users} />
      </Switch>
    </Router>
  );
}

export default App;
