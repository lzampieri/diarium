import { Box, Chip, useTheme } from "@mui/material";
import { allBorders, leftBorders, rightBorders, spacingCenter, spacingLeft, spacingRight } from "./BordersProps";
import Colors from "../Sections/Colors";
import { usePage } from "@inertiajs/inertia-react";

export default function Think({ data }) {
    const getTextColor = useTheme().palette.getContrastText;
    let sections = usePage().props.workspace.sections;

    return <>
        <Box sx={{ ...spacingLeft, ...leftBorders }}>
            <Box sx={{
                bgcolor: Colors[data.id], borderRadius: 4, py: 2,
                color: getTextColor( Colors[data.id] ),
                fontSize: 'caption', writingMode: 'vertical-lr', transform: 'rotate(-180deg)' }}>
                { data.thinkable_type }
            </Box>
        </Box>
        <Box sx={{ ...spacingCenter, ...allBorders }}>{ data.content }</Box>
        <Box sx={{ ...spacingRight, ...rightBorders }}>Prova</Box>
    </>
}