import { useForm } from "@inertiajs/inertia-react";
import { ButtonBase, Stack, Dialog, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import Button from "../Components/Button";
import AddIcon from '@mui/icons-material/Add';
import LoadingBackdrop from "../Components/LoadingBackdrop";
import Colors from "./Colors";
import ColorSelectButton from "../Components/ColorSelectButton";

export default function AddSectionDialog({ ws }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        color: Colors[ ws.sections.length % Colors.length ]
    })

    const onSubmit = (e) => {
        e.preventDefault()
        post(route('section.add', { ws: ws.id }), {onSuccess: () => { reset(), setOpen( false ) }})
    }

    return (
        <>
            <IconButton color="inherit" onClick={() => setOpen(true)}>
                <AddIcon />
            </IconButton>
            <LoadingBackdrop open={ processing } />
            <Dialog
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Aggiungi nuova sezione a {ws.name}</DialogTitle>
                <DialogContent>
                    <Stack component="form" onSubmit={onSubmit} alignItems="center" spacing={2} sx={{ my: 2 }}>
                        <TextField
                            key={'name'}
                            label="Nome"
                            variant="outlined"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name} />
                        <Stack direction='row' spacing={2}>
                            { Colors.map( c =>
                                <ColorSelectButton color={c} key={c} active={ data.color == c } onClick={ () => setData( 'color', c ) } />
                            )}
                        </Stack>
                        <Button type="submit"><AddIcon /> Aggiungi</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}