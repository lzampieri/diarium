import { useForm } from "@inertiajs/inertia-react";
import { Stack, Dialog, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import Button from "../Components/Button";
import AddIcon from '@mui/icons-material/Add';
import LoadingBackdrop from "../Components/LoadingBackdrop";


export default function AddSectionDialog({ ws }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: ''
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
                        <Button type="submit"><AddIcon /> Aggiungi</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}