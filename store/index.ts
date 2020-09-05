import { createSlice, configureStore } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 1 },
  reducers: {
    increment: state => ({ count: state.count + 1 }),
    decrement: state => ({ count: state.count - 1 }),
  },
})

export const counterStore = configureStore({
  reducer: counterSlice.reducer,
})

export const store = counterStore
