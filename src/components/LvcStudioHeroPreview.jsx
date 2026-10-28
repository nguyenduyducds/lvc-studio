import React, { useState, useEffect, useRef } from 'react';
import { LOCAL_STUDIO_VIDEOS } from '../data/studioData';

/**
 * LvcStudioHeroPreview — Giao diện LVC Studio Pro tương tác trực tiếp ngay ở khung Hero bên phải.
 * - Khi người dùng bấm phát video hoặc chọn video trong hàng đợi, tự động khóa xoay vòng slide (onInteractPause).
 * - Khi chuyển sang Tab khác (isCurrent = false), tự động dừng và gỡ thẻ <video> để không bao giờ bị kẹt âm thanh ngầm.
 */
export default function LvcStudioHeroPreview({
  slide,
  isEn,
  isCurrent = true,
  onInteractPause,
}) {
  const accent = slide?.accentColor || '#22d3ee';
  const videoRef = useRef(null);

  // Map mỗi Tab Hero (01..04) sang video mặc định tương ứng trong /video/
  const defaultVideoIdx =
    slide?.previewMode === 'voice'
      ? 1
      : slide?.previewMode === 'shorts'
        ? 5
        : slide?.previewMode === 'batch'
          ? 4
          : 2;

  const [selectedVideoIdx, setSelectedVideoIdx] = useState(defaultVideoIdx);
  const [isPlaying, setIsPlaying] = useState(false);

  // Nếu slide này không còn là slide đang hiển thị (isCurrent = false), lập tức tắt video & dừng âm thanh
  useEffect(() => {
    if (!isCurrent && isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
  }, [isCurrent, isPlaying]);

  const activeVideo = LOCAL_STUDIO_VIDEOS[selectedVideoIdx] || LOCAL_STUDIO_VIDEOS[0];

  const handleStartPlay = (e) => {
    e.stopPropagation();
    // Khóa tự động chuyển tab của Hero ngay khi người dùng bấm xem video
    if (onInteractPause) onInteractPause(true);
    setIsPlaying(true);
  };

  const handleStopPlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleSelectQueueItem = (e, idx) => {
    e.stopPropagation();
    if (onInteractPause) onInteractPause(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideoIdx(idx);
    setIsPlaying(true); // Phát luôn video vừa chọn trong hàng đợi
  };

  return (
    <div
      className="lvc-hero-studio-shell"
      style={{ '--studio-accent': accent }}
    >
      {/* 1. Thanh tiêu đề cửa sổ LVC Studio Pro */}
      <div className="lvc-hero-titlebar">
        <div className="lvc-hero-dots" aria-hidden="true">
          <span className="dot-r" />
          <span className="dot-y" />
          <span className="dot-g" />
        </div>

        <div className="lvc-hero-appname">
          <span className="lvc-hero-logo-badge">L</span>
          <strong>{isEn ? slide.nameEn : slide.name}</strong>
        </div>

        <div className="lvc-hero-hw-pill">
          <i className="hw-live-dot" />
          <span>CUDA · NVENC 60FPS</span>
        </div>
      </div>

      {/* 2. Thân chính Studio: Cột Trái (Hàng đợi 6 Video thật) + Cột Giữa (Màn hình Video thật) */}
      <div className="lvc-hero-workspace">
        {/* Cột trái: Hàng đợi 6 Video trong thư mục /video/ */}
        <aside className="lvc-hero-queue">
          <div className="lvc-hero-panel-head">
            <span>{isEn ? 'PROJECT QUEUE (/video)' : 'HÀNG ĐỢI VIDEO (/video)'}</span>
            <b>6 FILE</b>
          </div>

          <div className="lvc-hero-queue-list">
            {LOCAL_STUDIO_VIDEOS.slice(0, 4).map((vid, idx) => {
              const isSelected = selectedVideoIdx === idx;
              return (
                <button
                  key={vid.id}
                  type="button"
                  className={`lvc-hero-queue-item ${isSelected ? 'is-active' : ''}`}
                  onClick={(e) => handleSelectQueueItem(e, idx)}
                >
                  <img
                    src={vid.poster}
                    alt=""
                    className="lvc-hero-queue-thumb"
                    loading="eager"
                  />
                  <div className="lvc-hero-queue-meta">
                    <strong>{vid.title.replace(/^Video \d+:\s*/, '')}</strong>
                    <small>{vid.duration} · {vid.resolution}</small>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lvc-hero-gpu-box">
            <div className="gpu-box-row">
              <span>⚡ GPU RTX NVENC</span>
              <b>4.8x Speed</b>
            </div>
            <div className="gpu-box-bar">
              <i style={{ width: '86%' }} />
            </div>
            <small>VRAM: 4.2 GB · 100% Local PC</small>
          </div>
        </aside>

        {/* Cột phải/giữa: Màn hình Preview Video Thực Tế + Timeline */}
        <div className="lvc-hero-main">
          <div className="lvc-hero-monitor">
            {isCurrent && isPlaying ? (
              <div className="lvc-hero-video-wrap">
                <video
                  ref={videoRef}
                  key={activeVideo.url}
                  src={activeVideo.url}
                  poster={activeVideo.poster}
                  controls
                  autoPlay
                  playsInline
                  className="lvc-hero-video-player"
                  onClick={(e) => e.stopPropagation()}
                  onPlay={() => {
                    if (onInteractPause) onInteractPause(true);
                  }}
                />
                <button
                  type="button"
                  className="lvc-hero-video-close"
                  onClick={handleStopPlay}
                  title={isEn ? 'Stop & Close Video' : 'Tắt Video'}
                >
                  ✕ {isEn ? 'Stop' : 'Tắt video'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="lvc-hero-poster-btn"
                onClick={handleStartPlay}
                aria-label={`Phát ${activeVideo.title}`}
              >
                <img
                  src={activeVideo.poster}
                  alt={activeVideo.title}
                  className="lvc-hero-poster-img"
                  loading="eager"
                />
                <div className="lvc-hero-poster-scrim" />

                <div className="lvc-hero-monitor-hud-top">
                  <span className="lvc-hud-badge">{activeVideo.badge}</span>
                  <span className="lvc-hud-res">{activeVideo.duration} · {activeVideo.resolution}</span>
                </div>

                <div className="lvc-hero-play-trigger">
                  <span className="lvc-hero-play-circle">▶</span>
                  <span className="lvc-hero-play-label">
                    {isEn ? 'Click to Play Real Video' : 'Bấm để phát Video Thực Tế'}
                  </span>
                </div>

                <div className="lvc-hero-sub-box">
                  <strong>{isEn ? activeVideo.titleEn : activeVideo.title}</strong>
                  <span>AI SUBTITLE &amp; VOICE SYNC · 99.8% ACCURACY</span>
                </div>
              </button>
            )}
          </div>

          {/* Thanh Timeline Đa Luồng bên dưới Monitor */}
          <div className="lvc-hero-timeline">
            <div className="lvc-timeline-playhead" aria-hidden="true" />
            <div className="lvc-timeline-row">
              <span className="tl-tag">V1 · 4K</span>
              <div className="tl-track tl-track--video">
                <span>{activeVideo.url.replace('/video/', '')}</span>
              </div>
            </div>
            <div className="lvc-timeline-row">
              <span className="tl-tag">S1 · SUB</span>
              <div className="tl-track tl-track--sub">
                <span>[VI] Phụ đề AI tự động đồng bộ chuẩn ngữ cảnh</span>
              </div>
            </div>
            <div className="lvc-timeline-row">
              <span className="tl-tag">A1 · DUB</span>
              <div className="tl-track tl-track--audio">
                <span>🎙 LVC Neural Voice Track · Tách nhạc nền BGM (-14 LUFS)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
