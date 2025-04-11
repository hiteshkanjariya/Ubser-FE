import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidePopup = ({ setRightPopupPanel, setConfirmRightPopupPanel }) => {
    const [otp, setOtp] = useState([])
    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div >
            <h5 className="p-3 text-center w-[93%] absolute top-0 cursor-pointer" onClick={() => setRightPopupPanel(false)} >
                <i className="text-xl text-gray-200 ri-arrow-down-wide-line pt-14"></i>
            </h5>

            {/* Title */}
            <h3 className="text-2xl  font-semibold mb-3">Confirm right to start </h3>
            <div className='flex  items-center justify-between  bg-gray-300 p-3 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://tse2.mm.bing.net/th?id=OIP.7vxWMpX9w2yDnxBZr6CQVQHaHa&pid=Api&P=0&h=180" alt="" />
                    <h2 className='text-xl font-medium'>Hitesh kanjariya</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-fill text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Jamnagar gujrat india</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-fill text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Jamnagar gujrat india</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'><i className="ri-money-rupee-circle-line"></i>1888</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                        <div>
                        </div></div>
                    <div></div>
                </div>
            </div>
            <div className='mt-5'>
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <input type='text' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} className='bg-[#eeeeee] rounded font-mono px-2 py-2 border w-full text-lg  placeholder:text-base' />
                    {/* <div className='flex gap-4'> */}
                    <Link
                        to="/caption-riding"
                        className='w-full flex justify-center bg-green-600 text-white mt-5 font-demibold p-2 rounded-lg'>Confirm</Link>
                    <button
                        onClick={() => {
                            setConfirmRightPopupPanel(false)
                            setRightPopupPanel(false);
                        }
                        }
                        className='w-full text-white bg-red-500 text-white mt-5  font-demibold p-2 rounded-lg'>Cancel</button>
                    {/* </div> */}
                </form>

            </div>
        </div >
    )
}

export default ConfirmRidePopup
