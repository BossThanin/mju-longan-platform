import logo from './logo.svg';
import './App.css';
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import React, {useCallback} from "react";
import Login from "./views/Login";
import {setToken} from "./api/Api";
import {store, persistor} from "./redux/store";
import Register from "./views/Register";
import {Route, Routes, useLocation, useParams} from "react-router-dom";
import AppRouter from "./router";
import Home from "./views/home/Home";
import FarmerList from "./views/farmer/FarmerList";
const userStore = store.getState() && store.getState().app && store.getState().app.user;
const AuthApp = () => {
  let user = null;
  let location = useLocation();
  const hasToken = useSelector(state => {
    user = state.app.user;
    return !!state.app.token
  })

  return !hasToken
    ? location && location.pathname === '/register' ? <Register/> : <Login/>
    : <AppRouter user={user}/>
}

const AuthLanding = () => {
  let user = null;
  const hasToken = useSelector(state => {
    user = state.app.user;
    return !!state.app.token
  })

  return hasToken ? user && user.type === 'ADMIN' ? <FarmerList/> : <Home/> : <div></div>
}

function App() {
  const beforeLift = useCallback(() => {
    if(store.getState().app && store.getState().app.token){
      setToken(store.getState().app.token)
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={beforeLift}>
        <Routes>
          <Route exact path="/" element={<AuthLanding/>}/>
        </Routes>
        <AuthApp/>
       </PersistGate>
    </Provider>
  );
}

export default App;
