import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Login from "./components/login";
import { withRouter } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Contacts from "./components/contacts"
import Logout from './components/logout'
// import 'bootstrap/dist/css/bootstrap.css';



const App = () => (
  <div className="app">
    <div className="main">
    <Navigation/>
    <Main />
    </div>
    <Footer />
  </div>
);

const AppWithRouter = withRouter(App);

const Main = () => (
  <Switch>
    {/* <Route exact path="/"></Route> */}
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/dashboard" component={Dashboard}></Route>
    <Route exact path="/logout" component={Logout}></Route>
    <Route exact path="/contacts" component={Contacts}></Route>
    <Route exact path="/about" component={About}></Route>
    {/* <Route exact path="/about" component={About}></Route>
    <Route exact path="/contact" component={Contact}></Route>
    <Route exact path="/projects" component={Projects}></Route> */}
  </Switch>
);
export default AppWithRouter;
