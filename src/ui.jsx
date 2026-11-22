import { useEffect, useMemo, useRef, useState } from 'react';
import { AIRLINE, RATE_STOPS } from './skypass.js';
import { findAirport, searchAirports } from './airports.js';

const P = {
  plane: 'M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V8.5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-5z',
  close: 'M6 6l12 12M18 6L6 18',
  back: 'M15 5l-7 7 7 7',
  chev: 'M9 6l6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  list: 'M4 6h16M4 12h16M4 18h10',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-9 9h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  medal: 'M8 3h8l-2 6h-4zM12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-8.5l1.1 2.2 2.4.3-1.8 1.6.5 2.4-2.2-1.2-2.2 1.2.5-2.4-1.8-1.6 2.4-.3z',
  won: 'M4 7l3.5 11L11 9h2l3.5 9L20 7M3.5 11h17M4.5 14h15',
  swap: 'M7 7h11l-3-3M17 17H6l3 3',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  trash: 'M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13',
  edit: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  fit: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-5v-5m0-3h.01',
  cloud: 'M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z',
  copy: 'M9 9h10v10H9zM5 15V5h10',
};
export function Icon({ name, size = 20, stroke = 2, fill = false, ...rest }) {
  const isFill = fill || name === 'plane';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={isFill ? 'currentColor' : 'none'} stroke={isFill ? 'none' : 'currentColor'} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d={P[name]} />
    </svg>
  );
}

export function AirlineMark({ code, size }) {
  const a = AIRLINE[code];
  return (
    <span className={`mark ${size === 'sm' ? 'sm' : ''}`} style={{ background: a?.color || '#6b7489' }} title={a?.name || code}>
      {code || '?'}
    </span>
  );
}

export function Bar({ conf = 0, plan = 0, thin, done }) {
  const c = Math.max(0, Math.min(1, conf)) * 100;
  const p = Math.max(0, Math.min(1, conf + plan)) * 100;
  return (
    <div className={`bar ${thin ? 'thin' : ''}`} role="img" aria-label={`확정 ${Math.round(c)}%, 예정 포함 ${Math.round(p)}%`}>
      {p > c && <i className="plan" style={{ width: `${p}%` }} />}
      <i className={`conf ${done ? 'done' : ''}`} style={{ width: `${c}%` }} />
    </div>
  );
}

export function Ring({ conf, all, children, size = 148, color }) {
  const r = 42, C = 2 * Math.PI * r;
  const c = Math.max(0, Math.min(1, conf)), a = Math.max(0, Math.min(1, all));
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <defs>
          <pattern id="rstripe" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="var(--sky-200)" />
            <rect width="3" height="6" fill="var(--sky)" opacity=".55" />
          </pattern>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--bg-2)" strokeWidth="11" />
        {a > c && <circle cx="50" cy="50" r={r} fill="none" stroke="url(#rstripe)" strokeWidth="11" strokeDasharray={`${a * C} ${C}`} strokeLinecap="round" />}
        <circle cx="50" cy="50" r={r} fill="none" stroke={color || 'var(--ink)'} strokeWidth="11" strokeDasharray={`${Math.max(c * C, c > 0 ? 0.01 : 0)} ${C}`} strokeLinecap="round" />
      </svg>
      <div className="c">{children}</div>
    </div>
  );
}

