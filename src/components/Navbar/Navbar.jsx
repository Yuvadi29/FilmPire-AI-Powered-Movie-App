import React, { useState } from 'react';
import { AppBar, Avatar, Button, Drawer, IconButton, Menu, Toolbar, useMediaQuery } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, MenuBook, MenuBookOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useTheme } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../Features/auth';

const Navbar = () => {

    const { isAuthenticated, user } = useSelector(userSelector);
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const token = localStorage.getItem('request_token');
    const sessionIdFromLocalStorage = localStorage.getItem('sessionId');
    const dispatch = useDispatch();

    useEffect(() => {
        const logInUser = async () => {
            if (token) {
                if (sessionIdFromLocalStorage) {
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);

                    dispatch(setUser(userData));

                } else {
                    const sessionId = await createSessionId();

                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);

                    dispatch(setUser(userData));

                }
            }
        };

        logInUser();
    }, [token]);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            style={{ outline: "none" }}
                            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                            className={classes.menuButton}
                        >
                            <MenuBook />
                        </IconButton>
                    )}
                    <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => { }}>
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    {!isMobile && <Search />}

                    <div>
                        {!isAuthenticated ? (
                            <Button color='inherit' onClick={fetchToken}>
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button
                                color='inherit'
                                component={Link}
                                to={`/profile/${user.id}`}
                                className={classes.linkButton}
                                onClick={() => { }}
                            >
                                {!isMobile && <>My Movies &nbsp;</>}
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

            <div>
                <nav className={classes.drawer}>
                    {isMobile ? (
                        <Drawer
                            variant="temporary"
                            anchor="right"
                            open={mobileOpen}
                            classes={{ paper: classes.drawerPaper }}
                            ModalProps={{ keepMounted: true }}
                            onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                        >
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </Drawer>
                    ) : (
                        <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </Drawer>
                    )}
                </nav>
            </div>
        </>
    )
}

export default Navbar;