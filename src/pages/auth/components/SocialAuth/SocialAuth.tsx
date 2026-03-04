// components/SocialAuth/SocialAuth.tsx
import React from "react";
import s from "./SocialAuth.module.css";

interface SocialAuthProps {
  isLoading: boolean;
}

export const SocialAuth: React.FC<SocialAuthProps> = ({ isLoading }) => {
  return (
    <>
      <div className={s.divider}>
        <span>или войдите через</span>
      </div>

      <div className={s.socialAuth}>
        <button
          className={`${s.socialButton} ${s.google}`}
          disabled={isLoading}
        >
          <i className="fab fa-google"></i>
          <span>Google</span>
        </button>
        <button
          className={`${s.socialButton} ${s.yandex}`}
          disabled={isLoading}
        >
          <i className="fab fa-yandex"></i>
          <span>Яндекс</span>
        </button>
        <button className={`${s.socialButton} ${s.vk}`} disabled={isLoading}>
          <i className="fab fa-vk"></i>
          <span>VK</span>
        </button>
      </div>
    </>
  );
};
