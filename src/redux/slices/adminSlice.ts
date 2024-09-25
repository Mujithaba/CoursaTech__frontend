import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedAdminInfo = localStorage.getItem("adminInfo");

const initialState = {
  adminInfo: storedAdminInfo ? JSON.parse(storedAdminInfo) : null,
};

const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminSetCredentials: (state, action: PayloadAction<any>) => {
      (state.adminInfo = action.payload),
        localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    adminLogout: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { adminSetCredentials, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
