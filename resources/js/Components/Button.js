import { Link } from "@inertiajs/inertia-react"
import { Button as MuiButton } from "@mui/material";

export default function Button( props ) {
    let defProps = {
        component: Link, // Or "a" or "button"
        variant: "outlined",
        href: props.to,
        ...props
    }

    return (
        <MuiButton {...defProps}>{ props.children }</MuiButton>
    )
}