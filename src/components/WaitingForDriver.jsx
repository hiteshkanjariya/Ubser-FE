import React, { useState } from 'react'

const WaitingForDriver = ({ waitingForDriverRef, ride }) => {
    const [vehicleData, setVehicleData] = useState({
        name: "UserGo",
        passengers: 4,
        time: "3 mins away",
        description: "Affordable, compact rides",
        price: "193.20",
        image: "https://tse1.mm.bing.net/th?id=OIP.90_IXyFPb47LZ_AYAe1ylAHaEK&pid=Api&P=0&h=180"
    });
    return (
        <div>
            <h5 className="p-3 text-center w-[93%] absolute top-0 cursor-pointer"
            //  onClick={() => setVehicalPanelOpen(false)}
            >
                <i className="text-xl text-gray-200 ri-arrow-down-wide-line pt-14"></i>
            </h5>
            <div className='flex item-center justify-between'>
                <img className='h-12' src="https://tse1.mm.bing.net/th?id=OIP.90_IXyFPb47LZ_AYAe1ylAHaEK&pid=Api&P=0&h=180" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-midum'>{ride?.caption?.firstname} </h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.caption?.vehicle?.plate}</h4>
                    <p className='text-sm text-gray-6== '>Maruti Suzuki Altp,</p>
                    <h1 className='text-xl font-semibold'>OTP:-{ride?.otp}</h1>
                </div>
            </div>
            {/* Title */}
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-fill text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-fill text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'><i className="ri-money-rupee-circle-line"></i>{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{vehicleData.description}</p>
                        </div>
                        <div>
                        </div></div>
                    <div></div>
                </div>
            </div>
            <div>
                <button className='w-full bg-green-600 text-white mt-5 font-demibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default WaitingForDriver
