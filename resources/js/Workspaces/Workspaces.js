import { Box, Stack, ListItemButton, IconButton } from "@mui/material";
import { Link, usePage } from '@inertiajs/inertia-react';
import AddWorkspaceDialog from "./AddWorkspaceDialog";
import SelectedWorkspacePanel from "./SelectedWorkspacePanel";
import { Fragment } from "react";

export default function Workspaces(props) {
    
    const selected_workspace_id = usePage().props.workspace ? usePage().props.workspace.id : -1;
    const workspaces_list = usePage().props.user.workspaces;

    const common_sx = (id) => {
        return {
            borderTop: (id == workspaces_list[0].id ? 0 : 1),
        }
    }

    const linkProps = (id) => {
        return {
            component: Link,
            href: route('workspace', { ws: id }),
            sx: { flexGrow: 0, ...common_sx(id) }
        }
    }
    const selectedProps = (id) => {
        return {
            selected: true,
            sx: { flexGrow: 0, ...common_sx(id) }
        }
    }

    return <Stack justifyContent="stretch" sx={{ position: 'sticky', top: '10vh' }}>
        {workspaces_list.map((w) =>
            <Fragment key={w.id}>
                <ListItemButton
                    {...(selected_workspace_id == w.id ? selectedProps(w.id) : linkProps(w.id))}
                >
                    {w.name}
                </ListItemButton>
                {selected_workspace_id == w.id && <SelectedWorkspacePanel ws={usePage().props.workspace}/>}
            </Fragment>
        )}
        <AddWorkspaceDialog />
    </Stack>;
}