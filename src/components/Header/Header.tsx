import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchMoviesByTitle } from "../../api/movieApi";
import { type Movie } from "../../types/movie";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { AuthModal } from "../AuthModal/AuthModal";
import { useSelector } from "react-redux";
import { type RootState } from "../../store";
import { CloseIcon, GenresIcon, SearchIcon, UserIcon } from "../Icons/Icons";
import logoImg from "../../assets/logo.png";

import styles from "./_Header.module.scss";

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const userName = user ? user.name : null;

  useEffect(() => {
    const handleResize = () => {
      const mobileStatus = window.innerWidth <= 768;
      setIsMobile(mobileStatus);
      if (!mobileStatus) setIsMobileSearchOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkIsActive = (path: string): string => {
    return location.pathname === path ? styles.active : "";
  };

  const handleSearchChange = async (text: string) => {
    setSearchQuery(text);
    if (text.trim().length < 2) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }
    try {
      const data = await searchMoviesByTitle(text);
      setSearchResults(data.slice(0, 5));
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Ошибка при поиске:", error);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsDropdownOpen(false);
    setIsMobileSearchOpen(false);
  };

  const handleResultClick = (movieId: number) => {
    clearSearch();
    navigate(`/movie/${movieId}`);
  };

  const handleUserClick = () => {
    if (userName) {
      navigate("/account");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSearchResults = () =>
    isDropdownOpen &&
    searchResults.length > 0 && (
      <div className={styles.dropdown}>
        {searchResults.map((movie) => (
          <div
            key={movie.id}
            className={styles.dropdownItem}
            onClick={() => handleResultClick(movie.id)}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className={styles.miniPoster}
            />
            <div className={styles.movieInfo}>
              <div className={styles.metaRow}>
                <Rating rating={movie.tmdbRating} size="small" />
                <span>{movie.releaseYear}</span>
                <span>{movie.genres[0]}</span>
                <span>{movie.runtime} мин</span>
              </div>
              <h4 className={styles.movieTitle}>{movie.title}</h4>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <header
      className={`${styles.header} ${
        isAuthModalOpen ? styles.headerWithModal : ""
      }`}
    >
      <div className={styles.container}>
        {isMobile ? (
          isMobileSearchOpen ? (
            <div className={styles.searchBlockMobile} ref={dropdownRef}>
              <div className={styles.inputContainer}>
                <Input
                  theme="dark"
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  onFocus={() =>
                    searchQuery.trim().length >= 2 && setIsDropdownOpen(true)
                  }
                  icon={<SearchIcon size={20} />}
                  autoFocus
                />
                <button className={styles.clearButton} onClick={clearSearch}>
                  <CloseIcon size={16} />
                </button>
              </div>
              <div className={styles.overlay} onClick={clearSearch} />
              {renderSearchResults()}
            </div>
          ) : (
            <>
              <Link to="/" className={styles.logo}>
                <img src={logoImg} alt="Маруся" />
              </Link>
              <div className={styles.mobileActions}>
                <Link to="/genres" className={styles.iconButton}>
                  <GenresIcon size={24} />
                </Link>
                <button
                  className={styles.iconButton}
                  onClick={() => setIsMobileSearchOpen(true)}
                >
                  <SearchIcon size={24} />
                </button>
                <button className={styles.iconButton} onClick={handleUserClick}>
                  <UserIcon size={24} />
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <div className={styles.navigation}>
              <Link to="/" className={styles.logo}>
                <img
                  src={logoImg}
                  alt="Маруся"
                  style={{ height: "32px", width: "auto" }}
                />
              </Link>
              <nav className={styles.menu}>
                <Link
                  to="/"
                  className={`${styles.menuItem} ${checkIsActive("/")}`}
                >
                  Главная
                </Link>
                <Link
                  to="/genres"
                  className={`${styles.menuItem} ${checkIsActive("/genres")}`}
                >
                  Жанры
                </Link>
                <div className={styles.searchBlock} ref={dropdownRef}>
                  <div className={styles.inputContainer}>
                    <Input
                      theme="dark"
                      placeholder="Поиск"
                      value={searchQuery}
                      onChange={(event) =>
                        handleSearchChange(event.target.value)
                      }
                      onFocus={() =>
                        searchQuery.trim().length >= 2 &&
                        setIsDropdownOpen(true)
                      }
                      icon={<SearchIcon size={24} />}
                    />
                    {searchQuery && (
                      <button
                        className={styles.clearButton}
                        onClick={clearSearch}
                      >
                        <CloseIcon size={16} />
                      </button>
                    )}
                  </div>
                  {renderSearchResults()}
                </div>
              </nav>
            </div>

            <div className={styles.authBlock}>
              {userName ? (
                <Link to="/account" className={styles.userNameLink}>
                  {userName}
                </Link>
              ) : (
                <Button
                  variant="authbtn"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Войти
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </header>
  );
};
