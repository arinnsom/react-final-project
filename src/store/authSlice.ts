import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import {
  fetchFavoriteMovies,
  addMovieToFavorites,
  removeMovieFromFavorites,
} from "../api/movieApi";
import { type Movie } from "../types/movie";

interface UserProfile {
  email: string;
  name: string;
  surname: string;
}

interface AuthState {
  user: UserProfile | null;
  favorites: Movie[];
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  favorites: [],
  isAuthChecked: false,
};

export const checkAuthSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get<UserProfile>("/profile");
      if (response.data) {
        dispatch(setCredentials(response.data));
        const favs = await fetchFavoriteMovies();
        dispatch(setFavorites(favs));
      }
    } catch (error) {}
  }
);

export const toggleFavoriteMovie = createAsyncThunk(
  "auth/toggleFavorite",
  async (
    { movieId, isFavorite }: { movieId: number; isFavorite: boolean },
    { dispatch }
  ) => {
    try {
      if (isFavorite) {
        await removeMovieFromFavorites(movieId);
      } else {
        await addMovieToFavorites(movieId);
      }

      const updatedList = await fetchFavoriteMovies();
      dispatch(setFavorites(updatedList));
    } catch (error) {
      console.error("Не удалось изменить статус избранного:", error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.favorites = action.payload;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.favorites = [];
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthSession.fulfilled, (state) => {
      state.isAuthChecked = true;
    });
    builder.addCase(checkAuthSession.rejected, (state) => {
      state.isAuthChecked = true;
    });
  },
});

export const {
  setCredentials,
  setFavorites,
  clearCredentials,
  setAuthChecked,
} = authSlice.actions;
export default authSlice.reducer;
