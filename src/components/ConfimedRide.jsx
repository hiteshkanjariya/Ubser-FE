import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createRide } from '../features/rideSlice';

const ConfimedRide = ({ setVehicalPanelOpen, setVehicalFound, setConfirmRidePanel }) => {
    const ride = useSelector((state) => state.ride);
    console.log("🚀 ~ ConfimedRide ~ ride:", ride)
    const dispatch = useDispatch();
    const [vehicleData, setVehicleData] = useState({
        name: "UserGo",
        passengers: 4,
        time: "3 mins away",
        description: "Affordable, compact rides",
        price: "193.20",
        image: "https://tse1.mm.bing.net/th?id=OIP.90_IXyFPb47LZ_AYAe1ylAHaEK&pid=Api&P=0&h=180"
    });
    const confirmRide = () => {
        setVehicalFound(true);
        setConfirmRidePanel(false);
        const data = {
            destination: ride.destination,
            pickup: ride.pickup,
            vehicleType: ride.vehicleType,
        }
        dispatch(createRide(data))
    }
    return (
        <div>
            <h5 className="p-3 text-center w-[93%] absolute top-0 cursor-pointer" onClick={() => setVehicalPanelOpen(false)}>
                <i className="text-xl text-gray-200 ri-arrow-down-wide-line pt-14"></i>
            </h5>

            {/* Title */}
            <h3 className="text-2xl  font-semibold mb-3">Confirm your Ride</h3>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src={vehicleData.image} alt="" />
                <div className='w-full'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-fill text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-fill text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'><i className="ri-money-rupee-circle-line"></i>{ride.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{vehicleData.description}</p>
                        </div>
                        <div>
                        </div></div>
                    <div></div>
                </div>
            </div>
            <div>
                <button onClick={() => confirmRide()} disabled={ride.loading} className='w-full bg-green-600 text-white mt-5 font-demibold p-2 rounded-lg'>
                    {ride.loading && (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                            />
                        </svg>
                    )}
                    {ride.loading ? "Confirming..." : "Confirm"}
                </button>
            </div>
        </div>
    )
}

export default ConfimedRide
