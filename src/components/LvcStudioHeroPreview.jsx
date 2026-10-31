import React, { useState, useEffect, useRef } from 'react';
import { CONTACT_INFO, LOCAL_STUDIO_VIDEOS } from '../data/studioData';
import { LvcClapperboardLogo } from './Header';

/**
 * LvcStudioHeroPreview — Giao diện LVCStudio (Review & Auto Dub Pro) ở khung Hero bên phải.
 * - Tab 01 (previewMode === 'real-app'): Hiển thị ảnh chụp giao diện thật LVCStudio (/images/lvcstudio-app-real.png)
 *   với Kho mẫu Kịch bản 1-Click ("Áp dụng vào Studio" không cần setup nhiều), có nút chuyển nhanh sang phát Video thật.
 * - Các Tab khác hoặc khi bấm "Phát Video Thực Tế": Hiển thị trình phát 6 video thực tế trong /video/.
 * - Tự động khóa xoay vòng slide khi người dùng tương tác và tự tắt âm thanh khi chuyển Tab.
 */
export default function LvcStudioHeroPreview({
  slide,
  isEn,
  isCurrent = true,
  onInteractPause,
}) {
  const accent = slide?.accentColor || '#f59e0b';
  const videoRef = useRef(null);

  const defaultVideoIdx =
    slide?.previewMode === 'voice'
      ? 1
      : slide?.previewMode === 'shorts'
        ? 5
        : slide?.previewMode === 'batch'
          ? 4
          : 0;

  const [selectedVideoIdx, setSelectedVideoIdx] = useState(defaultVideoIdx);
  const [isPlaying, setIsPlaying] = useState(false);
  const [forceVideoWorkspace, setForceVideoWorkspace] = useState(false);

  // Khi đổi slide, reset chế độ xem về mặc định của slide đó và tắt video nếu slide ẩn
  useEffect(() => {
    if (!isCurrent) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setForceVideoWorkspace(false);
    }
  }, [isCurrent]);

  const activeVideo = LOCAL_STUDIO_VIDEOS[selectedVideoIdx] || LOCAL_STUDIO_VIDEOS[0];
  const showRealAppScreenshot = slide?.previewMode === 'real-app' && !forceVideoWorkspace;

  const handleStartPlay = (e) => {
    e.stopPropagation();
    if (onInteractPause) onInteractPause(true);
    setForceVideoWorkspace(true);
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
    setIsPlaying(true);
  };

  return (
    <div
      className="lvc-hero-studio-shell"
      style={{ '--studio-accent': accent }}
    >
      {/* 1. Thanh tiêu đề cửa sổ LVCStudio chính thức */}
      <div className="lvc-hero-titlebar">
        <div className="lvc-hero-dots" aria-hidden="true">
          <span className="dot-r" />
          <span className="dot-y" />
          <span className="dot-g" />
        </div>

        <div className="lvc-hero-appname">
          <LvcClapperboardLogo size={22} />
          <strong>
            <span className="lvc-word-white">LVC</span>
            <span className="lvc-word-gold">Studio</span>
            <span className="lvc-hero-title-sep">·</span>
            <span>{isEn ? slide.nameEn : slide.name}</span>
          </strong>
        </div>

        <div className="lvc-hero-hw-pill">
          <i className="hw-live-dot" />
          <span>1-CLICK PRESET · GPU 60FPS</span>
        </div>
      </div>

      {/* 2. Chế độ A: Ảnh chụp giao diện thật LVCStudio — Kho mẫu Kịch bản 1-Click */}
      {showRealAppScreenshot ? (
        <div className="lvc-hero-real-shot-wrap">
          <img
            src={CONTACT_INFO.appScreenshot || CONTACT_INFO.realAppScreenshot || '/images/lvcstudio-app-real.png'}
            alt="Giao diện phần mềm LVCStudio — Review & Auto Dub Pro với Kho mẫu Kịch bản 1-Click"
            className="lvc-hero-real-shot-img"
            loading="eager"
          />

          <div className="lvc-hero-real-overlay">
            <div className="lvc-hero-real-badge-row">
              <span className="lvc-real-pill-gold">
                ✨ GIAO DIỆN THẬT LVCSTUDIO
              </span>
              <span className="lvc-real-pill-cyan">
                ⚡ Template dựng sẵn chỉ 1 Click · Không cần setup nhiều
              </span>
            </div>

            <div className="lvc-hero-real-actions">
              <a
                href="#kho-mau"
                className="lvc-real-action-btn primary"
                onClick={(e) => e.stopPropagation()}
              >
                🎁 Xem 10 Mẫu 1-Click ↓
              </a>
              <button
                type="button"
                className="lvc-real-action-btn"
                onClick={handleStartPlay}
              >
                ▶ Phát Video Thành Phẩm
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 3. Chế độ B: Trình phát 6 Video Thực Tế trong /video/ */
        <div className="lvc-hero-workspace">
          {/* Cột trái: Hàng đợi Video trong thư mục /video/ */}
          <aside className="lvc-hero-queue">
            <div className="lvc-hero-panel-head">
              <span>{isEn ? 'PROJECT QUEUE (/video)' : 'HÀNG ĐỢI VIDEO (/video)'}</span>
              {slide?.previewMode === 'real-app' ? (
                <button
                  type="button"
                  className="lvc-back-to-shot-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStopPlay(e);
                    setForceVideoWorkspace(false);
                  }}
                >
                  ← Ảnh Tool
                </button>
              ) : (
                <b>6 FILE</b>
              )}
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
                <span>⚡ 1-CLICK TEMPLATE</span>
                <b>Auto Setup</b>
              </div>
              <div className="gpu-box-bar">
                <i style={{ width: '92%' }} />
              </div>
              <small>LVCStudio · Review &amp; Auto Dub Pro</small>
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
                    <span>1-CLICK TEMPLATE · AI SUBTITLE &amp; AUTO DUB PRO</span>
                  </div>
                </button>
              )}
            </div>

            {/* Thanh Timeline Đa Luồng bên dưới Monitor */}
            <div className="lvc-hero-timeline">
              <div className="lvc-timeline-playhead" aria-hidden="true" />
              <div className="lvc-timeline-row">
                <span className="tl-tag">V1 · 9:16</span>
                <div className="tl-track tl-track--video">
                  <span>{activeVideo.url.replace('/video/', '')} · Template 1-Click</span>
                </div>
              </div>
              <div className="tl-timeline-row lvc-timeline-row">
                <span className="tl-tag">S1 · SUB</span>
                <div className="tl-track tl-track--sub">
                  <span>[VI] Xoá Sub gốc tự động + Phụ đề AI chuẩn ngữ cảnh</span>
                </div>
              </div>
              <div className="lvc-timeline-row">
                <span className="tl-tag">A1 · DUB</span>
                <div className="tl-track tl-track--audio">
                  <span>🎙 LVCStudio Auto Dub Pro · Tách nhạc nền BGM (-14 LUFS)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
