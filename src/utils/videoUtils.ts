export interface VideoValidationResult {
  isValid: boolean;
  videoId?: string;
  embedUrl?: string;
  watchUrl?: string;
  sourceType?: 'youtube' | 'youtube_shorts';
  error?: string;
}

/**
 * Validates and converts various YouTube URLs (watch, short, embed, shorts)
 * into a secure, normalized embed URL for iframe playback without tracking cookies.
 */
export function validateAndFormatVideoUrl(rawUrl: string): VideoValidationResult {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      isValid: false,
      error: 'Vui lòng nhập đường dẫn video.'
    };
  }

  const trimmed = rawUrl.trim();

  // Basic security check: disallow script or data schemes
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('vbscript:')
  ) {
    return {
      isValid: false,
      error: 'Đường dẫn chứa giao thức không an toàn.'
    };
  }

  let parsedUrl: URL;
  try {
    // Add https:// if user pasted without protocol
    const urlToParse = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    parsedUrl = new URL(urlToParse);
  } catch {
    return {
      isValid: false,
      error: 'Định dạng đường dẫn URL không hợp lệ.'
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();

  // Check supported domains
  const isYouTubeDomain =
    hostname === 'youtube.com' ||
    hostname === 'www.youtube.com' ||
    hostname === 'm.youtube.com' ||
    hostname === 'youtu.be' ||
    hostname === 'www.youtube-nocookie.com';

  if (!isYouTubeDomain) {
    return {
      isValid: false,
      error:
        'Hệ thống hiện chỉ hỗ trợ video từ YouTube và YouTube Shorts để đảm bảo an toàn nhúng.'
    };
  }

  let videoId: string | null = null;
  let sourceType: 'youtube' | 'youtube_shorts' = 'youtube';

  // Format 1: youtu.be/VIDEO_ID
  if (hostname === 'youtu.be') {
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && /^[a-zA-Z0-9_-]{11}$/.test(pathParts[0])) {
      videoId = pathParts[0];
    }
  }

  // Format 2: youtube.com/shorts/VIDEO_ID
  if (!videoId && parsedUrl.pathname.includes('/shorts/')) {
    const shortsMatch = parsedUrl.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch && shortsMatch[1]) {
      videoId = shortsMatch[1];
      sourceType = 'youtube_shorts';
    }
  }

  // Format 3: youtube.com/embed/VIDEO_ID
  if (!videoId && parsedUrl.pathname.includes('/embed/')) {
    const embedMatch = parsedUrl.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch && embedMatch[1]) {
      videoId = embedMatch[1];
    }
  }

  // Format 4: youtube.com/watch?v=VIDEO_ID
  if (!videoId) {
    const vParam = parsedUrl.searchParams.get('v');
    if (vParam && /^[a-zA-Z0-9_-]{11}$/.test(vParam)) {
      videoId = vParam;
    }
  }

  if (!videoId) {
    return {
      isValid: false,
      error:
        'Không tìm thấy mã video YouTube (Video ID) hợp lệ trong đường dẫn. Vui lòng kiểm tra lại liên kết.'
    };
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=0`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return {
    isValid: true,
    videoId,
    embedUrl,
    watchUrl,
    sourceType
  };
}
