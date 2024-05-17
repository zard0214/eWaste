import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Changpwd from '../user/changepwd/Changpwd';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler1 from '../user/oauth2/OAuth2RedirectHandler1';
import NotFound from '../common/NotFound';
import NotAccess from '../common/NoAccess';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import {ACCESS_TOKEN, CURRENTUSER, ISADMIN} from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import ParticlesBg from 'particles-bg'
import Orders from "../components/OrdersMgmt";
import Users from "../components/UsersMgmt";
import Products from "../components/ProductsMgmt";
import UserForm from "../components/UserForm"
import UserFormV2 from "../components/UserFormV2"
import BrandsMgmt from "../components/BrandsMgmt"
import SeriesMgmt from "../components/SeriesMgmt"
import ProductForm from '../components/ProductForm';
import BrandsForm from '../components/BrandsForm';
import SeriesForm from '../components/SeriesForm';
import SeriesFormV2 from '../components/SeriesFormV2';
import OrderEdit from '../components/OrderForm';

import ProductMgmtV2 from "../components/ProductMgmtV2"
import ProductFormV2 from "../components/ProductFormV2";

import StoresMgmt from "../components/StoresMgmt"
import StoresForm from '../components/StoresForm';
import StoresFormV2 from '../components/StoresFormV2';

import StoreProductsMgmt from "../components/StoreProductsMgmt"
import StoreProductsForm from '../components/StoreProductsForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
    .then(response => {
      localStorage.setItem(CURRENTUSER, response.result.imageUrl);
      const authorities = response.result.authorities;
      let authoritiesd = 0;
      let isAdmin = 0;
      authorities.map(auth => {
        if(auth.roleCode == "ROLE_STAFF"){
          authoritiesd = 1;
        }
        if(auth.roleCode == "ROLE_ADMIN"){
          authoritiesd = 1;
          isAdmin = 1
        }
      })
      if(authoritiesd != 1){
        // Alert.fail("You DO NOT have access!");
        this.props.history.push("/notaccess");
      }
      if(isAdmin == 1){
        // Alert.fail("You DO NOT have access!");
        localStorage.setItem(ISADMIN, "TRUE");
      }else{
        localStorage.setItem(ISADMIN, "FALSE");
      }

      this.setState({
        currentUser: response.result,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });
    });
  }

  handleLogout() {
    localStorage.removeItem(CURRENTUSER);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ISADMIN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {

    let config = {
      num: [4, 7],
      rps: 1,
      radius: [5, 40],
      life: [40, 50],
      v: [20, 30],
      tha: [-40, 40],
      alpha: [0.6, 0],
      scale: [1, 0.1],
      position: "center",
      cross: "dead",
      random: 15,
      g: 100,
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      }
    };

    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (

      <div className="app">
        <div>
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <PrivateRoute exact authenticated={this.state.authenticated} path="/" currentUser={this.state.currentUser} 
              component={Home}></PrivateRoute>
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>
            <PrivateRoute exact path="/orders" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Orders}></PrivateRoute>
            <PrivateRoute exact path="/users" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Users}></PrivateRoute>
            <PrivateRoute path="/users/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={UserForm}></PrivateRoute>
            {/* <PrivateRoute path="/users/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={UserFormV2}></PrivateRoute> */}
            <PrivateRoute exact path="/products" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Products}></PrivateRoute>
            <PrivateRoute path="/orders/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={OrderEdit}></PrivateRoute>
            <PrivateRoute path="/products/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={ProductForm}></PrivateRoute>

            <PrivateRoute path="/brands/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={BrandsForm}></PrivateRoute>
            <PrivateRoute path="/series/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={SeriesFormV2}></PrivateRoute>
            {/*<PrivateRoute path="/series/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={SeriesForm}></PrivateRoute>*/}

            <PrivateRoute exact path="/brands" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={BrandsMgmt}></PrivateRoute>
            <PrivateRoute exact path="/series" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={SeriesMgmt}></PrivateRoute>

            <PrivateRoute exact path="/productsV2" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={ProductMgmtV2}></PrivateRoute>
            <PrivateRoute exact path="/productsV2/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={ProductFormV2}></PrivateRoute>

            <PrivateRoute exact path="/stores" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={StoresMgmt}></PrivateRoute>
            {/*<PrivateRoute path="/stores/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={StoresForm}></PrivateRoute>*/}
            <PrivateRoute path="/stores/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={StoresFormV2}></PrivateRoute>

            <PrivateRoute exact path="/storesProducts" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={StoreProductsMgmt}></PrivateRoute>
            <PrivateRoute path="/storesProducts/:id" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={StoreProductsForm}></PrivateRoute>

            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/changepwd"
              render={(props) => <Changpwd authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler1}></Route>
            <Route component={NotFound}></Route>

            <PrivateRoute exact path="/notaccess" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={NotAccess}></PrivateRoute>
          </Switch>
        </div>
        <Alert stack={{limit: 3}}
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
        <ParticlesBg color='#909399' type="cobweb" bg={true} config={config} />
      </div>


    );
  }
}

export default App;
