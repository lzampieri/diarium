import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/inertia-react';
import { enqueueSnackbar } from 'notistack';
import theme from '../../theme';
import LoadingBackdrop from '../../GeneralComponents/LoadingBackdrop';
import SettingsLayout from '../../Layout/SettingsLayout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Button from '../../Components/Button';

export default function AddTOTPLoginMethod(props) {
    const { data, setData, post, processing, errors } = useForm({
        secretKey: props.secretKey,
        name: 'Autenticazione TOTP'
    })

    const onSubmit = (e) => {
        e.preventDefault()
        post(route('user.saveTOTP'), {
            onSuccess: () => enqueueSnackbar('Credenziali inserite con successo', { variant: 'success' })
        })
    }

    const copyText = () => {
        navigator.clipboard.writeText(props.secretKey);
        enqueueSnackbar('Chiave copiata negli appunti', { variant: 'info' });
    }

    return (
        <SettingsLayout>
            <h4>Creazioni credenziali one-time-password</h4>
            <LoadingBackdrop open={processing} />
            <Stack alignItems="center" width={1}>
                <Box sx={{ height: '40vh', aspectRatio: "1" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
                        <g transform="scale(8.163)">
                            <g transform="translate(4,4)">
                                <path fillRule="evenodd" d={props.qrCode} fill={theme.palette.black} />
                            </g>
                        </g>
                    </svg>
                </Box>
                <TextField
                    variant="filled" 
                    value={props.secretKey}
                    disabled
                    inputProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><IconButton onClick={copyText} size="small"><ContentCopyIcon fontSize="small"/></IconButton></InputAdornment>,
                    }} />
            </Stack>

            <br /><br />
            Scansiona il qr-code o copia la chiave ed inseriscila in un'applicazione per la generazione di OneTime-password, e.g. Google Authenticator, Microsoft Authenticator o 2FA-Authenticator. Se richiesto, seleziona <i>Autenticazione basata sul tempo</i>.

            <br /><br />
            <Alert severity="warning">Attenzione: l'autenticazione non sarà abilitata fino alla pressione del pulsante "Salva" qui sotto.</Alert>

            <Stack component="form" onSubmit={onSubmit} alignItems="center" sx={{ mt: 4}} spacing={1}>
                <TextField
                        label="Salva come:"
                        variant="outlined"
                        value={data.name}
                        onChange={e => setData('name',e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name} />
                <Button type="submit">Salva</Button>
            </Stack>
        </SettingsLayout>
    )
}