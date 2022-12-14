import { Paper } from "@mui/material";
import BreadCrumbs from "../LayoutComponents/BreadCrumbs";

export default function SettingsLayout({ children }) {

    return (
        <Paper elevation={8} sx={{ mx: 4, p: 4, width: { md: 0.5 } }}>
            <h1>Diarium</h1>
            <BreadCrumbs sx={{ mb: 2 }} />
            {children}
        </Paper>
    )
}