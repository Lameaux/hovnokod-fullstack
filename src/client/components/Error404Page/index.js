import React, { useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {pageTitle} from "../../constants/texts";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

const PAGE_TITLE = '404 - Stránka nebyla nalezena';

export default function Error404Page() {
    const classes = useStyles();

    useEffect(() => {
        document.title = pageTitle(PAGE_TITLE);
    });

    return (
        <Paper className={classes.root}>
            <Typography component="h1" variant="h4" paragraph>
                {PAGE_TITLE}
            </Typography>
            <Typography variant="subtitle1" paragraph>
                Zkontrolujte prosím tvar adresy v adresovém řádku Vašeho prohlížeče.
            </Typography>
        </Paper>
    );
}
