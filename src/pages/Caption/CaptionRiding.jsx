import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../../components/Caption/FinishRide'

const CaptionRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride;
    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])
    return (
        <div className='h-screen'>
            <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
                <div>
                    <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                </div>
                <div>
                    <Link
                        to="/caption-login"
                        className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                        <i className="text-lg font-medium ri-logout-box-r-line">
                        </i>
                    </Link>
                </div>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full  object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/5 p-6 bg-yellow-400 flex items-center relative justify-between'>
                <h5 className="p-3 text-center w-[93%] absolute  top-0 cursor-pointer"
                //  onClick={() => setRightPopupPanel(false)} 
                >
                    <i className="text-xl text-gray-200 ri-arrow-down-wide-line pt-14"></i>
                </h5>
                <h4 className='text-xl font-semibold w-[80%]'>4 KM away
                </h4>
                <button className='w-full flex justify-center bg-green-600 text-white font-demibold p-2 rounded-lg ' onClick={() => setFinishRidePanel(true)}>Complete Right</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed h-screen w-full z-10 bottom-0 translate-y-full  bg-white p-8'>
                <FinishRide
                    rideData={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div >
    )
}

export default CaptionRiding
