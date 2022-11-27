import { Paper, Stack } from "@mui/material";
import BreadCrumbs from "../LayoutComponents/BreadCrumbs";
import Toolbar from "../LayoutComponents/Toolbar";
import ThinksList from "../Thinks/ThinksList";
import Workspaces from "../Workspaces/Workspaces";

export default function MainLayout( props ) {

    return (
        <>
            <Toolbar user={ props.user } />
            <Stack direction="row" width={1} sx={{ minHeight: '90vh' }}>
                <Paper elevation={0} sx={{ width: 0.2 }} square>
                    <Workspaces />
                </Paper>
                <Paper elevation={8} sx={{ flexGrow: 1 }} square>
                    <ThinksList />
                </Paper>
                <Paper elevation={8} sx={{ width: 0.2 }} square>Other side content</Paper>
            </Stack>
        </>
    )
}