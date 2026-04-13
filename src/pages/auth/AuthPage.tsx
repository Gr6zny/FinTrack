// index.tsx
import React from "react";
import { useAuthMode } from "./hooks/useAuthMode";
import { useAuthForm } from "./hooks/useAuthForm";
import { useAuthSubmit } from "./hooks/useAuthSubmit";
import { usePasswordStrength } from "./hooks/usePasswordStrength";
import { useTestimonials } from "./hooks/useTestimonials";
import { BrandColumn } from "./components/BrandColumn/BrandColumn";
import { LoginForm } from "./components/AuthForm/LoginForm";
import { RegisterForm } from "./components/AuthForm/RegisterForm";
import { SocialAuth } from "./components/SocialAuth/SocialAuth";
import { Message } from "./components/common/Message";
import s from "./index.module.css";
import { useAppDispatch } from "../../store/useAppDispatch";
import { loginUser, registerUser } from "./userThunk";

const AuthPage: React.FC = () => {
  const { mode, isAnimating, toggleMode, setLoginMode } = useAuthMode();
  const {
    loginData,
    registerData,
    loginErrors,
    registerErrors,
    handleLoginChange,
    handleRegisterChange,
    validateLogin,
    validateRegister,
    resetForms,
  } = useAuthForm();

  const { strengthInfo, updatePassword } = usePasswordStrength();

  const dispatch = useAppDispatch();

  const {
    isLoading,
    successMessage,
    error,
    submitLogin,
    submitRegister,
    resetMessages,
  } = useAuthSubmit({
    onRegisterSuccess: () => {
      setTimeout(() => {
        setLoginMode();
        resetMessages();
      }, 3000);
    },
  });

  const { testimonials, currentSlide, goToSlide } = useTestimonials();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    const data = { identifier: loginData.email, password: loginData.password };
    console.log(loginData, data);
    dispatch(loginUser(data));
    await submitLogin();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;
    const data = {
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
    };
    dispatch(registerUser(data));
    await submitRegister();
  };

  const handleToggleMode = () => {
    resetMessages();
    resetForms();
    toggleMode();
  };

  const handleRegisterChangeWithPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleRegisterChange(e);
    if (e.target.name === "password") {
      updatePassword(e.target.value);
    }
  };

  return (
    <div className={s.authPage}>
      <BrandColumn
        testimonials={testimonials}
        currentSlide={currentSlide}
        onDotClick={goToSlide}
      />

      <div className={s.authColumn}>
        <div className={`${s.authContainer} ${isAnimating ? s.animating : ""}`}>
          {/* Уведомления */}
          {successMessage && <Message type="success">{successMessage}</Message>}

          {error && <Message type="error">{error}</Message>}

          {/* Заголовок */}
          <div className={s.authHeader}>
            <h2 className={s.authTitle}>
              {mode === "login" ? "Добро пожаловать!" : "Создайте аккаунт"}
            </h2>
            <p className={s.authSubtitle}>
              {mode === "login"
                ? "Войдите в свой аккаунт чтобы продолжить"
                : "Заполните форму для регистрации"}
            </p>
          </div>

          {/* Переключатель режимов */}
          <div className={s.modeToggle}>
            <button
              className={`${s.toggleBtn} ${mode === "login" ? s.active : ""}`}
              onClick={() => mode !== "login" && handleToggleMode()}
              disabled={isLoading}
            >
              Вход
            </button>
            <button
              className={`${s.toggleBtn} ${mode === "register" ? s.active : ""}`}
              onClick={() => mode !== "register" && handleToggleMode()}
              disabled={isLoading}
            >
              Регистрация
            </button>
          </div>

          {/* Формы */}
          {mode === "login" ? (
            <LoginForm
              data={loginData}
              errors={loginErrors}
              isLoading={isLoading}
              showPassword={showPassword}
              onShowPasswordToggle={() => setShowPassword(!showPassword)}
              onChange={handleLoginChange}
              onSubmit={handleLoginSubmit}
              onForgotPassword={() => console.log("Forgot password")}
            />
          ) : (
            <RegisterForm
              data={registerData}
              errors={registerErrors}
              isLoading={isLoading}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              passwordStrength={strengthInfo}
              onShowPasswordToggle={() => setShowPassword(!showPassword)}
              onShowConfirmPasswordToggle={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              onChange={handleRegisterChangeWithPassword}
              onSubmit={handleRegisterSubmit}
            />
          )}

          {/* Социальная авторизация */}
          <SocialAuth isLoading={isLoading} />

          {/* Ссылка переключения */}
          <div className={s.authFooter}>
            {mode === "login" ? (
              <p>
                Нет аккаунта?{" "}
                <button
                  onClick={handleToggleMode}
                  className={s.linkBtn}
                  disabled={isLoading}
                >
                  Зарегистрироваться
                </button>
              </p>
            ) : (
              <p>
                Уже есть аккаунт?{" "}
                <button
                  onClick={handleToggleMode}
                  className={s.linkBtn}
                  disabled={isLoading}
                >
                  Войти
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
