import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../features/gamesSlice';
import libraryReducer from '../features/librarySlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    library: libraryReducer,
  },
}); 