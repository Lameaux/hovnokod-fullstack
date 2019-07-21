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

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import CATEGORIES, { ALL_CATEGORIES } from '../../constants/categories';

const theme = createMuiTheme();

export default () => {
    const [category, setCategory] = useState('');

    const categoryListPage = props => {
        return <CodeListPage setCategory={setCategory} {...props} />
    };

    const codePage = props => {
        return <CodePage setCategory={setCategory} {...props} />
    };

    return (
        <ThemeProvider theme={theme}>
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

                            <Route exact path="/:id" render={codePage} />
                        </Switch>
                    </div>
                    <PageFooter />
                </ScrollToTop>
            </Router>
        </ThemeProvider>
    );
}
