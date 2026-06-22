// src/pages/projects/eurica/EuricaSchedulePanel.jsx
// Interactive trip detail view — sidebar + schedule panel
import { useState } from 'react';
import {
  MapPin, Calendar, Users, Share2, Plus, Trash2, Pencil,
  GripVertical, Lock, Plane, UtensilsCrossed, Landmark, Leaf, BedDouble,
} from 'lucide-react';

// ── Design tokens ────────────────────────────────────────────────────────────
const tk = {
  bg:           '#0A0A0A',
  surface:      '#181818',
  surface2:     '#1F1F1F',
  surface3:     '#262626',
  border:       '#2C2C2C',
  border2:      '#3A3A3A',
  text:         '#F0F0F0',
  text2:        '#9A9A9A',
  text3:        '#808080',
  accent:       '#5B8BFF',
  accentSoft:   'rgba(91,139,255,0.13)',
  accentBorder: 'rgba(91,139,255,0.35)',
  purple:       '#9855D4',
  danger:       '#EF4444',
  dangerSoft:   'rgba(239,68,68,0.13)',
  glassBg:      'rgba(20,20,20,0.90)',
  glassBgDeep:  'rgba(13,13,13,0.88)',
  glassBorder:  'rgba(255,255,255,0.10)',
  glassBorder2: 'rgba(255,255,255,0.07)',
  glassBlur:    'blur(24px) saturate(180%)',
  boxBg:        'rgba(19,19,19,0.80)',
  boxBorder:    'rgba(255,255,255,0.06)',
  // Category colors
  catTransport:     '#A78BFA',
  catCulture:       '#5B8BFF',
  catFood:          '#F59E0B',
  catLeisure:       '#22C55E',
  catAccommodation: '#06B6D4',
};

// ── Day colors ────────────────────────────────────────────────────────────────
const DAY_COLORS = ['#5271FF','#EF4444','#10B981','#F59E0B'];

