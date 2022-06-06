import React, { useState, useEffect, useCallback } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import falcon from "../../images/falcon.jpg"
import useStyles from './styles';
import decode from 'jwt-decode';


const Navbar = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')

    setUser(null)
  }, [dispatch, history])


  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">My App</Typography>
        <img className={classes.image} src={falcon} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {
          user ?
            (<div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} > {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.username} variant='h6'>{user.result.name}</Typography>
              <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
            </div>) : (
              <Button component={Link} to='/auth' variant='contained' color='primary'>Sign Up</Button>
            )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar