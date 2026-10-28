---
name: genstudio-landing-ui
description: Hệ thống Thiết kế UI/UX LVC Studio 60FPS Zero-Lag (Chuẩn khung UI/UX GenStudio Dark & Light Portal, Zero-Lag YouTube Facade Embed) chuyên dụng cho trang chủ sản phẩm LVC Studio duy nhất.
---

# LVC Studio Landing UI/UX Design Skill (`genstudio-landing-ui`)

Bộ skill chuẩn hóa ngôn ngữ thiết kế UI/UX lấy cảm hứng từ khung **GenStudio.vn**, được tinh gọn để giới thiệu **duy nhất sản phẩm LVC Studio** trên nền tảng **React** với hiệu năng **60FPS tuyệt đối không giật lag**.

## 1. Nguyên tắc Cốt lõi

1. **Chỉ tập trung vào 1 sản phẩm duy nhất (`LVC Studio`)**:
   - Loại bỏ toàn bộ các công cụ phụ của bên thứ ba (`Trans`, `Short`, `Audio`, `Toolkit`, `Extensions`, Mega Menu đa công cụ).
   - Toàn bộ các phân khu (Hero, Video Demo Thực Tế, Tính năng cốt lõi, Quy trình 3 bước, Bảng giá, Playlist Hướng dẫn) đều xoay quanh **LVC Studio**.
2. **Zero-Lag 60FPS CSS Architecture**:
   - Không dùng lớp nền `filter: blur(>40px)`, SVG `feTurbulence` hay `onMouseMove` gọi `setState` liên tục.
   - Bảng màu chuẩn Dark Portal (`#06090f` / `#0c1422`, nhấn Cyan `#06b6d4` & Blue `#2563eb`) và Light Portal (`#f8fafc` / `#ffffff`).
3. **Zero-Lag YouTube Facade (`<LiteYouTubeEmbed />`)**:
   - Hiển thị ảnh bìa nhẹ từ `i.ytimg.com` và chỉ khởi tạo `<iframe>` từ `youtube-nocookie.com` khi người dùng bấm Play.
   - Hộp thoại **Cấu hình Link YouTube** chỉ gồm 2 video Demo chính của **LVC Studio** và danh sách Playlist hướng dẫn của **LVC Studio**.
