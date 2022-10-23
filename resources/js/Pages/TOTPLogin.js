import { useForm } from '@inertiajs/inertia-react';
import { enqueueSnackbar } from 'notistack';
import LoadingBackdrop from '../GeneralComponents/LoadingBackdrop';

export default function TOTPLogin() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post( route('auth.totp.login'), {
            onError: (errors) => {
                if( errors.login )
                    enqueueSnackbar( errors.login, { variant: 'error' } )
            }
        });
    }

    return (
        <>
            <h1>Diarium</h1>
            <h4>Login tramite One-Time password</h4>
            <LoadingBackdrop open={processing} />
            <form onSubmit={onSubmit}>
                <small>Username</small><br />
                <input type="text" value={data.username} onChange={e => setData('username',e.target.value)} />
                { errors.username && <div className="text-error text-xs">{errors.username}</div>}
                <small>One-time password</small><br />
                <input type="password" value={data.password} onChange={e => setData('password',e.target.value)} />
                { errors.password && <div className="text-error text-xs">{errors.password}</div>}
                <input type="submit" value="Accedi"/>
            </form>
        </>
    )
}