import React, { PropsWithChildren, useEffect } from 'react';
import { Button, Typography, lighten, Slide } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as serviceWorker from '../../serviceWorker';
import { Logger } from '../../util';

const logger = Logger.getLogger('ServiceWorkerWrapper');

type Props = PropsWithChildren<{
    initialize?: boolean;
}>;

const useStyle = makeStyles((theme) => ({
    root: {
        zIndex: 99999,
        position: 'fixed',
        bottom: 0,
        left: 0,
    },
    alert: {
        margin: '1rem',
        background: lighten(theme.palette.background.paper, 0.05),
        maxWidth: 400,
        boxShadow: theme.shadows[4],
    },
    icon: {
        color: `${theme.palette.primary.main} !important`,
    },
    actions: {
        color: theme.palette.primary.main,
        alignItems: 'start',
    },
    title: {
        fontSize: '1.5em',
    },
    button: {
        marginTop: '.5rem',
    },
}));

function ServiceWorkerWrapper({ initialize }: Props) {
    const { t } = useTranslation(undefined, { useSuspense: false });
    const classes = useStyle();
    const location = useLocation();
    const [showReload, setShowReload] = React.useState(false);
    const [waitingWorker, setWaitingWorker] = React.useState<ServiceWorker | null>(null);

    const onSWUpdate = (registration: ServiceWorkerRegistration) => {
        logger.info('Application update detected.');
        setShowReload(true);
        setWaitingWorker(registration.waiting);
    };

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((sw) => sw.update());
        }
    }, [location]);

    useEffect(() => {
        if (initialize) {
            serviceWorker.register({ onUpdate: onSWUpdate });
        }
    }, [initialize]);

    const reloadPage = () => {
        waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
        setShowReload(false);
        window.location.reload();
    };

    const close = () => {
        setShowReload(false);
    };

    return (
        <Slide direction={'right'} in={showReload} unmountOnExit>
            <div className={classes.root}>
                <Alert
                    classes={{ action: classes.actions, icon: classes.icon }}
                    onClose={close}
                    className={classes.alert}
                >
                    <AlertTitle className={classes.title}>
                        {t('serviceworker.title')}
                    </AlertTitle>
                    <Typography variant={'subtitle2'}>
                        {t('serviceworker.description')}
                    </Typography>
                    <Button
                        onClick={reloadPage}
                        className={classes.button}
                        variant={'contained'}
                        color={'primary'}
                    >
                        {t('serviceworker.button')}
                    </Button>
                </Alert>
            </div>
        </Slide>
    );
}
ServiceWorkerWrapper.defaultProps = {
    initialize: false,
};

export default ServiceWorkerWrapper;
