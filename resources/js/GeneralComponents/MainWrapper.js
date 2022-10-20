import { SnackbarProvider } from 'notistack'
import GeneralModal from './GeneralModal'

export default function MainWrapper( page ) {
    return (
        <SnackbarProvider>
            { page.props.generalInfo && page.props.generalInfo.map( (g,i) => <GeneralModal key={i} data={g} /> )}
            { page }
        </SnackbarProvider>
    )
}