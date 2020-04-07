import React from 'react';
import './App.css';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Stocks from './components/Stocks/Stocks';



function App() {
  return (
    <div className="App">
      <div>Wellcome little grocer</div>
      <Stocks />
    </div>
  );
}

export default App;
