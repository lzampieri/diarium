import AddIcon from "@mui/icons-material/Add";
import { Box, Button, useTheme } from "@mui/material";
import { spacingLeft, spacingRight, topBorders, topLeftBorders, topRightBorders } from "./BordersProps";
import theme from "../theme";

export default function ThinksHeader({ id }) {
    console.log( useTheme().palette.action.hoverOpacity )
    return <>
        <Box sx={{ ...spacingLeft, ...topLeftBorders }}></Box>
        <Box sx={{ ...topBorders }}>
            <Button sx={{
                width: "100%", justifyContent: "flex-end",
                px: 1, py: 0.5
                }}>
                <AddIcon />
            </Button>
        </Box>
        <Box sx={{ ...spacingRight, ...topRightBorders }}>
        </Box>
    </>
}