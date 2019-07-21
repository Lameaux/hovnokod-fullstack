import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CommentIcon from '@material-ui/icons/Comment';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import CATEGORIES from "../../constants/categories";
import {SITE_URL, DISQUS_SHORTNAME} from "../../constants/texts";
import CodeBlock from '../CodeBlock';
import {Link as RouterLink} from 'react-router-dom';

import TimeAgo from 'react-timeago'
import czechStrings from 'react-timeago/lib/language-strings/cs'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import { CommentCount } from 'disqus-react';

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

    const formatter = buildFormatter(czechStrings);

    const disqusConfig = {
        url: `${SITE_URL}/${code.id}`,
        identifier: code.id,
        title: codeTitle,
    };


    return (
        <Paper className={classes.root}>
            <Typography component="h2" variant="h5">
                {codeTitle}
            </Typography>
            <Typography variant="caption" color="textSecondary">
                <TimeAgo date={code.created} formatter={formatter} />
            </Typography>
            <Typography variant="subtitle1" paragraph>
                {code.description}
            </Typography>
            <CodeBlock language={code.category_id} value={code.code} />

            <Button variant="text" color="primary" component={RouterLink} to={'/' + code.id}>
                <CommentCount
                    shortname={DISQUS_SHORTNAME}
                    config={disqusConfig}
                >
                    0 comments
                </CommentCount>
            </Button>

            <Button variant="text" color="primary" component={RouterLink} to={'/' + code.id}>
                <CommentIcon className={classes.leftIcon} />
                Přidat komentář
            </Button>
        </Paper>
    );
}