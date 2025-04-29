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

export const verifyOTPandStartRide = createAsyncThunk(
    'ride/verifyOTPandStartRide',
    async (rideData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/ride/start-ride", rideData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Error occure while starting the ride")
        }
    }
);

export const endRide = createAsyncThunk(
    "endRide",
    async (rideData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/ride/end-ride", rideData);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data.message || "Error occure while ending the ride")
        }
    }
);


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
        verifyOTPLoading: false,
        endRideLoading: false,
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
                state.loading = false;
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
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(verifyOTPandStartRide.pending, (state) => {
                state.verifyOTPLoading = true;
            })
            .addCase(verifyOTPandStartRide.fulfilled, (state, action) => {
                state.verifyOTPLoading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(verifyOTPandStartRide.rejected, (state, action) => {
                state.verifyOTPLoading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(endRide.pending, (state) => {
                state.endRideLoading = true;
            })
            .addCase(endRide.fulfilled, (state, action) => {
                state.endRideLoading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(endRide.rejected, (state, action) => {
                state.endRideLoading = false;
                state.error = action.payload || 'Something went wrong';
            })
    }
});

export const { setPickup, setDestination, setVehicleType, resetRide, setFare } = rideSlice.actions;
export default rideSlice.reducer;
