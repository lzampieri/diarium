import { Box, Stack, ListItemButton, IconButton } from "@mui/material";
import { Link, usePage } from '@inertiajs/inertia-react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AddWorkspaceDialog from "./AddWorkspaceDialog";
import ListItem from "../Components/ListItem";
import SelectedWorkspacePanel from "./SelectedWorkspacePanel";
import { Fragment } from "react";

export default function Workspaces(props) {
    const selected_workspace = usePage().props.workspace || -1;
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

    return <Stack height={1} justifyContent="stretch">
        {workspaces_list.map((w) =>
            <Fragment key={w.id}>
                <ListItemButton
                    {...(selected_workspace == w.id ? selectedProps(w.id) : linkProps(w.id))}
                >
                    {w.name}
                </ListItemButton>
                {selected_workspace == w.id && <SelectedWorkspacePanel ws={w}/>}
            </Fragment>
        )}
        <AddWorkspaceDialog />
    </Stack>;
}