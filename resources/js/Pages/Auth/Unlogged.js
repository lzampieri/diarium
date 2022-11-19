import SettingsLayout from "../../Layout/SettingsLayout";
import Button from "../../Components/Button";
import { Stack } from "@mui/material";

export default function Unlogged(props) {
    return (
        <SettingsLayout>
            <Stack spacing={2} alignItems="flex-start">
                <span>Diarium è accessibile solo agli utenti registrati.</span>
                <Button to={route('auth.google.login')} component="a">Accesso con Google</Button>
                <Button to={route('auth.totp.login')}>Accesso con One-Time password</Button>
            </Stack>
        </SettingsLayout>
    )
}