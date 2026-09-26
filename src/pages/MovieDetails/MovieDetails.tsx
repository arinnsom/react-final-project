import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../store";
import { toggleFavoriteMovie } from "../../store/authSlice";
import { fetchMovieById } from "../../api/movieApi";
import { type Movie } from "../../types/movie";
import { Button } from "../../components/Button/Button";
import { Rating } from "../../components/Rating/Rating";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { VideoPlayerModal } from "../../components/VideoPlayerModal/VideoPlayerModal";
import { HeartFilledIcon, HeartIcon } from "../../components/Icons/Icons";
import placeholderImg from "../../assets/заглушка.jpg";

import styles from "./_MovieDetails.module.scss";

export const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { user, favorites } = useSelector((state: RootState) => state.auth);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const checkIsFavorite = (): boolean => {
    if (!movie) return false;
    return favorites.some((fav) => fav.id === movie.id);
  };

  const handleFavoriteClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (movie) {
      dispatch(
        toggleFavoriteMovie({
          movieId: movie.id,
          isFavorite: checkIsFavorite(),
        })
      );
    }
  };

  const formatMoney = (value: string | undefined): string => {
    if (!value || value === "0") return "Неизвестно";
    const numberValue = parseInt(value, 10);
    return isNaN(numberValue)
      ? value
      : `${numberValue.toLocaleString("ru-RU")} $`;
  };

  const loadMovieData = async () => {
    if (!movieId) return;
    try {
      setIsLoading(true);
      const data = await fetchMovieById(movieId);
      setMovie(data);
    } catch (error) {
      console.error("Ошибка при загрузке деталей фильма:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovieData();
  }, [movieId]);

  if (isLoading)
    return <div className={styles.loader}>Загрузка информации о фильме...</div>;
  if (!movie) return <div className={styles.loader}>Фильм не найден</div>;

  const isFav = checkIsFavorite();

  return (
    <div className={styles.detailsPage}>
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerInfo}>
            <div className={styles.meta}>
              <Rating rating={movie.tmdbRating} />
              <span>{movie.releaseYear}</span>
              <span>{movie.genres.join(", ")}</span>
              <span>{movie.runtime} мин</span>
            </div>
            <h1 className={styles.mainTitle}>{movie.title}</h1>
            <p className={styles.description}>{movie.plot}</p>
          </div>

          <div className={styles.controls}>
            <Button variant="primary" onClick={() => setIsVideoModalOpen(true)}>
              Трейлер
            </Button>

            <button
              className={`${styles.favoriteButton} ${
                isFav ? styles.activeFav : ""
              }`}
              onClick={handleFavoriteClick}
              title={isFav ? "Удалить из избранного" : "Добавить в избранное"}
            >
              {isFav ? <HeartFilledIcon size={20} /> : <HeartIcon size={20} />}
            </button>
          </div>
        </div>
        <img
          className={styles.bannerImage}
          src={movie.backdropUrl || placeholderImg}
          alt={movie.title}
          width={680}
          height={552}
        />
      </section>

      <section className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>О фильме</h2>
        <div className={styles.movieInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Язык оригинала</span>
            <span className={styles.value}>
              {movie.language?.toUpperCase() || "Английский"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Бюджет</span>
            <span className={styles.value}>{formatMoney(movie.budget)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Выручка</span>
            <span className={styles.value}>{formatMoney(movie.revenue)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Режиссёр</span>
            <span className={styles.value}>
              {movie.director || "Не указан"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Продакшен</span>
            <span className={styles.value}>
              {movie.production || "Нет данных"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Награды</span>
            <span className={styles.value}>
              {movie.awardsSummary || "Нет наград"}
            </span>
          </div>
        </div>
      </section>

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}

      {isVideoModalOpen && movie && (
        <VideoPlayerModal
          videoUrl={movie.trailerUrl}
          movieTitle={movie.title}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </div>
  );
};
