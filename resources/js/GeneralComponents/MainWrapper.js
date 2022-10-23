import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { useEffect } from 'react'
import GeneralModal from './GeneralModal'

export default function MainWrapper( page ) {

    useEffect( () => {
        if( page.props.snackbars ) {
            page.props.snackbars.forEach( (sb) => enqueueSnackbar( sb[1], { variant: sb[0] } ) );
        }
    }, [])
    
    return (
        <SnackbarProvider>
            { page.props.generalInfo && page.props.generalInfo.map( (g,i) => <GeneralModal key={i} data={g} /> )}
            { page }
        </SnackbarProvider>
    )
}