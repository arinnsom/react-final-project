import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGenresList, fetchMoviesByGenre } from "../../api/movieApi";

import styles from "./_Genres.module.scss";

interface GenreItem {
  id: string;
  title: string;
  posterUrl: string;
}

export const Genres: React.FC = () => {
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadGenres = async () => {
    try {
      setIsLoading(true);

      const rawGenres = await fetchGenresList();

      const formattedGenres: GenreItem[] = await Promise.all(
        rawGenres.map(async (genreTitle) => {
          let posterUrl = "https://placeholder.com";

          try {
            const movies = await fetchMoviesByGenre(genreTitle, 1, 1);

            if (movies && movies.length > 0 && movies[0].posterUrl) {
              posterUrl = movies[0].posterUrl;
            }
          } catch (error) {
            console.error(
              `Не удалось загрузить афишу для жанра ${genreTitle}:`,
              error
            );
          }

          return {
            id: encodeURIComponent(genreTitle),
            title: genreTitle.charAt(0).toUpperCase() + genreTitle.slice(1),
            posterUrl,
          };
        })
      );

      setGenres(formattedGenres);
    } catch (error) {
      console.error("Ошибка при загрузке жанров:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  return (
    <div className={styles.genresPage}>
      <h1 className={styles.pageTitle}>Жанры фильмов</h1>

      {isLoading ? (
        <div className={styles.loader}>Загрузка жанров...</div>
      ) : (
        <div className={styles.grid}>
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genres/${genre.id}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={genre.posterUrl}
                  alt={genre.title}
                  className={styles.poster}
                />
              </div>
              <div className={styles.titlePlate}>
                <h2 className={styles.cardTitle}>{genre.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
