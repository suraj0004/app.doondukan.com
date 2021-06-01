import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from "Components/ProtectedRoute"

import Home from "Pages/Home"
import MyAccount from "Pages/MyAccount"
import Orders from "Pages/Orders"
import OrderDetail from "Pages/Orders/Detail"
import ShopCategories from "Pages/ShopCategories"
import Products from "Pages/ShopCategories/Products"
import AllCart from "Pages/Carts"
import Cart from "Pages/Carts/Cart"

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute exact path='/my-account' component={MyAccount} />
          <ProtectedRoute exact path='/orders' component={Orders} />
          <ProtectedRoute exact path='/all-cart' component={AllCart} />
          <ProtectedRoute exact path='/orders/:order_no' component={OrderDetail} />
          <Route exact path='/:shop_slug' component={ShopCategories} />
          <Route exact path='/:shop_slug/cart' component={Cart} />
          <Route exact path='/:shop_slug/:category_slug' component={Products} />
          <Route path="*" component={() => { return <h1 style={{ textAlign: 'center' }} > 404, PAGE NOT FOUND </h1> }} />
      </Switch>
    </Router>
  );
}

export default App;
