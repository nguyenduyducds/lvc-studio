import React from 'react';

export default function HeroVisualMockup({ product, isEn }) {
  const id = product?.id || 'workspace-main';
  const accent = product?.accentColor || '#22d3ee';

  return (
    <div className="studio-visual-stage" style={{ '--mock-accent': accent }}>
      {/* Top macOS/Windows Studio Window Bar */}
      <div className="studio-mock-header">
        <div className="studio-mock-dots">
          <span className="dot-red" />
          <span className="dot-amber" />
          <span className="dot-green" />
        </div>

        <div className="studio-mock-title">
          <span className="studio-mock-app-icon">◆</span>
          <strong>{product?.name || 'LVC Studio Pro v4.5'}</strong>
          <span className="studio-mock-badge">{product?.badge || 'LVC STUDIO'}</span>
        </div>

        <div className="studio-mock-status">
          <span className="mock-hw-chip">RTX NVENC · 98%</span>
          <i className="status-pulse" />
          <span>{isEn ? 'ONLINE' : 'SẴN SÀNG'}</span>
        </div>
      </div>

      {/* Main Studio Workspace Body */}
      <div className="studio-mock-body">
        {/* Left Sidebar: Active Queue & Hardware Telemetry */}
        <aside className="studio-mock-sidebar">
          <div className="mock-side-label">
            <span>{isEn ? 'ACTIVE PIPELINE (48)' : 'TIẾN TRÌNH ĐANG CHẠY (48)'}</span>
            <b>4/4 GPU</b>
          </div>

          {[
            { num: '01', name: 'LVC_Master_Project_01.mp4', pct: '100%', state: isEn ? 'Exported 4K' : 'Đã xuất 4K 60FPS', done: true },
            { num: '02', name: 'LVC_Auto_Workflow_02.mp4', pct: '86%', state: isEn ? 'GPU Rendering...' : 'Đang xử lý GPU 86%', active: true },
            { num: '03', name: 'LVC_Smart_Sync_03.mp4', pct: '42%', state: isEn ? 'AI Processing' : 'Đang đồng bộ AI', active: false },
            { num: '04', name: 'LVC_MultiChannel_04.mp4', pct: 'Wait', state: isEn ? 'Queued · Local' : 'Chờ xuất · Local', active: false },
          ].map((item) => (
            <div
              key={item.num}
              className={`mock-queue-item ${item.active ? 'is-active' : ''} ${item.done ? 'is-done' : ''}`}
            >
              <span className="mock-q-num">{item.done ? '✓' : item.num}</span>
              <div className="mock-q-info">
                <div className="mock-q-row">
                  <strong>{item.name}</strong>
                  <em>{item.pct}</em>
                </div>
                <small>{item.state}</small>
                {item.active && (
                  <div className="mock-q-bar">
                    <i style={{ width: '86%' }} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Hardware Telemetry Mini Card */}
          <div className="mock-side-stats">
            {product?.stats?.map((st, idx) => (
              <div key={idx} className="mock-stat-pill">
                <span className="stat-dot" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Interactive Viewport & Multi-Track Timeline */}
        <div className="studio-mock-center">
          <div className="mock-canvas">
            <div className="mock-canvas-grid" />
            <div className="mock-canvas-spotlight" />

            {/* Top HUD Bar */}
            <div className="mock-canvas-hud-top">
              <div className="hud-left-group">
                <span className="hud-rec-dot" />
                <span className="hud-tag">{product?.hudTag || 'LVC STUDIO ENGINE'}</span>
              </div>
              <div className="hud-right-group">
                <span className="hud-fps">4K UHD · 60.0 FPS</span>
                <span className="hud-codec">NVENC HEVC</span>
              </div>
            </div>

            {/* Dynamic Center Stage depending on selected workspace tab */}
            <div className="mock-center-stage-wrap">
              <div className="mock-holo-ring">
                <div className="mock-holo-ring-inner" />
                <div className="mock-ai-core">
                  <span className="core-spark">✦</span>
                  <span>{product?.coreLabel || '⚡ LVC STUDIO'}</span>
                </div>
              </div>

              {/* Live Audio / Processing Waveform Bars */}
              <div className="mock-waveform-bars" aria-hidden="true">
                {[38, 65, 92, 54, 78, 96, 62, 45, 84, 70, 95, 58, 40, 74, 88, 50].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: `${h}%`,
                      opacity: i % 2 === 0 ? 0.95 : 0.55,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Caption / Status Overlay */}
            <div className="mock-subtitle-overlay">
              <div className="sub-overlay-top">
                <span className="sub-lang-pill">
                  {id === 'workspace-batch'
                    ? '⚡ MULTI-THREAD GPU QUEUE'
                    : id === 'workspace-ai'
                    ? '🧠 LVC AI CORE ENGINE'
                    : id === 'workspace-local'
                    ? '🔒 100% LOCAL STORAGE'
                    : '✨ LVC STUDIO ALL-IN-ONE'}
                </span>
                <span className="sub-timecode">00:02:18:04</span>
              </div>
              <strong>{isEn ? product?.subtitleEn : product?.subtitleVi}</strong>
            </div>
          </div>

          {/* Multi-track NLE Timeline */}
          <div className="mock-timeline">
            <div className="mock-playhead">
              <span className="playhead-cap" />
            </div>
            <div className="mock-track-row">
              <span className="track-name">MASTER</span>
              <div className="track-bars video-bars">
                <i style={{ width: '34%' }} />
                <i style={{ width: '31%' }} />
                <i style={{ width: '33%' }} />
              </div>
            </div>
            <div className="mock-track-row">
              <span className="track-name">LVC AI</span>
              <div className="track-bars sub-bars">
                <i style={{ width: '24%' }} />
                <i style={{ width: '27%' }} />
                <i style={{ width: '21%' }} />
                <i style={{ width: '26%' }} />
              </div>
            </div>
            <div className="mock-track-row">
              <span className="track-name">AUDIO</span>
              <div className="track-bars audio-bars">
                <i style={{ width: '48%' }} />
                <i style={{ width: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
