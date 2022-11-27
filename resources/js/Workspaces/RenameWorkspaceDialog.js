import { useForm } from "@inertiajs/inertia-react";
import { Stack, Dialog, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import Button from "../Components/Button";
import UndoIcon from '@mui/icons-material/Undo';
import RenameIcon from '@mui/icons-material/DriveFileRenameOutline';
import LoadingBackdrop from "../Components/LoadingBackdrop";


export default function RenameWorkspaceDialog({ ws }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        id: ws.id,
        name: ws.name
    })

    const submit = (e) => {
        if( e ) e.preventDefault();
        post(route('workspace.rename'), {onSuccess: () => { setOpen( false ) }})
    }

    return (
        <>
            <IconButton color="inherit" onClick={() => setOpen(true)}>
                <RenameIcon />
            </IconButton>
            <LoadingBackdrop open={processing} />
            <Dialog
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Rinomina spazio di lavoro</DialogTitle>
                <DialogContent>
                    <Stack component="form" onSubmit={submit} alignItems="center" spacing={2} sx={{ my: 2 }}>
                        <TextField
                            key={'name'}
                            label="Nome"
                            variant="outlined"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name} />
                        <Stack direction="row" justifyContent="center" spacing={2} sx={{ my: 2 }}>
                            <Button type="submit" onClick={() => setOpen(false)}><UndoIcon /> Annulla</Button>
                            <Button type="submit" onClick={() => submit()}><RenameIcon /> Rinomina</Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}