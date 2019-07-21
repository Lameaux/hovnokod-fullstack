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

const PAGE_TITLE = 'Podmínky použití';

export default () => {
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
                Provozovatel nezaručuje, že informace publikované na internetové adrese https://hovnokod.cz jsou pravdivé, správné, úplné a aktuální. Z toho důvodu provozovatel neodpovídá za škodu nebo jinou újmu, která by uživateli uvedených stránek mohla vzniknout v důsledku užití takových informací. Provozovatel dále nenese žádnou odpovědnost za obsah internetových stránek třetích subjektů, na které jeho stránky odkazují.
            </Typography>
            <Typography variant="subtitle1" paragraph>
                Provozovatel neodpovídá za informace nebo obsah materiálů, které na jeho stránky umístí třetí osoby, a to bez ohledu na skutečnost, zda se tak stane s jeho vědomím nebo nikoliv. Provozovatel si však vyhrazuje právo odstranit z internetových stránek jakékoliv informace nebo materiály, které na jeho stránky umístí třetí osoby, a to bez udání důvodu.
            </Typography>
        </Paper>
    );
}