import React from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import CATEGORIES, { ALL_CATEGORIES } from '../../constants/categories';
import { pageTitle } from '../../constants/texts';
import { generateCodes } from '../../constants/stubs';

import Code from '../Code';
import {withFirebase} from "../Firebase";
import Loading from "../Loading";
import Banner from "../Banner";


const CODES_PER_PAGE = 20;

const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing(1),
    },
});

class CodeListPage extends React.Component {
    constructor(props) {
        super(props);

        this.category_id = props.match.path.slice(1);
        props.setCategory(this.category_id);

        this.state = {
            codes: [],
            loading: false,
            loadMore: false,
        };
    }

    _mounted = false;

    componentDidMount() {
        this._mounted = true;

        let categoryName = CATEGORIES[this.category_id];
        if (categoryName === undefined) {
            categoryName = ALL_CATEGORIES;
        }

        document.title = pageTitle(categoryName);

        this.loadCodes();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    fakeLoadCodes = () => {
        this.updateCodes(generateCodes(CODES_PER_PAGE));
    };

    loadCodes = () => {
        this.setState({loading: true, loadMore: false});

        // TODO: quota
        return this.fakeLoadCodes();

        let codesRef = this.props.firebase.codes();
        if (this.category_id !== '') {
            codesRef = codesRef.where('category_id', '==', this.category_id);
        }
        codesRef = codesRef.orderBy('created', 'desc');

        if (this.state.codes.length > 0) {
            let lastCode = this.state.codes[this.state.codes.length - 1];
            codesRef = codesRef.startAfter(lastCode.created);
        }

        codesRef.limit(CODES_PER_PAGE).get().then(
            snapshot => {

                let list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });

                this.updateCodes(list);
            }
        );
    };

    updateCodes = (codes) => {
        if (!this._mounted) return;

        this.setState(prev => ({
            loading: false,
            loadMore: codes.length === CODES_PER_PAGE,
            codes: prev.codes.concat(codes),

        }));
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                { this.category_id === '' && <Banner /> }

                {
                    this.state.codes.map(
                        code => <Code key={code.id} code={code} />
                    )
                }

                <Box display="flex" justifyContent="center" m={3}>
                    { this.state.loading && <Loading /> }
                    { this.state.loadMore &&
                        (
                            <React.Fragment>
                                <Button variant="text" color="secondary" onClick={this.loadCodes}>
                                    <RefreshIcon className={classes.leftIcon} />
                                    Načíst další
                                </Button>

                                <Button variant="text" color="primary" onClick={this.scrollToTop}>
                                    <ArrowUpward className={classes.leftIcon} />
                                    Nahoru
                                </Button>
                            </React.Fragment>
                        )
                    }
                </Box>

            </React.Fragment>
        );
    }

}

export default withFirebase(withStyles(styles)(CodeListPage));