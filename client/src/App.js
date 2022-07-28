import React from "react"
import { Button, Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import useStyles from './styles'
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


const App = () => {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const classes = useStyles()

  document.body.style.backgroundColor = theme.palette.background.default


  return (
    <BrowserRouter>
      <Container className={classes.height} style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }} >
        <Navbar />
        <Button className={classes.darkModeButton} style={{ backgroundColor: theme.palette.buttons.main }} variant="contained" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Button>
        <Switch>
          <Route render={() => (<Redirect to={"/posts"} />)} exact path="/" />
          <Route render={() => (<Home theme={theme} />)} exact path="/posts" />
          <Route path="/posts/search" render={() => (<Home />)} exact />
          <Route path="/posts/:id" render={() => (<PostDetails />)} exact />
          <Route render={() => (<Auth />)} exact path="/auth" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;