import { useForm } from "@inertiajs/inertia-react";
import { ButtonBase, Stack, Dialog, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import Button from "../Components/Button";
import LoadingBackdrop from "../Components/LoadingBackdrop";
import Colors from "../Sections/Colors";
import ColorSelectButton from "../Components/ColorSelectButton";
import EditIcon from '@mui/icons-material/Edit';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteSectionDialog from "./DeleteSectionDialog";

export default function EditSectionDialog({ ws, sc }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: sc.id,
        name: sc.name,
        color: sc.color
    })

    const onSubmit = (e) => {
        if( e ) e.preventDefault()
        post(route('section.edit'), {onSuccess: () => { setOpen( false ) }})
    }

    return (
        <>
            <IconButton color="inherit" onClick={() => setOpen(true)} size="small">
                <EditIcon />
            </IconButton>
            <LoadingBackdrop open={ processing } />
            <Dialog
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Modifica sezione in {ws.name}</DialogTitle>
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
                        <Stack direction='row' spacing={2}>
                            <Button onClick={ () => setOpen( false )}><UndoIcon /> Annulla</Button>
                            <Button type="submit"><EditIcon /> Modifica</Button>
                            <DeleteSectionDialog sc={sc} ws={ws}/>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}