import AddIcon from "@mui/icons-material/Add";
import { Box, Stack, IconButton } from "@mui/material";
import RenameWorkspaceDialog from "./RenameWorkspaceDialog";
import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";
import AddSectionDialog from "./AddSectionDialog";

export default function SelectedWorkspacePanel({ ws }) {
    return <Stack sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, bgcolor: 'grey' }}>
            Contenuto...
        </Box>
        <Stack direction="row" width={1} justifyContent="space-around">
            <AddSectionDialog ws={ ws } />
            <RenameWorkspaceDialog ws={ ws } />
            <DeleteWorkspaceDialog ws={ ws } />
        </Stack>
    </Stack>
}