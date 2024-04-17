import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const isAccessTokenPresent = (): boolean => {
  return typeof window !== 'undefined' && localStorage.getItem('access-token') !== null;
};

const initialState: AuthState = {
  isAuthenticated: isAccessTokenPresent(),
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
      typeof window !== "undefined" && localStorage.removeItem('access-token');
      typeof window !== "undefined" && localStorage.removeItem('refresh-token');
    },
    finishInitialLoad: state => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;
