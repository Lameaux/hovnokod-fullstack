import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default () => {
    return (
        <footer style={{margin: "50px 0px"}}>
            <Container maxWidth="lg">
                <Typography variant="subtitle1" align="center" gutterBottom>
                    &copy; 2012-2019 Lameaux
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p" gutterBottom>
                    <Link  underline="hover" color="textPrimary" component={RouterLink} to="/conditions">
                        Podmínky použití
                    </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    Hovnokod.cz (v3.1.beta) je postaven na <strike>PHP</strike>, <strike>Ruby on Rails</strike>,
                    Firebase, Express, React, Node.js a Material-UI. Stále ve výstavbě.
                </Typography>
            </Container>
        </footer>
    );
}