import { Paper } from "@mui/material";
import BreadCrumbs from "../GeneralComponents/BreadCrumbs";

export default function SettingsLayout({ children }) {

    return (
        <Paper elevation={8} sx={{ m: 4, p: 4, width: { xs: 1, md: 0.5 } }}>
            <h1>Diarium</h1>
            <BreadCrumbs />
            {children}
        </Paper>
    )
}