import { Avatar, ListItem as MuiListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function ListItem(props) {

    return (
        <MuiListItem disablePadding {...props}
        >
            {props.icon &&
                <ListItemAvatar><Avatar sx={{ bgcolor: "grey" }}>{props.icon}</Avatar></ListItemAvatar>}
            {props.primary &&
                <ListItemText primary={ props.primary } secondary={ props.secondary } />}
            {props.children}
        </MuiListItem>
    )
}