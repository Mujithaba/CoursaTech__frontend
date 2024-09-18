import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | null>) => {
      state.socket = action.payload as Draft<Socket> | null;  
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
