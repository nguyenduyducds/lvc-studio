// Bộ dữ liệu trung tâm cho LVC Studio (Tích hợp trực tiếp 6 video thực tế từ thư mục /video/ trên nền UI/UX chuẩn GenStudio 60FPS)

export const CONTACT_INFO = {
  phoneRaw: '0945711375',
  phoneDisplay: '0945 711 375',
  zaloUrl: 'https://zalo.me/0945711375',
  telegramUrl: 'https://t.me/+E0eT0EoKhZIzNjJl',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100092372321965',
  youtubeUrl: 'https://www.youtube.com/@LVCMediaTool',
  youtubeHandle: '@LVCMediaTool',
};

// Danh sách 6 Video Thực Tế trong thư mục /video/ của LVC Studio
export const LOCAL_STUDIO_VIDEOS = [
  {
    id: 'vid-1',
    url: '/video/douyin_7695233377897414577.mp4',
    poster: '/video/posters/douyin_7695233377897414577.jpg',
    duration: '00:54',
    badge: 'LVC STUDIO · VIDEO 01',
    resolution: '1920x1080 · 60FPS',
    title: 'Video 01: Hoạt họa AI Ngõa Miêu Cổ Phong (1080p Full HD)',
    titleEn: 'Video 01: AI Ancient Tile Cat Animation (1080p Full HD)',
    description:
      'Video gốc độ phân giải cao 1080p được nạp trực tiếp vào hàng đợi xử lý của LVC Studio.',
    descriptionEn:
      'High-definition 1080p source video loaded directly into the LVC Studio processing queue.',
  },
  {
    id: 'vid-2',
    url: '/video/douyin_7696086855386003825.mp4',
    poster: '/video/posters/douyin_7696086855386003825.jpg',
    duration: '00:50',
    badge: 'LVC STUDIO · VIỆT HÓA AI',
    resolution: '1920x1080 · Sub & Dub',
    title: 'Video 02: Dịch Phụ Đề Song Ngữ & Lồng Tiếng AI (“Đừng mơ mà trốn”)',
    titleEn: 'Video 02: Bilingual Subtitle & AI Voice Dubbing Output',
    description:
      'Thành phẩm tự động nhận diện lời thoại, dịch phụ đề tiếng Việt chuẩn ngữ cảnh và đồng bộ thời gian thực trên LVC Studio.',
    descriptionEn:
      'Automated speech recognition, context-aware Vietnamese subtitle translation, and real-time sync in LVC Studio.',
  },
  {
    id: 'vid-3',
    url: '/video/douyin_7696489073725473723.mp4',
    poster: '/video/posters/douyin_7696489073725473723.jpg',
    duration: '00:24',
    badge: 'LVC STUDIO · TIÊN HIỆP AI',
    resolution: '1920x1080 · Việt Hóa',
    title: 'Video 03: Việt Hóa Phim Ngắn Tiên Hiệp AI (“Tung tơ nhung vi diệu”)',
    titleEn: 'Video 03: Fantasy AI Short Film Vietnamese Localization',
    description:
      'Bản dịch văn phong cổ trang mượt mà, đóng cứng phụ đề sắc nét và giữ nguyên hiệu ứng âm thanh nền gốc.',
    descriptionEn:
      'Polished fantasy localization with crisp hardsub rendering and preserved original sound effects.',
  },
  {
    id: 'vid-4',
    url: '/video/douyin_7697094101003515641.mp4',
    poster: '/video/posters/douyin_7697094101003515641.jpg',
    duration: '00:39',
    badge: 'LVC STUDIO · VISUAL 4K',
    resolution: '1920x1080 · GPU NVENC',
    title: 'Video 04: Nghệ Thuật Kẹo Đường Cổ Phong (Tối ưu Render GPU)',
    titleEn: 'Video 04: Traditional Sugar Art Visuals (GPU Accelerated)',
    description:
      'Xử lý khung hình chuyển động nhanh với tốc độ cao nhờ công nghệ mã hóa phần cứng CUDA/NVENC trên LVC Studio.',
    descriptionEn:
      'High-motion particle visuals rendered cleanly with CUDA/NVENC hardware acceleration in LVC Studio.',
  },
  {
    id: 'vid-5',
    url: '/video/douyin_7697826383670454513.mp4',
    poster: '/video/posters/douyin_7697826383670454513.jpg',
    duration: '00:35',
    badge: 'LVC STUDIO · HỘI HỌA AI',
    resolution: '1920x1080 · 60FPS',
    title: 'Video 05: Tuyệt Kỹ Vẽ Rồng Phát Sáng Trên Gốm Sứ',
    titleEn: 'Video 05: Luminous Dragon Porcelain Painting AI Video',
    description:
      'Giữ trọn độ sâu màu sắc và hiệu ứng ánh sáng neon khi xử lý hàng loạt qua LVC Studio.',
    descriptionEn:
      'Preserves deep color grading and neon glow details during batch processing in LVC Studio.',
  },
  {
    id: 'vid-6',
    url: '/video/douyin_7699062355951235057.mp4',
    poster: '/video/posters/douyin_7699062355951235057.jpg',
    duration: '00:12',
    badge: 'LVC STUDIO · SHORT 9:16',
    resolution: '720x1280 · Vertical 9:16',
    title: 'Video 06: Short Clip Dọc 9:16 Đóng Phụ Đề Viral (“xẻo thấy bà!”)',
    titleEn: 'Video 06: 9:16 Vertical Short Clip with Viral Vietnamese Subtitles',
    description:
      'Video khung dọc 9:16 tối ưu cho TikTok, YouTube Shorts và Facebook Reels với phụ đề tiếng Việt bắt trend.',
    descriptionEn:
      '9:16 vertical short optimized for TikTok, YouTube Shorts, and Reels with punchy Vietnamese captions.',
  },
];

