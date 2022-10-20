import { Link } from "@inertiajs/inertia-react";


export default function Home( props ) {
    return (
        <>
            <h1>Diarium</h1>
            Diarium è accessibile solo agli utenti registrati.<br/>
            <a href={ route('auth.google.login') }>Accedi con google</a>
        </>
    )
}