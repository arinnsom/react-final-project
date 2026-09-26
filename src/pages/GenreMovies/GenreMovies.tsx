import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMoviesByGenre } from "../../api/movieApi";
import { type Movie } from "../../types/movie";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { ArrowLeftIcon } from "../../components/Icons/Icons";

import styles from "./_GenreMovies.module.scss";

export const GenreMovies: React.FC = () => {
  const { genreName } = useParams<{ genreName: string }>();
  const navigate = useNavigate();
  const decodedGenre = decodeURIComponent(genreName || "");
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  const loadInitialMovies = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMoviesByGenre(decodedGenre, 1, 15);
      setAllMovies(data);
      setVisibleCount(15);
    } catch (error) {
      console.error("Ошибка при загрузке фильмов жанра:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMovies = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  useEffect(() => {
    setAllMovies([]);
    loadInitialMovies();
  }, [genreName]);

  const hasMore = allMovies.length > visibleCount;

  return (
    <div className={styles.genreMoviesPage}>
      <div className={styles.pageHeader}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/genres")}
          title="Назад к жанрам"
        >
          <ArrowLeftIcon size={40} />
        </button>
        <h1 className={styles.pageTitle}>
          {decodedGenre.charAt(0).toUpperCase() + decodedGenre.slice(1)}
        </h1>
      </div>

      {isLoading ? (
        <div className={styles.loader}>Загрузка списка фильмов...</div>
      ) : (
        <>
          <div className={styles.grid}>
            {allMovies.slice(0, visibleCount).map((movie) => (
              <MovieCard key={movie.id} movie={movie} variant="genre"/>
            ))}
          </div>

          {hasMore && (
            <div className={styles.paginationBlock}>
              <button className={styles.moreBtn} onClick={loadMoreMovies}>Показать еще</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
