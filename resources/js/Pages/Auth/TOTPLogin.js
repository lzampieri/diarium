import { useForm } from '@inertiajs/inertia-react';
import { Stack, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import Button from '../../Components/Button';
import LoadingBackdrop from '../../Components/LoadingBackdrop';
import SettingsLayout from '../../Layout/SettingsLayout';

export default function TOTPLogin() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post( route('auth.totp.login'), {
            onError: (errors) => {
                if( errors.login )
                    enqueueSnackbar( errors.login, { variant: 'error' } )
            }
        });
    }

    return (
        <SettingsLayout>
            <h3>Login tramite One-Time password</h3>
            <LoadingBackdrop open={processing} />
            <Stack component="form" onSubmit={onSubmit} alignItems="center" spacing={2} width={1} >
                <TextField
                    label="Username"
                    variant="outlined"
                    value={data.username}
                    onChange={e => setData('username',e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username} />
                <TextField
                    label="One-time password"
                    variant="outlined"
                    type="password"
                    value={data.password}
                    onChange={e => setData('password',e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password} />
                <Button type="submit">Accedi</Button>
            </Stack>
        </SettingsLayout>
    )
}