// 4 Tab Cặp Video Thực Tế trong mục #demo
export const DEMO_VIDEO_TABS = [
  {
    id: 'pair-1',
    name: 'Cặp Video 01 · Việt Hóa & Lồng Tiếng',
    vi: 'Trải nghiệm trực tiếp các video thực tế trong thư mục /video/ của LVC Studio: từ video gốc đến thành phẩm dịch phụ đề tiếng Việt sắc nét.',
    en: 'Watch real videos from the /video/ directory processed by LVC Studio: from raw input to localized Vietnamese subtitle output.',
    leftVideo: LOCAL_STUDIO_VIDEOS[0],
    rightVideo: LOCAL_STUDIO_VIDEOS[1],
  },
  {
    id: 'pair-2',
    name: 'Cặp Video 02 · Tiên Hiệp & Cổ Phong',
    vi: 'Chất lượng hình ảnh Full HD 1080p và phụ đề văn phong cổ trang mượt mà được xử lý trực tiếp bởi LVC Studio.',
    en: 'Full HD 1080p visual quality and natural Vietnamese fantasy subtitles processed directly by LVC Studio.',
    leftVideo: LOCAL_STUDIO_VIDEOS[2],
    rightVideo: LOCAL_STUDIO_VIDEOS[3],
  },
  {
    id: 'pair-3',
    name: 'Cặp Video 03 · Hội Họa & Short 9:16',
    vi: 'Hỗ trợ trọn vẹn cả định dạng ngang 16:9 lẫn định dạng dọc 9:16 chuyên dụng cho TikTok, Reels và YouTube Shorts.',
    en: 'Full support for both 16:9 widescreen and 9:16 vertical short formats for TikTok, Reels, and YouTube Shorts.',
    leftVideo: LOCAL_STUDIO_VIDEOS[4],
    rightVideo: LOCAL_STUDIO_VIDEOS[5],
  },
  {
    id: 'all-6',
    name: 'Trọn Bộ 6 Video Thực Tế (/video)',
    vi: 'Xem đầy đủ cả 6 video thực tế trong thư mục /video/ của dự án — chỉ tải ảnh bìa nhẹ và phát mượt tức thì khi bạn bấm Play.',
    en: 'Browse and play all 6 real videos from your /video/ directory with zero page-load lag.',
    showAll: true,
  },
];

