import { Box, useTheme } from "@mui/material";
import { allBorders, leftBorders, rightBorders, spacingCenter, spacingLeft, spacingRight } from "./BordersProps";

export default function Think({ data }) {
    const getTextColor = useTheme().palette.getContrastText;
    let color = data.thinkable.color || useTheme().palette.workspace.main;
    let dateColor = useTheme().palette.primary.superlight;
    let date = ( new Date( data.created_at ) )
        .toLocaleDateString( 'it-IT', {
            day: '2-digit', weekday: 'long',
            year: 'numeric', month: 'long'
        } );
    date = date.charAt(0).toUpperCase() + date.slice(1);

    return <>
        <Box sx={{ ...spacingLeft, ...leftBorders }}>
            <Box sx={{
                bgcolor: color, borderRadius: 4, py: 2,
                color: getTextColor( color ),
                fontSize: 'caption', writingMode: 'vertical-lr', transform: 'rotate(-180deg)' }}>
                { data.thinkable.name }
            </Box>
        </Box>
        <Box sx={{ ...spacingCenter, ...allBorders }}>{ data.content }</Box>
        <Box sx={{ ...spacingRight, ...rightBorders }}>
            <Box sx={{
                bgcolor: dateColor, borderRadius: 4, py: 2,
                color: getTextColor( dateColor ),
                fontSize: 'caption', writingMode: 'vertical-lr', transform: 'rotate(-180deg)' }}>
                { date }
            </Box>
        </Box>
    </>
}