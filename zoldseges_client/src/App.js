import React from 'react';
import './App.scss';
import { Switch, Router } from 'react-router-dom';
import Stocks from './components/Stocks/Stocks';
import LoggedOutRoute from './routers/LoggedOut';
import LoggedInRoute from './routers/LoggedIn';
import Login from './components/Login/Login';
import PlannedOrders from './components/PlannedOrders/Plannedorders';
import Sales from './components/Sales/Sales';
import Users from './components/Users/Users';

import Products from './components/Products/Products';
import EditProduct from './components/Products/Product/EditProduct';
import CreateProduct from './components/Products/Product/CreateProduct';

import Categories from './components/Categories/Categories';
import CreateCategory from './components/Categories/Category/CreateCategory';
import EditCategory from './components/Categories/Category/EditCategory';





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

        {/* Product management pages */}
        <LoggedInRoute exact path="/products" component={Products} />
        <LoggedInRoute exact path="/products/new" component={CreateProduct} />
        <LoggedInRoute exact path="/products/edit/:id" component={EditProduct} />

        {/* Category management pages */}
        <LoggedInRoute exact path="/categories" component={Categories} />
        <LoggedInRoute exact path="/categories/new" component={CreateCategory} />
        <LoggedInRoute exact path="/categories/edit/:id" component={EditCategory} />

        <LoggedInRoute exact path="/stocks" component={Stocks} />
        <LoggedInRoute exact path="/orders" component={PlannedOrders} />
        <LoggedInRoute exact path="/sales" component={Sales} />
        <LoggedInRoute exact path="/users" component={Users} />

        {/* TODO add worktime pages -> beosztás */}


      </Switch>
    </Router>
  );
}

export default App;
