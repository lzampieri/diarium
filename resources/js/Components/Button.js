import { Link } from "@inertiajs/inertia-react"
import { Button as MuiButton } from "@mui/material";

export default function Button(props) {
    let defProps = {}

    if (props.to || props.href) {
        let to = props.to ? props.to : props.href
        defProps = {
            component: Link, // Or "a" or "button"
            variant: "outlined",
            href: to,
            to: to,
            ...props
        }
    } else {
        defProps = {
            component: "button", // Or "a" or "button"
            variant: "outlined",
            ...props
        }
    }

    if( props.icon ) {
        defProps.startIcon = props.icon;
    }

    return (
        <MuiButton {...defProps}>{props.children}</MuiButton>
    )
}