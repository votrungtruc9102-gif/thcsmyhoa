import { UserAccount, AuthSession } from '../types';

const SESSION_KEY = 'myhoa_auth_session_v1';
const USERS_KEY = 'myhoa_users_db_v1';

/**
 * Computes SHA-256 hash of a string using Web Crypto API.
 */
export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validated SHA-256 hash of "myhoa2026":
 * echo -n "myhoa2026" | sha256sum
 * -> 68e3be4b7e2f3199d00cac76e83600a5e6d9bd35374d3e661579d4d6f55ee874
 */
export const DEFAULT_PASSWORD_HASH = '68e3be4b7e2f3199d00cac76e83600a5e6d9bd35374d3e661579d4d6f55ee874';

export const INITIAL_ACCOUNTS: UserAccount[] = [
  // 1. Teachers
  {
    uid: 'u-teacher-demo',
    username: 'teacher',
    email: 'teacher@thcsmyhoa.edu.vn',
    displayName: 'Giáo viên THCS Mỹ Hòa (Tài khoản mẫu)',
    role: 'teacher',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    uid: 'u-teacher-01',
    username: 'giaovien.tin',
    email: 'giaovien.tin@thcsmyhoa.edu.vn',
    displayName: 'Cô Trần Thị Mai (Tổ trưởng Tin học)',
    role: 'teacher',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    uid: 'u-teacher-02',
    username: 'giaovien.toan',
    email: 'giaovien.toan@thcsmyhoa.edu.vn',
    displayName: 'Thầy Nguyễn Văn An (Tổ Toán - Tin)',
    role: 'teacher',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },

  // 2. Students
  {
    uid: 'u-student-demo',
    username: 'student',
    email: 'student@thcsmyhoa.edu.vn',
    displayName: 'Học sinh THCS Mỹ Hòa (Tài khoản mẫu)',
    role: 'student',
    grade: 6,
    className: '6A1',
    avatarSeed: 'studentdemo',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    uid: 'u-student-01',
    username: 'hocsinh.minhquan',
    email: 'hocsinh.minhquan@thcsmyhoa.edu.vn',
    displayName: 'Nguyễn Minh Quân',
    role: 'student',
    grade: 6,
    className: '6A1',
    avatarSeed: 'minhquan',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    uid: 'u-student-02',
    username: 'hocsinh.lan',
    email: 'hocsinh.lan@thcsmyhoa.edu.vn',
    displayName: 'Lê Thị Ngọc Lan',
    role: 'student',
    grade: 7,
    className: '7A3',
    avatarSeed: 'ngoclan',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  }
];

export const authService = {
  /**
   * Retrieves all users from storage.
   * Automatically migrates and synchronizes stale password hashes from localStorage.
   */
  getUsers(): UserAccount[] {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      if (stored) {
        const parsed: UserAccount[] = JSON.parse(stored);
        let hasChanges = false;

        // Synchronize and fix any corrupted or outdated password hashes
        const synchronized = INITIAL_ACCOUNTS.map(initAcc => {
          const existing = parsed.find(
            u => u.uid === initAcc.uid || u.username.toLowerCase() === initAcc.username.toLowerCase()
          );
          if (!existing) {
            hasChanges = true;
            return initAcc;
          }
          if (existing.passwordHash !== initAcc.passwordHash || !existing.email) {
            hasChanges = true;
            return {
              ...existing,
              passwordHash: initAcc.passwordHash,
              email: initAcc.email,
              role: initAcc.role,
              isActive: initAcc.isActive
            };
          }
          return existing;
        });

        // Retain any extra accounts that might have been registered
        parsed.forEach(p => {
          if (!synchronized.some(s => s.uid === p.uid)) {
            synchronized.push(p);
          }
        });

        if (hasChanges) {
          this.saveUsers(synchronized);
        }
        return synchronized;
      }
    } catch {
      // fallback
    }
    this.saveUsers(INITIAL_ACCOUNTS);
    return INITIAL_ACCOUNTS;
  },

  saveUsers(users: UserAccount[]): void {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to storage:', e);
    }
  },

  /**
   * Safe lookup that maps an input (username or email) to a user account.
   */
  findUserByIdentifier(identifier: string): UserAccount | undefined {
    const normalized = identifier.trim().toLowerCase();
    const users = this.getUsers();
    return users.find(
      u => u.username.toLowerCase() === normalized || (u.email && u.email.toLowerCase() === normalized)
    );
  },

  /**
   * Authenticates user by username or email and password.
   * Computes SHA-256 hash of password and matches against trusted record.
   */
  async login(identifierInput: string, passwordInput: string): Promise<UserAccount> {
    const normalizedIdentifier = identifierInput.trim().toLowerCase();
    const trimmedPassword = passwordInput.trim();

    if (!normalizedIdentifier || !trimmedPassword) {
      throw new Error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
    }

    // Hash the password input with SHA-256
    const inputHash = await hashPassword(trimmedPassword);

    // Look up user by username or mapped email
    const user = this.findUserByIdentifier(normalizedIdentifier);

    // Rejection for non-existent user or invalid password hash
    if (!user || user.passwordHash !== inputHash) {
      throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    }

    // Check account active status
    if (!user.isActive) {
      throw new Error('Tài khoản của bạn hiện đang bị vô hiệu hóa. Vui lòng liên hệ nhà trường.');
    }

    // Create session (24h validity) without storing plain password or hash in session
    const session: AuthSession = {
      user: {
        uid: user.uid,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        grade: user.grade,
        className: user.className,
        avatarSeed: user.avatarSeed,
        isActive: user.isActive,
        passwordHash: '', // Never store password hash in active session memory
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token: 'jwt-auth-' + Math.random().toString(36).substring(2) + Date.now().toString(36),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save session:', e);
    }

    return session.user;
  },

  /**
   * Retrieves active session if valid and not expired.
   */
  getCurrentUser(): UserAccount | null {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (!stored) return null;
      const session: AuthSession = JSON.parse(stored);
      if (!session || !session.user) return null;

      if (Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }
      return session.user;
    } catch {
      return null;
    }
  },

  logout(): void {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
  },

  isTeacher(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.role === 'teacher' && user.isActive === true;
  },

  isStudent(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.role === 'student' && user.isActive === true;
  }
};
