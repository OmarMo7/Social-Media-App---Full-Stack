import React from "react";
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import useStyles from './styles';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const App = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const classes = useStyles();

  document.body.style.backgroundColor = theme.palette.background.default;

  return (
    <BrowserRouter>
      <Container className={classes.height} style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }} >
        <Navbar />
        <Box className={classes.darkModeButton} style={{ backgroundColor: theme.palette.buttons.main }} variant="contained" onClick={colorMode.toggleColorMode}>
          <Typography style={{ color: theme.palette.modeButton.main, fontSize: '0.85rem' }}>
            {theme.palette.mode} mode
          </Typography>
          <IconButton sx={{ ml: 2 }}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Routes>
          <Route exact path="/" element={<Home theme={theme} />} />
          <Route path="/posts" element={<Home theme={theme} />} />
          <Route path="/posts/search" element={<Home theme={theme} />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<Auth theme={theme} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
