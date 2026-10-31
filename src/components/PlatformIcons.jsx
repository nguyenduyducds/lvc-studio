import React from 'react';

export function PlatformIcon({ platform, size = 18 }) {
  const key = (platform || '').toLowerCase();

  if (key === 'tiktok') {
    return (
      <svg className="platform-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#06090f" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" />
        {/* Cyan glitch layer */}
        <path
          d="M16.4 7.3a3.5 3.5 0 0 1-2.7-3V4h-2.5v10.1a2.1 2.1 0 1 1-1.5-2v-2.5a4.6 4.6 0 1 0 4 4.5V8.9a5.9 5.9 0 0 0 3.5 1.2V7.6c-.3 0-.5-.1-.8-.3Z"
          fill="#25F4EE"
          transform="translate(-0.6, -0.5)"
        />
        {/* Red/Pink glitch layer */}
        <path
          d="M16.4 7.3a3.5 3.5 0 0 1-2.7-3V4h-2.5v10.1a2.1 2.1 0 1 1-1.5-2v-2.5a4.6 4.6 0 1 0 4 4.5V8.9a5.9 5.9 0 0 0 3.5 1.2V7.6c-.3 0-.5-.1-.8-.3Z"
          fill="#FE2C55"
          transform="translate(0.6, 0.5)"
        />
        {/* White center note */}
        <path
          d="M16.4 7.3a3.5 3.5 0 0 1-2.7-3V4h-2.5v10.1a2.1 2.1 0 1 1-1.5-2v-2.5a4.6 4.6 0 1 0 4 4.5V8.9a5.9 5.9 0 0 0 3.5 1.2V7.6c-.3 0-.5-.1-.8-.3Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (key === 'youtube') {
    return (
      <svg className="platform-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#FF0000" />
        <path
          d="M19.6 8.2a2.2 2.2 0 0 0-1.5-1.6C16.7 6.2 12 6.2 12 6.2s-4.7 0-6.1.4a2.2 2.2 0 0 0-1.5 1.6C4 9.6 4 12 4 12s0 2.4.4 3.8a2.2 2.2 0 0 0 1.5 1.6c1.4.4 6.1.4 6.1.4s4.7 0 6.1-.4a2.2 2.2 0 0 0 1.5-1.6c.4-1.4.4-3.8.4-3.8s0-2.4-.4-3.8Z"
          fill="#FF0000"
        />
        <path d="M10.2 14.8V9.2L15.2 12l-5 2.8Z" fill="#ffffff" />
      </svg>
    );
  }

  if (key === 'douyin') {
    return (
      <svg className="platform-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#0f172a" stroke="rgba(244,63,94,0.45)" strokeWidth="0.9" />
        <path
          d="M16.5 7.5a3.5 3.5 0 0 1-2.7-3H11.3v10.2a2.1 2.1 0 1 1-1.5-2V10a4.6 4.6 0 1 0 4 4.6V9a5.8 5.8 0 0 0 3.5 1.2V7.7l-.8-.2Z"
          fill="#00f2fe"
          transform="translate(-0.5, -0.5)"
        />
        <path
          d="M16.5 7.5a3.5 3.5 0 0 1-2.7-3H11.3v10.2a2.1 2.1 0 1 1-1.5-2V10a4.6 4.6 0 1 0 4 4.6V9a5.8 5.8 0 0 0 3.5 1.2V7.7l-.8-.2Z"
          fill="#fe0979"
          transform="translate(0.5, 0.5)"
        />
        <path
          d="M16.5 7.5a3.5 3.5 0 0 1-2.7-3H11.3v10.2a2.1 2.1 0 1 1-1.5-2V10a4.6 4.6 0 1 0 4 4.6V9a5.8 5.8 0 0 0 3.5 1.2V7.7l-.8-.2Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (key === 'bilibili') {
    return (
      <svg className="platform-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#00A1D6" />
        <path
          d="M8.2 5.2 10.4 7.4M15.8 5.2 13.6 7.4M6.5 7.5h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2Z"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="9.5" cy="12.5" r="1.25" fill="#fff" />
        <circle cx="14.5" cy="12.5" r="1.25" fill="#fff" />
      </svg>
    );
  }

  if (key === 'xiaohongshu') {
    return (
      <svg className="platform-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#FF2442" />
        <text
          x="12"
          y="15.2"
          textAnchor="middle"
          fill="#fff"
          fontSize="8.2"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          RED
        </text>
      </svg>
    );
  }

  if (key === 'facebook') {
    return (
      <svg className="platform-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path
          d="M13.6 19.5v-6.1h2.1l.35-2.4h-2.45V9.4c0-.7.22-1.15 1.22-1.15h1.28V6.05c-.22-.03-.98-.1-1.86-.1-1.85 0-3.1 1.12-3.1 3.2v1.85H9.1v2.4h2.04v6.1h2.46Z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (key === 'telegram') {
    return (
      <svg className="platform-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#229ED9" />
        <path
          d="M18.4 6.6 5.2 11.7c-.8.3-.8.8-.1 1l3.4 1.1 7.8-4.9c.4-.2.7-.1.4.2l-6.3 5.7-.2 3.3c.3 0 .5-.1.7-.3l1.7-1.6 3.4 2.5c.6.3 1.1.2 1.2-.6l2.2-10.5c.2-.8-.3-1.2-1-1Z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (key === 'zalo') {
    return (
      <svg className="platform-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#0068FF" />
        <text
          x="12"
          y="15"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="7.6"
          fontWeight="900"
          fontFamily="Plus Jakarta Sans, Inter, sans-serif"
        >
          Zalo
        </text>
      </svg>
    );
  }

  return null;
}

/**
 * Biểu tượng Nền tảng 3D nổi bật hiển thị chính giữa phần ảnh bìa của mỗi thẻ Kênh (#showcase)
 */
export function PlatformCoverEmblem({ platform, secondaryPlatform }) {
  const key = (platform || '').toLowerCase();

  return (
    <div className={`channel-cover-emblem channel-cover-emblem--${key}`} aria-hidden="true">
      <div className="channel-cover-emblem__ring">
        <PlatformIcon platform={key} size={46} />
        {secondaryPlatform && (
          <span className="channel-cover-emblem__sub">
            <PlatformIcon platform={secondaryPlatform} size={22} />
          </span>
        )}
      </div>
    </div>
  );
}

export function SiteIcon({ name = 'arrow' }) {
  if (name === 'windows') {
    return (
      <svg className="site-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M2 3h9v8H2zm11 0h9v8h-9zM2 13h9v8H2zm11 0h9v8h-9z" />
      </svg>
    );
  }
  if (name === 'download') {
    return (
      <svg
        className="site-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" />
      </svg>
    );
  }
  if (name === 'phone') {
    return (
      <svg
        className="floating-dock__icon floating-dock__icon--phone"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  if (name === 'zalo') {
    return (
      <svg
        className="floating-dock__icon"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3C6.5 3 2 6.6 2 11.1c0 2.6 1.5 4.9 3.8 6.4-.2.9-.8 2.4-.9 2.7-.1.3.2.5.5.4.3-.1 2.3-1.2 3.3-1.8 1 .2 2.1.4 3.3.4 5.5 0 10-3.6 10-8.1S17.5 3 12 3Z"
          fill="#ffffff"
        />
        <text
          x="12"
          y="14"
          textAnchor="middle"
          fill="#0068ff"
          fontSize="7.2"
          fontWeight="900"
          fontFamily="Plus Jakarta Sans, Inter, sans-serif"
        >
          Zalo
        </text>
      </svg>
    );
  }
  if (name === 'telegram') {
    return (
      <svg
        className="floating-dock__icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"
          fill="#ffffff"
        />
      </svg>
    );
  }
  if (name === 'facebook-white') {
    return (
      <svg
        className="floating-dock__icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 19.5v-6.2h2.1l.35-2.45h-2.45V9.25c0-.72.22-1.2 1.25-1.2h1.3V5.82c-.23-.03-1-.1-1.9-.1-1.88 0-3.15 1.14-3.15 3.25v1.88H8.9v2.45h2.1v6.2h2.5Z" />
      </svg>
    );
  }
  if (name === 'youtube-white') {
    return (
      <svg
        className="floating-dock__icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.94C17.92 4.8 12 4.8 12 4.8s-5.92 0-7.64.45a2.75 2.75 0 0 0-1.94 1.94C2 8.91 2 12 2 12s0 3.09.42 4.81a2.75 2.75 0 0 0 1.94 1.94c1.72.45 7.64.45 7.64.45s5.92 0 7.64-.45a2.75 2.75 0 0 0 1.94-1.94C22 15.09 22 12 22 12s0-3.09-.42-4.81ZM10 15.1V8.9l5.35 3.1L10 15.1Z" />
      </svg>
    );
  }
  if (name === 'chevronUp') {
    return (
      <svg
        className="scroll-to-top__icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    );
  }
  return (
    <svg
      className="site-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}
