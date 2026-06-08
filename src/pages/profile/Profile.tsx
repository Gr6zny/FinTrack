import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/services/useAppSelector";
import { logout } from "../auth/userSlice";
import { apiClient } from "../../store/services/api";
import s from "./index.module.css";

interface UpdateProfileData {
  username?: string;
  email?: string;
}

interface ChangePasswordData {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [currency, setCurrency] = useState(() => localStorage.getItem("currency") || "RUB");
  const [commonError, setCommonError] = useState("");

  const initials = user?.username?.slice(0, 2).toUpperCase() || "??";

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommonError("");
    setProfileSuccess("");
    if (!user) return;

    if (!username.trim()) {
      setCommonError("Имя пользователя не может быть пустым");
      return;
    }
    if (!email.trim()) {
      setCommonError("Email не может быть пустым");
      return;
    }

    setProfileSaving(true);
    try {
      const token = localStorage.getItem("jwt");
      const body: UpdateProfileData = {};
      if (username !== user.username) body.username = username;
      if (email !== user.email) body.email = email;

      if (Object.keys(body).length > 0) {
        await apiClient(`users/${user.id}`, "PUT", body, {
          Authorization: `Bearer ${token}`,
        });

        const updatedUser = { ...user, ...body };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setProfileSuccess("Профиль успешно обновлён");
      setEditMode(false);
    } catch (err) {
      setCommonError(
        err instanceof Error ? err.message : "Ошибка обновления профиля",
      );
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommonError("");
    setPasswordSuccess("");

    if (newPassword.length < 6) {
      setCommonError("Пароль должен содержать минимум 6 символов");
      return;
    }
    if (newPassword !== confirmPassword) {
      setCommonError("Пароли не совпадают");
      return;
    }

    setPasswordSaving(true);
    try {
      const token = localStorage.getItem("jwt");
      await apiClient<
        unknown,
        ChangePasswordData
      >(
        "auth/change-password",
        "POST",
        {
          currentPassword,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        },
        { Authorization: `Bearer ${token}` },
      );

      setPasswordSuccess("Пароль успешно изменён");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setCommonError(
        err instanceof Error ? err.message : "Ошибка смены пароля",
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="container">
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Личный кабинет</h1>
          <p className={s.pageSubtitle}>Управление вашим профилем</p>
        </div>
      </div>

      {commonError && (
        <div className={s.errorBanner}>
          <i className="fas fa-exclamation-circle"></i>
          <span>{commonError}</span>
        </div>
      )}

      <div className={s.grid}>
        <div className={s.profileCard}>
          <div className={s.profileHeader}>
            <div className={s.avatarLarge}>{initials}</div>
            <div>
              <h2 className={s.profileName}>{user?.username || "Пользователь"}</h2>
              <p className={s.profileEmail}>{user?.email || ""}</p>
            </div>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.cardHeader}>
            <h3>
              <i className="fas fa-user"></i>
              Основная информация
            </h3>
            {!editMode && (
              <button
                className={s.btnOutline}
                onClick={() => {
                  setEditMode(true);
                  setProfileSuccess("");
                }}
              >
                <i className="fas fa-pen"></i>
                Редактировать
              </button>
            )}
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateProfile} className={s.form}>
              <div className={s.field}>
                <label htmlFor="profile-username">Имя пользователя</label>
                <input
                  id="profile-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={s.input}
                />
              </div>
              <div className={s.field}>
                <label htmlFor="profile-email">Email</label>
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={s.input}
                />
              </div>
              {profileSuccess && (
                <p className={s.successText}>
                  <i className="fas fa-check-circle"></i>
                  {profileSuccess}
                </p>
              )}
              <div className={s.formActions}>
                <button
                  type="submit"
                  className={s.btnPrimary}
                  disabled={profileSaving}
                >
                  {profileSaving ? (
                    <><i className="fas fa-spinner fa-spin"></i>Сохранение...</>
                  ) : (
                    <><i className="fas fa-save"></i>Сохранить</>
                  )}
                </button>
                <button
                  type="button"
                  className={s.btnOutline}
                  onClick={() => {
                    setEditMode(false);
                    setUsername(user?.username || "");
                    setEmail(user?.email || "");
                    setProfileSuccess("");
                  }}
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <div className={s.infoRows}>
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Имя пользователя</span>
                <span className={s.infoValue}>{user?.username || "—"}</span>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Email</span>
                <span className={s.infoValue}>{user?.email || "—"}</span>
              </div>
            </div>
          )}
        </div>

        <div className={s.card}>
          <div className={s.cardHeader}>
            <h3>
              <i className="fas fa-lock"></i>
              Сменить пароль
            </h3>
          </div>
          <form onSubmit={handleChangePassword} className={s.form}>
            <div className={s.field}>
              <label htmlFor="current-password">Текущий пароль</label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={s.input}
                required
              />
            </div>
            <div className={s.field}>
              <label htmlFor="new-password">Новый пароль</label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={s.input}
                required
                minLength={6}
              />
            </div>
            <div className={s.field}>
              <label htmlFor="confirm-password">Подтверждение пароля</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={s.input}
                required
                minLength={6}
              />
            </div>
            {passwordSuccess && (
              <p className={s.successText}>
                <i className="fas fa-check-circle"></i>
                {passwordSuccess}
              </p>
            )}
            <button
              type="submit"
              className={s.btnPrimary}
              disabled={passwordSaving}
            >
              {passwordSaving ? (
                <><i className="fas fa-spinner fa-spin"></i>Смена...</>
              ) : (
                <><i className="fas fa-key"></i>Сменить пароль</>
              )}
            </button>
          </form>
        </div>

        <div className={s.card}>
          <div className={s.cardHeader}>
            <h3>
              <i className="fas fa-cog"></i>
              Настройки
            </h3>
          </div>
          <div className={s.form}>
            <div className={s.field}>
              <label htmlFor="currency">Основная валюта</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => {
                  const val = e.target.value;
                  setCurrency(val);
                  localStorage.setItem("currency", val);
                }}
                className={s.input}
              >
                <option value="RUB">RUB — Российский рубль</option>
                <option value="USD">USD — Доллар США</option>
                <option value="EUR">EUR — Евро</option>
                <option value="GBP">GBP — Фунт стерлингов</option>
                <option value="CNY">CNY — Китайский юань</option>
              </select>
            </div>
            <p className={s.hint}>
              <i className="fas fa-info-circle"></i>
              Валюта используется для отображения балансов и транзакций
            </p>
          </div>
        </div>

        <div className={`${s.card} ${s.dangerZone}`}>
          <div className={s.cardHeader}>
            <h3>
              <i className="fas fa-sign-out-alt"></i>
              Выйти из аккаунта
            </h3>
          </div>
          <p className={s.dangerText}>
            После выхода вам потребуется заново войти в систему
          </p>
          <button className={s.btnDanger} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
