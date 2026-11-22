import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { initStore, EMPTY_STATE, useLocalGuest } from './store.js';
import { aiAvailable } from './ai.js';
import { computeGoals, costStats, todayISO, sortFlights, earnedMiles, fmtNum } from './core.js';
import { sampleState } from './sample.js';
import Globe from './Globe.jsx';
import FlightForm from './FlightForm.jsx';
import ImportFlighty from './ImportFlighty.jsx';
import Settings, { emptyProfile } from './Settings.jsx';
import { FlightsView, DetailView, TierView, CostView, Head, MapStrip } from './views.jsx';
import { Icon, Avatar } from './ui.jsx';

function useMedia(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const h = () => setM(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, [q]);
  return m;
}
function useWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

const GoogleG = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

export default function App() {
  const [ad, setAd] = useState(null);
  const [phase, setPhase] = useState('boot');
  const [bootErr, setBootErr] = useState('');
  const [state, setState] = useState(EMPTY_STATE);
  const [tab, setTab] = useState('flights');
  const [stack, setStack] = useState(null);
  const [sel, setSel] = useState(null);
  const [today, setToday] = useState(todayISO());
  const [aiOk, setAiOk] = useState(false);
  const [toast, setToast] = useState(null);
  const mobile = useMedia('(max-width: 719px)');
  const vw = useWidth();
  const loaded = useRef(false);
  const scrollRef = useRef(null);

  const say = useCallback((t, undo) => {
    setToast(undo ? { text: t, undo } : t);
    clearTimeout(say.t);
    say.t = setTimeout(() => setToast(null), undo ? 5000 : 2600);
  }, []);

  const loadFrom = async (a) => {
    try {
      const s0 = await a.load();
      // 아시아나 편은 대한항공 실적으로 (예전에 '제휴'로 저장된 것 고침)
      const s = { ...s0, flights: (s0.flights || []).map((f) => (f.airline === 'OZ' && f.credit === 'OT' ? { ...f, credit: 'KE' } : f)) };
      setState(s);
      loaded.current = true;
      setPhase('ready');
      aiAvailable().then(setAiOk).catch(() => setAiOk(false));
    } catch (e) {
      setBootErr(e.message || '불러오지 못했어요.');
      setPhase('error');
    }
  };

  useEffect(() => {
    (async () => {
      const a = await initStore();
      setAd(a);
      if (a.mode === 'firebase' && !a.user) return setPhase('login');
      loadFrom(a);
    })();
    const iv = setInterval(() => setToday(todayISO()), 60000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 저장 (변경 후 잠시 뒤 한 번)
  useEffect(() => {
    if (!loaded.current || !ad) return;
    const t = setTimeout(() => {
      Promise.resolve(ad.save(state)).catch(() => say('저장하지 못했어요. 연결을 확인해 주세요.'));
    }, 450);
    return () => clearTimeout(t);
  }, [state, ad, say]);

  const profile = state.profile;
  const flights = state.flights;
  const trips = state.trips;
  const goals = useMemo(() => computeGoals(profile || emptyProfile(), flights, today), [profile, flights, today]);
  const stats = useMemo(() => costStats(flights, trips), [flights, trips]);
  const ctx = { flights, trips, profile, today, user: ad?.user };

  const open = (id) => {
    setSel(id);
    setStack({ name: 'detail', id });
    scrollRef.current?.scrollTo?.(0, 0);
  };
  const close = () => {
    setStack(null);
    if (!mobile) setSel(null);
  };
  const addNew = () => setStack({ name: 'form' });
  const editTrip = (f) => setStack({ name: 'form', tripId: f.tripId, flightId: f.id });

  const saveTrip = ({ trip, flights: fl, removedIds }) => {
    setState((s) => ({
      ...s,
      trips: { ...s.trips, [trip.id]: trip },
      flights: [...s.flights.filter((f) => f.tripId !== trip.id && !removedIds.includes(f.id)), ...fl],
    }));
    const first = sortFlights(fl)[0];
    say(`${fl.length}개 구간 저장 · ${fmtNum(fl.reduce((a, f) => a + earnedMiles(f), 0))}마일`);
    if (first) open(first.id);
    else close();
  };
  const deleteFlight = (id) => {
    setState((s) => {
      const f = s.flights.find((x) => x.id === id);
      const rest = s.flights.filter((x) => x.id !== id);
      const trips2 = { ...s.trips };
      if (f?.tripId && !rest.some((x) => x.tripId === f.tripId)) delete trips2[f.tripId];
      return { ...s, flights: rest, trips: trips2 };
    });
    setSel(null);
    setStack(null);
    say('삭제했어요');
  };
  // 목록에서 밀어서 삭제 (되돌리기 가능)
  const swipeDelete = (id) => {
    const f = state.flights.find((x) => x.id === id);
    if (!f) return;
    const trip = f.tripId ? state.trips[f.tripId] : null;
    setState((s) => {
      const rest = s.flights.filter((x) => x.id !== id);
      const trips2 = { ...s.trips };
      if (f.tripId && trips2[f.tripId]) {
        const left = rest.filter((x) => x.tripId === f.tripId);
        if (!left.length) delete trips2[f.tripId];
        else if (left.length === 1) trips2[f.tripId] = { ...trips2[f.tripId], kind: 'oneway' };
      }
      return { ...s, flights: rest, trips: trips2 };
    });
    if (sel === id) setSel(null);
    say(`${f.airline} ${f.flightNo} 삭제했어요`, () => {
      setState((s) => ({ ...s, flights: s.flights.some((x) => x.id === f.id) ? s.flights : [...s.flights, f], trips: trip ? { ...s.trips, [trip.id]: trip } : s.trips }));
      setToast(null);
    });
  };
  const importFlights = (fl) => {
    setState((s) => {
      const trips2 = { ...s.trips };
      for (const f of fl) trips2[f.tripId] = { id: f.tripId, kind: 'oneway', priceMode: 'each', price: null };
      return { ...s, flights: [...s.flights, ...fl], trips: trips2 };
    });
    setStack(null);
    setTab('flights');
    say(`${fl.length}편을 가져왔어요 · ${fmtNum(fl.reduce((a, f) => a + earnedMiles(f), 0))}마일`);
  };
  const deleteTrip = (tripId) => {
    setState((s) => {
      const trips2 = { ...s.trips };
      delete trips2[tripId];
      return { ...s, flights: s.flights.filter((f) => f.tripId !== tripId), trips: trips2 };
    });
    setSel(null);
    setStack(null);
    say('여정을 삭제했어요');
  };
  const loadSample = () => {
    const s = sampleState(today);
    setState((cur) => ({ profile: cur.profile && !cur.profile.sample ? cur.profile : s.profile, flights: s.flights, trips: s.trips }));
    setStack(null);
    setTab('flights');
    say('예시 데이터를 불러왔어요');
  };
  const clearSample = () => {
    setState({ profile: null, flights: [], trips: {} });
    setStack(null);
  };

  if (phase === 'boot') return <div className="loading"><span className="spin" />불러오는 중…</div>;
  if (phase === 'error') return <div className="loading"><p>{bootErr}</p></div>;
  if (phase === 'login') {
    return (
      <div className="login">
        <div className="box">
          <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" style={{ justifySelf: 'center' }}>
            <circle cx="32" cy="32" r="28" fill="var(--sky-soft)" />
            <path d="M10 40 Q32 6 54 40" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="10" cy="40" r="4" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="54" cy="40" r="4" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          </svg>
          <h1>티어런</h1>
          <p>모닝캄부터 밀리언 마일러까지,<br />탈 때마다 쌓이는 대한항공 등급 진행률을 한눈에.</p>
          <button
            className="gbtn"
            onClick={async () => {
              try {
                await ad.signIn();
                setPhase('boot');
                loadFrom(ad);
              } catch (e) {
                say(e?.code === 'auth/popup-closed-by-user' ? '로그인을 취소했어요' : '로그인하지 못했어요');
              }
            }}
          >
            <GoogleG />Google 계정으로 계속하기
          </button>
          <button
            className="btn ghost"
            onClick={() => {
              const g = useLocalGuest();
              setAd(g);
              loadFrom(g);
            }}
          >
            로그인 없이 써 보기
          </button>
          <p className="help">대한항공과 관계없는 개인 기록용 서비스예요. 로그인하면 항공편과 설정이 계정에 저장돼 어느 기기에서나 이어서 볼 수 있어요.</p>
        </div>
        {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  const setupNeeded = !profile;
  const view = setupNeeded ? { name: 'settings', setup: true } : stack;
  const panelW = Math.min(420, Math.max(340, vw * 0.31));
  const onMap = mobile && tab === 'map' && !view;
  const selFlight = (sel && flights.find((f) => f.id === sel)) || sortFlights(flights).find((f) => f.date >= today) || sortFlights(flights).at(-1) || null;
  const avatar = <Avatar user={ad?.user} name={profile?.name} onClick={() => setStack({ name: 'settings' })} />;
  const banner =
    profile?.sample ? (
      <div className="banner"><Icon name="info" size={16} />예시 데이터를 보고 있어요.<button className="link" style={{ marginLeft: 'auto' }} onClick={clearSample}>지우고 시작</button></div>
    ) : ad?.mode === 'local' ? (
      <div className="banner"><Icon name="cloud" size={16} />{ad.note}</div>
    ) : null;

  let content;
  if (view?.name === 'settings') {
    content = (
      <Settings
        key={view.setup ? 'setup' : 'settings'}
        profile={profile}
        user={ad?.user}
        mode={ad?.mode}
        note={ad?.note}
        isSetup={!!view.setup}
        hasFlights={flights.length > 0}
        onSave={(p) => {
          setState((s) => ({ ...s, profile: p }));
          setStack(null);
          say(view.setup ? '설정 완료! 항공편을 추가해 보세요' : '저장했어요');
        }}
        onClose={() => setStack(null)}
        onSample={loadSample}
        onFlighty={() => setStack({ name: 'import' })}
        onExport={() => JSON.stringify({ app: 'tierrun', v: 1, ...state })}
        onImport={(txt) => {
          try {
            const d = JSON.parse(txt);
            if (!Array.isArray(d.flights)) return false;
            setState({ profile: d.profile || profile, flights: d.flights, trips: d.trips || {} });
            return true;
          } catch {
            return false;
          }
        }}
        onReset={() => {
          setState({ profile: null, flights: [], trips: {} });
          setStack(null);
        }}
        onSignOut={async () => {
          await ad.signOut();
          loaded.current = false;
          setState(EMPTY_STATE);
          setStack(null);
          setPhase('login');
        }}
      />
    );
  } else if (view?.name === 'import') {
    content = <ImportFlighty ctx={ctx} onImport={importFlights} onClose={() => setStack(null)} onSettings={() => setStack({ name: 'settings' })} />;
  } else if (view?.name === 'form') {
    const tripFl = view.tripId ? sortFlights(flights.filter((f) => f.tripId === view.tripId)) : view.flightId ? flights.filter((f) => f.id === view.flightId) : null;
    content = (
      <FlightForm
        key={view.tripId || 'new'}
        initial={tripFl?.length ? { trip: trips[view.tripId] || null, flights: tripFl } : null}
        today={today}
        aiOk={aiOk}
        myFlights={flights}
        onSave={saveTrip}
        onCancel={() => (view.flightId ? open(view.flightId) : setStack(null))}
        onDeleteTrip={() => deleteTrip(view.tripId)}
      />
    );
  } else if (view?.name === 'detail') {
    const f = flights.find((x) => x.id === view.id);
    content = f ? (
      <DetailView key={f.id} f={f} ctx={ctx} mobile={mobile} onClose={close} onEdit={() => editTrip(f)} onDelete={deleteFlight} onOpen={open} />
    ) : (
      <div className="empty"><p>항공편을 찾을 수 없어요.</p><button className="btn" onClick={close}>돌아가기</button></div>
    );
  } else if (tab === 'tier') {
    content = <TierView ctx={ctx} goals={goals} stats={stats} head={<Head title="등급 현황" right={avatar} />} onSettings={() => setStack({ name: 'settings' })} />;
  } else if (tab === 'cost') {
    content = <CostView ctx={ctx} goals={goals} stats={stats} head={<Head title="마일당 단가" right={avatar} />} onOpen={open} />;
  } else {
    content = (
      <FlightsView
        ctx={ctx}
        goals={goals}
        selectedId={sel}
        onOpen={open}
        onAdd={addNew}
        onSample={loadSample}
        onFlighty={() => setStack({ name: 'import' })}
        onDelete={swipeDelete}
        onTier={() => setTab('tier')}
        banner={banner}
        head={<Head title="내 항공편" right={avatar} />}
      />
    );
  }

  const tabsDef = mobile
    ? [['flights', '항공편', 'list'], ['map', '지도', 'globe'], ['tier', '등급', 'medal'], ['cost', '단가', 'won']]
    : [['flights', '내 항공편', 'list'], ['tier', '등급 현황', 'medal'], ['cost', '마일당 단가', 'won']];
  const tabbar = !view && (
    <nav className="tabbar" aria-label="메인 메뉴">
      <div className="tabs">
        {tabsDef.map(([id, label, icon]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => { setTab(id); scrollRef.current?.scrollTo?.(0, 0); }} aria-current={tab === id ? 'page' : undefined}>
            <Icon name={icon} size={21} />
            {label}
          </button>
        ))}
      </div>
      <button className="fab" onClick={addNew} aria-label="항공편 추가"><Icon name="plus" size={26} stroke={2.4} /></button>
    </nav>
  );

  const showGlobe = !mobile || onMap;
  return (
    <div className={`app ${mobile ? 'mob' : 'desk'} ${onMap ? 'on-map' : ''}`}>
      {showGlobe && (
        <div className="map-layer" id="map">
          <Globe
            flights={flights}
            selectedId={sel}
            onSelect={(id) => (mobile ? setSel(id) : open(id))}
            insetLeft={mobile ? 0 : panelW + 32}
            insetBottom={mobile ? 170 : 0}
            today={today}
            fitKey={flights.length}
          />
          <div className="map-ctrls" style={mobile ? { top: 'calc(14px + env(safe-area-inset-top))' } : null}>
            <button onClick={() => document.querySelector('#map .globe').__globe?.zoom(1.6)} aria-label="확대"><Icon name="plus" size={18} /></button>
            <button onClick={() => document.querySelector('#map .globe').__globe?.zoom(1 / 1.6)} aria-label="축소"><Icon name="minus" size={18} /></button>
            <button onClick={() => { setSel(null); document.querySelector('#map .globe').__globe?.fit(); }} aria-label="전체 노선 보기"><Icon name="fit" size={18} /></button>
          </div>
        </div>
      )}
      <aside className="panel" aria-label="항공편 패널">
        <div className={`scroll ${view ? 'no-tabs' : ''}`} ref={scrollRef}>{content}</div>
        {!mobile && tabbar}
      </aside>
      {mobile && tabbar}
      {onMap && selFlight && <MapStrip ctx={ctx} selId={selFlight.id} onSel={setSel} onOpen={open} />}
      {onMap && !flights.length && (
        <div className="map-card" style={{ padding: 16 }}>
          <p style={{ margin: 0 }} className="muted">항공편을 추가하면 노선이 지구본에 그려져요.</p>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          {typeof toast === 'string' ? toast : <>{toast.text}<button className="toast-undo" onClick={toast.undo}>되돌리기</button></>}
        </div>
      )}
    </div>
  );
}
