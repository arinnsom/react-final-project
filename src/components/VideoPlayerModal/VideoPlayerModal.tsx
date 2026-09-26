import React, { useRef, useState } from "react";
import { CloseIcon, PauseIcon, PlayIcon } from "../Icons/Icons";

import styles from "./_VideoPlayerModal.module.scss";

interface VideoPlayerModalProps {
  videoUrl: string;
  movieTitle: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  videoUrl,
  movieTitle,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleVideoClick = () => {
    if (!videoRef.current || isLoading) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowOverlay(true);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    videoRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch((error) => console.log("Автоплей заблокирован браузером:", error));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          title="Закрыть"
        >
          <CloseIcon size={24} />
        </button>

        {isLoading && (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
          </div>
        )}

        <video
          ref={videoRef}
          src={videoUrl}
          className={styles.video}
          onCanPlay={handleCanPlay}
          onClick={handleVideoClick}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
        />

        {(!isPlaying || showOverlay) && !isLoading && (
          <div className={styles.controlsOverlay} onClick={handleVideoClick}>
            <div className={styles.playPauseIcon}>
              {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
            </div>
            <h3 className={styles.movieTitle}>{movieTitle}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
