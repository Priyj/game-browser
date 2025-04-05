import { createSlice } from '@reduxjs/toolkit';

const loadLibraryFromStorage = (userId) => {
  const savedLibraries = localStorage.getItem('gameLibraries');
  if (!savedLibraries) return [];
  const libraries = JSON.parse(savedLibraries);
  return libraries[userId] || [];
};

const saveLibraryToStorage = (userId, library) => {
  const savedLibraries = localStorage.getItem('gameLibraries');
  let libraries = {};
  if (savedLibraries) {
    libraries = JSON.parse(savedLibraries);
  }
  libraries[userId] = library;
  localStorage.setItem('gameLibraries', JSON.stringify(libraries));
};

const librarySlice = createSlice({
  name: 'library',
  initialState: {
    games: [],
    currentUserId: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
      if (action.payload) {
        state.games = loadLibraryFromStorage(action.payload);
      } else {
        state.games = [];
      }
    },
    addToLibrary: (state, action) => {
      if (!state.currentUserId) return;
      if (!state.games.find((game) => game.id === action.payload.id)) {
        state.games.push(action.payload);
        saveLibraryToStorage(state.currentUserId, state.games);
      }
    },
    removeFromLibrary: (state, action) => {
      if (!state.currentUserId) return;
      state.games = state.games.filter((game) => game.id !== action.payload);
      saveLibraryToStorage(state.currentUserId, state.games);
    },
    clearLibrary: (state) => {
      if (!state.currentUserId) return;
      state.games = [];
      saveLibraryToStorage(state.currentUserId, state.games);
    },
  },
});

export const { addToLibrary, removeFromLibrary, clearLibrary, setCurrentUser } = librarySlice.actions;
export default librarySlice.reducer; 