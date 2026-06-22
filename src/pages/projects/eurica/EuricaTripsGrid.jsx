// src/pages/projects/eurica/EuricaTripsGrid.jsx
// Interactive "All Trips" grid — faithful recreation of the Eurica app UI
import { useState } from 'react';
import { Plus, Pencil, Trash2, Share2, LayoutGrid, AlignJustify } from 'lucide-react';

// ── Design tokens (exact values from public/css/style.css) ──────────────────
const tk = {
  bg:               '#0A0A0A',
  surface:          '#181818',
  surface2:         '#1F1F1F',
  surface3:         '#262626',
  border:           '#2C2C2C',
  border2:          '#3A3A3A',
  text:             '#F0F0F0',
  text2:            '#9A9A9A',
  text3:            '#808080',
  accent:           '#5B8BFF',
  accentSoft:       'rgba(91,139,255,0.13)',
  purple:           '#9855D4',
  danger:           '#EF4444',
  dangerSoft:       'rgba(239,68,68,0.13)',
  success:          '#22C55E',
  successSoft:      'rgba(34,197,94,0.13)',
  warning:          '#F59E0B',
  warningSoft:      'rgba(245,158,11,0.13)',
  glassBg:          'rgba(20,20,20,0.90)',
  glassBgDeep:      'rgba(13,13,13,0.88)',
  glassBorder:      'rgba(255,255,255,0.10)',
  glassBorder2:     'rgba(255,255,255,0.07)',
  glassBlur:        'blur(24px) saturate(180%)',
  boxBg:            'rgba(19,19,19,0.80)',
  boxBorder:        'rgba(255,255,255,0.06)',
  rSm:              '8px',
  r:                '12px',
  rLg:              '16px',
  rXl:              '20px',
  r2xl:             '28px',
};

// ── Trip data ───────────────────────────────────────────────────────────────
const TRIPS = [
  {
    id: 'siviglia',
    city: 'Siviglia',
    country: 'Spagna',
    dates: '14 Mar — 19 Mar 2026',
    status: 'active',
    statusLabel: 'In corso',
    gradient: 'linear-gradient(150deg, #C4520A 0%, #7A1E00 100%)',
    patternColor: 'rgba(255,180,80,0.12)',
    icon: '🌻',
    days: 5,
  },
  {
    id: 'berlino',
    city: 'Berlino',
    country: 'Germania',
    dates: '2 Ago — 8 Ago 2026',
    status: 'planned',
    statusLabel: 'Pianificato',
    gradient: 'linear-gradient(150deg, #1E3A5F 0%, #0D1B2E 100%)',
    patternColor: 'rgba(91,139,255,0.12)',
    icon: '🏛',
    days: 6,
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Giappone',
    dates: '10 Gen — 22 Gen 2027',
    status: 'todo',
    statusLabel: 'Da pianificare',
    gradient: 'linear-gradient(150deg, #9D174D 0%, #4A044E 100%)',
    patternColor: 'rgba(236,72,153,0.12)',
    icon: '🌸',
    days: 12,
  },
  {
    id: 'lisbona',
    city: 'Lisbona',
    country: 'Portogallo',
    dates: '5 Ott — 10 Ott 2025',
    status: 'completed',
    statusLabel: 'Completato',
    gradient: 'linear-gradient(150deg, #D97706 0%, #7C2D12 100%)',
    patternColor: 'rgba(245,158,11,0.12)',
    icon: '🚋',
    days: 5,
  },
];

