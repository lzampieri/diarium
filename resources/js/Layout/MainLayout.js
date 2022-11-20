import { Paper, Stack } from "@mui/material";
import BreadCrumbs from "../GeneralComponents/BreadCrumbs";
import Toolbar from "../GeneralComponents/Toolbar";

export default function MainLayout( props ) {

    return (
        <>
            <Toolbar user={ props.user } />
            <Stack direction="row" width={1} sx={{ minHeight: '80vh' }}>
                <Paper elevation={0} sx={{ width: 0.2 }} square>Side content</Paper>
                <Paper elevation={8} sx={{ flexGrow: 1 }} square>Central content</Paper>
                <Paper elevation={8} sx={{ width: 0.2 }} square>Other side content</Paper>
            </Stack>
        </>
    )
}