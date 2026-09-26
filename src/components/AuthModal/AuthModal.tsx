import React, { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { loginUser, registerUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { checkAuthSession } from "../../store/authSlice";
import { type AppDispatch } from "../../store";
import { CloseIcon, EmailIcon, KeyIcon, UserIcon } from "../Icons/Icons";
import logoImg from "../../assets/logo-black.png";

import styles from "./_AuthModal.module.scss";

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<"login" | "register" | "success">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateFields = (fields: Record<string, string>): boolean => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    Object.entries(fields).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = true;
        isValid = false;
      }
    });

    if (
      fields.hasOwnProperty("confirmPassword") &&
      fields.password !== fields.confirmPassword
    ) {
      newErrors.password = true;
      newErrors.confirmPassword = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateFields({ email, password })) return;

    try {
      await loginUser({ email, password });
      dispatch(checkAuthSession());
      onClose();
    } catch (error) {
      alert("Ошибка авторизации. Проверьте данные.");
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateFields({ email, name, surname, password, confirmPassword })) return;

    try {
      await registerUser({ email, name, surname, password });
      setMode("success");
    } catch (error) {
      alert("Ошибка при регистрации. Возможно, email занят.");
    }
  };

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    setErrors({});
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon size={24} />
        </button>
        <img className={styles.logo} src={logoImg} alt="Маруся" />

        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className={styles.form}>
            <div className={styles.inputs}>
              <Input
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isError={errors.email}
                icon={<EmailIcon size={24} />}
              />
              <Input
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isError={errors.password}
                icon={<KeyIcon size={24} />}
              />
            </div>
            <Button variant="primary" type="submit">
              Войти
            </Button>
            <p className={styles.switchText}>
              <span onClick={() => switchMode("register")}>Регистрация</span>
            </p>
          </form>
        )}

        {mode === "register" && (
          <form onSubmit={handleRegisterSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>Регистрация</h2> 
            <div className={styles.inputs}>
              <Input
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isError={errors.email}
                icon={<EmailIcon size={24} />}
              />
              <Input
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isError={errors.name}
                icon={<UserIcon size={24} />}
              />
              <Input
                placeholder="Фамилия"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                isError={errors.surname}
                icon={<UserIcon size={24} />}
              />
              <Input
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isError={errors.password}
                icon={<KeyIcon size={24} />}
              />
               <Input
                placeholder="Подтвердите пароль"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isError={errors.confirmPassword}
                icon={<KeyIcon size={24} />}
              />
            </div>
            <Button variant="primary" type="submit">
              Создать аккаунт
            </Button>
            <p className={styles.switchText}>
              <span onClick={() => switchMode("login")}>У меня есть пароль</span>
            </p>
          </form>
        )}

        {mode === "success" && (
          <div className={styles.successScreen}>
            <h3>Регистрация завершена</h3>
            <p>Используйте вашу электронную почту для входа.</p>
            <Button variant="primary" onClick={() => switchMode("login")}>
              Войти
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
