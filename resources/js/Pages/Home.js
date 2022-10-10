

export default function Home( props ) {
    return (
        <>
            <h1>Diarium</h1>
            dell'utente {props.user.complete_name} <small><a href={ route( 'auth.logout' ) }>Esci</a></small>
            <h3>Indice:</h3>
        </>
    )
}