import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/inertia-react';
import { enqueueSnackbar } from 'notistack';
import theme from '../../theme';
import LoadingBackdrop from '../../GeneralComponents/LoadingBackdrop';

export default function AddTOTPLoginMethod(props) {
    const { data, setData, post, processing, errors } = useForm({
        secretKey: props.secretKey,
        name: 'Autenticazione TOTP'
    })

    const onSubmit = (e) => {
        e.preventDefault()
        post( route('user.saveTOTP'), {
            onSuccess: () => enqueueSnackbar('Credenziali inserite con successo', { variant: 'success'})
        } )
    }
    
    const copyText = () => {
        navigator.clipboard.writeText( props.secretKey );
        enqueueSnackbar('Chiave copiata negli appunti', { variant: 'info'});
    }

    return (
        <>
            <h4>Creazioni credenziali one-time-password</h4>
            <LoadingBackdrop open={ processing } />
            <div className="w-full text-center flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="h-60 w-60">
                    <g transform="scale(8.163)">
                        <g transform="translate(4,4)">
                            <path fillRule="evenodd" d={props.qrCode} fill={ theme.colors.black } />
                        </g>
                    </g>
                </svg>
                <div className="w-full flex flex-row justify-center">
                    <input type="text" value={props.secretKey} className="text-center" style={{ width: 'fit-content'}} disabled/>
                    <FontAwesomeIcon icon={faClipboard} className="clickableIcon" onClick={copyText} />
                </div>
            </div>
            
            <br/><br/>
            Scansiona il qr-code o copia la chiave ed inseriscila in un'applicazione per la generazione di OneTime-password, e.g. Google Authenticator, Microsoft Authenticator o 2FA-Authenticator. Se richiesto, seleziona <i>Autenticazione basata sul tempo</i>.

            <br/><br/>
            <b>Attenzione: l'autenticazione non sarà abilitata fino alla pressione del pulsante "Salva" qui sotto.</b>

            <form onSubmit={onSubmit}>
                <small>Nome delle credenziali:</small><br/>
                <input type="text" value={data.name} onChange={ e => setData('name', e.target.value)} />
                {errors.name && <><small className="text-error">{errors.name}</small><br/></>}
                <input type="submit" value="Salva" />
            </form>
        </>
    )
}