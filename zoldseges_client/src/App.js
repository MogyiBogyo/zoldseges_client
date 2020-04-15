import React from 'react';
import './App.scss';
import { Switch, Router } from 'react-router-dom';

import LoggedOutRoute from './routers/LoggedOut';
import LoggedInRoute from './routers/LoggedIn';
import Login from './components/Login/Login';

import Sales from './components/Sales/Sales';

import Users from './components/Users/Users';
import EditUser from './components/Users/User/EditUser';
import CreateUser from './components/Users/User/CreateUser';

import Products from './components/Products/Products';
import EditProduct from './components/Products/Product/EditProduct';
import CreateProduct from './components/Products/Product/CreateProduct';

import Categories from './components/Categories/Categories';
import CreateCategory from './components/Categories/Category/CreateCategory';
import EditCategory from './components/Categories/Category/EditCategory';

import Stocks from './components/Stocks/Stocks';
import EditStock from './components/Stocks/Stock/EditStock';
import CreateStock from './components/Stocks/Stock/CreateStock';

import Incomes from './components/Incomes/Incomes';
import EditIncome from './components/Incomes/Income/EditIncome';
import CreateIncome from './components/Incomes/Income/CreateIncome';

import PlannedOrders from './components/PlannedOrders/Plannedorders';
import EditPlannedOrders from './components/PlannedOrders/PlannedOrder/EditPlannedOrder';
import CreatePlannedOrder from './components/PlannedOrders/PlannedOrder/CreatePlannedOrder';


import Worktimes from './components/WorkTimes/Worktimes';
import CreateSale from './components/Sales/Sale/CreateSale';
import EditSale from './components/Sales/Sale/EditSale';


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

        {/* Stock management pages */}
        <LoggedInRoute exact path="/stocks" component={Stocks} />
        <LoggedInRoute exact path="/stocks/new" component={CreateStock} />
        <LoggedInRoute exact path="/stocks/edit/:id" component={EditStock} />

        {/* Income management pages */}
        <LoggedInRoute exact path="/incomes" component={Incomes} />
        <LoggedInRoute exact path="/incomes/new" component={CreateIncome} />
        <LoggedInRoute exact path="/incomes/edit/:id" component={EditIncome} />


        <LoggedInRoute exact path="/plans" component={PlannedOrders} />
        <LoggedInRoute exact path="/plans/new" component={CreatePlannedOrder} />
        <LoggedInRoute exact path="/plans/edit/:id" component={EditPlannedOrders} />


        <LoggedInRoute exact path="/users" role="ROLE_ADMIN" component={Users} />
        <LoggedInRoute exact path="/users/new" component={CreateUser} />
        <LoggedInRoute exact path="/users/edit/:id" component={EditUser} />

        <LoggedInRoute exact path="/sales" component={Sales} />
        <LoggedInRoute exact path="/sales/new" component={CreateSale} />
        <LoggedInRoute exact path="/sales/edit/:id" component={EditSale} />



        <LoggedInRoute exact path="/worktimes" component={Worktimes} />


        {/* TODO add worktime pages -> beosztás */}


      </Switch>
    </Router>
  );
}

export default App;
