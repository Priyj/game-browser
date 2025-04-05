import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// Default popular games (using their IDs)
const DEFAULT_GAME_IDS = [
  3498,  // GTA V
  3328,  // The Witcher 3
  28,    // Red Dead Redemption 2
  4291,  // Counter-Strike 2
  13536, // Elden Ring
  5679,  // The Elder Scrolls V: Skyrim
  4062,  // Minecraft
  12020, // Cyberpunk 2077
  58175, // God of War
  1030,  // Portal 2
];

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async ({ page = 1, search = '', filters = {} }, { getState }) => {
    // If no filters or search, return default games
    if (!search && (!filters.genres?.length && !filters.platforms?.length && !filters.dates)) {
      try {
        const gamePromises = DEFAULT_GAME_IDS.map(id => 
          axios.get(`${BASE_URL}/games/${id}?key=${RAWG_API_KEY}`)
        );
        const responses = await Promise.all(gamePromises);
        return {
          results: responses.map(res => res.data),
          count: DEFAULT_GAME_IDS.length,
        };
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch default games');
      }
    }

    const params = new URLSearchParams({
      key: RAWG_API_KEY,
      page,
      search,
      page_size: 20,
    });

    if (filters.genres?.length > 0) {
      params.append('genres', filters.genres.join(','));
    }
    if (filters.platforms?.length > 0) {
      params.append('platforms', filters.platforms.join(','));
    }
    if (filters.dates) {
      params.append('dates', filters.dates);
    }
    if (filters.ordering) {
      params.append('ordering', filters.ordering);
    }

    try {
      const response = await axios.get(`${BASE_URL}/games?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch games');
    }
  }
);

export const fetchGameDetails = createAsyncThunk(
  'games/fetchGameDetails',
  async (gameId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/games/${gameId}?key=${RAWG_API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch game details');
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    currentGame: null,
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
    filters: {
      genres: [],
      platforms: [],
      dates: '',
      ordering: '-metacritic'
    },
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {
        genres: [],
        platforms: [],
        dates: '',
        ordering: '-metacritic'
      };
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 20);
        state.currentPage = action.meta.arg.page || 1;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.games = [];
      })
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setGames, 
  setLoading, 
  setError, 
  setFilters, 
  clearFilters,
  setPage,
  setTotalPages 
} = gamesSlice.actions;

export default gamesSlice.reducer; 