import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import List from "../../../GeneralComponents/List";
import ListItem from "../../../GeneralComponents/ListItem";
import LoadingBackdrop from "../../../GeneralComponents/LoadingBackdrop";
import KeyIcon from '@mui/icons-material/Key';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "../../../Components/Button";
import { IconButton, ListItemText, Stack, TextField } from "@mui/material";

function showMethod(m, editMode, name, setData, error, deleteCallback) {
    let subtext = "";
    if (m.driver == 'google') subtext = <><b>Google</b> <i>{m.identifier}</i></>;
    if (m.driver == 'totp') subtext = <><b>OneTime password</b></>;

    if (editMode) {
        return (
            <ListItem
                key={m.id}
                icon={<KeyIcon />}>
                <ListItemText>
                    <TextField
                        label={ subtext }
                        variant="outlined"
                        value={ name }
                        onChange={e => setData('lm_' + m.id, e.target.value)}
                        error={!!error}
                        helperText={error} />
                    <IconButton onClick={() => deleteCallback(m.id)}><DeleteIcon /></IconButton>
                </ListItemText>
            </ListItem>
        )
    }

    return (
        <ListItem
            key={m.id}
            icon={<KeyIcon />}
            primary={name}
            secondary={subtext}>
        </ListItem>
    )
}

export default function LoginMethods({ user, methods }) {
    const [editMode, setEditMode] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const { data, setData, post, processing, errors } = useForm(
        methods.reduce((dict, el) => (dict['lm_' + el.id] = el.name, dict), {})
    )

    const deleteCallback = async (id) => {
        setDeleting(true);
        Inertia.post(
            route('user.deleteLoginMethod'),
            { id: id },
            {
                errorBag: "deleting",
                onSuccess: () => enqueueSnackbar("Credenziali eliminate", { variant: 'success' }),
                onError: (errors) => { enqueueSnackbar(errors.deleting, { variant: 'error' }), setDeleting(false) },
                preserveState: false
            })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        post(route('user.renameLoginMethods'), {
            onSuccess: () => {
                setEditMode(false)
                enqueueSnackbar("Salvataggio effettuato", { variant: 'success' })
            }
        })
    }

    return (
        <List component="form" onSubmit={onSubmit} title="Metodi di login registrati">
            <LoadingBackdrop open={processing || deleting} />
            {
                methods.map(m => showMethod(m, editMode, data['lm_' + m.id], setData, errors['lm_' + m.id], deleteCallback))
            }
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }} >
                {editMode && <Button type="submit">Salva</Button>}
                {!editMode && <Button onClick={() => setEditMode(true)}>Modifica</Button>}
                <Button icon={ <AddIcon />} to={route('auth.google.login')} component="a">Google</Button>
                <Button icon={ <AddIcon />} to={route('user.generateTOTP')}>OneTime password</Button>
            </Stack>
        </List>
    )
}