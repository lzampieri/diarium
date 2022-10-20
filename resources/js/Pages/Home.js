

export default function Home( props ) {
    return (
        <>
            <h1>Diarium</h1>
            dell'utente {props.user.complete_name} <sup><a href={ route( 'user.profile' ) }>profilo</a>, <a href={ route( 'auth.logout' ) }>esci</a></sup>
            <h3>Indice:</h3>
        </>
    )
}