import { Box } from "@mui/material";
import { bottomBorders, bottomLeftBorders, bottomRightBorders, spacingCenter, spacingLeft, spacingRight } from "./BordersProps";

export default function ThinksFooter({ id }) {
    return <>
        <Box sx={{ ...spacingLeft, ...bottomLeftBorders }}></Box>
        <Box sx={{ ...spacingCenter, ...bottomBorders }}>Prova</Box>
        <Box sx={{ ...spacingRight, ...bottomRightBorders }}>Prova</Box>
    </>
}