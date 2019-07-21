import React from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import CATEGORIES, { ALL_CATEGORIES } from '../../constants/categories';
import { pageTitle } from '../../constants/texts';

import Code from '../Code';
import {withFirebase} from "../Firebase";
import Loading from "../Loading";

const CODES_PER_PAGE = 20;

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

    fakeLoadCodes = () => {

        let list = [];
        let categories = Object.keys(CATEGORIES);

        for (let i = 0; i < CODES_PER_PAGE; i++) {

            let category_id = categories[Math.floor(Math.random()*categories.length)];

            list.push(
                {
                    id: Math.random(),
                    category_id: category_id,
                    description: 'description',
                    code: 'code',
                    created: '2019-01-01'
                }
            );
        }

        this.updateCodes(list);
    };

    loadCodes = () => {
        this.setState({loading: true, loadMore: false});

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
        return (
            <React.Fragment>

                {
                    this.state.codes.map(
                        code => <Code key={code.id} code={code} />
                    )
                }

                <Box display="flex" justifyContent="center" m={3}>
                    { this.state.loading && <Loading /> }
                    { this.state.loadMore && <Button variant="contained" color="secondary" onClick={this.loadCodes}>Načíst další</Button> }
                </Box>

            </React.Fragment>
        );
    }

}



export default withFirebase(CodeListPage);