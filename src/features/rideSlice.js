import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

// Async thunk for creating a ride
export const createRide = createAsyncThunk(
    'ride/createRide',
    async (rideData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/ride/create', rideData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const confirmRide = createAsyncThunk(
    'ride/confirmRide',
    async (rideData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/ride/confirm-ride", rideData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const rideSlice = createSlice({
    name: 'ride',
    initialState: {
        pickup: null,
        destination: null,
        vehicleType: null,
        rideDetails: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        fare: null,
        loading: false,
    },
    reducers: {
        setPickup: (state, action) => {
            state.pickup = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setVehicleType: (state, action) => {
            state.vehicleType = action.payload;
        },
        setFare: (state, action) => {
            state.fare = action.payload;
        },
        resetRide: (state) => {
            state.pickup = null;
            state.destination = null;
            state.vehicleType = null;
            state.rideDetails = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRide.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRide.fulfilled, (state, action) => {
                state.rideDetails = action.payload;
            })
            .addCase(createRide.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(confirmRide.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(confirmRide.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(confirmRide.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { setPickup, setDestination, setVehicleType, resetRide, setFare } = rideSlice.actions;
export default rideSlice.reducer;
