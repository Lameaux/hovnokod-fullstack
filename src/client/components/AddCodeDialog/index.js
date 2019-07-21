import React, {  useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import CATEGORIES from '../../constants/categories';
import Snackbar from '../Snackbar';

import history from '../History';

import ReCAPTCHA from "react-google-recaptcha";
import {RECAPTCHA_PUBLIC_KEY} from '../../constants/texts' ;

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default ({open, setOpen}) => {
    const classes = useStyles();

    const initialState = {
        category: 'other',
        description: '',
        code: '',
        recaptcha: '',
    };

    const [state, setState] = useState(initialState);

    const setSnackOpen = (open) => setSnack(prev => ({...prev, open: open}));

    const [snack, setSnack] = useState({
        open: false,
        setOpen: setSnackOpen,
        variant: 'success',
        message: '',
    });

    const handleClose = () => setOpen(false);

    const showSnackError = (message) => {
        setSnack({
            open: true,
            setOpen: setSnackOpen,
            variant: 'error',
            message: message,
        })
    };

    const showSnackSuccess = (message) => {
        setSnack({
            open: true,
            setOpen: setSnackOpen,
            variant: 'success',
            message: message,
        })
    };

    const handleSave = () => {
        if (state.code.length === 0) {
            showSnackError('Zdrojový kód je prázdný');
            return;
        }

        if (state.recaptcha.length === 0) {
            showSnackError('Nejste robot?');
            return;
        }

        fetch('/api/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),

        })
            .then(res => {
                if (!res.ok) {
                    showSnackError(res.statusText);
                    return;
                }

                setState(initialState);
                showSnackSuccess('Zdrojový kód byl úspěšně odeslán');
                handleClose();

                res.json().then(json => {
                    if (json.id !== undefined) {
                        history.push('/' + json.id);
                    }
                });
            })
            .catch(err => {
                showSnackError(err);
            });
    };

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleRecaptchaChange = (value) => {
        setState(prev => ({...prev, recaptcha: value}));
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Vložit zdroják
                        </Typography>
                        <Button color="inherit" onClick={handleSave}>
                            <CodeIcon className={classes.leftIcon} />
                            Odeslat
                        </Button>
                        <Button color="inherit" onClick={handleClose}>
                            <CloseIcon className={classes.leftIcon} />
                            Zavřít
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText>
                        Prosíme neuvádějte informace o autorovi, nechceme urážet lidi.

                    </DialogContentText>
                    <FormControl fullWidth>
                        <InputLabel shrink htmlFor="category-native-label-placeholder">
                            Kategorie
                        </InputLabel>
                        <NativeSelect
                            value={state.category}
                            onChange={handleChange('category')}
                            input={<Input name="category" id="category-native-label-placeholder" />}
                        >
                            {
                                Object.keys(CATEGORIES).map(category => (
                                    <option key={category} value={category}>{CATEGORIES[category]}</option>
                                ))
                            }
                        </NativeSelect>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Popisek"
                        type="text"
                        multiline={true}
                        rows={3}
                        fullWidth
                        value={state.description}
                        onChange={handleChange('description')}
                        inputProps={{
                            maxLength: 1000
                        }}
                    />

                    <TextField
                        margin="dense"
                        id="description"
                        label="Zdrojový kód"
                        type="text"
                        multiline={true}
                        rows={10}
                        fullWidth
                        value={state.code}
                        onChange={handleChange('code')}
                        inputProps={{
                            maxLength: 5000
                        }}
                    />

                    <ReCAPTCHA
                        sitekey={RECAPTCHA_PUBLIC_KEY}
                        onChange={handleRecaptchaChange}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleSave}>
                        <CodeIcon className={classes.leftIcon} />
                        Odeslat zdrojový kód
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar {...snack} />
        </div>
    );
}
