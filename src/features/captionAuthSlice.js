import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Example async action for captionRegister
export const captionRegister = createAsyncThunk('auth/captionRegister', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/caption/register`, data);
    localStorage.setItem("token", response.data.token);
    return response.data; // Axios automatically parses the response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to register caption');
  }
});

export const captionLogin = createAsyncThunk('auth/captionLogin', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/caption/login`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to login caption')
  }
});

export const captionLogout = createAsyncThunk('auth/captionLogout', async (data, { rejectWithValue }) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.get(`${API_URL}/caption/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      localStorage.removeItem("token");
    }
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to logout caption')
  }
});
export const captionProfile = createAsyncThunk('auth/captionProfile', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.get(`${API_URL}/caption/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.caption;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get profile')
  }
})
const captionAuthSlice = createSlice({
  name: 'auth',
  initialState: { caption: null, status: 'idle', error: null, profileError: null, isLogin: false },
  reducers: {
    logout(state) {
      state.caption = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(captionRegister.pending, (state) => {
        state.status = 'loading';
        state.isLogin = true;
      })
      .addCase(captionRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLogin = false;
        state.caption = action.payload;
      })
      .addCase(captionRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.error = action.payload; // Use payload from rejectWithValue
      })
      .addCase(captionLogin.pending, (state) => {
        state.status = 'loading';
        state.isLogin = true;
      })
      .addCase(captionLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.isLogin = false;
      })
      .addCase(captionLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.error = action.payload;
      })
      .addCase(captionLogout.pending, (state) => {
        state.status = 'loading';
        state.isLogin = true;
      })
      .addCase(captionLogout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.isLogin = false;
      })
      .addCase(captionLogout.rejected, (state, action) => {
        state.status = 'failed',
          state.isLogin = false;
        state.error = action.payload;
      })
      .addCase(captionProfile.pending, (state) => {
        state.status = 'loading';
        state.isLogin = true;
      })
      .addCase(captionProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.caption = action.payload
        state.profileError = null;
        state.isLogin = false;
      })
      .addCase(captionProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.profileError = action.payload;
      });
  },
});

export const { logout } = captionAuthSlice.actions;

export default captionAuthSlice.reducer;
