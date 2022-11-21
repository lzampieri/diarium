import { Paper, Typography, Breadcrumbs as MuiBreadCrumbs, IconButton } from "@mui/material";
import { usePage } from '@inertiajs/inertia-react'
import InertiaLink from "../Components/InertiaLink";
import HomeIcon from '@mui/icons-material/Home';

function getComponent( breadcrumb ) {
    if( breadcrumb.title.toLowerCase() == "home" )
        if( breadcrumb.current )
            return <HomeIcon sx={{ verticalAlign: "bottom" }} key="home" />
        else
            return <InertiaLink key={ breadcrumb.url } to={ breadcrumb.url } ><HomeIcon sx={{ verticalAlign: "bottom", '&:hover': { color: 'black' } }} color="disabled" /></InertiaLink>

    if( breadcrumb.current )
        return <Typography key={ breadcrumb.url } color="text.main">{ breadcrumb.title }</Typography>

    return <InertiaLink key={ breadcrumb.url } to={ breadcrumb.url } underline="hover" color="inherit">{ breadcrumb.title }</InertiaLink>
}

export default function BreadCrumbs() {
    const { breadcrumbs } = usePage().props

    if( !breadcrumbs || breadcrumbs.length == 0 )
        return "";

    return (
        <Paper elevation={0} variant="outlined" sx={{ px: 2 }}>
            <MuiBreadCrumbs aria-label="breadcrumb">
                { breadcrumbs.map( ( breadcrumb ) => getComponent( breadcrumb ) ) }
            </MuiBreadCrumbs>
        </Paper>
    )
}