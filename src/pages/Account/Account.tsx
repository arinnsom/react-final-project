import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { type RootState } from "../../store";
import { clearCredentials, setFavorites } from "../../store/authSlice";
import { axiosInstance } from "../../api/axiosInstance";
import {
  removeMovieFromFavorites,
  fetchFavoriteMovies,
} from "../../api/movieApi";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { Button } from "../../components/Button/Button";
import {
  CloseIcon,
  EmailIcon,
  HeartIcon,
  UserIcon,
} from "../../components/Icons/Icons";

import styles from "./_Account.module.scss";

export const Account: React.FC = () => {
  const { user, favorites } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"favorites" | "settings">(
    "favorites"
  );

  if (!user) return <Navigate to="/" replace />;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const handleRemoveFavorite = async (
    movieId: number,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    try {
      await removeMovieFromFavorites(movieId);
      const updatedFavs = await fetchFavoriteMovies();
      dispatch(setFavorites(updatedFavs));
    } catch (error) {
      console.error("Не удалось удалить из избранного:", error);
    }
  };

  return (
    <div className={styles.accountPage}>
      <h1 className={styles.pageTitle}>Мой аккаунт</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "favorites" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("favorites")}
          data-desktop="Избранные фильмы"
          data-mobile="Избранное"
        >
          <HeartIcon size={24} />
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "settings" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("settings")}
          data-desktop="Настройка аккаунта"
          data-mobile="Настройки"
        >
          <UserIcon size={24} />
        </button>
      </div>

      {activeTab === "favorites" && (
        <div className={styles.tabContent}>
          {favorites.length === 0 ? (
            <p className={styles.emptyText}>
              У вас пока нет избранных фильмов.
            </p>
          ) : (
            <div className={styles.grid}>
              {favorites.map((movie) => (
                <div key={movie.id} className={styles.cardContainer}>
                  <MovieCard movie={movie} />
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleRemoveFavorite(movie.id, e)}
                    title="Удалить из избранного"
                  >
                    <CloseIcon size={24} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className={styles.profileSection}>
          <div className={styles.infoCards}>
            <div className={styles.profileCard}>
              <div className={styles.avatar}>
                {user.name.charAt(0).toUpperCase()}
                {user.surname.charAt(0).toUpperCase()}
              </div>
              <span className={styles.cardTitle}>Имя Фамилия</span>
              <span className={styles.profileInfo}>
                {user.name} {user.surname}
              </span>
            </div>
            <div className={styles.profileCard}>
              <div className={styles.avatar}>
                <EmailIcon size={24} />
              </div>
              <span className={styles.cardTitle}>Электронная почта</span>
              <span className={styles.profileInfo}>{user.email}</span>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleLogout}
            className={styles.logoutBtn}
          >
            Выйти из аккаунта
          </Button>
        </div>
      )}
    </div>
  );
};
