import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import SignUp from "./containers/SignUp";
import Connect from "./containers/Connect";
import Publish from "./containers/Publish";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    userName: Cookies.get("username") || null,
    userId: null,
    token: Cookies.get("token") || null
  };

  signUpTo = async inputs => {
    console.log(inputs);
    const response = await axios.post(
      "https://leboncoin-server.herokuapp.com/user/sign_up",
      inputs
    );

    await Cookies.set("token", response.data.token);
    await Cookies.set("username", response.data.account.username);

    await this.setState({
      userId: response.data._id,
      token: Cookies.get("token"),
      userName: Cookies.get("username")
    });
  };

  connectTo = async inputs => {
    const response = await axios.post(
      "https://leboncoin-server.herokuapp.com/user/log_in",
      inputs
    );

    console.log(response.data);

    await Cookies.set("token", response.data.token);
    await Cookies.set("username", response.data.account.username);

    await this.setState({
      userId: response.data._id,
      token: Cookies.get("token"),
      userName: Cookies.get("username")
    });
  };

  deconnect = async () => {
    await Cookies.remove("token");
    await Cookies.remove("username");
    await this.setState({
      userId: null,
      token: null,
      userName: null
    });
  };
  render() {
    return (
      <Router>
        <>
          <Header
            token={this.state.token}
            deconnect={this.deconnect}
            userName={this.state.userName}
          />
          <Switch>
            <Route
              exact={true}
              path="/connect"
              render={props => (
                <Connect
                  connectTo={inputs => this.connectTo(inputs)}
                  {...props}
                />
              )}
            />
            <Route
              exact={true}
              path="/sign_up"
              render={props => (
                <SignUp signUpTo={inputs => this.signUpTo(inputs)} {...props} />
              )}
            />
            <Route
              exact={true}
              path="/"
              render={props => <Home token={this.state.token} {...props} />}
            />
            <Route
              exact={true}
              path="/offers"
              render={props => <Offers {...props} />}
            />
            <Route
              path="/offers/offer/:id"
              render={props => <Offer {...props} />}
            />

            <Route
              path="/publish"
              render={props => <Publish token={this.state.token} {...props} />}
            />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
