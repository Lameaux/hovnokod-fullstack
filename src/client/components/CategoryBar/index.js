import React from 'react';
import history from '../History';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CATEGORIES, { ALL_CATEGORIES } from '../../constants/categories';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default ({category}) => {
    const classes = useStyles();

    function handleChange(event, newCategory) {
        history.push(`/${newCategory}`);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={category}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label={ALL_CATEGORIES} value="" style={{ minWidth: 0 }} />
                    {
                        Object.keys(CATEGORIES).map(category => (
                            <Tab
                                key={category}
                                label={CATEGORIES[category]}
                                value={category}
                                style={{ minWidth: 0 }}
                            />
                        ))
                    }
                </Tabs>
            </AppBar>
        </div>
    );
}
