import { Link, useForm } from "@inertiajs/inertia-react";


export default function Register( props ) {

    const { data, setData, post, processing, wasSuccessful, errors } = useForm({
        driver: props.register_params.driver,
        identifier: props.register_params.identifier,
        username: props.register_params.username || '',
        complete_name: props.register_params.complete_name || ''
    })

    const fields_labels = {
        driver: 'Tramite:',
        identifier: 'Identificativo:',
        username: 'Nome utente:',
        complete_name: 'Nome completo:'
    }
    const disabled = {
        driver: true,
        identifier: true,
        username: false,
        complete_name: false
    }

    function submit(e) {
        e.preventDefault()
        post( route( 'auth.register' ) )
    }      

    return (
        <>
            <h3>Registrazione</h3>
            Benvenuto nella pagina di registrazione di Diarium.<br/>
            Se è già registrato, è necessario fare l'<a href={ route('auth.login') }>accesso</a> con le credenziali usuali, poi scegliere <i>profilo</i> → <i>metodi di accesso</i> per collegare un nuovo sistema di credenziali.<br/>
            <br/>

            <h4>Identità</h4>
            <form onSubmit={submit}>
            {
                Object.keys( fields_labels ).map( ( k ) => 
                    <div key={k} className="my-2">
                        <small>{ fields_labels[k] }</small><br/>
                        <input type='text' value={ data[k] } name={k} id={k} disabled={ disabled[k] } onChange={ e => setData( k, e.target.value ) } />
                        { errors[k] && 
                            <small className="w-full text-red">{errors[k]}</small>
                        }
                    </div>
                )
            }
            <br/>
            <a onClick={ (e) => submit(e) } className="my-4">Registrazione</a>
            </form>
        </>
    )
}