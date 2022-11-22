import { useForm } from "@inertiajs/inertia-react";
import { Stack, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import Button from "../Components/Button";
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingBackdrop from "../Components/LoadingBackdrop";


export default function DeleteWorkspaceDialog({ ws }) {
    const [open, setOpen] = useState(false);
    const { post, processing } = useForm({
        id: ws.id
    })

    const submit = () => {
        post(route('workspace.delete'))
    }

    return (
        <>
            <IconButton color="inherit" onClick={() => setOpen(true)}>
                <DeleteIcon />
            </IconButton>
            <LoadingBackdrop open={processing} />
            <Dialog
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Cancella spazio di lavoro</DialogTitle>
                <DialogContent>
                    Sei sicuro di voler eliminare lo spazio di lavoro <i>{ws.name}</i>?
                    <Stack direction="row" justifyContent="center" spacing={2} sx={{ my: 2 }}>
                        <Button type="submit" onClick={() => setOpen(false)}><UndoIcon /> Annulla</Button>
                        <Button type="submit" onClick={() => submit()}><DeleteIcon /> Cancella</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}