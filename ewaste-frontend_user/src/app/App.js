import React, { Component } from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Changpwd from '../user/changepwd/Changpwd';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

import Payment from "../home/payment"
import Menu from "../home/list";
import SearchResult from "../home/search-result";
import Basket from "../home/Basket";
import AddDevice from "../home/AddDevice";
import DeviceDetail from "../home/DeviceDetail";
import Notification from "../home/Notification";
import TypeCategory from "../home/type-category";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import OAuth2RedirectHandler1 from "../user/oauth2/OAuth2RedirectHandler1";

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { BasketProvider } from "../components/BasketContext";
import Introduction from "../home/introduction";
import UserProfile from "../home/user-profile";
import DataRetrieve from "../home/DataRetrieve";
import Payment2 from "../home/payment2";
import About from "../home/about";
import RecycleHomepage from "../home/Recycle_home";
import RecycleMenu from "../home/Re_list.js";
import Re_ProductDetail from "../components/Re-Details";
import Re_DeviceDetail from "../home/Re_DeviceDetail";
import Series_Recycle from "../home/Series_Recycle";
import Re_TypeCategory from "../home/Re_type-category";
import Re_Brands from "../home/Re_Brands";
import Re_SearchResult from "../home/Re-search-result";
import Direct_payment from "../home/direct-payment";
import HelpPage from '../home/help.js';

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
      this.setState({
        currentUser: response.result,
        authenticated: true,
        loading: false
      })
      localStorage.setItem('userId', response.result.id);
    }).catch(error => {
      this.setState({
        loading: false
      });
    });
  }

  handleLogout() {
    window.location.href='/homepage';
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem('userId');
    setTimeout(() => {
      this.setState({
        authenticated: false,
        currentUser: null
      });
      Alert.success("You're safely logged out!");
    }, 1000); // 1000毫秒，即1秒后执行
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {

    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
    <BasketProvider>
      <div className="app">
        <div className="app-body">
          <Routes>
            <Route exact path='/' element={<Introduction/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route path="/re-homepage" element={<RecycleHomepage/>}/>
            <Route path="/homepage" element={<Home/>}></Route>
            <Route path="/user-profile" element={<UserProfile currentUser={this.state.currentUser}  state={this.handleLogout}/>}/>
            <Route path='/payment' element={<Payment/>} />
            <Route path='/direct-payment' element={<Direct_payment/>} />
            <Route path="/payment2" element={<Payment2/>} />
            <Route path='/recycle_menu' element={<RecycleMenu/>} />
            <Route path='/menu' element={<Menu/>} />
            <Route path='/type-category' element={<TypeCategory/>}/>
            <Route path='/re-type-category' element={<Re_TypeCategory/>}/>
            <Route path='/re-brands' element={<Re_Brands/>}/>
            <Route path='/search-results' element={<SearchResult/>}/>
            <Route path='/re-search-results' element={<Re_SearchResult/>}/>
            <Route path="/addDevice" element={<AddDevice />} />
            <Route path="/series_recycle" element={<Series_Recycle/>} />
            <Route path="/recycle-detail" element={<Re_DeviceDetail/>} />
            <Route path="/DeviceDetail" element={<DeviceDetail />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/Basket" element={<Basket />} />
            <Route path="/DataRetrieve" element={<DataRetrieve/>} />
            <Route path="/help" element={<HelpPage/>} />

            <Route path="/login"
                   element={<Login authenticated={this.state.authenticated}/>}></Route>
            <Route path="/signup"
                   element={<Signup authenticated={this.state.authenticated}/>}>
            </Route>
            <Route path="/changepwd"
                   element={<Changpwd authenticated={this.state.authenticated}/>}>
            </Route>
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />}>
            </Route>
            <Route component={NotFound}></Route>
          </Routes>
        </div>
        <Alert stack={{limit: 3}}
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    </BasketProvider>
    );
  }
}

export default App;
