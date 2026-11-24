import { useEffect, useMemo, useState } from 'react';
import { TIER, CABIN, AIRLINE } from './skypass.js';
import { fmtDate, fmtDot, fmtNum, daysBetween } from './core.js';
import { findAirport } from './airports.js';
import { Icon, AirlineMark, Bar } from './ui.jsx';
import { inviteLink, flightKey } from './social.js';

const city = (c) => findAirport(c)?.city || c || '?';

export function FriendFace({ fr, size = 40 }) {
  const n = (fr?.name || '').trim();
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38 }} aria-hidden="true">
      {fr?.photo ? <img src={fr.photo} alt="" referrerPolicy="no-referrer" /> : n ? n.slice(0, 1) : <Icon name="user" size={size * 0.45} />}
    </span>
  );
}

const pct = (x) => `${Math.floor((x || 0) * 1000) / 10}%`;
const nextUp = (fr, today) => (fr.upcoming || []).find((u) => u.date >= today);

// 친구 한 줄: 사진·이름, 등급 칩, 다음 등급 진행률, 다음 항공편
export function FriendRow({ fr, ctx, onClick, right }) {
  const t = TIER[fr.tier] || TIER.SKYPASS;
  const g = fr.goal;
  const nx = nextUp(fr, ctx.today);
  const mine = useMemo(() => new Set(ctx.flights.filter((f) => f.date >= ctx.today).map(flightKey)), [ctx.flights, ctx.today]);
  const withMe = (fr.upcoming || []).filter((u) => u.date >= ctx.today && mine.has(flightKey(u))).length;
  return (
    <div className="fr-row">
      <button className="fr-main" onClick={onClick}>
        <FriendFace fr={fr} />
        <span className="fr-mid">
          <span className="fr-top">
            <b>{fr.name || '이름 없음'}</b>
            <span className="tier-chip" style={{ background: t.bg, color: t.ink }}>{t.name}</span>
          </span>
          {fr.missing ? (
            <span className="fr-sub">아직 티어런 정보가 올라오지 않았어요</span>
          ) : g ? (
            <>
              <span className="fr-sub num">{g.title} <b>{pct(g.conf)}</b>{g.remMi ? ` · ${fmtNum(g.remMi)}마일 남음` : ''}</span>
              <Bar conf={g.conf} plan={Math.max(0, g.all - g.conf)} thin done={g.done} />
            </>
          ) : (
            <span className="fr-sub">최고 등급이에요</span>
          )}
          {nx && (
            <span className="fr-sub num">
              다음 비행 {fmtDate(nx.date, { weekday: false })} · {city(nx.from)} → {city(nx.to)}
              {withMe > 0 && <span className="badge together" style={{ marginLeft: 6 }}><Icon name="user" size={12} />같이 가요{withMe > 1 ? ` ${withMe}편` : ''}</span>}
            </span>
          )}
        </span>
      </button>
      {right}
    </div>
  );
}

