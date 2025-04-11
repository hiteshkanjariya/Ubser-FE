import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRide, setFare, setVehicleType } from '../features/rideSlice';

const VehiclePanel = ({ setVehicalPanelOpen, setConfirmRidePanel }) => {
    const vehicleOptions = [
        {
            name: "car",
            label: "UserGo",
            passengers: 4,
            time: "3 mins away",
            description: "Affordable, compact rides",
            image: "https://tse1.mm.bing.net/th?id=OIP.90_IXyFPb47LZ_AYAe1ylAHaEK&pid=Api&P=0&h=180"
        },
        {
            name: "motorcycle",
            label: "Moto",
            passengers: 1,
            time: "4 mins away",
            description: "Affordable, motorcycle ride",
            image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
        },
        {
            name: "auto",
            label: "Uber Auto",
            passengers: 3,
            time: "2 mins away",
            description: "Affordable, auto ride",
            image: "https://tse4.mm.bing.net/th?id=OIP.gERohywpalGF3NjolmHt5wHaE7&pid=Api&P=0&h=180"
        }
    ];
    const dispatch = useDispatch();
    const allFare = useSelector((state) => state.location.allFare);

    const isFareLoading = useSelector((state) => state.location.isFareLoading);

    const SkeletonCard = () => (
        <div className="flex w-full items-center border-2 justify-between p-3 rounded-xl mb-3 animate-pulse">
            <div className="bg-gray-300 h-12 w-20 rounded-md mr-2"></div>
            <div className="w-1/2 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
            <div className="h-5 w-12 bg-gray-300 rounded"></div>
        </div>
    );
    const ride = useSelector((state) => state.ride)
    const handleClickPanel = (vehicle, fare) => {
        setConfirmRidePanel(true)
        dispatch(setVehicleType(vehicle))
        dispatch(setFare(fare));
    }
    return (
        <div className="relative p-4">
            {/* Close Button */}
            <h5 className="p-3 text-center w-[93%] absolute top-0 cursor-pointer" onClick={() => setVehicalPanelOpen(false)}>
                <i className="text-xl text-gray-200 ri-arrow-down-wide-line pt-14"></i>
            </h5>

            {/* Title */}
            <h3 className="text-2xl font-semibold mb-3">Choose a vehicle</h3>
            {isFareLoading ? (
                <div
                    className="flex w-full flex-col items-center border-2 justify-between p-3 rounded-xl mb-3 cursor-pointer hover:border-black"
                >
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : (
                vehicleOptions.map((vehicle, index) => {
                    const fare = allFare && allFare[vehicle.name]; // e.g., allFare.car, allFare.auto, etc.

                    return (
                        <div
                            key={index}
                            className="flex w-full items-center border-2 justify-between p-3 rounded-xl mb-3 cursor-pointer hover:border-black"
                            onClick={() => handleClickPanel(vehicle.name, fare?.totalFare)}
                        >
                            {/* Vehicle Image */}
                            <div>
                                <img className="h-12" src={vehicle.image} alt={vehicle.label} />
                            </div>

                            {/* Vehicle Details */}
                            <div className="w-1/2">
                                <h4 className="font-medium text-sm">
                                    {vehicle.label} <span><i className="ri-user-3-fill"></i> {vehicle.passengers}</span>
                                </h4>
                                <h5 className="font-medium text-sm">{vehicle.time}</h5>
                                <p className="font-normal text-sm text-gray-600">{vehicle.description}</p>
                            </div>

                            {/* Vehicle Price */}
                            <div>
                                {fare ? (
                                    <h2 className="text-lg font-semibold">₹{fare.totalFare}</h2>
                                ) : (
                                    <h2 className="text-lg font-semibold text-gray-400">N/A</h2>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default VehiclePanel;
