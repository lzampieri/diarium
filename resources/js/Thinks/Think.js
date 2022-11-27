import { Box, Chip, useTheme } from "@mui/material";
import { allBorders, leftBorders, rightBorders, spacingCenter, spacingLeft, spacingRight } from "./BordersProps";
import Colors from "../Sections/Colors";

export default function Think({ id }) {
    const getTextColor = useTheme().palette.getContrastText;
    return <>
        <Box sx={{ ...spacingLeft, ...leftBorders }}>
            <Box sx={{
                bgcolor: Colors[id], borderRadius: 4, py: 2,
                color: getTextColor( Colors[id] ),
                fontSize: 'caption', writingMode: 'vertical-lr', transform: 'rotate(-180deg)' }}>
                Data e ora
            </Box>
        </Box>
        <Box sx={{ ...spacingCenter, ...allBorders }}>Prova</Box>
        <Box sx={{ ...spacingRight, ...rightBorders }}>Prova</Box>
    </>
}