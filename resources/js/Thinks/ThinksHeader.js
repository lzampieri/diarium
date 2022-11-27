import { Box } from "@mui/material";
import { spacingCenter, spacingLeft, spacingRight, topBorders, topLeftBorders, topRightBorders } from "./BordersProps";

export default function ThinksHeader({ id }) {
    return <>
        <Box sx={{ ...spacingLeft, ...topLeftBorders }}></Box>
        <Box sx={{ ...spacingCenter, ...topBorders }}>Prova</Box>
        <Box sx={{ ...spacingRight, ...topRightBorders }}>Prova</Box>
    </>
}