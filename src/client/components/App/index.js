import React, { useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom'
import history from '../History';

import CssBaseline from '@material-ui/core/CssBaseline';

import PageHeader from '../PageHeader';
import CategoryBar from '../CategoryBar';
import PageFooter from '../PageFooter';

import CodeListPage from '../CodeListPage';
import CodePage from '../CodePage';
import ConditionsPage from "../ConditionsPage";
import Error404Page from "../Error404Page";
import ScrollToTop from "../ScrollToTop"

import CATEGORIES, { ALL_CATEGORIES } from '../../constants/categories';

export default () => {
    const [category, setCategory] = useState('');

    const categoryListPage = props => {
        return <CodeListPage setCategory={setCategory} {...props} />
    };

    return (
        <Router history={history}>
            <ScrollToTop>
                <CssBaseline />
                <PageHeader />
                <CategoryBar category={category} />
                <div style={{margin: "20px 5px"}}>
                    <Switch>
                        <Route exact path="/" render={categoryListPage} />
                        <Route exact path="/top(/.*)?" render={categoryListPage} />
                        <Route exact path="/conditions" component={ConditionsPage} />
                        <Route exact path="/error404" component={Error404Page} />

                        {
                            // Categories
                            Object.keys(CATEGORIES).map(
                                key => (
                                    <Route key={key} exact path={'/' + key} render={categoryListPage} />
                                )
                            )
                        }

                        <Route exact path="/:id" component={CodePage} />
                    </Switch>
                </div>
                <PageFooter />
            </ScrollToTop>
        </Router>
    );
}
