import React from "react";
import { VkIcon, YoutubeIcon, OkIcon, TelegramIcon } from "../Icons/Icons";
import styles from "./_Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialContainer}>
        <a
          href="https://vk.com"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
          title="ВКонтакте"
        >
          <VkIcon size={19} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
          title="YouTube"
        >
          <YoutubeIcon size={15} />
        </a>
        <a
          href="https://ok.ru"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
          title="Одноклассники"
        >
          <OkIcon size={11} />
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
          title="Telegram"
        >
          <TelegramIcon size={17} />
        </a>
      </div>
    </footer>
  );
};
