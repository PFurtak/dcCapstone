import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GreenButton, BlackLink } from '../styledComponents';
import AuthContext from '../../context/auth/authContext';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const authContext = useContext(AuthContext);
  const classes = useStyles();

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error === 'User already exists') {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const { firstname, lastname, email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      firstname === '' ||
      lastname === '' ||
      email === '' ||
      password === ''
    ) {
      alert('Please enter all fields');
    } else {
      register({
        firstname,
        lastname,
        email,
        password,
      });
    }
  };

  return (
    <>
      <div className='landing'></div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstname'
                  value={firstname}
                  onChange={onChange}
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
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
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastname'
                  value={lastname}
                  onChange={onChange}
                  autoComplete='lname'
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={email}
                  onChange={onChange}
                  autoComplete='email'
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
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
              </Grid>
            </Grid>
            <GreenButton
              type='submit'
              value='SignUp'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign Up
            </GreenButton>
            <Grid container justify='flex-end'>
              <Grid item>
                <BlackLink href='login' variant='body2'>
                  Already have an account? Sign in
                </BlackLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
