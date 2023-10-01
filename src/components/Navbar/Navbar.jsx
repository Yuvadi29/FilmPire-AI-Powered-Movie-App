import React from 'react';
import { AppBar, Avatar, Button, Drawer, IconButton, Menu, Toolbar, useMediaQuery } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, MenuBook, MenuBookOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useTheme } from '@mui/material';

const Navbar = () => {

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isAuthenticated = true;

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            style={{ outline: "none" }}
                            onClick={() => { }}
                            className={classes.menuButton}
                        >
                            <MenuBook />
                        </IconButton>
                    )}
                    <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => { }}>
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    {!isMobile && 'Search...'}

                    <div>
                        {!isAuthenticated ? (
                            <Button color='inherit' onClick={() => { }}>
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button color='inherit' component={Link} to={`/profile/:id`} className={classes.linkButton} onClick={() => { }}>
                                {!isMobile && <>My Movies &nbsp; </>}
                                <Avatar
                                    style={{ width: 30, height: 30 }}
                                    alt='Profile'
                                    src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                                />
                            </Button>
                        )};
                    </div>
                    {isMobile && 'Search...'}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;