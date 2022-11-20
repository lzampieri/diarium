import { List as MuiList, ListSubheader, Paper } from "@mui/material";

export default function List(props) {

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
            <MuiList
                subheader={props.title ? <ListSubheader><b>{props.title}</b></ListSubheader> : false}
                { ...props }
            >
                {props.children}
            </MuiList>
        </Paper>
    )
}