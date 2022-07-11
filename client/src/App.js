import React from "react"
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";


const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route component={() => (<Redirect to={"/posts"} />)} exact path="/" />
          <Route component={Home} exact path="/posts" />
          <Route path="/posts/search" component={Home} exact />
          <Route path="/posts/:id" component={PostDetails} exact />
          <Route component={() => (<Auth />)} exact path="/auth" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;