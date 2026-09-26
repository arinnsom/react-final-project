import { axiosInstance } from "./axiosInstance";
import { type Movie } from "../types/movie";

export const fetchRandomMovie = async (): Promise<Movie> => {
  const response = await axiosInstance.get<Movie>("/movie/random");
  return response.data;
};

export const fetchTop10Movies = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get<Movie[]>("/movie/top10");
  return response.data;
};

export const fetchGenresList = async (): Promise<string[]> => {
  const response = await axiosInstance.get<string[]>("/movie/genres");
  return response.data;
};

export const fetchMoviesByGenre = async (
  genre: string,
  page: number = 1,
  limit: number = 10
): Promise<Movie[]> => {
  const response = await axiosInstance.get<Movie[]>("/movie", {
    params: {
      genre,
      page,
      limit,
    },
  });
  return response.data;
};

export const searchMoviesByTitle = async (title: string): Promise<Movie[]> => {
  const response = await axiosInstance.get<Movie[]>("/movie", {
    params: {
      title: title,
    },
  });
  return response.data;
};

export const fetchMovieById = async (movieId: string): Promise<Movie> => {
  const response = await axiosInstance.get<Movie>(`/movie/${movieId}`);
  return response.data;
};

export const fetchFavoriteMovies = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get<Movie[]>("/favorites");
  return response.data;
};

export const addMovieToFavorites = async (movieId: number): Promise<Movie> => {
  const response = await axiosInstance.post<Movie>("/favorites", {
    id: String(movieId),
  });
  return response.data;
};

export const removeMovieFromFavorites = async (
  movieId: number
): Promise<void> => {
  await axiosInstance.delete(`/favorites/${movieId}`);
};
