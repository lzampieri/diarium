import { Paper, Typography, Breadcrumbs as MuiBreadCrumbs } from "@mui/material";
import { usePage } from '@inertiajs/inertia-react'
import InertiaLink from "../Components/InertiaLink";

export default function BreadCrumbs() {
    const { breadcrumbs } = usePage().props

    if( !breadcrumbs || breadcrumbs.length == 0 )
        return "";

    console.log( breadcrumbs );

    return (
        <Paper elevation={0} variant="outlined" sx={{ px: 2, mb: 2 }}>
            <MuiBreadCrumbs aria-label="breadcrumb">
                { breadcrumbs.map( ( breadcrumb ) => breadcrumb.current ? (
                    <Typography key={ breadcrumb.url } color="text.main">{ breadcrumb.title }</Typography>
                ) : (
                    <InertiaLink key={ breadcrumb.url } to={ breadcrumb.url } underline="hover" color="inherit">{ breadcrumb.title }</InertiaLink>
                ) ) }
            </MuiBreadCrumbs>
        </Paper>
    )
}