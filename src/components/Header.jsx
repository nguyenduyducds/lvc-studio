import React, { useState } from 'react';

export default function Header({
  theme,
  onToggleTheme,
  locale,
  onToggleLocale,
  onOpenYoutubeModal,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMorphing, setLangMorphing] = useState(false);

  const isEn = locale === 'en';
  const isLight = theme === 'light';

  const handleLangClick = () => {
    setLangMorphing(true);
    onToggleLocale();
    setTimeout(() => setLangMorphing(false), 450);
  };

  return (
    <header className="public-product-header">
      <div className="public-product-header__inner">
        {/* Brand Logo: LVC · STUDIO */}
        <a className="public-product-header__brand" href="#top" aria-label="LVC STUDIO">
          <span className="public-product-header__mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="lvcMarkGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#30d5ff" />
                  <stop offset="55%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a970ff" />
                </linearGradient>
              </defs>
              <path
                d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.2l6 3.3v7l-6 3.3-6-3.3v-7l6-3.3z"
                fill="url(#lvcMarkGrad)"
              />
              <circle cx="12" cy="12" r="2.6" fill="#30d5ff" />
            </svg>
          </span>
          <span className="public-product-header__brand-text">
            <span className="public-product-header__brand-row">
              <strong className="header-brand-gen">LVC</strong>
              <span className="header-brand-sep" aria-hidden="true">·</span>
              <span className="header-brand-studio">STUDIO</span>
            </span>
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="public-product-header__menu"
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="lvcstudio-navigation"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? '✕' : 'Menu'}
        </button>

        {/* Main Navigation (Focused 100% on LVC Studio) */}
        <nav
          id="lvcstudio-navigation"
          className={mobileMenuOpen ? 'is-open' : ''}
          aria-label="Điều hướng LVC Studio"
        >
          <a className="is-active" aria-current="page" href="#top" onClick={() => setMobileMenuOpen(false)}>
            {isEn ? 'Home' : 'Trang chủ'}
          </a>
          <a href="#demo" onClick={() => setMobileMenuOpen(false)}>
            {isEn ? 'Live Demo' : 'Video Thực Tế'}
          </a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>
            {isEn ? 'Features' : 'Tính năng'}
          </a>
          <a href="#workflow" onClick={() => setMobileMenuOpen(false)}>
            {isEn ? 'Workflow' : 'Quy trình'}
          </a>
          <a href="#showcase" onClick={() => setMobileMenuOpen(false)}>
            {isEn ? 'Showcase' : 'Dự án mẫu'}
          </a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
            {isEn ? 'Pricing' : 'Bảng giá'}
          </a>
          <a href="#huong-dan" onClick={() => setMobileMenuOpen(false)}>
            {isEn ? 'Guides' : 'Hướng dẫn'}
          </a>
          <a className="gen-support-nav" href="#faq" onClick={() => setMobileMenuOpen(false)}>
            {isEn ? 'FAQ' : 'Hỗ trợ'}
          </a>
        </nav>

        {/* Right Actions: Language + Theme + Studio YouTube Config + CTA */}
        <div className="public-product-header__actions">
          <div className="public-product-header__utility-zone">
            <div className="header-controls-group">
              {/* Language Switcher */}
              <button
                type="button"
                className={`single-lang-toggle ${isEn ? 'is-en' : 'is-vi'} ${langMorphing ? 'is-morphing' : ''}`}
                onClick={handleLangClick}
                aria-label="Switch language"
                title={isEn ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
              >
                <div className="single-lang-shimmer" aria-hidden="true" />
                <div className="single-lang-content" aria-hidden="true">
                  <div className="single-lang-flag-frame">
                    <div className="single-lang-flag-track">
                      <span className={`single-lang-flag-item flag-item--vi ${!isEn ? 'is-active' : ''}`}>
                        <svg className="single-flag-svg single-flag-svg--vn" viewBox="0 0 30 20" width="16" height="10.5">
                          <rect width="30" height="20" rx="2" fill="#da251d" />
                          <polygon
                            points="15,3.8 16.85,9.5 22.84,9.5 18,13.02 19.85,18.72 15,15.2 10.15,18.72 12,13.02 7.16,9.5 13.15,9.5"
                            fill="#ffeb3b"
                          />
                        </svg>
                      </span>
                      <span className={`single-lang-flag-item flag-item--en ${isEn ? 'is-active' : ''}`}>
                        <svg className="single-flag-svg single-flag-svg--en" viewBox="0 0 60 40" width="16" height="10.5">
                          <rect width="60" height="40" rx="3.5" fill="#012169" />
                          <path d="M0,0 L60,40 M60,0 L0,40" stroke="#ffffff" strokeWidth="8" />
                          <path d="M30,0 V40 M0,20 H60" stroke="#ffffff" strokeWidth="12" />
                          <path d="M30,0 V40 M0,20 H60" stroke="#c8102e" strokeWidth="7.2" />
                        </svg>
                      </span>
                    </div>
                    <div className="single-lang-micro-glow" />
                  </div>
                  <div className="single-lang-text-box">
                    <span className={`single-lang-text-face text-face--vi ${!isEn ? 'is-active' : ''}`}>VI</span>
                    <span className={`single-lang-text-face text-face--en ${isEn ? 'is-active' : ''}`}>EN</span>
                  </div>
                </div>
                <div className="single-lang-light-sweep" aria-hidden="true" />
              </button>

              {/* Celestial Day/Night Theme Toggle */}
              <button
                type="button"
                className={`celestial-toggle ${isLight ? 'is-day' : 'is-night'}`}
                role="switch"
                aria-checked={isLight}
                onClick={onToggleTheme}
                aria-label="Đổi giao diện sáng tối"
                title={isLight ? 'Chuyển sang giao diện ban đêm' : 'Chuyển sang giao diện ban ngày'}
              >
                <div className="toggle-scene toggle-scene--day" aria-hidden="true">
                  <svg className="scene-clouds" viewBox="0 0 88 38" fill="none" preserveAspectRatio="none">
                    <path
                      d="M6 34C6 28.5 10.5 24 16 24C17.2 24 18.3 24.2 19.3 24.6C21.2 21.2 24.8 19 29 19C34.5 19 39 23.5 39 29C39 29.3 39 29.7 38.9 30C41.2 30.2 43 32.1 43 34.5C43 37 41 38 38.5 38H6V34Z"
                      fill="rgba(255, 255, 255, 0.72)"
                    />
                  </svg>
                </div>
                <div className="toggle-scene toggle-scene--night" aria-hidden="true">
                  <svg className="scene-stars" viewBox="0 0 88 38" fill="none" preserveAspectRatio="none">
                    <circle className="star star--dot-1" cx="48" cy="18" r="1" fill="#bae6fd" />
                    <circle className="star star--dot-2" cx="68" cy="8" r="1.2" fill="#f8fafc" />
                    <circle className="star star--dot-3" cx="78" cy="12" r="0.9" fill="#a5f3fc" />
                    <circle className="star star--dot-4" cx="44" cy="9" r="0.8" fill="#e9d5ff" />
                  </svg>
                </div>
                <div className="toggle-ball">
                  <div className="ball-face ball-face--sun" aria-hidden="true">
                    <div className="sun-glow" />
                    <div className="sun-core" />
                  </div>
                  <div className="ball-eclipse-clip" aria-hidden="true">
                    <div className="ball-eclipse-runner" />
                  </div>
                  <div className="ball-face ball-face--moon" aria-hidden="true">
                    <svg className="moon-crescent-svg" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M17 3.5C9.82 3.5 4 9.32 4 16.5C4 23.68 9.82 29.5 17 29.5C19.34 29.5 21.55 28.88 23.47 27.8C16.89 26.24 12 20.31 12 13.5C12 8.78 14.37 4.62 18 2.13C17.67 2.05 17.34 2 17 2V3.5Z"
                        fill="#e2e8f0"
                      />
                    </svg>
                    <div className="moon-glow" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="public-product-header__account-zone">
            <a className="public-product-header__cta" href="#pricing">
              {isEn ? 'Get LVC Studio' : 'Tải LVC Studio'}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
