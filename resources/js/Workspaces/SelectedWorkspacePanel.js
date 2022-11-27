import AddIcon from "@mui/icons-material/Add";
import { Box, Stack, IconButton } from "@mui/material";
import RenameWorkspaceDialog from "./RenameWorkspaceDialog";
import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";
import AddSectionDialog from "../Sections/AddSectionDialog";
import SectionsList from "../Sections/SectionsList";

export default function SelectedWorkspacePanel({ ws }) {
    return <Stack sx={{ flexGrow: 1 }}>
        <SectionsList ws={ws} />
        <Stack direction="row" width={1} justifyContent="space-around">
            <AddSectionDialog ws={ws} />
            <RenameWorkspaceDialog ws={ws} />
            <DeleteWorkspaceDialog ws={ws} />
        </Stack>
    </Stack>
}