import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import GeneralModal from '../GeneralComponents/GeneralModal';
import theme from '../theme';

export default function MainWrapper(page) {

    useEffect(() => {
        if (page.props.snackbars) {
            page.props.snackbars.forEach((sb) => enqueueSnackbar(sb[1], { variant: sb[0] }));
        }
    }, [ page.props ])

    return (
        <SnackbarProvider>
            <ThemeProvider theme={createTheme(theme)}>
                <CssBaseline />
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    {page.props.generalInfo && page.props.generalInfo.map((g, i) => <GeneralModal key={i} data={g} />)}
                    {page}
                </Container>
            </ThemeProvider>
        </SnackbarProvider>
    )
}