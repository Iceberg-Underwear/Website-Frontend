import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  access_token: string | null;
  user: { id: string; username: string} | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  access_token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      //console.log("Action payload:", action.payload);
      state.access_token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.access_token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

const authReducer = authSlice.reducer;
export const { setAuthState, logout } = authSlice.actions;
export default authReducer;