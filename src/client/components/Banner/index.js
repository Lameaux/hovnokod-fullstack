import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CodeIcon from '@material-ui/icons/Code';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(0,0,2,0)
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default ({setOpenDialog}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography component="h2" variant="h5">
                Mistři v programování na Hovnokod.cz
            </Typography>
            <Typography variant="subtitle1" paragraph>
                Narazili jste na zprasený kód? Nahrajte ho sem.
            </Typography>
            <Button variant="text" color="secondary" onClick={() => setOpenDialog(true)}>
                <CodeIcon className={classes.leftIcon} />
                Vložit zdroják
            </Button>
        </Paper>
    );
}