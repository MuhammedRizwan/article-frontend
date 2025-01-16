import User from "@/Interface/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState= {
  user: null as User | null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser( state,action: PayloadAction<User>) {
        state.user= action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
