import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface IToasterProps {
    message: string;
    isOpen: boolean;
    severity?: "success" | "info" | "warning" | "error" | undefined;
    close: any;
}

const Toaster: React.FC<IToasterProps> = ({ message, isOpen, severity='success', close }) => {
    const classes = useStyles();
    const onClose = () => {
        close();
    }

    return (
        <div className={classes.root}>
            <Snackbar open={isOpen} autoHideDuration={6000}>
                <Alert
                    onClose={onClose}
                    severity={severity}
                >{message}</Alert>
            </Snackbar>

        </div>
    )
}

export default Toaster;