import { Stack } from "@mui/material";
import Button from "../../Components/Button";
import NewspaperIcon from '@mui/icons-material/Newspaper';

export default function AdminLinkCollections() {
    return <Stack justifyContent="stretch">
        <h3>Amministrazione</h3>
        <Button color="inherit" to={ route( 'admin.log' ) } component="a">
            <NewspaperIcon /> Log
        </Button>
    </Stack>
}