export const STUDIO_WORKSPACES = [
  {
    id: 'workspace-main',
    previewMode: 'workspace',
    tabLabel: 'LVC Studio Core',
    name: 'LVC Studio — Bảng Điều Khiển Trung Tâm',
    nameEn: 'LVC Studio — Unified Master Workspace',
    tagline: 'Tự động hóa sản xuất & xử lý video đa luồng trên PC',
    taglineEn: 'Automated video production & multi-thread GPU processing',
    alt: 'LVC Studio — Giao diện Focus, hàng đợi video và chỉnh sửa phụ đề AI',
    altEn: 'LVC Studio — Focus workspace, media queue, and AI subtitle timeline',
    accentColor: '#22d3ee',
    portalGradient:
      'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.22) 0%, rgba(99, 102, 241, 0.15) 38%, transparent 72%)',
  },
  {
    id: 'workspace-voice',
    previewMode: 'voice',
    tabLabel: 'AI Dub & Sub',
    name: 'LVC Studio — Dịch Phụ Đề & Lồng Tiếng AI',
    nameEn: 'LVC Studio — AI Subtitle & Neural Dubbing',
    tagline: 'Nhận diện giọng nói, dịch đa ngôn ngữ & đồng bộ 99.8%',
    taglineEn: 'Speech recognition, multi-language translation & 99.8% sync',
    alt: 'LVC Studio — Mô-đun dịch phụ đề và lồng tiếng AI tự nhiên',
    altEn: 'LVC Studio — AI subtitle translation and neural voice dubbing',
    accentColor: '#06b6d4',
    portalGradient:
      'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.22) 0%, rgba(37, 99, 235, 0.14) 38%, transparent 72%)',
  },
  {
    id: 'workspace-shorts',
    previewMode: 'shorts',
    tabLabel: 'Auto Short 9:16',
    name: 'LVC Studio — Cắt Highlight & Khung Dọc 9:16',
    nameEn: 'LVC Studio — Viral Highlight & 9:16 Reframe',
    tagline: 'Tự động bắt tâm điểm khuôn mặt & tạo caption nhảy chữ',
    taglineEn: 'Automated face-tracking reframe & dynamic karaoke captions',
    alt: 'LVC Studio — Tự động cắt clip ngắn 9:16 và tạo phụ đề viral',
    altEn: 'LVC Studio — Smart 9:16 vertical reframe and viral captions',
    accentColor: '#38bdf8',
    portalGradient:
      'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22) 0%, rgba(139, 92, 246, 0.15) 38%, transparent 72%)',
  },
  {
    id: 'workspace-batch',
    previewMode: 'batch',
    tabLabel: 'GPU Batch x10',
    name: 'LVC Studio — Render Hàng Loạt Đa Luồng GPU',
    nameEn: 'LVC Studio — Multi-Thread GPU Batch Engine',
    tagline: 'Khai thác 100% sức mạnh phần cứng CUDA/NVENC không giới hạn',
    taglineEn: '100% hardware-accelerated CUDA/NVENC unlimited batch export',
    alt: 'LVC Studio — Hệ thống xử lý và xuất video hàng loạt bằng GPU',
    altEn: 'LVC Studio — High-speed hardware GPU batch rendering system',
    accentColor: '#a855f7',
    portalGradient:
      'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.22) 0%, rgba(217, 70, 239, 0.13) 38%, transparent 72%)',
  },
];

