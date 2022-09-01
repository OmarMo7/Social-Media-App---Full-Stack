import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Input from './Input';
import GoogleButton from '../Auth/GoogleButton'
import Error from '../Error/Error';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = ({ theme }) => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()
  const error = useSelector(state => state.auth.error)
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    var emailValue = document.getElementsByName('email')[0]
    var passValue = document.getElementsByName('password')[0]
    setForm({ ...initialState, email: emailValue.value, password: passValue.value });
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObject
  //   const token = res?.tokenID

  //   try {
  //     dispatch({ type: 'AUTH', payload: { result, token } })

  //     history.push('/')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  // const googleFailure = async (error) => {
  //   console.log(error)
  //   console.log("Goolge Sign In was unsuccessful")
  // }


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3} style={{ backgroundColor: theme.palette.form.main }}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          {error.exists ? <Error errorMessege={error.messege} classes={classes} /> : ''}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleButton
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>

        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;