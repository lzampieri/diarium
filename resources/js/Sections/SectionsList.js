import { Link, usePage } from "@inertiajs/inertia-react"
import { ListItemButton } from "@mui/material"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import EditSectionDialog from "./EditSectionDialog"

const common_sx = (sc) => {
    return {
        py: 1,
        px: 2,
        borderColor: sc.color
    }
}

const linkProps = (ws,sc) => {
    return {
        component: Link,
        href: route('section', { ws: ws.id, sc: sc.id }),
        sx: { borderLeft: 4, ...common_sx(sc) }
    }
}
const selectedProps = (sc) => {
    return {
        selected: true,
        sx: { borderLeft: 8, ...common_sx(sc) }
    }
}

export default function SectionsList( props ) {
    const selected_section_id = usePage().props.section ? usePage().props.section.id : -1;

    return <Stack justifyItems="stretch" sx={{ flexGrow: 1, bgcolor: 'primary.superlight' }}>
        { props.ws.sections.map( sc => 
            <ListItemButton
                key={sc.id}
                {...(selected_section_id == sc.id ? selectedProps(sc) : linkProps(props.ws,sc))}>
                { sc.name }
                <EditSectionDialog sc={sc} ws={props.ws}/>
            </ListItemButton>
        ) }
    </Stack>
}