const STATUS_STYLE = {
  active:    { bg: 'rgba(34,197,94,0.20)',  color: '#4ADE80', border: 'rgba(34,197,94,0.30)' },
  planned:   { bg: 'rgba(91,139,255,0.20)', color: '#7AABFF', border: 'rgba(91,139,255,0.30)' },
  todo:      { bg: 'rgba(245,158,11,0.20)', color: '#FCD34D', border: 'rgba(245,158,11,0.30)' },
  completed: { bg: 'rgba(136,136,170,0.20)',color: '#AAAACC', border: 'rgba(136,136,170,0.30)' },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function EuricaTripsGrid() {
  const [hovered, setHovered]   = useState(null);
  const [selected, setSelected] = useState('siviglia');

  return (
    <div style={{
      background: tk.bg,
      borderRadius: tk.r2xl,
      overflow: 'hidden',
      fontFamily: "'Urbanist', system-ui, sans-serif",
      userSelect: 'none',
    }}>

      {/* ── Browser chrome ── */}
      <div style={{
        background: tk.surface,
        borderBottom: `1px solid ${tk.border}`,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#EF4444','#F59E0B','#22C55E'].map((c, i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: .7 }} />
          ))}
        </div>
        <div style={{
          flex: 1, textAlign: 'center',
          background: tk.surface2, borderRadius: 6,
          padding: '4px 12px', fontSize: '.72rem',
          color: tk.text3, fontWeight: 500,
          maxWidth: 220, margin: '0 auto',
          letterSpacing: '.01em',
        }}>
          eurica.vercel.app/app
        </div>
      </div>

      {/* ── App shell ── */}
      <div style={{ display: 'flex', height: 520 }}>

        {/* Sidebar */}
        <Sidebar active="alltrips" />

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px', background: tk.bg }}>

          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: tk.text, letterSpacing: '-.01em' }}>
              All Trips
            </h1>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <IconBtn icon={<LayoutGrid size={14} />} active />
              <IconBtn icon={<AlignJustify size={14} />} />
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: tk.accent, color: '#fff',
                border: 'none', borderRadius: tk.r,
                padding: '6px 13px', fontSize: '.80rem',
                fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
                <Plus size={13} />
                New Trip
              </button>
            </div>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}>
            {TRIPS.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                isHovered={hovered === trip.id}
                isSelected={selected === trip.id}
                onEnter={() => setHovered(trip.id)}
                onLeave={() => setHovered(null)}
                onClick={() => setSelected(trip.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TripCard ─────────────────────────────────────────────────────────────────
function TripCard({ trip, isHovered, isSelected, onEnter, onLeave, onClick }) {
  const st = STATUS_STYLE[trip.status] || STATUS_STYLE.planned;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        background: tk.boxBg,
        border: `1px solid ${isSelected ? 'rgba(91,139,255,0.35)' : tk.glassBorder2}`,
        borderRadius: tk.rXl,
        overflow: 'hidden',
        cursor: 'pointer',
        backdropFilter: tk.glassBlur,
        WebkitBackdropFilter: tk.glassBlur,
        boxShadow: isHovered
          ? '0 8px 40px rgba(0,0,0,0.62), 0 2px 10px rgba(0,0,0,0.38)'
          : '0 4px 18px rgba(0,0,0,0.55)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms cubic-bezier(0.22,1,0.36,1), border-color 180ms ease',
        position: 'relative',
      }}
    >
      {/* Banner */}
      <div style={{
        height: 128,
        background: trip.gradient,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {/* Pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 80% 20%, ${trip.patternColor} 0%, transparent 60%)`,
        }} />
        {/* Big emoji */}
        <div style={{
          position: 'absolute', right: 16, top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '3.5rem', opacity: .3,
          filter: 'saturate(0.6)',
        }}>
          {trip.icon}
        </div>
        {/* Gradient fade to card body */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35) 100%)',
        }} />
        {/* Status chip */}
        <div style={{
          position: 'absolute', top: 9, right: 9,
          background: st.bg, color: st.color,
          border: `1px solid ${st.border}`,
          borderRadius: 99, padding: '3px 8px',
          fontSize: '.65rem', fontWeight: 700,
          letterSpacing: '.03em', fontFamily: 'inherit',
          backdropFilter: 'blur(6px)',
        }}>
          {trip.statusLabel}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '13px 14px 16px' }}>
        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: tk.text, letterSpacing: '-.01em', marginBottom: 2 }}>
          {trip.city}
        </div>
        <div style={{ fontSize: '.80rem', fontWeight: 500, color: tk.text2 }}>
          {trip.country}
        </div>
        <div style={{ fontSize: '.78rem', color: tk.text3, marginTop: 4, fontWeight: 500 }}>
          {trip.dates}
        </div>
        <div style={{ fontSize: '.72rem', color: tk.text3, marginTop: 3, fontWeight: 500 }}>
          {trip.days} giorni
        </div>
      </div>

      {/* Hover actions */}
      <div style={{
        position: 'absolute', bottom: 12, right: 12,
        display: 'flex', gap: 4,
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity .18s ease, transform .18s ease',
        pointerEvents: isHovered ? 'auto' : 'none',
      }}>
        {[
          { icon: <Share2 size={11} />, danger: false },
          { icon: <Pencil size={11} />, danger: false },
          { icon: <Trash2 size={11} />, danger: true },
        ].map((btn, i) => (
          <CardActionBtn key={i} icon={btn.icon} danger={btn.danger} />
        ))}
      </div>
    </div>
  );
}

