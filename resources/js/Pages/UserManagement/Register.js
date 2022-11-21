import { useForm } from "@inertiajs/inertia-react";
import { Stack, TextField } from "@mui/material";
import Button from "../../Components/Button";
import InertiaLink from "../../Components/InertiaLink";
import LoadingBackdrop from "../../Components/LoadingBackdrop";
import SettingsLayout from "../../Layout/SettingsLayout";

export default function Register(props) {

    const { data, setData, post, processing, wasSuccessful, errors } = useForm({
        driver: props.registerParams.driver,
        identifier: props.registerParams.identifier,
        username: props.registerParams.username || '',
        complete_name: props.registerParams.complete_name || ''
    })

    const fields_labels = {
        driver: 'Tramite:',
        identifier: 'Identificativo:',
        username: 'Nome utente:',
        complete_name: 'Nome completo:'
    }
    const disabled = {
        driver: true,
        identifier: true,
        username: false,
        complete_name: false
    }

    function submit(e) {
        e.preventDefault()
        post(route('auth.register'))
    }

    return (
        <SettingsLayout>
            <h3>Registrazione</h3>
            Benvenuto nella pagina di registrazione di Diarium.<br />
            Se è già registrato, è necessario fare l'<InertiaLink to={route('unlogged')}>accesso</InertiaLink> con le credenziali usuali, poi scegliere <i>profilo</i> → <i>metodi di accesso</i> per collegare un nuovo sistema di credenziali.<br />
            <br />

            <Stack component="form" onSubmit={submit} alignItems="center" spacing={2} width={1} >
                <LoadingBackdrop open={processing} />
                {
                    Object.keys(fields_labels).map((k) =>
                        <TextField
                            key={k}
                            label={fields_labels[k]}
                            variant="outlined"
                            value={data[k]}
                            disabled={disabled[k]}
                            onChange={e => setData(k, e.target.value)}
                            error={!!errors[k]}
                            helperText={errors[k]} />
                    )
                }
                <br />
                <Button type="submit" component="button">Registrazione</Button>
            </Stack>
        </SettingsLayout>
    )
}