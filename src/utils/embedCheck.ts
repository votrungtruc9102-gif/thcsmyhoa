/**
 * Utility xác định và kiểm tra khả năng nhúng iframe của đường link Sách Giáo Khoa
 * Nền tảng học tập trực tuyến THCS Mỹ Hòa - Năm học 2026-2027
 */

/**
 * Danh sách các cổng thông tin và trang web giáo dục nguồn đã biết
 * có chính sách bảo mật X-Frame-Options: SAMEORIGIN / DENY
 * hoặc Content-Security-Policy: frame-ancestors chặn nhúng nội dung vào iframe.
 */
export const KNOWN_IFRAME_BLOCKED_DOMAINS = [
  'taphuan.nxbgd.vn',
  'hanhtrangso.nxbgd.vn',
  'hoc10.vn',
  'nxbgd.vn',
  'moet.gov.vn',
  'sachmem.vn',
  'olm.vn',
  'violet.vn',
  'loigiaihay.com',
  'vietjack.com'
];

/**
 * Kiểm tra nhanh đồng bộ dựa trên tên miền của URL.
 * Giúp giao diện lập tức nhận diện các trang chặn iframe (như taphuan.nxbgd.vn)
 * mà không để xuất hiện màn hình xám hay lỗi "refused to connect".
 */
export function isKnownIframeBlocked(url: string): boolean {
  if (!url) return false;
  try {
    const trimmed = url.trim();
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return false;
    }
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    return KNOWN_IFRAME_BLOCKED_DOMAINS.some(
      (d) => host === d || host.endsWith('.' + d)
    );
  } catch {
    return false;
  }
}

/**
 * Kiểm tra xem URL có phải là tài liệu hỗ trợ nhúng trực tiếp an toàn
 * (ví dụ: file PDF trực tiếp, Google Docs Viewer / Preview, v.v.)
 */
export function isDirectEmbeddableDoc(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase().trim();
  if (lower.endsWith('.pdf') || lower.includes('.pdf?')) return true;
  if (lower.includes('drive.google.com/file/d/') && lower.includes('/preview')) return true;
  if (lower.includes('docs.google.com/viewer')) return true;
  return false;
}

/**
 * Gọi API backend kiểm tra response headers (X-Frame-Options & CSP)
 * của máy chủ nguồn đối với các URL chưa có trong danh sách đã biết.
 */
export async function checkServerFrameSupport(url: string): Promise<boolean> {
  // Nếu đã nằm trong danh sách chặn, trả về false ngay lập tức
  if (isKnownIframeBlocked(url)) {
    return false;
  }

  // Nếu là file PDF trực tiếp, cho phép nhúng
  if (isDirectEmbeddableDoc(url)) {
    return true;
  }

  try {
    const res = await fetch(`/api/check-embed?url=${encodeURIComponent(url.trim())}`);
    if (res.ok) {
      const data = await res.json();
      return data.canEmbed === true;
    }
  } catch {
    // Nếu kiểm tra mạng lỗi, an toàn là cung cấp tùy chọn thân thiện
  }
  return false;
}
