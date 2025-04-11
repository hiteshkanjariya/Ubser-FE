import React from 'react'
import { useSelector } from 'react-redux'

const CaptionDetails = () => {
    const caption = useSelector((state) => state.caption.caption);
    return (
        <div>
            <div className='flex item-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://tse2.mm.bing.net/th?id=OIP.7vxWMpX9w2yDnxBZr6CQVQHaHa&pid=Api&P=0&h=180" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{caption?.firstname} {caption?.lastname}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>&#8377;298.56 </h4>
                    <p className='text-sm font-thin  text-gray-600'>Earned</p>

                </div>
                <div>
                    <h5></h5>
                </div>
            </div>
            <div className='p-5 bg-gray-100 mt-4 rounded-xl flex justify-center gap-4 item-center '>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font=thin ri-timer-line"></i>
                    <h5 className='lext-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font=thin ri-speed-up-fill"></i>
                    <h5 className='lext-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font=thin ri-booklet-line"></i>
                    <h5 className='lext-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>

                </div>
            </div>
        </div>
    )
}

export default CaptionDetails
