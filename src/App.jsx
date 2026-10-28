import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import LiteYouTubeEmbed, { getYouTubeThumbUrl } from './components/LiteYouTubeEmbed';
import LvcStudioHeroPreview from './components/LvcStudioHeroPreview';
import { PlatformIcon, SiteIcon } from './components/PlatformIcons';
import YouTubeConfigModal from './components/YouTubeConfigModal';
import {
  CONTACT_INFO,
  LOCAL_STUDIO_VIDEOS,
  DEMO_VIDEO_TABS,
  STUDIO_WORKSPACES,
  LVC_DEMO_DEFAULT,
  GUIDE_VIDEOS_DEFAULT,
  VIRAL_CHANNELS,
} from './data/studioData';

const PLATFORMS = ['TikTok', 'YouTube', 'Douyin', 'Bilibili', 'Xiaohongshu', 'Facebook'];

export default function App() {
  // Theme & Locale States
  const [theme, setTheme] = useState(() => localStorage.getItem('lvcstudio-portal-theme') || 'dark');
  const [locale, setLocale] = useState('vi');
  const isEn = locale === 'en';

  // Hero Stage States (matches HomeExperience.js)
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Demo Section Tab
  const [activeDemoTab, setActiveDemoTab] = useState(DEMO_VIDEO_TABS[0].id);

  // LVC Studio YouTube Demo & Guides States
  const [demoData, setDemoData] = useState(LVC_DEMO_DEFAULT);
  const [guideVideos, setGuideVideos] = useState(GUIDE_VIDEOS_DEFAULT);
  const [selectedGuideId, setSelectedGuideId] = useState(GUIDE_VIDEOS_DEFAULT[0].id);
  const [playingGuideKey, setPlayingGuideKey] = useState('');
  const [ytModalOpen, setYtModalOpen] = useState(false);

  // Showcase Filter & Responsive Columns (matches HomeExperience.js)
  const [showcaseFilter, setShowcaseFilter] = useState('all');
  const [showcaseCols, setShowcaseCols] = useState(4);

  // Scroll-to-Top State
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync theme to HTML root
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.portalTheme = theme;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem('lvcstudio-portal-theme', theme);
  }, [theme]);

  // Responsive columns for .home-showcase-slider
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      setShowcaseCols(w < 580 ? 1 : w < 880 ? 2 : w < 1200 ? 3 : 4);
    };
    updateCols();
    window.addEventListener('resize', updateCols, { passive: true });
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  // Scroll listener for ScrollToTop button
  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 420;
      setShowScrollTop((prev) => (prev === shouldShow ? prev : shouldShow));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Global Media Guard: Khi bất kỳ thẻ <video> nào phát, tự động dừng các <video> khác & khóa xoay slide Hero
  useEffect(() => {
    const handleGlobalVideoPlay = (e) => {
      const target = e.target;
      if (target && target.tagName === 'VIDEO') {
        setIsPaused(true);
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach((v) => {
          if (v !== target && !v.paused) {
            v.pause();
          }
        });
      }
    };
    document.addEventListener('play', handleGlobalVideoPlay, true);
    return () => document.removeEventListener('play', handleGlobalVideoPlay, true);
  }, []);

  // Hero Slide Switcher (matches HomeExperience.js portal transition)
  const selectSlide = useCallback((nextIdx) => {
    setActiveSlide((curr) => {
      if (curr === nextIdx) return curr;
      setPrevSlide(curr);
      setIsTransitioning(true);
      setIsSettled(false);
      setSweepKey((k) => k + 1);
      return nextIdx;
    });
  }, []);

  useEffect(() => {
    if (!isTransitioning) return;
    const t1 = window.setTimeout(() => {
      setIsTransitioning(false);
      setIsSettled(true);
    }, 680);
    return () => window.clearTimeout(t1);
  }, [isTransitioning, sweepKey]);

  const handleRailProgressEnd = useCallback(() => {
    if (!isPaused && !isTransitioning) {
      selectSlide((activeSlide + 1) % STUDIO_WORKSPACES.length);
    }
  }, [isPaused, isTransitioning, activeSlide, selectSlide]);

  const currentWorkspace = STUDIO_WORKSPACES[activeSlide % STUDIO_WORKSPACES.length];
  const currentDemoTabInfo =
    DEMO_VIDEO_TABS.find((t) => t.id === activeDemoTab) || DEMO_VIDEO_TABS[0];
  const activeGuide = guideVideos.find((g) => g.id === selectedGuideId) || guideVideos[0];
  const activeGuideThumb = activeGuide
    ? activeGuide.poster || getYouTubeThumbUrl(activeGuide.url, 'maxresdefault')
    : '';
  const activeGuideKey = activeGuide ? `${activeGuide.id}-${activeGuide.url}` : '';

  // Filtered Showcase Channels
  const filteredChannels = useMemo(() => {
    return showcaseFilter === 'all'
      ? VIRAL_CHANNELS
      : VIRAL_CHANNELS.filter((c) => c.platform === showcaseFilter);
  }, [showcaseFilter]);

  return (
    <div id="top">
      <div id="main-content">
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          locale={locale}
          onToggleLocale={() => setLocale((l) => (l === 'vi' ? 'en' : 'vi'))}
          onOpenYoutubeModal={() => setYtModalOpen(true)}
        />

        <main
          className="ecosystem-home"
          style={{
            '--home-accent': '#06b6d4',
            '--home-accent-2': '#2563eb',
          }}
        >
          {/* Authentic GenStudio Aurora Background (Zero-Lag Static Gradients via zero-lag-override.css) */}
          <div className="premium-aurora-container" aria-hidden="true">
            <div className="aurora-layer aurora-layer--back" />
            <div className="aurora-layer aurora-layer--middle" />
            <div className="aurora-layer aurora-layer--front" />
            <div className="aurora-readability-mask" />
          </div>

          {/* ================= 1. HERO SECTION (100% LVC STUDIO, AUTHENTIC 3D STAGE) ================= */}
          <section className="ecosystem-hero">
            <div className="ecosystem-hero-copy">
              <span className="ecosystem-kicker">
                <i /> ⚡{' '}
                {isEn
                  ? 'LVC STUDIO · ALL-IN-ONE AI VIDEO PRODUCTION PLATFORM'
                  : 'LVC STUDIO · NỀN TẢNG SẢN XUẤT & TỰ ĐỘNG HÓA VIDEO TOÀN DIỆN'}
              </span>

              <h1>
                {isEn ? 'LVC Studio.' : 'LVC Studio.'}
                <br />
                <em>
                  {isEn
                    ? 'Every AI Video Workflow in One Studio.'
                    : 'Mọi quy trình Video AI trong một Studio.'}
                </em>
              </h1>

              <p>
                {isEn
                  ? 'Automated video translation, neural AI dubbing, 9:16 viral clip reframing, and multi-thread GPU batch rendering — all unified inside LVC Studio.'
                  : 'Tự động dịch phụ đề, lồng tiếng AI đa cảm xúc, cắt highlight dọc 9:16 và render hàng loạt bằng phần cứng GPU — tất cả tích hợp trọn vẹn trong phần mềm LVC Studio duy nhất.'}
              </p>

              <div
                className="hero-platforms"
                aria-label={isEn ? 'Supported platforms' : 'Nền tảng được hỗ trợ'}
              >
                <span>{isEn ? 'SUPPORTED MULTI-PLATFORMS' : 'NỀN TẢNG HỖ TRỢ ĐA KÊNH'}</span>
                <div>
                  {PLATFORMS.map((p) => (
                    <b key={p} className={`platform-${p.toLowerCase()}`}>
                      <PlatformIcon platform={p} />
                      {p}
                    </b>
                  ))}
                </div>
              </div>

              <div className="ecosystem-actions">
                <a className="ecosystem-btn primary" href="#demo">
                  {isEn ? 'Watch Real YouTube Demo' : 'Xem Video Thực Tế (YouTube)'}
                  <SiteIcon name="arrow" />
                </a>
                <a className="ecosystem-btn" href="#pricing">
                  <SiteIcon name="windows" />
                  {isEn ? 'Download LVC Studio Trial' : 'Tải LVC Studio dùng thử'}
                  <SiteIcon name="download" />
                </a>
              </div>

              <p className="hero-macos-note">
                {isEn
                  ? 'Windows PC Available Now · 100% Hardware GPU Acceleration'
                  : 'Bản cài đặt Windows hiện có · Tối ưu 100% tốc độ GPU phần cứng'}
              </p>
            </div>

            {/* Authentic 3D Hero Stage from HomeExperience.js */}
            <div className="ecosystem-hero-media">
              <div className="hero-showcase-stage is-leaving">
                <div className="hero-stage-grid" aria-hidden="true" />
                <div
                  className={`hero-portal-halo ${isTransitioning ? 'is-peaking' : ''}`}
                  style={{
                    '--portal-grad': currentWorkspace.portalGradient,
                    '--portal-accent': currentWorkspace.accentColor,
                  }}
                  aria-hidden="true"
                />
                <div className="hero-holo-layer hero-holo-layer--back" aria-hidden="true" />
                <div className="hero-holo-layer hero-holo-layer--lines" aria-hidden="true" />

                <div
                  className={`hero-showcase-cards ${!isTransitioning ? 'is-floating' : ''}`}
                >
                  <div className="hero-edge-reflection" aria-hidden="true" />
                  <div
                    key={`sweep-${sweepKey}`}
                    className={`hero-aurora-sweep ${isTransitioning ? 'is-sweeping' : ''}`}
                    aria-hidden="true"
                  />
                  <div
                    className={`hero-settle-flash ${isSettled ? 'is-settled' : ''}`}
                    aria-hidden="true"
                  />

                  {STUDIO_WORKSPACES.map((ws, idx) => {
                    const isCurrent = activeSlide === idx;
                    const isOutgoing = prevSlide === idx && isTransitioning;
                    let stateClass = 'is-inactive';
                    if (isCurrent) {
                      stateClass = isTransitioning ? 'is-incoming' : 'is-active';
                    } else if (isOutgoing) {
                      stateClass = 'is-outgoing';
                    }

                    return (
                      <div
                        key={ws.id}
                        className={`hero-showcase-card ${stateClass}`}
                        style={{ '--card-accent': ws.accentColor }}
                        aria-hidden={!isCurrent}
                      >
                        <div
                          className="hero-showcase-link"
                          title={isEn ? ws.nameEn : ws.name}
                        >
                          <LvcStudioHeroPreview
                            slide={ws}
                            isEn={isEn}
                            isCurrent={isCurrent}
                            onInteractPause={setIsPaused}
                          />
                        </div>

                        {isCurrent && (
                          <button
                            type="button"
                            className="hero-showcase-pause"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPaused((p) => !p);
                            }}
                            aria-label={isPaused ? 'Tiếp tục xoay vòng' : 'Tạm dừng xoay vòng'}
                            title={isPaused ? 'Bấm để tiếp tục xoay' : 'Bấm để tạm dừng xoay'}
                          >
                            <span aria-hidden="true">{isPaused ? '▶' : '⏸'}</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div
                  className="hero-stage-reflection"
                  style={{ '--reflection-accent': currentWorkspace.accentColor }}
                  aria-hidden="true"
                />

                <div
                  className="hero-product-rail"
                  role="tablist"
                  aria-label="Chọn mô-đun trình diễn trong LVC Studio"
                >
                  {STUDIO_WORKSPACES.map((ws, idx) => {
                    const isSelected = activeSlide === idx;
                    const barPaused = isPaused || isTransitioning;
                    return (
                      <button
                        key={ws.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        className={`rail-item ${isSelected ? 'is-active' : ''}`}
                        style={{ '--item-accent': ws.accentColor }}
                        onClick={() => selectSlide(idx)}
                      >
                        <span className="rail-item-content">
                          <span className="rail-item-num">0{idx + 1}</span>
                          <span className="rail-item-name">{ws.tabLabel}</span>
                        </span>
                        {isSelected && (
                          <span className="rail-progress-track" aria-hidden="true">
                            <span
                              key={`prog-${idx}-${sweepKey}`}
                              className={`rail-progress-bar ${barPaused ? 'is-paused' : ''}`}
                              onAnimationEnd={handleRailProgressEnd}
                            />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ================= 2. REAL VIDEO DEMO SECTION (6 LOCAL VIDEOS FROM /video/) ================= */}
          <section
            className="ecosystem-section demo-real"
            id="demo"
            aria-labelledby="home-demo-title"
          >
            <header className="demo-real-head">
              <div>
                <small>{isEn ? 'REAL STUDIO OUTPUTS (/video)' : 'VIDEO THỰC TẾ TRONG THƯ MỤC /video/'}</small>
                <h2 id="home-demo-title">
                  {isEn ? 'See LVC Studio in action' : 'Xem LVC Studio hoạt động thực tế'}
                </h2>
              </div>
              <p>
                {isEn
                  ? '6 real videos from your /video/ directory — loaded with zero-lag poster facades.'
                  : 'Trọn bộ 6 video thực tế từ thư mục /video/ — hiển thị ảnh bìa siêu nhẹ không gây lag và phát ngay khi bấm.'}
              </p>
            </header>

            <div className="demo-real-tabs" role="tablist" aria-label="Bộ sưu tập 6 video thực tế LVC Studio">
              {DEMO_VIDEO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeDemoTab === tab.id}
                  onClick={() => setActiveDemoTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="demo-real-panel" role="tabpanel" key={activeDemoTab}>
              <div className="demo-real-intro">
                <p>{isEn ? currentDemoTabInfo.en : currentDemoTabInfo.vi}</p>
                <a
                  href="#huong-dan"
                  onClick={(e) => {
                    if (activeDemoTab !== 'all-6') {
                      e.preventDefault();
                      setActiveDemoTab('all-6');
                    }
                  }}
                >
                  {activeDemoTab === 'all-6'
                    ? isEn
                      ? 'Open Playlist View ↓'
                      : 'Xem ở chế độ Playlist ↓'
                    : isEn
                      ? 'View All 6 Videos ↗'
                      : 'Xem tất cả 6 video cùng lúc ↗'}
                </a>
              </div>

              {currentDemoTabInfo.showAll ? (
                <div
                  className="demo-real-pair"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                  }}
                >
                  {LOCAL_STUDIO_VIDEOS.map((vid, idx) => (
                    <article
                      key={vid.id}
                      className={`demo-real-card ${idx % 2 === 1 ? 'after' : 'before'}`}
                    >
                      <header>
                        <span className="demo-real-dot" />
                        <h3>{isEn ? vid.titleEn : vid.title}</h3>
                        <span>{vid.duration}</span>
                      </header>
                      <div className="demo-real-stage">
                        <LiteYouTubeEmbed
                          url={vid.url}
                          poster={vid.poster}
                          title={isEn ? vid.titleEn : vid.title}
                          badgeText={vid.badge}
                          durationText={`${vid.duration} · ${vid.resolution}`}
                          isEn={isEn}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="demo-real-pair">
                  {/* LEFT VIDEO CARD */}
                  <article className="demo-real-card before">
                    <header>
                      <span className="demo-real-dot" />
                      <h3>
                        {isEn
                          ? currentDemoTabInfo.leftVideo.titleEn
                          : currentDemoTabInfo.leftVideo.title}
                      </h3>
                      <span>{currentDemoTabInfo.leftVideo.resolution}</span>
                    </header>
                    <div className="demo-real-stage">
                      <LiteYouTubeEmbed
                        url={currentDemoTabInfo.leftVideo.url}
                        poster={currentDemoTabInfo.leftVideo.poster}
                        title={
                          isEn
                            ? currentDemoTabInfo.leftVideo.titleEn
                            : currentDemoTabInfo.leftVideo.title
                        }
                        badgeText={currentDemoTabInfo.leftVideo.badge}
                        durationText={`${currentDemoTabInfo.leftVideo.duration} · ${currentDemoTabInfo.leftVideo.resolution}`}
                        isEn={isEn}
                      />
                    </div>
                  </article>

                  {/* RIGHT VIDEO CARD */}
                  <article className="demo-real-card after">
                    <header>
                      <span className="demo-real-dot" />
                      <h3>
                        {isEn
                          ? currentDemoTabInfo.rightVideo.titleEn
                          : currentDemoTabInfo.rightVideo.title}
                      </h3>
                      <span>{currentDemoTabInfo.rightVideo.resolution}</span>
                    </header>
                    <div className="demo-real-stage">
                      <LiteYouTubeEmbed
                        url={currentDemoTabInfo.rightVideo.url}
                        poster={currentDemoTabInfo.rightVideo.poster}
                        title={
                          isEn
                            ? currentDemoTabInfo.rightVideo.titleEn
                            : currentDemoTabInfo.rightVideo.title
                        }
                        badgeText={currentDemoTabInfo.rightVideo.badge}
                        durationText={`${currentDemoTabInfo.rightVideo.duration} · ${currentDemoTabInfo.rightVideo.resolution}`}
                        isEn={isEn}
                      />
                    </div>
                  </article>
                </div>
              )}

              <p className="demo-real-foot">
                {isEn
                  ? 'Click any video frame to play directly from /video/ with full sound control and zero page lag.'
                  : 'Bấm vào từng khung video để phát trực tiếp từ thư mục /video/. Bạn chủ động bật/tắt âm thanh và tua nhanh tùy ý.'}
              </p>
            </div>
          </section>

          {/* ================= 3. INTENT SECTION (.home-intent) ================= */}
          <section
            className="ecosystem-section home-intent"
            id="features"
            aria-labelledby="home-intent-title"
          >
            <header className="ecosystem-section-head">
              <div>
                <small>{isEn ? 'CORE CAPABILITIES' : 'ĐỊNH HƯỚNG NHU CẦU'}</small>
                <h2 id="home-intent-title">
                  {isEn
                    ? 'What do you want to automate with LVC Studio?'
                    : 'Bạn muốn xử lý gì trong LVC Studio?'}
                </h2>
              </div>
              <p>
                {isEn
                  ? 'Every workflow below is built directly inside LVC Studio.'
                  : 'Mọi nhu cầu sản xuất video dưới đây đều được tích hợp sẵn trong LVC Studio.'}
              </p>
            </header>

            <div className="home-intent-grid">
              <article className="home-intent-card">
                <div className="intent-card-header">
                  <span className="intent-card-badge">01</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>{isEn ? 'AI Subtitle & Voice Dubbing' : 'Dịch & lồng tiếng video bằng AI'}</h3>
                <p>
                  {isEn
                    ? 'Generate accurate subtitles, translate multi-language scripts, and dub with expressive AI voices.'
                    : 'Tạo phụ đề chuẩn xác, dịch đa ngôn ngữ và lồng tiếng AI tự nhiên ngay trên LVC Studio.'}
                </p>
                <a className="intent-card-cta" href="#demo">
                  {isEn ? 'Explore in LVC Studio →' : 'Trải nghiệm trên LVC Studio →'}
                </a>
              </article>

              <article className="home-intent-card">
                <div className="intent-card-header">
                  <span className="intent-card-badge">02</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>{isEn ? 'Turn Long Videos into Shorts' : 'Biến video dài thành Short 9:16'}</h3>
                <p>
                  {isEn
                    ? 'AI detects highlights, reframes to 9:16 vertical, and renders dynamic karaoke captions.'
                    : 'AI tự động tìm highlight, căn khung dọc 9:16, thêm phụ đề nhảy chữ và xuất short clip viral.'}
                </p>
                <a className="intent-card-cta" href="#demo">
                  {isEn ? 'Explore in LVC Studio →' : 'Trải nghiệm trên LVC Studio →'}
                </a>
              </article>

              <article className="home-intent-card">
                <div className="intent-card-header">
                  <span className="intent-card-badge">03</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>{isEn ? 'Audio separation & Storytelling' : 'Tách nhạc nền & Video kể chuyện'}</h3>
                <p>
                  {isEn
                    ? 'Separate clean vocals from BGM, match voice pacing, and assemble storyboards automatically.'
                    : 'Tách bạch vocal và nhạc nền BGM gốc, đồng bộ nhịp đọc AI và ghép storyboard tự động.'}
                </p>
                <a className="intent-card-cta" href="#demo">
                  {isEn ? 'Explore in LVC Studio →' : 'Trải nghiệm trên LVC Studio →'}
                </a>
              </article>

              <article className="home-intent-card">
                <div className="intent-card-header">
                  <span className="intent-card-badge">04</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>{isEn ? 'Batch Processing on PC GPU' : 'Xử lý video hàng loạt trên PC'}</h3>
                <p>
                  {isEn
                    ? 'Queue hundreds of videos and maximize your NVIDIA/AMD GPU for 24/7 unattended rendering.'
                    : 'Tự động hóa hàng đợi hàng trăm video và tăng tốc sản xuất gấp 10 lần bằng GPU máy tính.'}
                </p>
                <a className="intent-card-cta" href="#pricing">
                  {isEn ? 'Download LVC Studio →' : 'Tải LVC Studio ngay →'}
                </a>
              </article>
            </div>
          </section>

          {/* ================= 4. BUILT-IN MODULES OVERVIEW (.home-products-overview) ================= */}
          <section
            className="ecosystem-section home-products-overview"
            id="ecosystem"
            aria-labelledby="home-products-title"
          >
            <header className="ecosystem-section-head">
              <div>
                <small>{isEn ? 'UNIFIED STUDIO ARCHITECTURE' : 'KIẾN TRÚC TẤT CẢ TRONG MỘT'}</small>
                <h2 id="home-products-title">
                  {isEn
                    ? '5 Core Engines Built Inside LVC Studio'
                    : '5 Lõi công nghệ tích hợp sẵn trong LVC Studio'}
                </h2>
              </div>
              <p>
                {isEn
                  ? 'No need to buy or switch between separate tools — LVC Studio packs every engine into one desktop interface.'
                  : 'Không cần mua lẻ hay chuyển đổi qua lại giữa nhiều công cụ — LVC Studio tích hợp sẵn 5 mô-đun cốt lõi trong một giao diện duy nhất.'}
              </p>
            </header>

            <div className="home-tools-compact-grid">
              <article className="tool-compact-card">
                <div className="tool-compact-top">
                  <span className="tool-compact-platform">Core Module 01</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>LVC AI Dubbing</h3>
                <p>
                  Nhận diện giọng nói chuẩn xác, dịch thuật ngữ cảnh và lồng tiếng AI đa quốc gia trực tiếp trong dự án.
                </p>
                <div className="tool-compact-tags">
                  <span>50+ giọng đọc AI</span>
                  <span>Đồng bộ 99.8%</span>
                </div>
                <a className="tool-compact-link" href="#demo">
                  Xem Demo trong LVC Studio →
                </a>
              </article>

              <article className="tool-compact-card">
                <div className="tool-compact-top">
                  <span className="tool-compact-platform">Core Module 02</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>LVC Smart Reframe</h3>
                <p>
                  Chuyển đổi khung hình ngang 16:9 sang dọc 9:16 tự động bám theo khuôn mặt kèm hiệu ứng caption viral.
                </p>
                <div className="tool-compact-tags">
                  <span>Auto Reframe 9:16</span>
                  <span>Caption nhảy chữ</span>
                </div>
                <a className="tool-compact-link" href="#demo">
                  Xem Demo trong LVC Studio →
                </a>
              </article>

              <article className="tool-compact-card">
                <div className="tool-compact-top">
                  <span className="tool-compact-platform">Core Module 03</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>LVC Vocal & BGM Stem</h3>
                <p>
                  Tách rời giọng nói gốc và giữ nguyên nhạc nền BGM để trộn âm thanh lồng tiếng chuẩn phòng thu (-14 LUFS).
                </p>
                <div className="tool-compact-tags">
                  <span>Tách nhạc nền AI</span>
                  <span>Khử nhiễu tự động</span>
                </div>
                <a className="tool-compact-link" href="#demo">
                  Xem Demo trong LVC Studio →
                </a>
              </article>

              <article className="tool-compact-card">
                <div className="tool-compact-top">
                  <span className="tool-compact-platform">Core Module 04</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>LVC Media Importer</h3>
                <p>
                  Thu thập nguyên liệu, bóc tách kịch bản và tự động nạp hàng loạt file từ thư mục máy tính vào hàng đợi.
                </p>
                <div className="tool-compact-tags">
                  <span>Watch Folder</span>
                  <span>Đồng bộ 1-Click</span>
                </div>
                <a className="tool-compact-link" href="#huong-dan">
                  Xem hướng dẫn thiết lập →
                </a>
              </article>

              <article className="tool-compact-card">
                <div className="tool-compact-top">
                  <span className="tool-compact-platform">Core Module 05</span>
                  <SiteIcon name="arrow" />
                </div>
                <h3>LVC GPU Batch Engine</h3>
                <p>
                  Xử lý và xuất hàng loạt video 4K 60FPS không giới hạn, tận dụng tối đa sức mạnh phần cứng CUDA/NVENC.
                </p>
                <div className="tool-compact-tags">
                  <span>Batch Processing</span>
                  <span>Tăng tốc GPU x10</span>
                </div>
                <a className="tool-compact-link" href="#pricing">
                  Tải LVC Studio ngay →
                </a>
              </article>
            </div>
          </section>

          {/* ================= 5. PIPELINE FLOW SECTION (.home-pipeline WITH CONNECTORS) ================= */}
          <section
            className="ecosystem-section home-pipeline"
            id="workflow"
            aria-labelledby="home-pipeline-title"
          >
            <header className="ecosystem-section-head">
              <div>
                <small>{isEn ? 'SEAMLESS WORKFLOW' : 'QUY TRÌNH KHÉP KÍN'}</small>
                <h2 id="home-pipeline-title">
                  {isEn
                    ? 'From raw media to finished video batch'
                    : 'Từ nguyên liệu đầu vào đến sản xuất video hoàn chỉnh'}
                </h2>
              </div>
              <p>
                {isEn
                  ? 'All 3 stages execute continuously inside LVC Studio without manual file juggling.'
                  : 'Cả 3 giai đoạn vận hành liên tục ngay bên trong LVC Studio, tiết kiệm 85% thời gian thao tác thủ công.'}
              </p>
            </header>

            <div className="home-pipeline-flow">
              <article className="pipeline-flow-step">
                <div className="pipeline-step-top">
                  <span className="pipeline-step-num">01</span>
                  <span className="pipeline-step-badge">LVC Studio · Input Queue</span>
                </div>
                <h3>{isEn ? 'Import & Analyze' : 'Nạp nguyên liệu'}</h3>
                <p>
                  Đưa danh sách video hoặc thư mục dự án vào hàng đợi LVC Studio để tự động phân tích âm thanh và khung hình.
                </p>
              </article>

              <div className="pipeline-flow-connector" aria-hidden="true">
                <span className="connector-arrow">→</span>
              </div>

              <article className="pipeline-flow-step">
                <div className="pipeline-step-top">
                  <span className="pipeline-step-num">02</span>
                  <span className="pipeline-step-badge">LVC Studio · AI Processing</span>
                </div>
                <h3>{isEn ? 'Automate with AI' : 'Xử lý tự động bằng AI'}</h3>
                <p>
                  Tự động dịch phụ đề, lồng tiếng AI, tách nhạc nền và căn chỉnh khung dọc 9:16 theo preset đã chọn.
                </p>
              </article>

              <div className="pipeline-flow-connector" aria-hidden="true">
                <span className="connector-arrow">→</span>
              </div>

              <article className="pipeline-flow-step">
                <div className="pipeline-step-top">
                  <span className="pipeline-step-num">03</span>
                  <span className="pipeline-step-badge">LVC Studio · GPU Batch</span>
                </div>
                <h3>{isEn ? 'Scale with GPU Batch' : 'Xuất hàng loạt tốc độ cao'}</h3>
                <p>
                  Phân luồng phần cứng GPU render đồng loạt hàng chục video chất lượng cao trực tiếp ra ổ cứng máy tính.
                </p>
              </article>
            </div>
          </section>

          {/* ================= 6. MULTI-PLATFORM SECTION (.home-platforms-section) ================= */}
          <section
            className="ecosystem-section home-platforms-section"
            id="platforms"
            aria-labelledby="home-platforms-title"
          >
            <header className="ecosystem-section-head">
              <div>
                <small>{isEn ? 'MULTI-PLATFORM COMPATIBILITY' : 'TƯƠNG THÍCH ĐA NỀN TẢNG'}</small>
                <h2 id="home-platforms-title">
                  {isEn ? 'Create content for every major platform' : 'Làm nội dung cho nhiều nền tảng'}
                </h2>
              </div>
              <p>
                LVC Studio hỗ trợ chuẩn hóa tỷ lệ khung hình, âm lượng và phụ đề cho TikTok, YouTube, Facebook, Douyin, Bilibili và Xiaohongshu.
              </p>
            </header>

            <div className="platforms-badge-cluster">
              {PLATFORMS.map((p) => (
                <div key={p} className={`platform-badge platform-badge--${p.toLowerCase()}`}>
                  <PlatformIcon platform={p} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 7. SHOWCASE CHANNELS (.home-showcase) ================= */}
          <section
            className="ecosystem-section home-showcase"
            id="showcase"
            aria-labelledby="home-showcase-title"
          >
            <header className="ecosystem-section-head home-showcase-head">
              <div className="home-showcase-head-copy">
                <small>{isEn ? 'VIRAL CHANNELS' : 'KÊNH TRIỂN KHAI THỰC TẾ'}</small>
                <h2 id="home-showcase-title">
                  {isEn ? 'Real Content. Real Channels.' : 'Nội dung thật. Kênh thật.'}
                </h2>
                <p className="home-showcase-subtitle">
                  Khám phá các hệ thống kênh đã triển khai và tối ưu hóa sản lượng thực tế bằng LVC Studio trên TikTok, YouTube và Facebook.
                </p>
              </div>

              <div className="home-showcase-head-actions">
                <a
                  href={CONTACT_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-showcase-viewall-btn"
                >
                  <span>{isEn ? 'YouTube @LVCMediaTool' : 'Kênh YouTube @LVCMediaTool'}</span>
                  <SiteIcon name="arrow" />
                </a>
              </div>
            </header>

            <div className="home-showcase-tabs" role="tablist" aria-label="Lọc kênh theo nền tảng">
              {[
                { id: 'all', label: isEn ? 'All' : 'Tất cả' },
                { id: 'tiktok', label: 'TikTok', icon: 'tiktok' },
                { id: 'youtube', label: 'YouTube', icon: 'youtube' },
                { id: 'facebook', label: 'Facebook', icon: 'facebook' },
              ].map((tab) => {
                const count =
                  tab.id === 'all'
                    ? VIRAL_CHANNELS.length
                    : VIRAL_CHANNELS.filter((c) => c.platform === tab.id).length;
                const active = showcaseFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`home-showcase-tab ${active ? 'is-active' : ''}`}
                    onClick={() => setShowcaseFilter(tab.id)}
                  >
                    {tab.icon && <PlatformIcon platform={tab.icon} />}
                    <span>{tab.label}</span>
                    <span className="home-showcase-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            <div
              className="home-showcase-slider"
              style={{
                '--showcase-index': 0,
                '--showcase-cols': showcaseCols,
              }}
            >
              <div className="home-showcase-track">
                {filteredChannels.map((ch) => (
                  <article
                    key={ch.id}
                    className={`home-channel-card ${ch.featured ? 'is-featured' : ''}`}
                  >
                    <div className="home-channel-cover">
                      <div className="home-channel-fallback" style={{ background: ch.gradient }}>
                        <span>{ch.channelName.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <span className={`home-channel-badge badge-${ch.platform}`}>
                        <PlatformIcon platform={ch.platform} />
                        <span>{ch.platform.toUpperCase()}</span>
                      </span>
                      {ch.featured && (
                        <span className="home-channel-featured-tag">
                          ★ {isEn ? 'Featured' : 'Nổi bật'}
                        </span>
                      )}
                    </div>

                    <div className="home-channel-info">
                      <div className="home-channel-meta">
                        <h3 title={ch.channelName}>{ch.channelName}</h3>
                        <span className="home-channel-handle">{ch.handle}</span>
                      </div>
                      <div className="home-channel-stats">
                        <span className="channel-stat-aud">
                          <strong>{(ch.followerCount / 1000).toFixed(0)}K người theo dõi</strong>
                        </span>
                        <span className="channel-stat-likes">
                          {' '}
                          · {(ch.likeCount / 1000000).toFixed(1)}M likes
                        </span>
                      </div>
                      <p className="home-channel-desc" title={ch.description}>
                        {ch.description}
                      </p>
                      <a
                        href={ch.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-channel-cta"
                      >
                        <span>{isEn ? 'Visit Channel' : 'Truy cập kênh'}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ================= 8. AUDIENCE SECTION (.home-audience) ================= */}
          <section
            className="ecosystem-section home-audience"
            id="audience"
            aria-labelledby="home-audience-title"
          >
            <header className="ecosystem-section-head">
              <div>
                <small>{isEn ? 'BUILT FOR CREATORS' : 'ĐỐI TƯỢNG PHÙ HỢP'}</small>
                <h2 id="home-audience-title">
                  {isEn ? 'Who is LVC Studio built for?' : 'LVC Studio dành cho ai?'}
                </h2>
              </div>
              <p>
                Phần mềm được tối ưu hóa cho mọi mô hình sản xuất nội dung từ cá nhân sáng tạo đến đội ngũ Media chuyên nghiệp.
              </p>
            </header>

            <div className="home-audience-grid">
              <article className="home-audience-card">
                <div className="audience-card-icon">🚀</div>
                <h3>Content Creator</h3>
                <p>Tạo nhiều video chất lượng cao hơn mỗi ngày với ít thao tác chỉnh sửa thủ công nhất.</p>
              </article>

              <article className="home-audience-card">
                <div className="audience-card-icon">⚡</div>
                <h3>Short / Reup Channels</h3>
                <p>Dịch thuật, lồng tiếng AI, cắt highlight 9:16 và tối ưu hàng loạt video cho đa nền tảng.</p>
              </article>

              <article className="home-audience-card">
                <div className="audience-card-icon">🏢</div>
                <h3>Studio & Media Team</h3>
                <p>Chuẩn hóa quy trình sản xuất công nghiệp và vận hành dàn máy render GPU 24/7.</p>
              </article>
            </div>
          </section>

          {/* ================= 9. PRICING SECTION (.home-pricing-preview-section) ================= */}
          <section
            className="ecosystem-section home-pricing-preview-section"
            id="pricing"
            aria-labelledby="home-pricing-title"
          >
            <header className="ecosystem-section-head">
              <div>
                <small>{isEn ? 'LICENSING MODELS' : 'GÓI BẢN QUYỀN LVC STUDIO'}</small>
                <h2 id="home-pricing-title">
                  {isEn ? 'Choose the right LVC Studio plan' : 'Chọn gói sử dụng LVC Studio phù hợp'}
                </h2>
              </div>
              <a href="#demo">
                {isEn ? 'Watch speed comparison' : 'Xem video kiểm chứng tốc độ'} <SiteIcon name="arrow" />
              </a>
            </header>

            <div className="home-pricing-modes-grid">
              <article className="pricing-mode-card">
                <span className="mode-card-badge">LVC STUDIO · TRIAL</span>
                <h3>LVC Studio Starter (Dùng thử)</h3>
                <p className="mode-card-sub">
                  Cài đặt và trải nghiệm trực tiếp giao diện cùng tốc độ xử lý GPU của LVC Studio trên máy tính cá nhân.
                </p>
                <ul className="mode-card-bullets">
                  <li>
                    <span>✓</span> Cài đặt nhanh trên Windows 10/11
                  </li>
                  <li>
                    <span>✓</span> Trải nghiệm đầy đủ giao diện & luồng AI
                  </li>
                  <li>
                    <span>✓</span> Tham gia nhóm Telegram nhận hỗ trợ trực tiếp
                  </li>
                </ul>
                <a
                  className="ecosystem-btn"
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tham gia Telegram nhận bản Trial →
                </a>
              </article>

              <article className="pricing-mode-card is-featured">
                <span className="mode-card-badge">LVC STUDIO PRO · UNLIMITED</span>
                <h3>LVC Studio Pro Desktop</h3>
                <p className="mode-card-sub">
                  License bản quyền theo thời hạn — Mở khóa toàn bộ công suất không giới hạn.
                </p>
                <ul className="mode-card-bullets">
                  <li>
                    <span>✓</span> Chạy trực tiếp trên PC · Bảo mật Local 100%
                  </li>
                  <li>
                    <span>✓</span> Render hàng loạt không giới hạn số lượng video
                  </li>
                  <li>
                    <span>✓</span> Hỗ trợ kỹ thuật 1-1 qua Zalo: {CONTACT_INFO.phoneDisplay}
                  </li>
                </ul>
                <a
                  className="ecosystem-btn primary"
                  href={CONTACT_INFO.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Liên hệ Zalo {CONTACT_INFO.phoneDisplay} kích hoạt →
                </a>
              </article>
            </div>

            <div className="home-pricing-cta-wrap">
              <a
                className="home-pricing-full-link"
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Nhắn tin qua Fanpage Facebook LVC Studio để được tư vấn gói phù hợp →
              </a>
            </div>
          </section>

          {/* ================= 10. YOUTUBE VIDEO GUIDES (.home-guides) ================= */}
          <section
            id="huong-dan"
            className="ecosystem-section home-guides demo-real"
            aria-labelledby="home-guides-title"
          >
            <header className="home-guides-head">
              <div>
                <p>{isEn ? 'All 6 videos from /video/ folder' : 'Trọn bộ 6 video thực tế trong thư mục /video/'}</p>
                <h2 id="home-guides-title">{isEn ? 'Studio Video Library' : 'Thư viện Video Thực Tế'}</h2>
              </div>
              <a
                href={CONTACT_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isEn ? 'Visit YouTube @LVCMediaTool' : 'Xem thêm trên YouTube @LVCMediaTool'}{' '}
                <span aria-hidden="true">↗</span>
              </a>
            </header>

            {activeGuide && (
              <div className="home-guides-layout">
                <div className="home-guides-feature">
                  <div className="home-guides-stage">
                    {playingGuideKey === activeGuideKey ? (
                      <LiteYouTubeEmbed
                        url={activeGuide.url}
                        poster={activeGuide.poster}
                        title={isEn ? activeGuide.titleEn : activeGuide.title}
                        initiallyStarted={true}
                        isEn={isEn}
                      />
                    ) : (
                      <button
                        type="button"
                        className="home-guides-cover"
                        onClick={() => setPlayingGuideKey(activeGuideKey)}
                        aria-label={`Phát hướng dẫn: ${activeGuide.title}`}
                      >
                        {activeGuideThumb && (
                          <img
                            src={activeGuideThumb}
                            alt=""
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = getYouTubeThumbUrl(activeGuide.url, 'hqdefault');
                            }}
                          />
                        )}
                        <span className="home-guides-cover-label">
                          LVC Studio · {activeGuide.duration}
                        </span>
                        <span className="home-guides-play" aria-hidden="true">
                          ▶
                        </span>
                        <strong>{isEn ? activeGuide.titleEn : activeGuide.title}</strong>
                      </button>
                    )}
                  </div>
                  <h3>{isEn ? activeGuide.titleEn : activeGuide.title}</h3>
                  <p>{isEn ? activeGuide.descriptionEn : activeGuide.description}</p>
                </div>

                <aside className="home-guides-list" aria-label="Chọn bài hướng dẫn">
                  <header>
                    <strong>{isEn ? 'Start here' : 'Bắt đầu từ đây'}</strong>
                    <span>{guideVideos.length} video</span>
                  </header>

                  <ol>
                    {guideVideos.map((item) => {
                      const thumb = item.poster || getYouTubeThumbUrl(item.url, 'hqdefault');
                      const isSelected = activeGuide.id === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => {
                              setSelectedGuideId(item.id);
                              setPlayingGuideKey('');
                            }}
                          >
                            <span className="home-guides-thumb">
                              {thumb ? (
                                <img
                                  src={thumb}
                                  alt=""
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <span aria-hidden="true">▷</span>
                              )}
                            </span>
                            <span>
                              <small>LVC Studio · {item.duration}</small>
                              <strong>{isEn ? item.titleEn : item.title}</strong>
                              {isSelected && <em>{isEn ? 'Selected' : 'Đang chọn'}</em>}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                  <p>
                    {isEn
                      ? 'Choose a video and follow along right inside LVC Studio.'
                      : 'Chọn một video YouTube và thực hành ngay trên phần mềm LVC Studio.'}
                  </p>
                </aside>
              </div>
            )}
          </section>

          {/* ================= 11. SEO RESOURCES (.seo-resources) ================= */}
          <section className="seo-resources" aria-labelledby="home-resource-title">
            <header className="seo-section-head">
              <div>
                <span className="seo-section-kicker">KIẾN THỨC & HƯỚNG DẪN</span>
                <h2 id="home-resource-title">Tối ưu quy trình làm video AI cùng LVC Studio</h2>
              </div>
              <a href="#huong-dan">Xem tất cả video hướng dẫn →</a>
            </header>

            <div className="seo-resource-grid">
              <a className="seo-resource-card" href="#huong-dan">
                <span>HƯỚNG DẪN DỊCH & DUB AI</span>
                <h3>Cách dịch phụ đề và lồng tiếng video tự động trên LVC Studio</h3>
                <p>Quy trình từ video gốc đến bản dịch chuẩn ngữ cảnh và giọng đọc AI hoàn chỉnh.</p>
                <b>Xem hướng dẫn →</b>
              </a>

              <a className="seo-resource-card" href="#huong-dan">
                <span>TẠO SHORT CLIP 9:16</span>
                <h3>Cách biến video dài thành hàng loạt Short viral tự động</h3>
                <p>Tự động bắt khuôn mặt 9:16, đóng khung phụ đề karaoke và xuất clip tốc độ cao.</p>
                <b>Xem hướng dẫn →</b>
              </a>

              <a className="seo-resource-card" href="#huong-dan">
                <span>TĂNG TỐC GPU DESKTOP</span>
                <h3>Bí quyết render hàng trăm video mỗi ngày bằng GPU trên LVC Studio</h3>
                <p>Tối ưu luồng CUDA/NVENC để đạt tốc độ xuất file nhanh gấp 10 lần trên máy tính.</p>
                <b>Xem hướng dẫn →</b>
              </a>
            </div>
          </section>

          {/* ================= 12. FAQ SECTION (.seo-faq) ================= */}
          <section className="seo-faq" id="faq" aria-labelledby="home-faq-title">
            <header className="seo-section-head">
              <div>
                <span className="seo-section-kicker">GIẢI ĐÁP THẮC MẮC</span>
                <h2 id="home-faq-title">Câu hỏi thường gặp về LVC Studio</h2>
              </div>
              <p>
                Những giải đáp chi tiết về tính năng, hiệu năng GPU, cách thay link YouTube và bảo mật dữ liệu trên LVC Studio.
              </p>
            </header>

            <div className="seo-faq-list">
              <details>
                <summary>LVC Studio là gì?</summary>
                <p>
                  LVC Studio là phần mềm sản xuất và tự động hóa Video AI toàn diện trên máy tính, tích hợp trọn bộ tính năng từ dịch phụ đề, lồng tiếng AI, tách nhạc nền, cắt short clip 9:16 đến xử lý hàng loạt tốc độ cao bằng GPU.
                </p>
              </details>
              <details>
                <summary>Tại sao tôi không cần mua lẻ nhiều công cụ khác nhau?</summary>
                <p>
                  Khác với các hệ thống chia nhỏ thành nhiều web lẻ, LVC Studio gói gọn tất cả 5 mô-đun cốt lõi vào chung một giao diện phần mềm duy nhất, giúp bạn làm việc liền mạch và tiết kiệm chi phí tối đa.
                </p>
              </details>
              <details>
                <summary>Vì sao trình phát video trên trang chủ LVC Studio không gây giật lag?</summary>
                <p>
                  Trang web sử dụng kiến trúc Lite YouTube Facade kết hợp tối ưu hóa GPU CSS: chỉ tải khung ảnh nhẹ và chỉ kết nối trình phát YouTube khi bạn bấm Play, giữ tốc độ cuộn trang luôn đạt chuẩn 60FPS.
                </p>
              </details>
              <details>
                <summary>Làm thế nào để nhận bản dùng thử và hỗ trợ cài đặt LVC Studio?</summary>
                <p>
                  Bạn có thể nhắn tin trực tiếp qua Zalo/Hotline {CONTACT_INFO.phoneDisplay} hoặc tham gia nhóm Telegram chính thức của LVC Studio để được đội ngũ kỹ thuật hỗ trợ cài đặt và kích hoạt 1-1.
                </p>
              </details>
              <details>
                <summary>Dữ liệu và video dự án trên LVC Studio được lưu trữ ở đâu?</summary>
                <p>
                  Toàn bộ video nguồn, file phụ đề và thành phẩm render từ LVC Studio đều được lưu trữ cục bộ 100% trên ổ cứng máy tính cá nhân của bạn, đảm bảo an toàn và bảo mật tuyệt đối.
                </p>
              </details>
            </div>
          </section>

          {/* ================= 13. FINAL CTA SECTION (.home-final-cta-section) ================= */}
          <section className="home-final-cta-section" aria-labelledby="home-final-title">
            <div className="home-final-cta-card">
              <small>BẮT ĐẦU NGAY HÔM NAY</small>
              <h2 id="home-final-title">Bắt đầu sản xuất video tự động với LVC Studio</h2>
              <p>
                Liên hệ trực tiếp Zalo {CONTACT_INFO.phoneDisplay} hoặc tham gia cộng đồng Telegram & YouTube {CONTACT_INFO.youtubeHandle} để nhận bản cài đặt mới nhất.
              </p>
              <div className="home-final-actions">
                <a
                  className="ecosystem-btn primary"
                  href={CONTACT_INFO.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat Zalo: {CONTACT_INFO.phoneDisplay} →
                </a>
                <a
                  className="ecosystem-btn"
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tham gia Nhóm Telegram
                </a>
                <a
                  className="ecosystem-btn"
                  href={CONTACT_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube {CONTACT_INFO.youtubeHandle}
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* ================= FOOTER (.site-footer from components.css & index.css) ================= */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <a className="brand" href="#top" aria-label="LVC STUDIO">
                <span className="brand-mark" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.2l6 3.3v7l-6 3.3-6-3.3v-7l6-3.3z"
                      fill="#30d5ff"
                    />
                  </svg>
                </span>
                <span className="brand-horizontal-text">
                  <span className="brand-text-row">
                    <strong className="brand-name-gen">LVC</strong>
                    <span className="brand-name-sep" aria-hidden="true">
                      ·
                    </span>
                    <span className="brand-name-studio">STUDIO</span>
                  </span>
                  <small className="brand-tagline">ALL-IN-ONE AI VIDEO STUDIO</small>
                </span>
              </a>
              <p>
                Nền tảng phần mềm sản xuất video AI tự động hóa và tăng tốc phần cứng GPU chuyên sâu dành cho nhà sáng tạo.
              </p>
            </div>

            <div>
              <strong>LVC Studio</strong>
              <a href="#top">Tổng quan LVC Studio</a>
              <a href="#demo">Video Thực Tế (YouTube)</a>
              <a href="#ecosystem">5 Mô-đun Tích hợp</a>
              <a href="#workflow">Quy trình 3 bước</a>
            </div>

            <div>
              <strong>Liên hệ & Cộng đồng</strong>
              <a href={CONTACT_INFO.zaloUrl} target="_blank" rel="noopener noreferrer">
                Zalo / Hotline: {CONTACT_INFO.phoneDisplay}
              </a>
              <a href={CONTACT_INFO.telegramUrl} target="_blank" rel="noopener noreferrer">
                Cộng đồng Telegram LVC Studio
              </a>
              <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer">
                Fanpage Facebook Chính thức
              </a>
              <a href={CONTACT_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer">
                YouTube: {CONTACT_INFO.youtubeHandle}
              </a>
            </div>

            <div>
              <strong>Trạng thái Hệ thống</strong>
              <span className="system-online">
                <i /> LVC Studio Server (100% Online)
              </span>
              <span style={{ color: '#6f7f8d', fontSize: '11px', marginTop: '4px' }}>
                Hotline hỗ trợ: {CONTACT_INFO.phoneDisplay}
              </span>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 LVC Studio · Zalo/Hotline: {CONTACT_INFO.phoneDisplay}. Tất cả các quyền được bảo lưu.</span>
            <nav aria-label="Kênh chính thức">
              <a href={CONTACT_INFO.zaloUrl} target="_blank" rel="noopener noreferrer">
                Zalo
              </a>
              <a href={CONTACT_INFO.telegramUrl} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href={CONTACT_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </nav>
          </div>
        </footer>
      </div>

      {/* ================= FLOATING SOCIAL DOCK (BOTTOM LEFT - AUTHENTIC GENSTUDIO DOM) ================= */}
      <aside className="floating-social floating-dock" aria-label="Kênh liên hệ nhanh LVC Studio">
        <div className="floating-dock__item floating-dock__item--hotline">
          <a
            className="floating-dock__btn floating-dock__btn--hotline"
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            aria-label={`Gọi Hotline ${CONTACT_INFO.phoneDisplay}`}
          >
            <span className="floating-dock__icon-box">
              <SiteIcon name="phone" />
              <span className="floating-dock__live-dot" aria-hidden="true" />
            </span>
            <span className="floating-dock__expand-content">
              <span className="floating-dock__label">Hotline</span>
              <span className="floating-dock__sep">·</span>
              <span className="floating-dock__number">{CONTACT_INFO.phoneDisplay}</span>
            </span>
          </a>
        </div>

        <div className="floating-dock__item">
          <a
            className="floating-dock__btn floating-dock__btn--social zalo"
            href={CONTACT_INFO.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Zalo hỗ trợ ${CONTACT_INFO.phoneDisplay}`}
          >
            <SiteIcon name="zalo" />
            <span className="floating-dock__tooltip">Zalo · {CONTACT_INFO.phoneDisplay}</span>
          </a>
        </div>

        <div className="floating-dock__item">
          <a
            className="floating-dock__btn floating-dock__btn--social telegram"
            href={CONTACT_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nhóm Telegram LVC Studio"
          >
            <SiteIcon name="telegram" />
            <span className="floating-dock__tooltip">Telegram LVC Studio</span>
          </a>
        </div>

        <div className="floating-dock__item">
          <a
            className="floating-dock__btn floating-dock__btn--social facebook"
            href={CONTACT_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fanpage Facebook LVC Studio"
          >
            <SiteIcon name="facebook-white" />
            <span className="floating-dock__tooltip">Fanpage Facebook LVC Studio</span>
          </a>
        </div>

        <div className="floating-dock__item">
          <a
            className="floating-dock__btn floating-dock__btn--social youtube"
            href={CONTACT_INFO.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`YouTube ${CONTACT_INFO.youtubeHandle}`}
          >
            <SiteIcon name="youtube-white" />
            <span className="floating-dock__tooltip">YouTube · {CONTACT_INFO.youtubeHandle}</span>
          </a>
        </div>
      </aside>

      {/* ================= SCROLL TO TOP BUTTON (BOTTOM RIGHT) ================= */}
      <button
        type="button"
        className={`scroll-to-top ${showScrollTop ? 'is-visible' : ''}`}
        aria-label="Cuộn lên đầu trang"
        title="Lên đầu trang"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="scroll-to-top__orbit" aria-hidden="true" />
        <span className="scroll-to-top__glow" aria-hidden="true" />
        <SiteIcon name="chevronUp" />
      </button>

      {/* ================= YOUTUBE CONFIG MODAL ================= */}
      <YouTubeConfigModal
        isOpen={ytModalOpen}
        onClose={() => setYtModalOpen(false)}
        demoData={demoData}
        onSaveDemo={setDemoData}
        guideVideos={guideVideos}
        onSaveGuides={setGuideVideos}
      />
    </div>
  );
}
