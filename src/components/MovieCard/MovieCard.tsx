import React from "react";
import { Link } from "react-router-dom";
import { type Movie } from "../../types/movie";
import placeholderImg from "../../assets/заглушка.jpg";

import styles from "./_MovieCard.module.scss";

interface MovieCardProps {
  movie: Movie;
  rank?: number;
  variant?: "main" | "genre";
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, rank, variant = "main"  }) => {
  const cardClassName = `${styles.card} ${styles[variant]}`;

  return (
    <Link to={`/movie/${movie.id}`} className={cardClassName}>
      <div className={styles.posterWrapper}>
        <img
          src={movie.posterUrl || placeholderImg}
          alt={movie.title}
          className={styles.poster}
        />

        {rank !== undefined && <div className={styles.rankBadge}>{rank}</div>}
      </div>
    </Link>
  );
};
