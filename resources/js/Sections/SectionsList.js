import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import EditSectionDialog from "./EditSectionDialog"

export default function SectionsList( props ) {
    return <Stack justifyItems="stretch" sx={{ flexGrow: 1, bgcolor: 'grey' }}>
        { props.ws.sections.map( s => 
            <Box key={s.id} sx={{ py: 1, px: 2, borderLeft: 4, borderColor: s.color }}>
                { s.name }
                <EditSectionDialog sc={s} ws={props.ws}/>
            </Box>
        ) }
    </Stack>
}