import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_TEXTBOOKS } from './src/data/mockTextbooks.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.resolve(__dirname, 'data');
const TEXTBOOKS_FILE = path.join(DATA_DIR, 'textbooks.json');

// Ensure data folder and textbooks file exist with initial persistent data
function initDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(TEXTBOOKS_FILE)) {
    fs.writeFileSync(TEXTBOOKS_FILE, JSON.stringify(INITIAL_TEXTBOOKS, null, 2), 'utf-8');
    console.log('[Storage] Initialized data/textbooks.json with official curriculum data.');
  }
}

function readTextbooks(): any[] {
  try {
    initDataStore();
    const raw = fs.readFileSync(TEXTBOOKS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage] Error reading textbooks.json:', err);
    return INITIAL_TEXTBOOKS;
  }
}

function writeTextbooks(books: any[]): boolean {
  try {
    initDataStore();
    fs.writeFileSync(TEXTBOOKS_FILE, JSON.stringify(books, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Storage] Error writing textbooks.json:', err);
    return false;
  }
}

function isValidHttpUrl(str: string): boolean {
  try {
    const url = new URL(str.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

async function startServer() {
  initDataStore();
  const app = express();

  app.use(express.json({ limit: '10mb' }));

  // =========================================================================
  // REST API: SÁCH GIÁO KHOA (TEXTBOOKS)
  // BẢO ĐẢM LƯU TRỮ VÀ TRUY VẤN NGUYÊN VẸN 100% URL ĐẦY ĐỦ
  // =========================================================================

  // GET: Lấy danh sách SGK
  app.get('/api/textbooks', (_req: Request, res: Response) => {
    const books = readTextbooks();
    res.json(books);
  });

  // GET: Kiểm tra xem URL nguồn có hỗ trợ nhúng iframe hay chặn (X-Frame-Options / CSP)
  app.get('/api/check-embed', async (req: Request, res: Response) => {
    const rawUrl = req.query.url ? String(req.query.url).trim() : '';
    if (!rawUrl || !isValidHttpUrl(rawUrl)) {
      return res.json({ canEmbed: false, reason: 'invalid_url' });
    }

    try {
      const parsed = new URL(rawUrl);
      const host = parsed.hostname.toLowerCase();

      // Danh sách các cổng giáo dục đã xác định thiết lập chặn iframe
      const knownBlockedHosts = [
        'taphuan.nxbgd.vn',
        'hanhtrangso.nxbgd.vn',
        'hoc10.vn',
        'nxbgd.vn',
        'moet.gov.vn',
        'sachmem.vn',
        'olm.vn',
        'violet.vn'
      ];

      if (knownBlockedHosts.some(d => host === d || host.endsWith('.' + d))) {
        return res.json({
          canEmbed: false,
          reason: 'known_blocked_domain',
          domain: host
        });
      }

      // Thử kiểm tra HEAD request với timeout 2.5 giây
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const headRes = await fetch(rawUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        redirect: 'follow'
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (!headRes) {
        return res.json({ canEmbed: false, reason: 'unreachable_or_timeout' });
      }

      const xFrame = headRes.headers.get('x-frame-options');
      if (xFrame) {
        const val = xFrame.toUpperCase();
        if (val.includes('DENY') || val.includes('SAMEORIGIN') || val.includes('ALLOW-FROM')) {
          return res.json({ canEmbed: false, reason: 'x_frame_options', value: xFrame });
        }
      }

      const csp = headRes.headers.get('content-security-policy');
      if (csp) {
        const cspVal = csp.toLowerCase();
        if (cspVal.includes('frame-ancestors') && !cspVal.includes('frame-ancestors *')) {
          return res.json({ canEmbed: false, reason: 'csp_frame_ancestors', value: csp });
        }
      }

      return res.json({ canEmbed: true });
    } catch {
      return res.json({ canEmbed: false, reason: 'error_evaluating' });
    }
  });

  // POST: Thêm mới SGK
  app.post('/api/textbooks', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.title || !body.bookUrl) {
      return res.status(400).json({ error: 'Tên sách và Đường link SGK (URL) là bắt buộc.' });
    }

    const rawUrl = String(body.bookUrl).trim();
    if (!isValidHttpUrl(rawUrl)) {
      return res.status(400).json({ error: 'Đường link SGK không hợp lệ. URL phải bắt đầu bằng http:// hoặc https://.' });
    }

    const books = readTextbooks();
    const existingIndex = books.findIndex(
      (b: any) => (body.id && b.id === body.id) || (Number(b.grade) === Number(body.grade) && b.subjectId === body.subjectId)
    );

    if (existingIndex !== -1) {
      // Cập nhật bản ghi hiện có, bảo toàn ID và thay thế toàn bộ URL
      const updatedBook = {
        ...books[existingIndex],
        ...body,
        id: books[existingIndex].id,
        grade: Number(body.grade) || books[existingIndex].grade,
        title: String(body.title).trim(),
        bookUrl: rawUrl,
        updatedAt: new Date().toISOString()
      };
      books[existingIndex] = updatedBook;
      writeTextbooks(books);
      console.log(`[API] Updated existing textbook for Grade ${updatedBook.grade} / ${updatedBook.subjectId}: "${updatedBook.title}" (URL length: ${updatedBook.bookUrl.length})`);
      return res.status(200).json(updatedBook);
    }

    const newBook = {
      id: body.id || `sgk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      grade: Number(body.grade) || 6,
      subjectId: body.subjectId || 'tin-hoc',
      subjectName: body.subjectName || '',
      bookSet: body.bookSet || 'Kết nối tri thức với cuộc sống',
      title: String(body.title).trim(),
      // BẢO TOÀN NGUYÊN VẸN URL ĐẦY ĐỦ - KHÔNG CẮT NGẮN, KHÔNG THAY ĐỔI QUERY
      bookUrl: rawUrl,
      embedUrl: body.embedUrl ? String(body.embedUrl).trim() : undefined,
      coverUrl: body.coverUrl ? String(body.coverUrl).trim() : '',
      description: body.description ? String(body.description).trim() : '',
      status: body.status === 'hidden' ? 'hidden' : 'published',
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: body.createdBy || 'Giáo viên THCS Mỹ Hòa'
    };

    books.unshift(newBook);
    writeTextbooks(books);
    console.log(`[API] Added textbook: "${newBook.title}" (URL length: ${newBook.bookUrl.length} chars)`);
    return res.status(201).json(newBook);
  });

  // PUT: Cập nhật thông tin SGK
  app.put('/api/textbooks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const books = readTextbooks();
    const index = books.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Không tìm thấy sách giáo khoa với mã yêu cầu.' });
    }

    const rawUrl = body.bookUrl ? String(body.bookUrl).trim() : books[index].bookUrl;
    if (!isValidHttpUrl(rawUrl)) {
      return res.status(400).json({ error: 'Đường link SGK không hợp lệ. URL phải bắt đầu bằng http:// hoặc https://.' });
    }

    const updatedBook = {
      ...books[index],
      ...body,
      // BẢO TOÀN NGUYÊN VẸN URL MỚI - THAY THẾ TOÀN BỘ CHUỖI CŨ BẰNG CHUỖI MỚI
      bookUrl: rawUrl,
      updatedAt: new Date().toISOString()
    };

    books[index] = updatedBook;
    writeTextbooks(books);
    console.log(`[API] Updated textbook: "${updatedBook.title}" (URL length: ${updatedBook.bookUrl.length} chars)`);
    return res.json(updatedBook);
  });

  // PATCH: Chuyển đổi trạng thái Công khai / Ẩn
  app.patch('/api/textbooks/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const books = readTextbooks();
    const index = books.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Không tìm thấy sách giáo khoa.' });
    }

    const newStatus = status === 'published' ? 'published' : 'hidden';
    books[index].status = newStatus;
    books[index].updatedAt = new Date().toISOString();
    writeTextbooks(books);
    return res.json({ id, status: newStatus });
  });

  // DELETE: Xóa SGK
  app.delete('/api/textbooks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const books = readTextbooks();
    const filtered = books.filter((b: any) => b.id !== id);
    if (filtered.length === books.length) {
      return res.status(404).json({ error: 'Không tìm thấy sách giáo khoa cần xóa.' });
    }
    writeTextbooks(filtered);
    console.log(`[API] Deleted textbook: ${id}`);
    return res.json({ success: true, id });
  });

  // =========================================================================
  // VITE DEV SERVER MIDDLEWARE MOUNTING
  // =========================================================================
  const isProd = process.env.NODE_ENV === 'production';
  const distPath = path.resolve(__dirname, 'dist');

  if (!isProd || !fs.existsSync(distPath)) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 THCS Mỹ Hòa Backend & Client Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
