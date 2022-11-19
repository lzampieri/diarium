import { Link } from "@inertiajs/inertia-react"
import { Button as MuiButton } from "@mui/material";

export default function SubmitButton( props ) {
    let defProps = {
        type: 'submit',
        variant: "outlined",
        ...props
    }

    return (
        <MuiButton {...defProps}>{ props.children }</MuiButton>
    )
}