import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/styles';
import {withFirebase} from "../Firebase";
import Loading from "../Loading";
import history from "../History";
import {pageTitle, SITE_URL, DISQUS_SHORTNAME} from '../../constants/texts';
import { generateCode } from '../../constants/stubs';
import CATEGORIES from "../../constants/categories";
import TimeAgo from "react-timeago";
import CodeBlock from "../CodeBlock";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import czechStrings from "react-timeago/lib/language-strings/cs";

import { DiscussionEmbed } from 'disqus-react';

const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(0,0,2,0)
    },
});

class CodePage extends React.Component {
    state = {
        code: null,
        loading: true,
    };

    _mounted = false;

    loadCode = () => {
        const code_id = this.props.match.url.slice(1);

        this.updateCode(generateCode(code_id));
    };

    updateCode = (code) => {
        if (!this._mounted) return;

        if (!code.exists) {
            history.push('/error404');
            return;
        }

        const codeData = code.data();

        this.props.setCategory(codeData.category_id);

        this.setState({
            code: codeData,
            loading: false,
        });

        document.title = pageTitle(this.codeTitle(codeData));
    };

    codeTitle = (code) => {
        if (code === null) return null;
        return `${CATEGORIES[code.category_id]} #${code.id}`;
    };

    componentDidMount() {
        this._mounted = true;

        this.loadCode();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        const { code } = this.state;
        const { classes } = this.props;

        const codeTitle = this.codeTitle(code);

        const disqusConfig = {
            url: `${SITE_URL}/${code.id}`,
            identifier: code.id,
            title: codeTitle,
        };

        const formatter = buildFormatter(czechStrings);

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

                <DiscussionEmbed shortname={DISQUS_SHORTNAME} config={disqusConfig} />
            </Paper>
        );
    }
}

export default withFirebase(withStyles(styles)(CodePage));
