import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import GeneralModal from '../LayoutComponents/GeneralModal';
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
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                    {page.props.generalInfo && page.props.generalInfo.map((g, i) => <GeneralModal key={i} data={g} />)}
                    {page}
                </Box>
            </ThemeProvider>
        </SnackbarProvider>
    )
}