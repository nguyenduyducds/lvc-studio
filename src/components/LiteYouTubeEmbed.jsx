import React, { useState, useEffect } from 'react';

/**
 * Kiểm tra xem URL có phải là file video cục bộ (.mp4, .webm, .mov) trong thư mục /video/ hay không.
 */
export function isLocalVideoUrl(input) {
  if (!input) return false;
  const trimmed = input.trim();
  return (
    /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(trimmed) ||
    trimmed.startsWith('/video/') ||
    trimmed.startsWith('video/')
  );
}

/**
 * Lấy đường dẫn ảnh Poster nhẹ (.jpg) đã trích xuất sẵn cho video cục bộ trong /video/posters/
 */
export function getLocalVideoPoster(videoUrl) {
  if (!videoUrl) return '';
  const clean = videoUrl.trim().replace(/^\/?video\//, '/video/');
  const match = clean.match(/^\/video\/([^/]+)\.(mp4|webm|mov|m4v)$/i);
  if (match?.[1]) {
    return `/video/posters/${match[1]}.jpg`;
  }
  return '';
}

/**
 * Trích xuất YouTube Video ID (11 ký tự) từ mọi định dạng URL hoặc ID trực tiếp.
 */
export function extractYouTubeId(input) {
  if (!input || isLocalVideoUrl(input)) return null;
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();
    if (
      host.includes('youtube.com') ||
      host.includes('youtu.be') ||
      host.includes('youtube-nocookie.com')
    ) {
      if (host === 'youtu.be') {
        const id = url.pathname.slice(1).split('/')[0];
        return /^[\w-]{11}$/.test(id) ? id : null;
      }
      const vParam = url.searchParams.get('v');
      if (vParam && /^[\w-]{11}$/.test(vParam)) return vParam;

      const match = url.pathname.match(/^\/(?:embed|shorts|v)\/([\w-]{11})/);
      if (match?.[1]) return match[1];
    }
  } catch {
    const regexMatch = trimmed.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/)([\w-]{11})/);
    if (regexMatch?.[1]) return regexMatch[1];
  }
  return null;
}

/**
 * Trả về ảnh bìa cho cả Video cục bộ (/video/*.mp4 -> /video/posters/*.jpg) và YouTube URL.
 */
export function getYouTubeThumbUrl(urlOrId, quality = 'hqdefault') {
  if (!urlOrId) return '';
  if (isLocalVideoUrl(urlOrId)) {
    return getLocalVideoPoster(urlOrId);
  }
  const id = extractYouTubeId(urlOrId);
  return id ? `https://i.ytimg.com/vi/${id}/${quality}.jpg` : '';
}

/**
 * LiteYouTubeEmbed - Zero-Lag Video & YouTube Facade Component
 * Hỗ trợ cả file MP4 trong thư mục /video/ lẫn link YouTube.
 * Chỉ hiển thị ảnh Poster nhẹ khi cuộn trang (0MB preload), chỉ tải và phát video khi người dùng bấm Play.
 */
export default function LiteYouTubeEmbed({
  url,
  poster,
  title = 'LVC Studio Video Player',
  badgeText = 'LVC STUDIO HD',
  durationText = '',
  initiallyStarted = false,
  isEn = false,
}) {
  const isLocal = isLocalVideoUrl(url);
  const videoId = extractYouTubeId(url);
  const [isPlaying, setIsPlaying] = useState(initiallyStarted);
  const [thumbQuality, setThumbQuality] = useState('maxresdefault');

  useEffect(() => {
    setIsPlaying(initiallyStarted);
    setThumbQuality('maxresdefault');
  }, [url, initiallyStarted]);

  if (!isLocal && !videoId) {
    return (
      <div className="demo-real-empty">
        <span aria-hidden="true">▷</span>
        <p>{isEn ? 'Video source not found' : 'Chưa có nguồn video hợp lệ'}</p>
      </div>
    );
  }

  const resolvedPoster =
    poster ||
    (isLocal
      ? getLocalVideoPoster(url)
      : `https://i.ytimg.com/vi/${videoId}/${thumbQuality}.jpg`);

  if (isPlaying) {
    if (isLocal) {
      return (
        <div className="lite-yt-iframe-wrap">
          <video
            src={url}
            poster={resolvedPoster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
          />
        </div>
      );
    }

    const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    return (
      <div className="lite-yt-iframe-wrap">
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="lite-yt-facade"
      onClick={() => setIsPlaying(true)}
      aria-label={`${isEn ? 'Play video' : 'Phát video'}: ${title}`}
    >
      {resolvedPoster && (
        <img
          src={resolvedPoster}
          alt={title}
          loading="lazy"
          decoding="async"
          className="lite-yt-poster"
          onError={() => {
            if (!isLocal && thumbQuality === 'maxresdefault') {
              setThumbQuality('hqdefault');
            }
          }}
        />
      )}
      <div className="lite-yt-scrim" aria-hidden="true" />

      <div className="lite-yt-topbar">
        <span className="lite-yt-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          {badgeText}
        </span>
        {durationText && <span className="lite-yt-duration">{durationText}</span>}
      </div>

      <div className="lite-yt-center">
        <span className="lite-yt-play-btn" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="lite-yt-cta-text">
          {isEn ? 'Click to play video (Zero Lag)' : 'Bấm để phát video thực tế (Siêu mượt)'}
        </span>
      </div>

      <div className="lite-yt-bottom">
        <strong className="lite-yt-title">{title}</strong>
      </div>
    </button>
  );
}