// ── Sidebar (simplified) ─────────────────────────────────────────────────────
function Sidebar({ active }) {
  const navItems = [
    { id: 'dashboard', icon: '🌐', label: 'Overview' },
    { id: 'alltrips',  icon: '🗺',  label: 'All Trips' },
    { id: 'shared',   icon: '👥', label: 'Shared' },
  ];
  const trips = [
    { id: 'siviglia', label: 'Siviglia', color: '#5271FF' },
    { id: 'berlino',  label: 'Berlino',  color: '#EF4444' },
    { id: 'tokyo',    label: 'Tokyo',    color: '#10B981' },
  ];

  return (
    <nav style={{
      width: 200,
      flexShrink: 0,
      background: tk.glassBg,
      borderRight: `1px solid ${tk.boxBorder}`,
      backdropFilter: tk.glassBlur,
      WebkitBackdropFilter: tk.glassBlur,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 0 12px',
    }}>
      {/* Brand */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '16px 14px 12px',
        borderBottom: `1px solid ${tk.boxBorder}`,
      }}>
        <span style={{ fontSize: '.9rem' }}>📍</span>
        <span style={{ fontSize: '.90rem', fontWeight: 800, color: tk.text, letterSpacing: '-.01em' }}>
          Eurica
        </span>
      </div>

      {/* General */}
      <div style={{ padding: '12px 0 4px' }}>
        <div style={{ fontSize: '.60rem', fontWeight: 700, color: tk.text3, padding: '0 14px 6px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          General
        </div>
        {navItems.map(item => (
          <NavItem key={item.id} icon={item.icon} label={item.label} active={active === item.id} />
        ))}
      </div>

      {/* My Trips */}
      <div style={{ padding: '8px 0 4px' }}>
        <div style={{ fontSize: '.60rem', fontWeight: 700, color: tk.text3, padding: '0 14px 6px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          My Trips
        </div>
        {trips.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', fontSize: '.82rem', fontWeight: 500, color: tk.text2,
            cursor: 'pointer',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
            {t.label}
          </div>
        ))}
      </div>

      {/* Footer: user row */}
      <div style={{ marginTop: 'auto', borderTop: `1px solid ${tk.boxBorder}`, padding: '10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #9855D4, #5B8BFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '.70rem', fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>L</div>
          <div>
            <div style={{ fontSize: '.78rem', fontWeight: 600, color: tk.text }}>Lorenzo</div>
            <div style={{ fontSize: '.68rem', color: tk.text3 }}>Admin</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 14px',
        fontSize: '.82rem', fontWeight: active ? 600 : 500,
        color: active ? tk.text : hov ? tk.text : tk.text2,
        background: active ? 'rgba(255,255,255,0.06)' : hov ? 'rgba(255,255,255,0.03)' : 'transparent',
        borderRadius: tk.r,
        cursor: 'pointer',
        margin: '1px 8px',
        transition: 'background .12s, color .12s',
        position: 'relative',
      }}
    >
      {active && (
        <div style={{
          position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
          width: 3, height: 16, background: tk.accent, borderRadius: 99,
        }} />
      )}
      <span style={{ fontSize: '.85rem', lineHeight: 1 }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function IconBtn({ icon, active }) {
  return (
    <button style={{
      width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: active ? tk.surface3 : 'transparent',
      border: `1px solid ${active ? tk.border2 : 'transparent'}`,
      borderRadius: tk.rSm, cursor: 'pointer',
      color: active ? tk.text : tk.text3,
      transition: 'all .15s',
      fontFamily: 'inherit',
    }}>
      {icon}
    </button>
  );
}

function CardActionBtn({ icon, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov
          ? (danger ? tk.dangerSoft : tk.surface3)
          : tk.glassBgDeep,
        border: `1px solid ${tk.glassBorder}`,
        borderRadius: tk.rSm,
        color: hov ? (danger ? tk.danger : tk.text) : tk.text2,
        backdropFilter: 'blur(6px)',
        cursor: 'pointer',
        transition: 'background .13s, color .13s',
        fontFamily: 'inherit',
      }}
    >
      {icon}
    </button>
  );
}
