import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingBackdrop({ open, text = "Caricamento..." }) {
    if (!open) return "";

    return (
        <Backdrop open={true} sx={{ zIndex: 2000 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}