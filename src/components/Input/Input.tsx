import React from "react";
import styles from "./_Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: "dark" | "light";
  isError?: boolean;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  theme = "light",
  isError = false,
  icon,
  className = "",
  ...props
}) => {
  const wrapperClassName = `${styles.wrapper} ${styles[theme]} ${
    isError ? styles.error : ""
  } ${className}`;

  return (
    <div className={wrapperClassName}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input className={styles.input} {...props} />
    </div>
  );
};
