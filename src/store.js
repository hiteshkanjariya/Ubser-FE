import { configureStore } from '@reduxjs/toolkit'
import userAuthSlice from "./features/userAuthSlice"
import captionAuthSlice from "./features/captionAuthSlice";
import locationReducer from './features/locationSlice';
import rideReducer from './features/rideSlice'
import socketReducer from './features/socketSlice';
export const store = configureStore({
  reducer: {
    user: userAuthSlice,
    caption: captionAuthSlice,
    location: locationReducer,
    ride: rideReducer,
    socket: socketReducer,
  },
})