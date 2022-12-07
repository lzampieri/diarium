import { usePage } from "@inertiajs/inertia-react";
import { Box, Stack } from "@mui/material";
import Colors from "../Sections/Colors";
import Think from "./Think";
import ThinksFooter from "./ThinksFooter";
import ThinksHeader from "./ThinksHeader";


export default function ThinksList( props ) {
    let thinks = []
    let page_props = usePage().props;
    if( page_props.workspace )
        thinks = page_props.workspace.thinks
    if( page_props.section )
        thinks = page_props.section.thinks
    console.log( thinks );
    return (
        <Box display="grid" gridTemplateColumns="min-content auto min-content" sx={{ m: 4 }}>
            <ThinksHeader key='header' />
            { thinks.map( t => <Think data={t} key={t.id}/> ) }
            <ThinksFooter key='footer' />
        </Box>
    )
}