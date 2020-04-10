import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "login",
  initialState: {
    access_token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLXR5cGUiOiJhZG1pbiIsInJhbmQiOjAuNTQwNTI4MzkzMTYxODk3OH0._1CvDWqCAUONahmwnK6lv8KF_tXnvxIyz-JVXgVuArs",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

// export const { addData } = slice.actions;

export default slice.reducer;
