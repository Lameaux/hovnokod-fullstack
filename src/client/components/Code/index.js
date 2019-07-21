import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CommentIcon from '@material-ui/icons/Comment';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import CATEGORIES from "../../constants/categories";
import CodeBlock from '../CodeBlock';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(0,0,2,0)
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default ({code}) => {
    const classes = useStyles();

    const codeTitle = CATEGORIES[code.category_id] + ' #' + code.id;

    return (
        <Paper className={classes.root}>
            <Typography component="h2" variant="h5">
                {codeTitle}
            </Typography>
            <Typography variant="subtitle1" paragraph>
                {code.description}
            </Typography>
            <CodeBlock language={code.category_id} value={code.code} />
            <Typography variant="subtitle1" color="textSecondary">
                {code.created}
            </Typography>
            <Typography variant="subtitle1" color="primary">
                <Button variant="contained" color="primary" component={RouterLink} to={'/' + code.id}>
                    <CommentIcon className={classes.leftIcon} />
                    Přidat komentář
                </Button>
            </Typography>
        </Paper>
    );
}