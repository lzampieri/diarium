import { useState } from "react"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, AlertTitle, IconButton, Modal } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};

export default function GeneralModal({ data }) {
    const [show, setShow] = useState(true)

    if (!show) return "";

    return (
        <Modal open={show} onClose={() => setShow(false)}>
            <Alert alignItems='center' color={data[0]} sx={style}
                action={
                    <IconButton color="inherit" onClick={() => setShow(false)}>
                        <CheckCircleIcon />
                    </IconButton>
                }
            >
                <AlertTitle>{data[1]}</AlertTitle>
                {data[2]}
            </Alert>
        </Modal>
    )
}


{/* <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute w-full h-full bg-halfblack z-40" />
            <div className="border rounded-xl bg-white z-50 flex flex-col items-stretch">
                <div className={ "bg-" + data[0] + " text-white pt-4 pb-2 px-4 rounded-t-xl text-center" }>{ data[1] }</div>
                <div className="pt-2 pb-2 px-4">
                    
                </div>
                <div className={"pt-2 pb-4 px-4 text-" + data[0] + " text-center text-2xl hover:text-black cursor-pointer"} onClick={() => setShow(false)}>
                    <FontAwesomeIcon icon={ faCircleCheck } />
                </div>
            </div>
        </div> */}