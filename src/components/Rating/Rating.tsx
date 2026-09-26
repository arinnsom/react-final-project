import React from "react";
import styles from "./_Rating.module.scss";
import { StarIcon } from "../Icons/Icons";

interface RatingProps {
  rating: number;
  size?: "small" | "large";
}

export const Rating: React.FC<RatingProps> = ({ rating, size = "large" }) => {
  const getColorClass = (): string => {
    if (rating >= 8.6) return styles.excellent;
    if (rating >= 7.3) return styles.good;
    if (rating >= 4.2) return styles.neutral;
    return styles.low;
  };

  return (
    <div className={`${styles.badge} ${getColorClass()} ${styles[size]}`}>
      <StarIcon size={size === "small" ? 10 : 16} />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};
