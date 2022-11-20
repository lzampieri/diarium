import LoginMethods from "./Components/LoginMethods";
import SettingsLayout from "../../Layout/SettingsLayout";

export default function Home( props ) {
    return (
        <SettingsLayout>
            <h3>Profilo</h3>
            <h4>{ props.user.complete_name }</h4>

            <LoginMethods user={ props.user } methods={ props.loginMethods } />
        </SettingsLayout>
    )
}