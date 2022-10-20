import LoginMethods from "./Components/LoginMethods";


export default function Home( props ) {
    return (
        <>
            <h2>Profilo</h2>
            <h3>{ props.user.complete_name }</h3>

            <LoginMethods user={ props.user } methods={ props.loginMethods } />
        </>
    )
}