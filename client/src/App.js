import React from "react"
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


const App = () => {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <BrowserRouter>
      <Container maxWidth="lg" style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
        <Navbar />
        <div
        >
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
        <Switch>
          <Route component={() => (<Redirect to={"/posts"} />)} exact path="/" />
          <Route component={() => (<Home theme={theme} />)} exact path="/posts" />
          <Route path="/posts/search" component={() => (<Home theme={theme} />)} exact />
          <Route path="/posts/:id" component={() => (<PostDetails theme={theme} />)} exact />
          <Route component={() => (<Auth />)} exact path="/auth" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;