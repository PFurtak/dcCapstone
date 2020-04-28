import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TopBar from '../sections/TopBar1';
import { GreenButton, BlackLink } from '../styledComponents';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <BlackLink color='inherit' href='https://material-ui.com/'>
        Stonks JS
      </BlackLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  cssLabel: {
    '&$cssFocused': {
      color: '#2F2F2F',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#2F2F2F', //focused
      color: '#2F2F2F',
    },
  },
  notchedOutline: {},
  cssFocused: {},
  error: {},
  disabled: {},
  paper: {
    marginTop: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#D7A02B',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error === 'Invalid Credentials.') {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Please fill in all fields');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <>
      <div className='landing'>
        <TopBar />
      </div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              className={classes.root}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              value={email}
              onChange={onChange}
              autoComplete='email'
              autoFocus
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              value={password}
              onChange={onChange}
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <GreenButton
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign In
            </GreenButton>
            <Grid container>
              <Grid item xs>
                <BlackLink href='#' variant='body2'>
                  Forgot password?
                </BlackLink>
              </Grid>
              <Grid item>
                <BlackLink href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </BlackLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Login;
