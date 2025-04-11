import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptionDetails from '../../components/Caption/CaptionDetails'
import RidePop from '../../components/Caption/RidePopUP'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../../components/Caption/ConfirmRidePopup'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, disconnectSocket, socket } from '../../features/socketSlice'
import { confirmRide } from '../../features/rideSlice'

const CaptionHome = () => {
    const [ridePopupPanel, setRightPopupPanel] = useState(false);
    const [ride, setRide] = useState(null)
    const ridePopupPanelRef = useRef(null);
    const [confirmRidePopupPanel, setConfirmRightPopupPanel] = useState(false);
    const confirmRidePopupPanelRef = useRef(null);
    const dispatch = useDispatch();
    const caption = useSelector((state) => state.caption.caption);
    useEffect(() => {
        dispatch(connectSocket());
        if (caption?._id) {
            socket.emit("join", { userId: caption?._id, userType: "caption" })
        }
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit("update-location-caption", {
                        userId: caption?._id,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }
        const locationInterval = setInterval(() => {
            updateLocation()
        }, 10000)
        if (caption?._id) {
            updateLocation();
        }
        return () => {
            dispatch(disconnectSocket())
            clearInterval(locationInterval); // Clear the interval on cleanup
        }
    }, [dispatch, caption]);

    socket.on('new-ride', (data) => {
        console.log("🚀 ~ socket.on ~ data:", data)
        setRide(data);
        setRightPopupPanel(true);
    })

    const acceptRide = () => {
        dispatch(confirmRide({ rideId: ride._id }))
    }

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])
    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel]);
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
            <div className='h-3/5'>
                <img className='h-full w-full  object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='2/5 p-6'>
                <CaptionDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white p-8'>
                <RidePop
                    ride={ride}
                    setRightPopupPanel={setRightPopupPanel}
                    setConfirmRightPopupPanel={setConfirmRightPopupPanel}
                    acceptRide={acceptRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed h-screen w-full z-10 bottom-0 translate-y-full  bg-white p-8'>
                <ConfirmRidePopup setConfirmRightPopupPanel={setConfirmRightPopupPanel} setRightPopupPanel={setRightPopupPanel} />
            </div>

        </div >
    )
}

export default CaptionHome
