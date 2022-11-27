import { Box, Stack } from "@mui/material";
import Colors from "../Sections/Colors";
import Think from "./Think";
import ThinksFooter from "./ThinksFooter";
import ThinksHeader from "./ThinksHeader";


export default function ThinksList( props ) {
    let thinks = [1,2,3,4,5]
    return (
        <Box display="grid" gridTemplateColumns="min-content auto min-content" sx={{ m: 4 }}>
            <ThinksHeader key='header' />
            { thinks.map( i => <Think id={i} key={i}/> ) }
            <ThinksFooter key='footer' />
        </Box>
    )
}