// 등급 탭 안의 친구 섹션
export function FriendsSection({ ctx, box }) {
  useEffect(() => { box.onMount?.(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const list = ctx.friends || [];
  return (
    <>
      <div className="section-h">
        <span>친구</span>
        {box.on && <button className="link" onClick={box.onFriends}>{list.length ? '친구 관리·초대' : '친구 초대'}</button>}
      </div>
      {!box.on ? (
        <p className="muted" style={{ margin: '0 20px', fontSize: 14 }}>Google로 로그인하면 친구와 등급·다가오는 항공편을 함께 볼 수 있어요.</p>
      ) : box.err ? (
        <div className="notice" style={{ margin: '0 16px' }}>{box.err}</div>
      ) : list.length ? (
        <div className="card fr-card">{list.map((fr) => <FriendRow key={fr.uid} fr={fr} ctx={ctx} onClick={() => box.onOpen(fr.uid)} />)}</div>
      ) : (
        <div className="pad">
          <button className="card fr-empty" onClick={box.onFriends}>
            <Icon name="plus" size={18} />
            <span><b>친구 초대하기</b><br /><span className="muted">링크를 보내면 열자마자 친구가 돼요. 서로의 등급과 다가오는 항공편을 볼 수 있어요.</span></span>
          </button>
        </div>
      )}
    </>
  );
}

// 친구 관리: 초대 링크 + 목록(삭제)
export function FriendsView({ ctx, social, err, invite, onOpen, onRemove, onReset, onRefresh, onClose, say }) {
  const [confirm, setConfirm] = useState(null);
  const [resetAsk, setResetAsk] = useState(false);
  const link = invite ? inviteLink(invite) : '';
  const list = ctx.friends || [];
  const name = ctx.profile?.name || ctx.user?.name || '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      say('초대 링크를 복사했어요');
    } catch {
      say('복사하지 못했어요. 링크를 길게 눌러 복사해 주세요');
    }
  };
  const share = async () => {
    try {
      await navigator.share({ title: '티어런 친구 초대', text: `${name ? `${name}님이 ` : ''}티어런에서 친구 초대를 보냈어요. 열면 바로 친구가 돼요.`, url: link });
    } catch { /* 취소 */ }
  };
  useEffect(() => { onRefresh?.(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark" style={{ background: 'var(--navy-btn)' }}><Icon name="user" size={16} /></span>
        <div><div className="k">등급 현황</div><h2>친구</h2></div>
        <button className="icon-btn" onClick={onClose} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      {!social ? (
        <p className="muted" style={{ margin: '12px 20px' }}>친구 기능은 Google로 로그인했을 때만 쓸 수 있어요. 설정에서 로그아웃 후 Google로 다시 들어와 주세요.</p>
      ) : (
        <>
          <div className="pad" style={{ marginTop: 10 }}>
            <div className="card">
              <div className="card-h"><span>내 초대 링크</span></div>
              {link ? (
                <>
                  <div className="invite-link num" onClick={(e) => window.getSelection()?.selectAllChildren(e.currentTarget)}>{link}</div>
                  <div className="row2" style={{ marginTop: 10 }}>
                    <button className="btn sm sky" onClick={copy}><Icon name="copy" size={15} />링크 복사</button>
                    {typeof navigator !== 'undefined' && navigator.share ? <button className="btn sm primary" onClick={share}>공유하기</button> : <button className="btn sm" onClick={copy}>카톡에 붙여넣기용 복사</button>}
                  </div>
                  <p className="help" style={{ margin: '10px 0 0' }}>이 링크를 연 사람은 <b>바로 친구</b>가 돼요(로그인 필요). 친구에게는 <b>등급 카드, 다음 등급 진행률, 다가오는 항공편</b>(편명·날짜·노선·시각·좌석 등급)만 보여요. 운임, 지난 항공편, 메모, 설정 숫자는 보이지 않아요.</p>
                  {resetAsk ? (
                    <div className="row2" style={{ marginTop: 8 }}>
                      <button className="btn sm danger" onClick={() => { onReset(); setResetAsk(false); }}>새 링크 만들기</button>
                      <button className="btn sm ghost" onClick={() => setResetAsk(false)}>취소</button>
                    </div>
                  ) : (
                    <button className="link" style={{ marginTop: 8, fontSize: 13 }} onClick={() => setResetAsk(true)}>링크 새로 만들기 (예전 링크는 막힘, 기존 친구는 그대로)</button>
                  )}
                </>
              ) : (
                <p className="muted" style={{ margin: 0 }}>설정을 마치면 초대 링크가 만들어져요.</p>
              )}
            </div>
            {err && <div className="notice" style={{ marginTop: 10 }}>{err}</div>}
          </div>

          <div className="section-h"><span>친구 {list.length}명</span><button className="link" onClick={onRefresh}>새로고침</button></div>
          {list.length === 0 && <p className="muted" style={{ margin: '0 20px', fontSize: 14 }}>아직 친구가 없어요. 위 링크를 보내 보세요.</p>}
          {list.length > 0 && (
            <div className="card fr-card" style={{ margin: '0 16px' }}>
              {list.map((fr) => (
                <FriendRow
                  key={fr.uid}
                  fr={fr}
                  ctx={ctx}
                  onClick={() => onOpen(fr.uid)}
                  right={
                    confirm === fr.uid ? (
                      <span className="fr-del">
                        <button className="btn sm danger" onClick={() => { setConfirm(null); onRemove(fr.uid); }}>삭제</button>
                        <button className="icon-btn" style={{ width: 32, height: 32 }} onClick={() => setConfirm(null)} aria-label="취소"><Icon name="close" size={14} /></button>
                      </span>
                    ) : (
                      <button className="icon-btn fr-x" onClick={() => setConfirm(fr.uid)} aria-label={`${fr.name || '친구'} 삭제`}><Icon name="trash" size={16} /></button>
                    )
                  }
                />
              ))}
            </div>
          )}
          <p className="help" style={{ margin: '12px 20px 0' }}>친구를 삭제하면 서로의 정보가 바로 안 보여요. 상대에게 알림은 가지 않아요.</p>
        </>
      )}
    </div>
  );
}

// 친구 한 명: 등급 카드, 진행률, 다가오는 항공편
export function FriendView({ fr, ctx, onRemove, onBack }) {
  const [ask, setAsk] = useState(false);
  const t = TIER[fr.tier] || TIER.SKYPASS;
  const g = fr.goal;
  const today = ctx.today;
  const mineMap = useMemo(() => new Map(ctx.flights.filter((f) => f.date >= today).map((f) => [flightKey(f), f])), [ctx.flights, today]);
  const up = (fr.upcoming || []).filter((u) => u.date >= today);
  const dleft = fr.periodEnd ? daysBetween(today, fr.periodEnd) : null;
  return (
    <div className="fade-in">
      <div className="dhead">
        <FriendFace fr={fr} size={40} />
        <div><div className="k">친구</div><h2>{fr.name || '이름 없음'}</h2></div>
        <button className="icon-btn" onClick={onBack} aria-label="뒤로"><Icon name="close" size={18} /></button>
      </div>
      {fr.missing ? (
        <p className="muted" style={{ margin: '12px 20px' }}>친구가 아직 새 버전의 티어런을 열지 않아 정보가 없어요. 친구가 앱을 한 번 열면 보여요.</p>
      ) : (
        <>
          <div className="tcard" style={{ background: t.bg, color: t.ink, marginTop: 10 }}>
            <div><div className="en">{t.en}</div><div className="ko">{t.name}</div></div>
            <div className="foot num">
              <span>{fr.name}</span>
              <span>{fr.periodEnd ? `${fmtDot(fr.periodEnd)}까지${dleft != null && dleft >= 0 ? ` · D-${dleft}` : ''}` : fr.tier === 'MCP' || fr.tier === 'MM' ? '평생 등급' : ''}</span>
            </div>
          </div>
          {g ? (
            <div className="pad" style={{ marginTop: 12 }}>
              <div className="card">
                <div className="card-h"><span>{g.title}</span><b className="num" style={{ color: 'var(--ink)', fontSize: 18 }}>{pct(g.conf)}</b></div>
                <Bar conf={g.conf} plan={Math.max(0, g.all - g.conf)} done={g.done} />
                <div className="help num" style={{ marginTop: 8 }}>
                  {g.done ? '달성했어요' : `${fmtNum(g.remMi)}마일 남음`}{!g.done && g.all > g.conf ? ` · 예정 항공편 포함 ${pct(g.all)}` : ''}
                </div>
              </div>
            </div>
          ) : (
            <p className="muted" style={{ margin: '12px 20px' }}>최고 등급이라 다음 목표가 없어요.</p>
          )}
          <div className="section-h"><span>다가오는 항공편</span><span className="faint num">{up.length}편</span></div>
          {up.length === 0 && <p className="muted" style={{ margin: '0 20px', fontSize: 14 }}>예정된 항공편이 없어요.</p>}
          {up.map((u, i) => {
            const d = daysBetween(today, u.date);
            const same = mineMap.get(flightKey(u));
            return (
              <div key={i} className={`frow ffr ${same ? 'sel' : ''}`}>
                {d === 0 ? <div className="dday today"><b>오늘</b></div> : <div className="dday"><b className="num">{d}</b><small>일 후</small></div>}
                <div>
                  <div className="fmeta"><AirlineMark code={u.airline} size="sm" /><span>{u.airline} {u.flightNo}</span><span className="d">{fmtDate(u.date)}</span></div>
                  <div className="ftitle">{city(u.from)} → {city(u.to)}</div>
                  <div className="ftimes num">
                    <span>{u.from} {u.dep && <b>{u.dep}</b>}</span>
                    <span>{u.to} {u.arr && <b>{u.arr}{+u.arrOffset ? <sup> +{u.arrOffset}</sup> : null}</b>}</span>
                  </div>
                  <div className="fchips">
                    <span className={`badge cabin-${u.cabin || 'Y'}`}>{CABIN[u.cabin]?.name || '일반석'}</span>
                    {same && <span className="badge together"><Icon name="user" size={12} />나도 탑승 · 같이 가요</span>}
                    {!AIRLINE[u.airline] && <span className="badge gray">{u.airline}</span>}
                  </div>
                </div>
              </div>
            );
          })}
          {fr.updatedAt && <p className="help" style={{ margin: '12px 20px 0' }}>{(() => { const d = new Date(fr.updatedAt); return `${d.getMonth() + 1}월 ${d.getDate()}일 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; })()}에 업데이트된 정보예요.</p>}
        </>
      )}
      <div className="pad" style={{ margin: '18px 0 16px' }}>
        {ask ? (
          <div className="row2">
            <button className="btn danger block" onClick={onRemove}>친구 삭제</button>
            <button className="btn ghost block" onClick={() => setAsk(false)}>취소</button>
          </div>
        ) : (
          <button className="btn danger block" onClick={() => setAsk(true)}><Icon name="trash" size={16} />친구 삭제</button>
        )}
      </div>
    </div>
  );
}
