import { AppBar, Button, Menu, MenuItem, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BreadCrumbs from './BreadCrumbs';
import { useRef, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Toolbar(props) {
    const menuRef = useRef(null);
    const [ menuOpen, setMenuOpen ] = useState(false);

    return <AppBar sx={{ position: 'sticky', top: "0", height: '10vh' }} color="white" elevation={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 1, px: 2 }}>
            <div>Diarium</div>
            <BreadCrumbs />
            <Button variant="text" color="text" ref={ menuRef } onClick={ () => setMenuOpen( true ) }>
                {props.user.complete_name}
                <AccountCircleIcon sx={{ ml: 1 }} />
            </Button>
            <Menu
                anchorEl={ menuRef.current }
                open={ menuOpen }
                onClose={ () => setMenuOpen( false ) }
            >
                <MenuItem component={ Link } href={ route( 'user.profile' ) }>Profilo</MenuItem>
                <MenuItem component="a" href={ route( 'auth.logout' ) }>Esci</MenuItem>
            </Menu>
        </Stack>
    </AppBar>
}