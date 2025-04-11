import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const LookingForDirver = ({ setVehicalFound }) => {
    const [vehicleData, setVehicleData] = useState({
        name: "UserGo",
        passengers: 4,
        time: "3 mins away",
        description: "Affordable, compact rides",
        price: "193.20",
        image: "https://tse1.mm.bing.net/th?id=OIP.90_IXyFPb47LZ_AYAe1ylAHaEK&pid=Api&P=0&h=180"
    });
    const ride = useSelector((state) => state.ride);

    return (
        <div>
            <h5 className="p-3 text-center w-[93%] absolute top-0 cursor-pointer"
                onClick={() => setVehicalFound(false)}
            >
                <i className="text-xl text-gray-200 ri-arrow-down-wide-line pt-14"></i>
            </h5>

            {/* Title */}
            <h3 className="text-2xl  font-semibold mb-3">Looking for dirver</h3>
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
        </div>
    )
}

export default LookingForDirver
