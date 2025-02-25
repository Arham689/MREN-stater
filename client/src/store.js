import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './src/features/counter/counterSlice'; // Example slice

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add your reducers here
  },
});