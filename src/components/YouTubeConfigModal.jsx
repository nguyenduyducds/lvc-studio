import React, { useState } from 'react';
import { extractYouTubeId } from './LiteYouTubeEmbed';

export default function YouTubeConfigModal({
  isOpen,
  onClose,
  demoData,
  onSaveDemoData,
  guideVideos,
  onSaveGuideVideos,
  isEn,
}) {
  const [localDemo, setLocalDemo] = useState(demoData);
  const [localGuides, setLocalGuides] = useState(guideVideos);
  const [activeTab, setActiveTab] = useState('demos');

  if (!isOpen) return null;

  const handleDemoChange = (field, value) => {
    setLocalDemo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGuideChange = (idx, field, value) => {
    setLocalGuides((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveDemoData(localDemo);
    onSaveGuideVideos(localGuides);
    onClose();
  };

  const beforeId = extractYouTubeId(localDemo.beforeUrl);
  const afterId = extractYouTubeId(localDemo.afterUrl);

  return (
    <div className="yt-modal-backdrop" onClick={onClose}>
      <div className="yt-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <header className="yt-modal-header">
          <div>
            <small>LVC STUDIO · YOUTUBE LITE EMBED</small>
            <h3>{isEn ? 'Customize LVC Studio YouTube Links' : 'Cấu hình Link Video YouTube của LVC Studio'}</h3>
          </div>
          <button type="button" className="yt-modal-close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </header>

        <div className="yt-modal-tabs">
          <button
            type="button"
            className={activeTab === 'demos' ? 'is-active' : ''}
            onClick={() => setActiveTab('demos')}
          >
            {isEn ? 'LVC Studio Main Demo (2 Videos)' : 'Video Demo LVC Studio (2 Video)'}
          </button>
          <button
            type="button"
            className={activeTab === 'guides' ? 'is-active' : ''}
            onClick={() => setActiveTab('guides')}
          >
            {isEn ? `LVC Studio Guides (${localGuides.length} Videos)` : `Playlist Hướng dẫn LVC Studio (${localGuides.length} Video)`}
          </button>
        </div>

        <form onSubmit={handleSave} className="yt-modal-body">
          {activeTab === 'demos' ? (
            <div className="yt-config-list">
              <div className="yt-config-card">
                <strong>LVC Studio — Video Demo Thực Tế</strong>
                <label>
                  <span>{isEn ? 'Video 01 Title:' : 'Tiêu đề Video 01 (Khung bên trái):'}</span>
                  <input
                    type="text"
                    value={localDemo.beforeLabelVi}
                    onChange={(e) => handleDemoChange('beforeLabelVi', e.target.value)}
                  />
                </label>
                <label>
                  <span>{isEn ? 'Video 01 YouTube URL or ID:' : 'Link YouTube Video 01:'}</span>
                  <input
                    type="text"
                    value={localDemo.beforeUrl}
                    onChange={(e) => handleDemoChange('beforeUrl', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <small className={beforeId ? 'valid-id' : 'invalid-id'}>
                    {beforeId ? `✓ Video ID: ${beforeId}` : '⚠ Link chưa đúng định dạng YouTube'}
                  </small>
                </label>

                <label style={{ marginTop: '8px' }}>
                  <span>{isEn ? 'Video 02 Title:' : 'Tiêu đề Video 02 (Khung bên phải):'}</span>
                  <input
                    type="text"
                    value={localDemo.afterLabelVi}
                    onChange={(e) => handleDemoChange('afterLabelVi', e.target.value)}
                  />
                </label>
                <label>
                  <span>{isEn ? 'Video 02 YouTube URL or ID:' : 'Link YouTube Video 02:'}</span>
                  <input
                    type="text"
                    value={localDemo.afterUrl}
                    onChange={(e) => handleDemoChange('afterUrl', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <small className={afterId ? 'valid-id' : 'invalid-id'}>
                    {afterId ? `✓ Video ID: ${afterId}` : '⚠ Link chưa đúng định dạng YouTube'}
                  </small>
                </label>
              </div>
            </div>
          ) : (
            <div className="yt-config-list">
              {localGuides.map((guide, index) => {
                const ytId = extractYouTubeId(guide.url);
                return (
                  <div key={guide.id} className="yt-config-card">
                    <strong>LVC Studio · Bài hướng dẫn #{index + 1}</strong>
                    <label>
                      <span>{isEn ? 'Guide Title:' : 'Tiêu đề bài hướng dẫn:'}</span>
                      <input
                        type="text"
                        value={guide.title}
                        onChange={(e) => handleGuideChange(index, 'title', e.target.value)}
                      />
                    </label>
                    <label>
                      <span>{isEn ? 'YouTube URL or Video ID:' : 'Link YouTube hoặc Video ID:'}</span>
                      <input
                        type="text"
                        value={guide.url}
                        onChange={(e) => handleGuideChange(index, 'url', e.target.value)}
                      />
                      <small className={ytId ? 'valid-id' : 'invalid-id'}>
                        {ytId ? `✓ Video ID: ${ytId}` : '⚠ Link chưa đúng định dạng YouTube'}
                      </small>
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          <footer className="yt-modal-footer">
            <span className="yt-modal-hint">
              💡 Mọi video của <b>LVC Studio</b> đều được nhúng qua <b>Lite Facade</b> — chỉ khi bấm Play mới tải iframe, đảm bảo trang mượt 60FPS!
            </span>
            <div className="yt-modal-actions">
              <button type="button" className="ecosystem-btn" onClick={onClose}>
                {isEn ? 'Cancel' : 'Đóng'}
              </button>
              <button type="submit" className="ecosystem-btn primary">
                {isEn ? 'Apply YouTube Links' : 'Lưu & Áp dụng ngay'}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}
