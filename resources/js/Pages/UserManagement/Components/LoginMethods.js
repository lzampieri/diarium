import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import LoadingBackdrop from "../../../GeneralComponents/LoadingBackdrop";


function showMethod(m, editMode, name, setData, error, deleteCallback) {
    let text;
    if (m.driver == 'google') text = <>Login tramite google: <i>{m.identifier}</i></>;

    if (editMode) {
        return (
            <li key={m.id}>
                <FontAwesomeIcon icon={faTrash} className="clickableIcon" onClick={() => deleteCallback( m.id )} />
                <input type="text" className="w-fit mr-1" value={name} onChange={e => setData('lm_' + m.id, e.target.value) } size={10} />
                {text}<br/>
                { error && <small className="text-error">{ error }</small>}
            </li>
        )
    }

    return (
        <li key={m.id}><b>{name}</b> {text}</li>
    )
}

export default function LoginMethods({ user, methods }) {
    const [editMode, setEditMode] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const { data, setData, post, processing, errors } = useForm(
        methods.reduce((dict, el) => (dict['lm_' + el.id] = el.name, dict), {})
    )

    const deleteCallback = async ( id ) => {
        setDeleting( true );
        Inertia.post(
            route( 'user.deleteLoginMethod' ),
            { id: id },
            {
                errorBag: "deleting",
                onSuccess: ( ) => enqueueSnackbar( "Credenziali eliminate", { variant: 'success' } ),
                onError: ( errors ) => { enqueueSnackbar( errors.deleting, { variant: 'error' } ), setDeleting( false ) },
                preserveState: false
            })
    } 

    const onSubmit = (e) => {
        e.preventDefault()
        post( route('user.renameLoginMethods'), {
            onSuccess: () => {
                setEditMode( false )
                enqueueSnackbar( "Salvataggio effettuato", { variant: 'success' } )
            }
        } )
    }

    return (
        <>
            <h4>Metodi di login registrati</h4>
            <LoadingBackdrop open={ processing || deleting } />
            <form onSubmit={ onSubmit }>
            <ul>
                {
                    methods.map(m => showMethod(m, editMode, data['lm_' + m.id], setData, errors['lm_' + m.id], deleteCallback))
                }
            </ul>
                {editMode && <input type="submit" className="text-xs" value="Salva"/>}
            </form>
            {!editMode && <a className="text-xs" onClick={() => setEditMode(true)}>Modifica</a>}
            <h4>Aggiungi metodi di login</h4>
            <ul>
                <li><a href={route('auth.google.login')}>Google</a></li>
                <li><a href={route('user.generateTOTP')}>One-time password</a></li>
            </ul>
        </>
    )
}