import { Box, Stack, ListItemButton, IconButton } from "@mui/material";
import { Link, usePage } from '@inertiajs/inertia-react';
import AddWorkspaceDialog from "./AddWorkspaceDialog";
import SelectedWorkspacePanel from "./SelectedWorkspacePanel";
import { Fragment } from "react";

const common_sx = (top) => {
    return {
        borderTop: top ? 0 : 1,
    }
}

const linkProps = (id) => {
    return {
        component: Link,
        href: route('workspace', { ws: id })
    }
}
const selectedProps = (top) => {
    return {
        selected: true,
        sx: { borderLeft: 4, borderColor: 'workspace', ...common_sx(top) }
    }
}
const unselectedProps = (top) => {
    return {
        selected: false,
        sx: { ...common_sx(top) }
    }
}

export default function Workspaces(props) {
    
    const selected_workspace_id = usePage().props.workspace ? usePage().props.workspace.id : -1;
    const workspaces_list = usePage().props.user.workspaces;
    const is_a_section_selected = !!usePage().props.section;

    return <Stack justifyContent="stretch" sx={{ position: 'sticky', top: '10vh' }}>
        {workspaces_list.map((w) =>
            <Fragment key={w.id}>
                <ListItemButton
                    {...(selected_workspace_id == w.id && !is_a_section_selected ? {} : linkProps(w.id))}
                    {...(selected_workspace_id == w.id ? selectedProps(workspaces_list[0].id == w.id ) : unselectedProps(workspaces_list[0].id == w.id ))}
                >
                    {w.name}
                </ListItemButton>
                {selected_workspace_id == w.id && <SelectedWorkspacePanel ws={usePage().props.workspace}/>}
            </Fragment>
        )}
        <AddWorkspaceDialog />
    </Stack>;
}