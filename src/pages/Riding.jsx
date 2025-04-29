import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { connectSocket, disconnectSocket, socket } from '../features/socketSlice';
import { useDispatch, useSelector } from 'react-redux';

const Riding = () => {
    const location = useLocation();
    const ride = location.state.ride;
    const navigate = useNavigate();
    console.log("🚀 ~ Riding ~ ride:", ride);
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(connectSocket());
        if (user?._id) {
            socket.emit("join", { userId: user?._id, userType: "user" });
        }
        return () => {
            dispatch(disconnectSocket());
        };
    }, [dispatch, user])

    useEffect(() => {
        if (!socket) return;

        const handleRideStarted = (data) => {
            navigate("/home");
        };

        socket.on('ride-end', handleRideStarted);

        return () => {
            socket.off('ride-end', handleRideStarted);
        };
    }, [navigate]);
    return (
        <div className='h-screen'>
            <Link
                to="/home"
                className='fixed  h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-3-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full  object-cover' src="https://tse3.mm.bing.net/th?id=OIP.E88bztbViOYJG8EYcBFTAQHaNK&pid=Api&P=0&h=180" alt="" />
            </div>
            <div className='1\2 p-4'>
                <div className='flex item-center justify-between'>
                    <img className='h-12' src="https://tse1.mm.bing.net/th?id=OIP.90_IXyFPb47LZ_AYAe1ylAHaEK&pid=Api&P=0&h=180" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-midum'>{ride?.caption.firstname} </h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride.caption.vehicle?.plate}</h4>
                        <p className='text-sm text-gray-6== '>Maruti Suzuki Altp,</p>
                    </div>
                </div>
                {/* Title */}
                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="ri-map-pin-fill text-lg"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride.pickup}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'><i className="ri-money-rupee-circle-line"></i>{ride.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Affordable, compact rides</p>
                            </div>
                            <div>
                            </div></div>
                        <div></div>
                    </div>
                </div>
                <button className='w-full bg-green-600 text-white mt-5 font-demibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
