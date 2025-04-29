import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { endRide } from '../../features/rideSlice'
const FinishRide = ({ setRightPopupPanel, rideData }) => {
    console.log("🚀 ~ FinishRide ~ rideData:", rideData)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleFinishRide = async () => {
        dispatch(endRide({ rideId: rideData._id })).then((res) => {
            if (endRide.fulfilled.match(res)) {
                navigate("/caption-home")
            }
        })
    }
    return (
        <div >
            <h5 className="p-3 text-center w-[93%] absolute top-0 cursor-pointer" onClick={() => setRightPopupPanel(false)} >
                <i className="text-xl text-gray-200 ri-arrow-down-wide-line pt-14"></i>
            </h5>

            {/* Title */}
            <h3 className="text-2xl  font-semibold mb-3">Finish this ride </h3>
            <div className='flex  items-center justify-between  bg-gray-300 p-3 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://tse2.mm.bing.net/th?id=OIP.7vxWMpX9w2yDnxBZr6CQVQHaHa&pid=Api&P=0&h=180" alt="" />
                    <h2 className='text-xl font-medium'>{rideData?.userId?.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-fill text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{rideData?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-fill text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{rideData?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'><i className="ri-money-rupee-circle-line"></i>{rideData?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                        <div>
                        </div></div>
                    <div></div>
                </div>
            </div>
            <div className='mt-5'>
                <button
                    to="/caption-home"
                    className='w-full flex justify-center bg-green-600 text-white mt-5 font-demibold p-2 rounded-lg' onClick={() => handleFinishRide()}>Finish Ride </button>
                <p className='text-red-500 mt-6 text-xs'>Click on finish ride button if you completed the payment.</p>
            </div>
        </div >
    )
}

export default FinishRide
