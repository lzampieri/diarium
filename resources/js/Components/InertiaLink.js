import { Link as MuiLink } from "@mui/material"
import { Link as OldInertiaLink } from "@inertiajs/inertia-react"

export default function InertiaLink( props ) {
    let to = props.to ? props.to : props.href
    let pp = {
        to: to,
        href: to,
        ...props
    }

    return (
        <MuiLink component={ OldInertiaLink } { ...pp } />
    )
}