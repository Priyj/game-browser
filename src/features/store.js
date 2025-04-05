import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import libraryReducer from './librarySlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    library: libraryReducer,
  },
}); 