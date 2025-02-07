import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { jwtDecode } from 'jwt-decode'; // Update import statement
import { useTheme } from '@mui/styles';

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const theme = useTheme();
  const token = user?.token;

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');

    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token); // Use jwtDecode instead of decode

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, token]);

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      style={{
        backgroundColor: theme.palette.appBar.main,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar>
        <div  component={Link} to="/">
          <a href="/">
            <img
              className={classes.image}
              src={theme.palette.images.appBar}
              alt="fakebook"
              height="60"
            />
          </a>
        </div>
        <Box sx={{ flexGrow: 1 }} /> {/* This will push the button to the right */}
        {user ? (
            <div className={classes.profile}>
              <div style={{marginRight: '20px'}}>
              <Avatar
                alt={user?.result?.name}
                src={user?.result?.imageUrl}
              >
                {user?.result?.name.charAt(0)}
              </Avatar>
              <Typography variant="h6">
                {user?.result?.name}
              </Typography>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : location.pathname !== "/auth" ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <Button component={Link} to="/auth" variant="contained" color="primary">
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <Button component={Link} to="/" variant="contained" color="primary">
                See Posts
              </Button>
            </>
          )}
      </Toolbar>
    </AppBar>
  );  
};

export default Navbar;
