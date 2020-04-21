import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './navbar.css'


export default function ButtonAppBar() {
    return (
        <div className="root">
            <AppBar position="static">
                <Toolbar className="navBar">
                    <Typography variant="h6" className="title">
                        <a href="/">Stonks JS</a>
                    </Typography>
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href="/signup">Signup</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}