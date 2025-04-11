import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicalPanel from '../components/VehicalPanel';
import ConfimedRide from '../components/ConfimedRide';
import LookingForDirver from '../components/LookingForDirver';
import WaitingForDriver from '../components/WaitingForDriver';
import { clearSuggestions, fetchLocations, getAllFare } from '../features/locationSlice';
import debounce from 'lodash/debounce';
import { setDestination, setPickup } from '../features/rideSlice';
import { connectSocket, disconnectSocket } from '../features/socketSlice';
import { socket } from "../features/socketSlice"

const Home = () => {
  const [data, setData] = useState({
    pickup: "",
    destination: ""
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicalPanelRef = useRef(null);
  const confirmRidePanelref = useRef(null);
  const vehicleFoundref = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehicalPanelOpen, setVehicalPanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicalFound] = useState(false);
  const [waitingForDriver, setWatingForDriver] = useState(false);
  const [ride, setRide] = useState(null)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user)
  const [focusField, setFocusField] = useState(''); // 'pickup' or 'destination'
  // debounce search function

  const handlechage = (e) => {
    setPanelOpen(true);
    const name = e.target.name;
    const value = e.target.value;
    setFocusField(name);
    setData((prv) => ({
      ...prv,
      [name]: value,
    }))
    dispatch(fetchLocations(value))

  }
  const submitHandler = () => {
    e.preventDefault();
  }
  // const handleSelectLocation = (location) => {
  //   setData((prev) => ({
  //     ...prev,
  //     [focusField]: location
  //   }));
  //   setPanelOpen(false);
  //   dispatch(clearSuggestions());
  // };

  const handleSelectLocation = (location) => {
    setData((prev) => {
      const updatedData = {
        ...prev,
        [focusField]: location
      };

      // Automatically open next panel if both are filled
      if (updatedData.pickup && updatedData.destination) {
        setPanelOpen(false);
        setVehicalPanelOpen(true);
        dispatch(getAllFare(updatedData));
      }

      return updatedData;
    });

    dispatch(clearSuggestions());
  };

  const findTrip = () => {
    dispatch(setPickup(data.pickup))
    dispatch(setDestination(data.destination))
    setVehicalPanelOpen(true);
    setPanelOpen(false)
    dispatch(getAllFare(data))

  }
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehicalPanelOpen) {
      gsap.to(vehicalPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicalPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalPanelOpen])
  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelref.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundref.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])
  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

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
    socket.on('ride-confirm', (ride) => {
      setWatingForDriver(true);
      setRide(ride);
      setVehicalFound(false);
    });
  }, []);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 mb-8 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-3/5'>
        <img className='h-full w-full  object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute top-6 right-6  text-2xl opacity-0'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>
            <input className='bg-[#eee] px-12 py-2 text-lg rounded-base w-full mt-5' type="text" value={data.pickup} onChange={handlechage} name="pickup" placeholder='Add a pick up location' id="" />
            <input className='bg-[#eee] px-12 py-2 text-lg rounded-base w-full mt-3' type="text" value={data.destination} onChange={handlechage} name="destination" placeholder=' Enter ypur desctination' id="" />
          </form>
          <button
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'
            onClick={findTrip}
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='h-0 bg-white p-5'>
          <LocationSearchPanel
            setVehicalPanelOpen={setVehicalPanelOpen}
            setPanelOpen={setPanelOpen}
            handleSelectLocation={handleSelectLocation}
          />
        </div>
      </div>
      <div ref={vehicalPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-4'>
        <VehicalPanel setVehicalPanelOpen={setVehicalPanelOpen} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      <div ref={confirmRidePanelref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-8'>
        <ConfimedRide setConfirmRidePanel={setConfirmRidePanel} setVehicalFound={setVehicalFound} />
      </div>
      <div ref={vehicleFoundref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-8'>
        <LookingForDirver setVehicalFound={setVehicalFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white p-8'>
        <WaitingForDriver
          ride={ride}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  )
}

export default Home
