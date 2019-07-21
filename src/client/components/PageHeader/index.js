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
import CodeIcon from '@material-ui/icons/Code';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import history from '../History';
import classNames from 'classnames';

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
    listItem: {
        cursor: "pointer",
    },
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    linkCursor: {
        cursor: "pointer",
    }
}));

const logo = require('../../images/hovno.png');

export default ({setOpenDialog}) => {
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

    const redirectToHome = () => {
        history.push('/')
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

                        <img src={logo} alt="Hovnokod.cz Logo" className={classes.linkCursor} onClick={redirectToHome} />
                        <Typography
                            variant="h6"
                            className={classNames(classes.title, classes.linkCursor)}
                            onClick={redirectToHome}
                        >
                            Hovnokod.cz
                        </Typography>

                        <Hidden xsDown>
                            <Button onClick={() => setOpenDialog(true)}
                                color="inherit"
                                className={classes.button}
                            >
                                <CodeIcon className={classes.leftIcon} />
                                Vložit zdroják
                            </Button>
                        </Hidden>
                    </Toolbar>
                </AppBar>
            </div>
            <Drawer anchor="left" open={state.menuDrawer} onClose={toggleMenuDrawer(false)}>
                <div
                    className={classes.listItem}
                    role="presentation"
                    onClick={toggleMenuDrawer(false)}
                    onKeyDown={toggleMenuDrawer(false)}
                >
                    <List>
                        <ListItem className={classes.list}>
                            <ListItemIcon><CloseIcon /></ListItemIcon>
                            <ListItemText primary="Zavřít" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem className={classes.listItem} onClick={() => setOpenDialog(true)}>
                            <ListItemIcon><CodeIcon /></ListItemIcon>
                            <ListItemText primary="Vložit zdroják" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </React.Fragment>
    );
}