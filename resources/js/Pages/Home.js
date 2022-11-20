import InertiaLink from "../Components/InertiaLink";
import SettingsLayout from "../Layout/SettingsLayout";

export default function Home( props ) {
    return (
        <SettingsLayout>
            <h1>Diarium</h1>
            dell'utente {props.user.complete_name} <sup><InertiaLink href={ route( 'user.profile' ) }>profilo</InertiaLink>, <InertiaLink href={ route( 'auth.logout' ) }>esci</InertiaLink></sup>
            <h3>Indice:</h3>
            ...pagina ancora da realizzare...
        </SettingsLayout>
    )
}