// ── Trip data ─────────────────────────────────────────────────────────────────
const DAYS = [
  {
    id: 'arrivo',
    label: 'Arrivo',
    date: '14 Mar',
    activities: [
      {
        id: 'a1', time: '11:30', emoji: '✈️',
        category: 'transport', catColor: '#A78BFA',
        title: 'Volo Milano → Siviglia',
        subtitle: 'Vueling VY1371 · T. Malpensa',
        booked: true,
      },
      {
        id: 'a2', time: '14:00', emoji: '🏨',
        category: 'accommodation', catColor: '#06B6D4',
        title: 'Check-in Hotel Alfonso XIII',
        subtitle: 'San Fernando, 2 · 4 notti',
        booked: true,
      },
      {
        id: 'a3', time: '20:30', emoji: '🍽',
        category: 'food', catColor: '#F59E0B',
        title: 'Cena al Becerrita',
        subtitle: 'Tapas tradizionali — prenotato',
        booked: true,
      },
    ],
  },
  {
    id: 'giorno1',
    label: 'Giorno 1',
    date: '15 Mar',
    activities: [
      {
        id: 'b1', time: '09:00', emoji: '🏛',
        category: 'culture', catColor: '#5B8BFF',
        title: 'Real Alcázar di Siviglia',
        subtitle: 'UNESCO World Heritage · ~2h',
        booked: false, hasTicket: true,
      },
      {
        id: 'b2', time: '11:30', emoji: '🌿',
        category: 'leisure', catColor: '#22C55E',
        title: 'Parque de María Luisa',
        subtitle: 'Passeggiata — ingresso libero',
        booked: false,
      },
      {
        id: 'b3', time: '14:00', emoji: '🍽',
        category: 'food', catColor: '#F59E0B',
        title: 'Pranzo El Rinconcillo',
        subtitle: 'Calle Gerona, 40 · Oldest bar in Seville',
        booked: false,
      },
      {
        id: 'b4', time: '17:00', emoji: '🏛',
        category: 'culture', catColor: '#5B8BFF',
        title: 'Cattedrale e Giralda',
        subtitle: 'Prenotazione consigliata · ~1.5h',
        booked: false, hasTicket: true,
      },
    ],
  },
  {
    id: 'giorno2',
    label: 'Giorno 2',
    date: '16 Mar',
    activities: [
      {
        id: 'c1', time: '09:30', emoji: '🚌',
        category: 'transport', catColor: '#A78BFA',
        title: 'Day trip a Carmona',
        subtitle: 'Bus da Plaza de Armas · ~45 min',
        booked: false,
      },
      {
        id: 'c2', time: '11:00', emoji: '🏛',
        category: 'culture', catColor: '#5B8BFF',
        title: 'Necropoli Romana',
        subtitle: 'Carmona · Ingresso 1.50€',
        booked: false,
      },
      {
        id: 'c3', time: '21:00', emoji: '💃',
        category: 'leisure', catColor: '#22C55E',
        title: 'Spettacolo Flamenco',
        subtitle: 'Casa de la Memoria · 18€',
        booked: true,
      },
    ],
  },
  {
    id: 'giorno3',
    label: 'Giorno 3',
    date: '17 Mar',
    activities: [
      {
        id: 'd1', time: '10:00', emoji: '🛍',
        category: 'leisure', catColor: '#22C55E',
        title: 'Triana Market',
        subtitle: 'Calle Feria + Mercado de Triana',
        booked: false,
      },
      {
        id: 'd2', time: '13:00', emoji: '🍽',
        category: 'food', catColor: '#F59E0B',
        title: 'Pranzo Taberna del Alabardero',
        subtitle: 'Zarzuela, 20 · Vista fiume',
        booked: true,
      },
      {
        id: 'd3', time: '15:30', emoji: '🌉',
        category: 'leisure', catColor: '#22C55E',
        title: 'Ponte di Triana & Lungo Guadalquivir',
        subtitle: 'Passeggiata panoramica',
        booked: false,
      },
      {
        id: 'd4', time: '19:00', emoji: '🏨',
        category: 'accommodation', catColor: '#06B6D4',
        title: 'Rientro in hotel & riposo',
        subtitle: 'Alfonso XIII',
        booked: false,
      },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function EuricaSchedulePanel() {
  const [activeDay, setActiveDay]   = useState('giorno1');
  const [hoveredId, setHoveredId]   = useState(null);

  const day = DAYS.find(d => d.id === activeDay) || DAYS[1];

  return (
    <div style={{
      background: tk.bg,
      borderRadius: 28,
      overflow: 'hidden',
      fontFamily: "'Urbanist', system-ui, sans-serif",
      userSelect: 'none',
    }}>

      {/* Browser chrome */}
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
          maxWidth: 240, margin: '0 auto',
          letterSpacing: '.01em',
        }}>
          eurica.vercel.app/app · Siviglia
        </div>
      </div>

      {/* App shell */}
      <div style={{ display: 'flex', height: 580 }}>

        {/* Sidebar */}
        <Sidebar activeTripId="siviglia" />

        {/* Main content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: tk.bg,
        }}>

          {/* Trip header */}
          <TripHeader />

          {/* Content area: schedule + map */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

            {/* Schedule panel */}
            <div style={{
              width: 420,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              borderRight: `1px solid ${tk.boxBorder}`,
              overflow: 'hidden',
            }}>

              {/* Day pills */}
              <div style={{
                display: 'flex',
                gap: 6,
                padding: '12px 16px',
                borderBottom: `1px solid ${tk.boxBorder}`,
                overflowX: 'auto',
                flexShrink: 0,
              }}>
                {DAYS.map((d, i) => (
                  <DayPill
                    key={d.id}
                    label={d.label}
                    sub={d.date}
                    active={activeDay === d.id}
                    color={DAY_COLORS[i % DAY_COLORS.length]}
                    onClick={() => setActiveDay(d.id)}
                  />
                ))}
                <button style={{
                  flexShrink: 0, height: 52,
                  padding: '0 14px',
                  background: 'transparent',
                  border: `1px dashed ${tk.border2}`,
                  borderRadius: 12,
                  color: tk.text3, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '.78rem', fontWeight: 500,
                  fontFamily: 'inherit',
                }}>
                  <Plus size={12} /> Giorno
                </button>
              </div>

              {/* Activity list */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
                {day.activities.map((act) => (
                  <CalItem
                    key={act.id}
                    activity={act}
                    isHovered={hoveredId === act.id}
                    onEnter={() => setHoveredId(act.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                ))}

                {/* Add activity CTA */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 16px 4px 12px',
                  margin: '4px 0',
                }}>
                  <div style={{ width: 40, flexShrink: 0 }} />
                  <div style={{
                    width: 22, height: 22, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <div style={{ width: 1, height: '100%', background: tk.border2 }} />
                  </div>
                  <div style={{ flex: 1, paddingLeft: 8 }}>
                    <button style={{
                      width: '100%', padding: '10px 14px',
                      background: 'transparent',
                      border: `1px dashed ${tk.border}`,
                      borderRadius: 12,
                      color: tk.text3, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: '.78rem', fontWeight: 500,
                      fontFamily: 'inherit',
                      transition: 'border-color .15s, color .15s',
                    }}>
                      <Plus size={12} /> Aggiungi attività
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{
              flex: 1,
              background: '#0d0d12',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <MapMockup />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ── TripHeader ────────────────────────────────────────────────────────────────
function TripHeader() {
  return (
    <div style={{
      padding: '14px 20px',
      borderBottom: `1px solid ${tk.boxBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      background: tk.glassBg,
      backdropFilter: tk.glassBlur,
      WebkitBackdropFilter: tk.glassBlur,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'linear-gradient(150deg, #C4520A 0%, #7A1E00 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', flexShrink: 0,
        }}>🌻</div>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: tk.text, letterSpacing: '-.01em' }}>
            Siviglia
          </div>
          <div style={{ fontSize: '.74rem', color: tk.text2, fontWeight: 500, marginTop: 1 }}>
            14–19 Marzo 2026 · 5 giorni
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <HeaderBtn icon={<Users size={13} />} label="Condividi" />
        <HeaderBtn icon={<MapPin size={13} />} label="Mappa" active />
      </div>
    </div>
  );
}

function HeaderBtn({ icon, label, active }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '6px 11px',
        background: active
          ? tk.accentSoft
          : hov ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: `1px solid ${active ? tk.accentBorder : tk.glassBorder2}`,
        borderRadius: 10,
        color: active ? tk.accent : hov ? tk.text : tk.text2,
        fontSize: '.78rem', fontWeight: 500,
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all .15s',
      }}
    >
      {icon}{label}
    </button>
  );
}

// ── DayPill ───────────────────────────────────────────────────────────────────
function DayPill({ label, sub, active, color, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        padding: '7px 13px',
        height: 52,
        background: active
          ? `${color}22`
          : hov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${active ? `${color}55` : tk.border}`,
        borderRadius: 12,
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all .16s',
        position: 'relative',
        minWidth: 72,
      }}
    >
      {active && (
        <div style={{
          position: 'absolute', bottom: -1, left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: 2,
          background: color, borderRadius: 99,
        }} />
      )}
      <div style={{
        fontSize: '.80rem', fontWeight: 700,
        color: active ? color : tk.text2,
        lineHeight: 1.2,
      }}>{label}</div>
      <div style={{
        fontSize: '.66rem', fontWeight: 500,
        color: active ? `${color}bb` : tk.text3,
        marginTop: 2,
      }}>{sub}</div>
    </button>
  );
}

// ── CalItem ───────────────────────────────────────────────────────────────────
function CalItem({ activity: act, isHovered, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: 'flex', alignItems: 'flex-start',
        gap: 6, padding: '3px 12px 0',
      }}
    >
      {/* Time */}
      <div style={{
        width: 40, flexShrink: 0,
        fontSize: '.68rem', fontWeight: 700,
        color: tk.text3, textAlign: 'right',
        paddingTop: 17, lineHeight: 1.2,
      }}>
        {act.time}
      </div>

      {/* Timeline dot */}
      <div style={{
        width: 22, flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 10,
      }}>
        <div style={{
          width: 22, height: 22,
          background: `${act.catColor}22`,
          color: act.catColor,
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '.80rem', lineHeight: 1,
        }}>
          {act.emoji}
        </div>
        <div style={{ width: 1, flex: 1, minHeight: 8, background: `${tk.border}88`, marginTop: 3 }} />
      </div>

      {/* Card wrapper */}
      <div style={{ flex: 1, paddingBottom: 8, position: 'relative' }}>
        <div style={{
          background: tk.boxBg,
          border: `1px solid ${isHovered ? tk.accentBorder : tk.glassBorder2}`,
          borderRadius: 16,
          padding: '12px 14px',
          backdropFilter: tk.glassBlur,
          WebkitBackdropFilter: tk.glassBlur,
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'transform .16s cubic-bezier(0.22,1,0.36,1), border-color .14s ease',
          cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: act.subtitle ? 3 : 0 }}>
            <div style={{ fontSize: '.85rem', fontWeight: 700, color: tk.text, flex: 1, letterSpacing: '-.005em' }}>
              {act.title}
            </div>
            {act.booked && (
              <span style={{
                fontSize: '.60rem', fontWeight: 700,
                background: 'rgba(34,197,94,0.18)',
                color: '#4ADE80',
                border: '1px solid rgba(34,197,94,0.28)',
                borderRadius: 99, padding: '2px 6px',
                letterSpacing: '.03em', flexShrink: 0,
              }}>Booked</span>
            )}
            {act.hasTicket && !act.booked && (
              <span style={{
                fontSize: '.60rem', fontWeight: 700,
                background: 'rgba(91,139,255,0.18)',
                color: '#7AABFF',
                border: '1px solid rgba(91,139,255,0.28)',
                borderRadius: 99, padding: '2px 6px',
                letterSpacing: '.03em', flexShrink: 0,
                cursor: 'pointer',
              }}>Ticket ↗</span>
            )}
          </div>
          {act.subtitle && (
            <div style={{ fontSize: '.74rem', color: tk.text3, fontWeight: 500 }}>
              {act.subtitle}
            </div>
          )}
        </div>

        {/* Hover actions */}
        <div style={{
          position: 'absolute', right: 8, top: 8,
          display: 'flex', gap: 4,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0.85)',
          transition: 'opacity .14s ease, transform .14s ease',
          pointerEvents: isHovered ? 'auto' : 'none',
        }}>
          {[
            { icon: <Pencil size={10} />, danger: false },
            { icon: <Trash2 size={10} />, danger: true },
          ].map((btn, i) => (
            <button
              key={i}
              style={{
                width: 24, height: 24,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: btn.danger ? tk.dangerSoft : tk.surface2,
                border: `1px solid ${btn.danger ? 'rgba(239,68,68,0.25)' : tk.border}`,
                borderRadius: 6, cursor: 'pointer',
                color: btn.danger ? tk.danger : tk.text2,
                fontFamily: 'inherit',
              }}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ activeTripId }) {
  const trips = [
    { id: 'siviglia', label: 'Siviglia',  color: '#5271FF' },
    { id: 'berlino',  label: 'Berlino',   color: '#EF4444' },
    { id: 'tokyo',    label: 'Tokyo',     color: '#10B981' },
  ];

  const navItems = [
    { id: 'dashboard', icon: '🌐', label: 'Overview' },
    { id: 'alltrips',  icon: '🗺',  label: 'All Trips' },
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
          <SidebarItem key={item.id} icon={item.icon} label={item.label} active={false} />
        ))}
      </div>

      {/* My Trips */}
      <div style={{ padding: '4px 0' }}>
        <div style={{ fontSize: '.60rem', fontWeight: 700, color: tk.text3, padding: '0 14px 6px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          My Trips
        </div>
        {trips.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 14px',
            margin: '1px 8px',
            background: activeTripId === t.id ? 'rgba(255,255,255,0.06)' : 'transparent',
            borderRadius: 10,
            fontSize: '.82rem', fontWeight: activeTripId === t.id ? 600 : 500,
            color: activeTripId === t.id ? tk.text : tk.text2,
            cursor: 'pointer',
            position: 'relative',
          }}>
            {activeTripId === t.id && (
              <div style={{
                position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
                width: 3, height: 16, background: t.color, borderRadius: 99,
              }} />
            )}
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
            {t.label}
          </div>
        ))}
      </div>

      {/* User row */}
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

function SidebarItem({ icon, label, active }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 14px', margin: '1px 8px',
        background: active ? 'rgba(255,255,255,0.06)' : hov ? 'rgba(255,255,255,0.03)' : 'transparent',
        borderRadius: 10,
        fontSize: '.82rem', fontWeight: active ? 600 : 500,
        color: active ? tk.text : hov ? tk.text : tk.text2,
        cursor: 'pointer',
        transition: 'background .12s, color .12s',
      }}
    >
      <span style={{ fontSize: '.85rem', lineHeight: 1 }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ── MapMockup ─────────────────────────────────────────────────────────────────
function MapMockup() {
  const pins = [
    { x: '45%', y: '38%', label: 'Alcázar',    color: '#5B8BFF' },
    { x: '52%', y: '52%', label: 'Cattedrale', color: '#5B8BFF' },
    { x: '30%', y: '44%', label: 'Triana',     color: '#22C55E' },
    { x: '60%', y: '30%', label: 'Becerrita',  color: '#F59E0B' },
    { x: '40%', y: '62%', label: 'Hotel',      color: '#06B6D4' },
  ];
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Stylized map bg */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .18 }}
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Streets */}
        {[
          'M 50 200 Q 150 180 300 190 T 550 200',
          'M 100 50 L 120 350',
          'M 200 80 L 210 370',
          'M 320 60 Q 330 200 310 370',
          'M 450 70 L 470 360',
          'M 50 120 Q 300 100 550 110',
          'M 50 280 Q 300 300 550 290',
          'M 80 160 Q 300 150 520 165',
          'M 80 240 Q 300 255 520 240',
          'M 150 40 L 130 380',
          'M 380 40 L 400 370',
        ].map((d, i) => (
          <path key={i} d={d} stroke="#4A6FA5" strokeWidth="1.5" fill="none" />
        ))}
        {/* Blocks */}
        {[
          [140,90,50,40],[220,90,70,45],[310,80,100,50],
          [140,165,60,55],[220,160,80,60],[320,155,90,70],
          [140,250,55,50],[220,245,75,55],[320,250,85,60],
        ].map(([x,y,w,h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="3"
            fill="#1E3A5F" stroke="#2A4F7C" strokeWidth="0.8" />
        ))}
        {/* River */}
        <path d="M 0 290 Q 100 310 200 295 Q 350 275 500 300 L 600 295 L 600 400 L 0 400 Z"
          fill="#0D2240" opacity=".7" />
      </svg>

      {/* Map pins */}
      {pins.map((pin, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: pin.x, top: pin.y,
            transform: 'translate(-50%, -100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            background: pin.color,
            color: '#fff', fontFamily: 'inherit',
            fontSize: '.60rem', fontWeight: 700,
            padding: '3px 7px', borderRadius: 99,
            whiteSpace: 'nowrap',
            boxShadow: `0 2px 8px ${pin.color}55`,
          }}>
            {pin.label}
          </div>
          <div style={{
            width: 0, height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: `6px solid ${pin.color}`,
          }} />
        </div>
      ))}

      {/* Attribution */}
      <div style={{
        position: 'absolute', bottom: 10, right: 10,
        fontSize: '.60rem', color: '#ffffff30', fontFamily: 'inherit',
      }}>
        Mapbox GL JS
      </div>
    </div>
  );
}