// 적립률 슬라이더: 정해진 눈금 + 직접 입력
export function RateSlider({ value, onChange }) {
  const v = value == null || value === '' ? 100 : +value;
  const idx = useMemo(() => {
    let best = 0;
    RATE_STOPS.forEach((s, i) => {
      if (Math.abs(s - v) < Math.abs(RATE_STOPS[best] - v)) best = i;
    });
    return best;
  }, [v]);
  const custom = !RATE_STOPS.includes(v);
  const [text, setText] = useState(String(v));
  useEffect(() => setText(String(v)), [v]);
  const pct = (idx / (RATE_STOPS.length - 1)) * 100;
  return (
    <div className="rate">
      <div className="top">
        <span className="lab">적립률 {custom && <span className="custom-tag">· 직접 입력</span>}</span>
        <label className="rate-num">
          <input
            inputMode="decimal"
            aria-label="적립률 직접 입력"
            value={text}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              const t = e.target.value.replace(/[^0-9.]/g, '');
              setText(t);
              if (t !== '' && !Number.isNaN(+t)) onChange(Math.min(300, +t));
            }}
            onBlur={() => setText(String(v))}
          />
          <b>%</b>
        </label>
      </div>
      <input type="range" min={0} max={RATE_STOPS.length - 1} step={1} value={idx} style={{ '--p': `${pct}%` }} aria-label="적립률" onChange={(e) => onChange(RATE_STOPS[+e.target.value])} />
      <div className="ticks">
        {RATE_STOPS.map((s) => (
          <button type="button" key={s} className={s === v ? 'on' : ''} onClick={() => onChange(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AirportInput({ label, value, onChange, autoFocus }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef(null);
  const ap = findAirport(value);
  const results = useMemo(() => searchAirports(q, 8), [q]);
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', h);
    return () => document.removeEventListener('pointerdown', h);
  }, []);
  const pick = (a) => {
    onChange(a.code);
    setQ('');
    setOpen(false);
  };
  return (
    <label className="field ap-pick" ref={ref}>
      <span>{label}</span>
      <input
        className="input"
        autoFocus={autoFocus}
        placeholder="도시·공항·코드"
        value={open ? q : ap ? `${ap.code} ${ap.city}` : value || ''}
        onFocus={() => {
          setOpen(true);
          setQ('');
          setHi(0);
        }}
        onChange={(e) => {
          setQ(e.target.value);
          setHi(0);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') setHi((h) => Math.min(h + 1, results.length - 1));
          else if (e.key === 'ArrowUp') setHi((h) => Math.max(h - 1, 0));
          else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[hi]) pick(results[hi]);
            else if (/^[A-Za-z]{3}$/.test(q)) {
              onChange(q.toUpperCase());
              setOpen(false);
            }
          } else if (e.key === 'Escape') setOpen(false);
        }}
        onBlur={() => {
          if (/^[A-Za-z]{3}$/.test(q) && !results.length) onChange(q.toUpperCase());
        }}
      />
      {open && results.length > 0 && (
        <div className="ap-menu" role="listbox">
          {results.map((a, i) => (
            <button type="button" key={a.code} className={i === hi ? 'hi' : ''} onPointerDown={(e) => e.preventDefault()} onClick={() => pick(a)}>
              <b>{a.code}</b>
              <span>{a.city}</span>
              <small>{a.name}</small>
            </button>
          ))}
        </div>
      )}
    </label>
  );
}

export function WonInput({ value, onChange, placeholder = '0', ...rest }) {
  const shown = value == null || value === '' ? '' : Number(value).toLocaleString('ko-KR');
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', fontWeight: 700 }}>₩</span>
      <input
        className="input num"
        inputMode="numeric"
        style={{ paddingLeft: 28, fontWeight: 700 }}
        placeholder={placeholder}
        value={shown}
        onChange={(e) => {
          const d = e.target.value.replace(/[^0-9]/g, '');
          onChange(d === '' ? null : +d);
        }}
        {...rest}
      />
    </div>
  );
}

export function NumInput({ value, onChange, suffix, ...rest }) {
  const shown = value == null || value === '' ? '' : Number(value).toLocaleString('ko-KR');
  return (
    <div style={{ position: 'relative' }}>
      <input
        className="input num"
        inputMode="numeric"
        style={{ fontWeight: 700, paddingRight: suffix ? 44 : 12 }}
        value={shown}
        onChange={(e) => {
          const d = e.target.value.replace(/[^0-9]/g, '');
          onChange(d === '' ? null : +d);
        }}
        {...rest}
      />
      {suffix && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', fontWeight: 700, fontSize: 13 }}>{suffix}</span>}
    </div>
  );
}

export function Seg({ options, value, onChange, small, light }) {
  return (
    <div className={`seg ${small ? 'small' : ''} ${light ? 'light' : ''}`} role="tablist">
      {options.map(([v, l]) => (
        <button type="button" role="tab" aria-selected={v === value} key={v} className={v === value ? 'on' : ''} onClick={() => onChange(v)}>
          {l}
        </button>
      ))}
    </div>
  );
}

export function Avatar({ user, name, onClick }) {
  const n = (user?.name || name || '').trim();
  return (
    <button className="avatar" onClick={onClick} aria-label="내 정보·설정">
      {user?.photo ? <img src={user.photo} alt="" referrerPolicy="no-referrer" /> : n ? n.slice(0, 1) : <Icon name="user" size={18} />}
    </button>
  );
}
