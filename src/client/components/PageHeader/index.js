import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

const logo = require('../../images/hovno.png');

export default () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        menuDrawer: false,
    });

    const toggleMenuDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, menuDrawer: open });
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Hidden smUp>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                onClick={toggleMenuDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>

                        <img src={logo} alt="Hovnokod.cz Logo" />
                        <Typography variant="h6" className={classes.title}>
                            Hovnokod.cz
                        </Typography>

                        <Hidden xsDown>
                            <Button
                                color="inherit"
                                className={classes.button}
                            >
                                <CommentIcon className={classes.leftIcon} />
                                Vložit příspěvek
                            </Button>
                            <Button
                                color="inherit"
                                className={classes.button}
                            >
                                <AccountIcon className={classes.leftIcon} />
                                Přihlásit se
                            </Button>
                        </Hidden>
                    </Toolbar>
                </AppBar>
            </div>
            <Drawer anchor="left" open={state.menuDrawer} onClose={toggleMenuDrawer(false)}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={toggleMenuDrawer(false)}
                    onKeyDown={toggleMenuDrawer(false)}
                >
                    <List>
                        <ListItem>
                            <ListItemIcon><CloseIcon /></ListItemIcon>
                            <ListItemText primary="Zavřít" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemIcon><AccountIcon /></ListItemIcon>
                            <ListItemText primary="Přihlásit se" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CommentIcon /></ListItemIcon>
                            <ListItemText primary="Vložit příspěvek" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </React.Fragment>
    );
}