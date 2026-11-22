import { FIREBASE_CONFIG } from './firebaseConfig.js';

// 저장소 어댑터
//  - artifact : Claude 아티팩트로 열렸을 때 (계정별 비공개 저장 + Claude AI)
//  - firebase : 배포 버전 (구글 로그인 + Firestore)
//  - local    : 위 둘이 없을 때 이 브라우저에만 저장
export const EMPTY_STATE = { profile: null, flights: [], trips: {} };
const LS_KEY = 'tierrun:v1';
const clean = (s) => JSON.parse(JSON.stringify({ profile: s.profile ?? null, flights: s.flights ?? [], trips: s.trips ?? {} }));

function localAdapter(note) {
  return {
    mode: 'local',
    note,
    user: null,
    async load() {
      try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? { ...EMPTY_STATE, ...JSON.parse(raw) } : { ...EMPTY_STATE };
      } catch {
        return { ...EMPTY_STATE };
      }
    },
    async save(state) {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(clean(state)));
      } catch {
        /* 저장 불가 환경 */
      }
    },
  };
}

function withTimeout(p, ms) {
  return Promise.race([p, new Promise((r) => setTimeout(() => r(null), ms))]);
}

async function artifactAdapter() {
  const db = await withTimeout(window.claude.use('db'), 10000);
  const user = await withTimeout(window.claude.use('user'), 10000);
  if (!db || !user) return null;
  const id = await user.id();
  if (!id) return null;
  let me = null;
  try {
    me = await user.me();
  } catch {
    me = null;
  }
  const ref = db.doc(`data/users/${id}/state`);
  let chain = Promise.resolve();
  let last = '';
  return {
    mode: 'artifact',
    user: { id, name: me?.name || '', photo: '' },
    async load() {
      const snap = await withTimeout(ref.get(), 10000);
      if (!snap) throw new Error('저장소에 연결하지 못했어요. 잠시 후 다시 열어 주세요.');
      const d = snap.exists ? snap.data() : null;
      const st = d?.json ? JSON.parse(d.json) : d;
      last = st ? JSON.stringify(clean(st)) : '';
      return st ? { ...EMPTY_STATE, ...st } : { ...EMPTY_STATE };
    },
    save(state) {
      const json = JSON.stringify(clean(state));
      if (json === last) return chain;
      last = json;
      chain = chain.then(() => ref.set({ json, updatedAt: new Date().toISOString() })).catch((e) => {
        console.warn('save failed', e);
        throw e;
      });
      return chain;
    },
  };
}

async function firebaseAdapter(cfg) {
  const [{ initializeApp }, auth, fs] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
    import('firebase/firestore'),
  ]);
  const app = initializeApp(cfg);
  const a = auth.getAuth(app);
  const store = fs.getFirestore(app);
  const current = await new Promise((res) => {
    const off = auth.onAuthStateChanged(a, (u) => {
      off();
      res(u);
    });
  });
  const adapter = {
    mode: 'firebase',
    user: current ? { id: current.uid, name: current.displayName || '', photo: current.photoURL || '', email: current.email || '' } : null,
    async signIn() {
      const provider = new auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const r = await auth.signInWithPopup(a, provider);
      adapter.user = { id: r.user.uid, name: r.user.displayName || '', photo: r.user.photoURL || '', email: r.user.email || '' };
      return adapter.user;
    },
    async signOut() {
      await auth.signOut(a);
      adapter.user = null;
    },
    async load() {
      if (!adapter.user) return { ...EMPTY_STATE };
      const snap = await fs.getDoc(fs.doc(store, 'users', adapter.user.id));
      const d = snap.exists() ? snap.data() : null;
      return d?.json ? { ...EMPTY_STATE, ...JSON.parse(d.json) } : { ...EMPTY_STATE };
    },
    async save(state) {
      if (!adapter.user) return;
      await fs.setDoc(fs.doc(store, 'users', adapter.user.id), { json: JSON.stringify(clean(state)), updatedAt: fs.serverTimestamp() });
    },
  };
  return adapter;
}

export async function waitForClaude(ms = 3000) {
  const t0 = Date.now();
  while (!window.claude?.use && Date.now() - t0 < ms) await new Promise((r) => setTimeout(r, 50));
  return !!window.claude?.use;
}

export async function initStore() {
  // 1) Claude 아티팩트 런타임
  if (import.meta.env.VITE_TARGET === 'artifact' || (typeof window !== 'undefined' && window.claude?.use)) {
    if (await waitForClaude()) {
      try {
        const ad = await artifactAdapter();
        if (ad) return ad;
      } catch (e) {
        console.warn(e);
      }
    }
    return localAdapter('로그인 정보가 없어 이 브라우저에만 저장하고 있어요.');
  }
  // 2) 배포 버전: Firebase 설정이 있으면 구글 로그인
  if (import.meta.env.VITE_TARGET !== 'artifact') {
    const env = import.meta.env;
    const cfg = env.VITE_FIREBASE_API_KEY
      ? {
          apiKey: env.VITE_FIREBASE_API_KEY,
          authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: env.VITE_FIREBASE_APP_ID,
        }
      : FIREBASE_CONFIG;
    if (cfg?.apiKey) {
      try {
        return await firebaseAdapter(cfg);
      } catch (e) {
        console.warn('Firebase init failed', e);
      }
    }
  }
  return localAdapter('로그인 없이 이 브라우저에만 저장하고 있어요.');
}

export const GUEST_KEY = 'tierrun:guest';
export function useLocalGuest() {
  return localAdapter('로그인 없이 이 브라우저에만 저장하고 있어요.');
}
