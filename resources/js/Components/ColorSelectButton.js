import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";

export default function ColorSelectButton({ color, active, onClick }) {
    return <ButtonBase onClick={ onClick }>
            <Box sx={{
                border: '0.2em solid', borderColor: color, borderRadius: 1,
                p: '0.1em'
                }}>
                <Box sx={{ 
                    margin: 0, bgcolor: color,
                    width: '0.9em', height: '0.9em',
                    border: 0, borderRadius: 0.8,
                    opacity: active ? 1 : 0.2 }} />
            </Box>
        </ButtonBase>
}