// Dữ liệu mặc định cho Modal cấu hình Video
export const LVC_DEMO_DEFAULT = {
  name: 'LVC Studio',
  vi: 'Trải nghiệm trực tiếp 6 video thực tế trong thư mục /video/ được xử lý bởi LVC Studio: từ dịch phụ đề, lồng tiếng đến Short 9:16.',
  en: 'Experience the 6 real videos from your /video/ directory processed by LVC Studio.',
  beforeUrl: LOCAL_STUDIO_VIDEOS[0].url,
  beforeLabelVi: LOCAL_STUDIO_VIDEOS[0].title,
  beforeLabelEn: LOCAL_STUDIO_VIDEOS[0].titleEn,
  beforeDuration: `${LOCAL_STUDIO_VIDEOS[0].duration} · ${LOCAL_STUDIO_VIDEOS[0].resolution}`,
  afterUrl: LOCAL_STUDIO_VIDEOS[1].url,
  afterLabelVi: LOCAL_STUDIO_VIDEOS[1].title,
  afterLabelEn: LOCAL_STUDIO_VIDEOS[1].titleEn,
  afterDuration: `${LOCAL_STUDIO_VIDEOS[1].duration} · ${LOCAL_STUDIO_VIDEOS[1].resolution}`,
  highlights: [
    'Phát trực tiếp 6 video từ thư mục /video/',
    'Chỉ tải ảnh Poster nhẹ · Không lag trang',
    'Hỗ trợ cả file .mp4 nội bộ lẫn link YouTube',
  ],
};

// Playlist 6 Video Thực Tế từ thư mục /video/ trong mục #huong-dan
export const GUIDE_VIDEOS_DEFAULT = LOCAL_STUDIO_VIDEOS;

// Danh sách Kênh & Cộng đồng chính thức của LVC Studio
export const VIRAL_CHANNELS = [
  {
    id: 'ch-1',
    channelName: 'LVC Media Tool Official',
    handle: '@LVCMediaTool',
    platform: 'youtube',
    followerCount: 240000,
    likeCount: 6100000,
    featured: true,
    description:
      'Kênh YouTube chính thức của LVC Studio (@LVCMediaTool) — Tổng hợp video demo thực tế, hướng dẫn sử dụng và cập nhật tính năng mới.',
    channelUrl: 'https://www.youtube.com/@LVCMediaTool',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #991b1b 55%, #0f172a 100%)',
  },
  {
    id: 'ch-2',
    channelName: 'LVC Studio Fanpage',
    handle: 'fb.com/100092372321965',
    platform: 'facebook',
    followerCount: 360000,
    likeCount: 9200000,
    featured: true,
    description:
      'Trang Facebook chính thức hỗ trợ khách hàng, chia sẻ quy trình tự động hóa sản xuất video đa kênh bằng LVC Studio.',
    channelUrl: 'https://www.facebook.com/profile.php?id=100092372321965',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #090d16 100%)',
  },
  {
    id: 'ch-3',
    channelName: 'LVC Media Showcase',
    handle: '@lvcstudio.tiktok',
    platform: 'tiktok',
    followerCount: 485000,
    likeCount: 12400000,
    featured: true,
    description:
      'Hệ thống kênh Short 9:16 vận hành và sản xuất nội dung tự động hóa 100% trên nền tảng LVC Studio.',
    channelUrl: 'https://www.youtube.com/@LVCMediaTool',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #1e1b4b 100%)',
  },
  {
    id: 'ch-4',
    channelName: 'Cộng đồng LVC Studio',
    handle: 'Zalo 0945.711.375 · Telegram',
    platform: 'youtube',
    followerCount: 185000,
    likeCount: 4100000,
    featured: false,
    description:
      'Cộng đồng nhà sáng tạo sử dụng LVC Studio để xây dựng hệ thống kênh đa nền tảng bền vững.',
    channelUrl: 'https://t.me/+E0eT0EoKhZIzNjJl',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #1e3a8a 55%, #090d16 100%)',
  },
];
