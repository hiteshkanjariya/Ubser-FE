// store/locationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
const API_URL = import.meta.env.VITE_API_URL;

export const fetchLocations = createAsyncThunk(
    'location/fetchLocations',
    async (query, { rejectWithValue }) => {
        console.log("🚀 ~ query:", query)
        try {
            const res = await axiosInstance.get(`${API_URL}/map/get-suggestions?query=${query}`);
            return res.data?.suggestions;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllFare = createAsyncThunk(
    'location/getAllFare',
    async ({ pickup, destination }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`${API_URL}/ride/get-all-fare`, {
                params: {
                    pickup,
                    destination
                }
            });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        suggestions: [],
        allFare: null,
        loading: false,
        isFareLoading: false,
        error: null,
    },
    reducers: {
        clearSuggestions: (state) => {
            state.suggestions = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.suggestions = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllFare.pending, (state) => {
                state.isFareLoading = true;
            })
            .addCase(getAllFare.fulfilled, (state, action) => {
                state.isFareLoading = false;
                state.allFare = action.payload;
            })
            .addCase(getAllFare.rejected, (state, action) => {
                state.isFareLoading = false;
                state.error = action.payload
            })
    }
});

export const { clearSuggestions } = locationSlice.actions;

export default locationSlice.reducer;
