import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../store";
import { toggleFavoriteMovie } from "../../store/authSlice";
import { type Movie } from "../../types/movie";
import { fetchRandomMovie, fetchTop10Movies } from "../../api/movieApi";
import { Button } from "../../components/Button/Button";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { Rating } from "../../components/Rating/Rating";
import { VideoPlayerModal } from "../../components/VideoPlayerModal/VideoPlayerModal";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import {
  RefreshIcon,
  HeartFilledIcon,
  HeartIcon,
} from "../../components/Icons/Icons";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../../assets/заглушка.jpg";

import styles from "./_Home.module.scss";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, favorites } = useSelector((state: RootState) => state.auth);
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [isLoadingRandom, setIsLoadingRandom] = useState(true);
  const [isLoadingTop, setIsLoadingTop] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const checkIsFavorite = (): boolean => {
    if (!randomMovie) return false;
    return favorites.some((fav) => fav.id === randomMovie.id);
  };

  const handleFavoriteClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (randomMovie) {
      dispatch(
        toggleFavoriteMovie({
          movieId: randomMovie.id,
          isFavorite: checkIsFavorite(),
        })
      );
    }
  };

  const loadRandomMovie = async () => {
    try {
      setIsLoadingRandom(true);
      const data = await fetchRandomMovie();
      setRandomMovie(data);
    } catch (error) {
      console.error("Ошибка при загрузке случайного фильма:", error);
    } finally {
      setIsLoadingRandom(false);
    }
  };

  const loadTopMovies = async () => {
    try {
      setIsLoadingTop(true);
      const data = await fetchTop10Movies();
      setTopMovies(data);
    } catch (error) {
      console.error("Ошибка при загрузке топ-10:", error);
    } finally {
      setIsLoadingTop(false);
    }
  };

  useEffect(() => {
    loadRandomMovie();
    loadTopMovies();
  }, []);

  const isFav = checkIsFavorite();

  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        {isLoadingRandom ? (
          <div className={styles.loader}>Загрузка рекомендации...</div>
        ) : (
          randomMovie && (
            <div className={styles.banner}>
              <div className={styles.bannerContent}>
                <div className={styles.bannerInfo}>
                  <div className={styles.meta}>
                    <Rating rating={randomMovie.tmdbRating} />
                    <span>{randomMovie.releaseYear}</span>
                    <span>{randomMovie.genres[0]}</span>
                    <span>{randomMovie.runtime} мин</span>
                  </div>
                  <h1 className={styles.mainTitle}>{randomMovie.title}</h1>
                  <p className={styles.description}>{randomMovie.plot}</p>
                </div>
                <div className={styles.controls}>
                  <Button
                    variant="primary"
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    Трейлер
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      randomMovie && navigate(`/movie/${randomMovie.id}`)
                    }
                  >
                    О фильме
                  </Button>

                  <button
                    className={`${styles.smallButton} ${
                      isFav ? styles.activeFav : ""
                    }`}
                    onClick={handleFavoriteClick}
                    title={
                      isFav ? "Удалить из избранного" : "Добавить в избранное"
                    }
                  >
                    {isFav ? (
                      <HeartFilledIcon size={20} />
                    ) : (
                      <HeartIcon size={20} />
                    )}
                  </button>

                  <button
                    className={styles.smallButton}
                    onClick={loadRandomMovie}
                    title="Другой фильм"
                  >
                    <RefreshIcon size={20} />
                  </button>
                </div>
              </div>
              <img
                className={styles.bannerImage}
                src={randomMovie.backdropUrl || placeholderImg}
                alt={randomMovie.title}
                width={680}
                height={552}
              />
            </div>
          )
        )}
      </section>

      <section className={styles.topSection}>
        <h2 className={styles.sectionTitle}>Топ 10 фильмов</h2>
        {isLoadingTop ? (
          <div className={styles.loader}>Загрузка топа...</div>
        ) : (
          <div className={styles.grid}>
            {topMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} rank={index + 1} />
            ))}
          </div>
        )}
      </section>

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}

      {isVideoModalOpen && randomMovie && (
        <VideoPlayerModal
          videoUrl={randomMovie.trailerUrl}
          movieTitle={randomMovie.title}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </div>
  );
};
