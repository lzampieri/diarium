import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import theme from "../theme";


export default function GeneralModal({ data }) {
    const [show, setShow] = useState(true)

    if (!show) return "";

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute w-full h-full bg-halfblack z-40" />
            <div className="border rounded-xl bg-white z-50 flex flex-col items-stretch">
                <div className={ "bg-" + data[0] + " text-white pt-4 pb-2 px-4 rounded-t-xl text-center" }>{ data[1] }</div>
                <div className="pt-2 pb-2 px-4">
                    {data[2]}
                </div>
                <div className={"pt-2 pb-4 px-4 text-" + data[0] + " text-center text-2xl hover:text-black cursor-pointer"} onClick={() => setShow(false)}>
                    <FontAwesomeIcon icon={ faCircleCheck } />
                </div>
            </div>
        </div>
    )
}