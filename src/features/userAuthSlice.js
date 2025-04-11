import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Example async action for userRegister
export const userRegister = createAsyncThunk('auth/userRegister', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, data);
    localStorage.setItem("token", response.data.token);
    return response.data; // Axios automatically parses the response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to register user');
  }
});

export const userLogin = createAsyncThunk('auth/userLogin', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to login user')
  }
});

export const userLogout = createAsyncThunk('auth/userLogout', async (data, { rejectWithValue }) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.get(`${API_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      localStorage.removeItem("token");
    }
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to logout user')
  }
});

export const userProfile = createAsyncThunk('auth/userProfile', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get profile')
  }
})

const userAuthSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null, isLogin: false, profileError: null },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = 'loading';
        state.isLogin = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLogin = false;
        state.user = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.error = action.payload; // Use payload from rejectWithValue
      })
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
        state.isLogin = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.isLogin = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.error = action.payload;
      })
      .addCase(userLogout.pending, (state) => {
        state.status = 'loading';
        state.isLogin = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.user = null;
        state.isLogin = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.error = action.payload;
      })
      .addCase(userProfile.pending, (state) => {
        state.status = 'loading';
        state.isLogin = true;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileError = null;
        state.isLogin = false;
        state.user = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.profileError = action.payload;
      });
  },
});

export const { logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
