

function showMethod( m ) {
    if( m.driver == 'google' ) return showMethodGoogle( m );
}

function showMethodGoogle( m ) {
    return (
        <li key={m.id}>Login tramite google: <i>{m.identifier}</i> ({m.name})</li>
    )
}

export default function LoginMethods( { user, methods } ) {
    return (
        <>
            <h4>Metodi di login registrati</h4>
            <ul>
            {
                methods.map( m => showMethod(m) )
            }
            </ul>
            <h4>Aggiungi metodi di login</h4>
            <ul>
                <li><a href={ route( 'auth.google.login' ) }>Google</a></li>
            </ul>
        </>
    )
}