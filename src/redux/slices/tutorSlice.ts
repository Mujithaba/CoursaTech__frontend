import { createSlice } from "@reduxjs/toolkit";

const storedTutorInfo = localStorage.getItem("tutorInfo");

const initialState = {
  tutorInfo: storedTutorInfo ? JSON.parse(storedTutorInfo) : null,
};

const tutorSlice = createSlice({
  name: "tutorAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      (state.tutorInfo = action.payload),
        localStorage.setItem("tutorInfo", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      (state.tutorInfo = null), localStorage.removeItem("tutorInfo");
    },
  },
});

export const { setCredentials, logOut } = tutorSlice.actions;
export default tutorSlice.reducer;
