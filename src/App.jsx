import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import confetti from 'canvas-confetti';
import {
  Crown, CheckCircle2, Gift, Tag, BatteryCharging, Box, ShieldCheck,
  Truck, MapPin, Star, Phone, Camera, ChevronDown, ChevronRight, ShoppingBag,
  Zap, Clock, X, Check, ArrowRight, Flame, Sparkles, TrendingUp,
  CreditCard, DollarSign, Award, Layers, MessageCircle, HelpCircle,
  Package, ExternalLink, RefreshCw, Send, Eye
} from 'lucide-react';

import {
  PRODUCTS, ENTREPRENEUR_COMBOS, BENEFITS, PAYMENT_METHODS,
  SHIPPING_PROOFS, REAL_PHOTOS, TESTIMONIALS, FAQS
} from './data/products';
import { playTick, playChime } from './utils/audio';

/* ─── SVG Instagram ──────────────────────────────────────────────────────── */
function IgIcon({ className, style }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 16, height: 16, flexShrink: 0, display: 'inline-block', ...style }}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ─── SVG TikTok ─────────────────────────────────────────────────────────── */
function TikTokIcon({ className, style }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: 16, height: 16, flexShrink: 0, display: 'inline-block', ...style }}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-6.6 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.08a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.6-.51z"/>
    </svg>
  );
}

/* ─── Flip Digit ─────────────────────────────────────────────────────────── */
function FlipDigit({ value }) {
  const [current, setCurrent] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== current) {
      setFlipping(true);
      const t = setTimeout(() => {
        setCurrent(value);
        setFlipping(false);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [value, current]);

  return (
    <span className={`digit-group ${flipping ? 'flip' : ''}`}>
      {current}
    </span>
  );
}

/* ─── useScrollReveal ────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr, .sr-l, .sr-r');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
export default function App() {
  /* State */
  const [selectedModel, setSelectedModel]       = useState(PRODUCTS[0]);
  const [qty, setQty]                            = useState(1);
  const [location, setLocation]                  = useState('contraentrega'); // 'contraentrega' | 'transferencia'
  const [customerName, setCustomerName]          = useState('');
  const [customerAddr, setCustomerAddr]          = useState('');
  const [activeCatalogTab, setActiveCatalogTab]  = useState('all'); // 'all' | 'invicta' | 'rolex'
  const [selectedBrand, setSelectedBrand]        = useState(null);  // null = grid, 'invicta' | 'rolex' | 'coming-rm' = detail
  const [activeStoreTab, setActiveStoreTab]      = useState('relojes'); // 'relojes' | 'quienes' | 'combos' | 'envios' | 'incluye' | 'pedido' | 'todo'
  const [openAccordion, setOpenAccordion]        = useState('invicta'); // 'invicta' | 'rolex'
  const [lightbox, setLightbox]                  = useState({ open: false, img: '', title: '' });
  const [openFaqs, setOpenFaqs]                  = useState({ 0: true, 1: false, 2: false }); // Multiple or toggle FAQ items
  const [buyerToast, setBuyerToast]              = useState({ show: false, buyer: null });
  const [modelToast, setModelToast]              = useState({ show: false, name: '' });
  const [time, setTime]                          = useState({ h: 2, m: 47, s: 35 });

  /* Mobile accordion nav state */
  const [mobMenuOpen, setMobMenuOpen]            = useState(false);
  const [mobAccSection, setMobAccSection]        = useState(null); // which section is expanded

  useScrollReveal();

  /* Countdown offer timer */
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 2, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* Live Buyer notifications loop */
  useEffect(() => {
    const buyers = [
      { name: 'Camilo R.',    city: 'Bogotá D.C.',        watch: 'Krono Subaqua Gold Master' },
      { name: 'Andrés M.',    city: 'Medellín',           watch: 'Krono Bolt Phantom Silver' },
      { name: 'Mateo G.',     city: 'Cali (Valle)',       watch: 'Combo Mayorista x5 Pro' },
      { name: 'Sebastián V.', city: 'Barranquilla',       watch: 'Krono Ghost Skeleton Cyber' },
      { name: 'David P.',     city: 'Bucaramanga',        watch: 'Krono Subaqua Reserve White' },
      { name: 'Alejandro T.', city: 'Pereira (Eje C.)',   watch: 'Pack Emprendedor x4 Inicial' },
    ];
    let i = 0;
    const show = () => {
      setBuyerToast({ show: true, buyer: buyers[i] });
      setTimeout(() => setBuyerToast(p => ({ ...p, show: false })), 4200);
      i = (i + 1) % buyers.length;
    };
    const first = setTimeout(show, 4500);
    const loop  = setInterval(show, 12000);
    return () => { clearTimeout(first); clearInterval(loop); };
  }, []);

  /* Price formatting */
  const fmt = n => n.toLocaleString('es-CO');

  /* Price calculation */
  let subtotal = selectedModel.price * qty;
  if (qty === 2 && selectedModel.price === 85000) subtotal = 160000;
  if (qty === 3 && selectedModel.price === 85000) subtotal = 235000;

  /* Custom WhatsApp link for Order Builder */
  const waLink = useCallback(() => {
    let msg  = `¡Hola Krono! 👋 Vengo de la página web oficial (@krono.ibg) y deseo ordenar mi combo:\n\n`;
    msg += `👑 *Modelo Elegido:* ${selectedModel.name} (${selectedModel.brand})\n`;
    msg += `📦 *Cantidad:* ${qty} kit(s)\n`;
    msg += `🎁 *Obsequios Incluidos:* Estuche Rígido Oficial + Batería Sellada GRATIS\n`;
    msg += `💳 *Forma de Pago:* ${location === 'contraentrega' ? 'Pago Contra Entrega en la Puerta' : 'Transferencia Directa (Nequi/Daviplata/Bancolombia)'}\n`;
    msg += `💰 *Total a Cancelar:* $${fmt(subtotal)} COP\n`;
    if (customerName.trim()) msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerAddr.trim()) msg += `🏠 *Ciudad y Dirección:* ${customerAddr.trim()}\n`;
    msg += `\n¿Me confirmas disponibilidad del modelo para coordinar el despacho hoy mismo? ¡Muchas gracias!`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(msg)}`;
  }, [selectedModel, qty, location, customerName, customerAddr, subtotal]);

  /* Direct 1-Click WhatsApp link for a specific product */
  const directProductWa = (product) => {
    const text = `¡Hola Krono! 👋 Quiero comprar en 1 Clic con Pago Contra Entrega:\n\n👑 *${product.name}*\n💎 *Línea:* ${product.brand}\n💰 *Precio Oferta:* $${fmt(product.price)} COP (Ahorro: $${fmt(product.savings)} COP)\n🎁 *Incluye:* Reloj + Estuche Rígido + Pila de Repuesto GRATIS\n\n¿Tienes disponibilidad para despacho inmediato a mi ciudad?`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(text)}`;
  };

  /* Direct WhatsApp link for Entrepreneur Combo */
  const directComboWa = (combo) => {
    const text = `¡Hola Krono! 👋 Me interesa comprar para revender:\n\n💼 *${combo.name}*\n📦 *Unidades:* ${combo.units} Relojes + ${combo.units} Estuches Rígidos + ${combo.units} Pilas\n💰 *Inversión:* $${fmt(combo.priceTotal)} COP ($${fmt(combo.pricePerUnit)} COP / unidad)\n📈 *Margen Estimado:* +$${fmt(combo.estimatedProfit)} COP de ganancia limpia\n\n¿Cómo coordinamos el despacho y los modelos a elección?`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(text)}`;
  };

  /* Select model + scroll + mini toast */
  const selectModel = useCallback((product) => {
    playTick();
    setSelectedModel(product);
    setModelToast({ show: true, name: product.name });
    setTimeout(() => setModelToast(p => ({ ...p, show: false })), 2200);
  }, []);

  /* Smooth scroll to section with sticky header offset */
  const scrollToSection = useCallback((sectionId, tabId = null) => {
    playTick();
    if (tabId) setActiveStoreTab(tabId);
    setMobMenuOpen(false);

    if (sectionId === 'emprendedor') {
      setSelectedBrand('emprendedores');
      sectionId = 'catalog';
    } else if (sectionId === 'combo-detail' || sectionId === 'combos') {
      setSelectedBrand('combos');
      sectionId = 'catalog';
    } else if (sectionId === 'catalog' && (!tabId || tabId === 'relojes')) {
      setSelectedBrand(null);
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const selectAndScroll = useCallback((product) => {
    selectModel(product);
    setTimeout(() => {
      scrollToSection('order-builder', 'pedido');
    }, 100);
  }, [selectModel, scrollToSection]);

  /* Active section scroll listener with RAF throttling to prevent UI jank */
  useEffect(() => {
    const sectionMap = [
      { id: 'hero', tab: 'relojes' },
      { id: 'quienes-somos', tab: 'relojes' },
      { id: 'catalog', tab: 'relojes' },
      { id: 'envios-pais', tab: 'envios' },
      { id: 'order-builder', tab: 'pedido' },
      { id: 'faq', tab: 'faq' },
    ];
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 140;
          for (let i = sectionMap.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionMap[i].id);
            if (el && el.offsetTop <= scrollPos) {
              setActiveStoreTab(prev => (prev !== sectionMap[i].tab ? sectionMap[i].tab : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Order click with chime and confetti */
  const handleOrder = useCallback(() => {
    playChime();
    confetti({
      particleCount: 100, spread: 85,
      origin: { y: 0.75 },
      colors: ['#10b981', '#22c55e', '#ffd700', '#ffffff', '#ef4444'],
    });
  }, []);

  /* Toggle FAQ reliably */
  const toggleFaq = (idx) => {
    playTick();
    setOpenFaqs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  /* Filter products by category */
  const invictaProducts = PRODUCTS.filter(p => p.category === 'invicta');
  const rolexProducts   = PRODUCTS.filter(p => p.category === 'rolex');

  /* Las 4 categorías principales con sus fotos de portada oficiales */
  const CATEGORIES = [
    {
      id: 'rolex',
      name: 'Rolex',
      badge: 'Colección de Lujo',
      badgeClass: 'green',
      subtitle: 'Rolex Style · Submariner, Datejust & Daytona',
      img: '/assets/img/cat_cover_rolex.jpg',
      ctaText: 'Ver Rolex →',
    },
    {
      id: 'invicta',
      name: 'Invicta',
      badge: 'Máxima Presencia',
      badgeClass: 'gold',
      subtitle: 'Subaqua, Bolt & Skeleton',
      img: '/assets/img/cat_cover_invicta.jpg',
      ctaText: 'Ver Invicta →',
    },
    {
      id: 'combos',
      name: 'Combos',
      badge: 'Kit Completo',
      badgeClass: 'blue',
      subtitle: 'Reloj + Estuche Rígido + Pila de Repuesto Gratis',
      img: '/assets/img/cat_cover_combos.jpg',
      ctaText: 'Ver Qué Incluye →',
    },
    {
      id: 'emprendedores',
      name: 'Emprendedores',
      badge: 'Línea Mayorista',
      badgeClass: 'amber',
      subtitle: 'Lotes desde 4 unidades con hasta 60% margen',
      img: '/assets/img/cat_cover_emprendedores.jpg',
      ctaText: 'Ver Precios Mayoristas →',
    },
  ];

  /* Manejo de clic en marca/categoría: filtra o traslada al usuario a la sección */
  const handleSelectBrand = (brandId) => {
    playTick();
    if (brandId === 'combos') {
      scrollToSection('combo-detail', 'incluye');
      return;
    }
    if (brandId === 'emprendedores') {
      scrollToSection('emprendedor', 'combos');
      return;
    }
    setActiveCatalogTab(brandId);
    setTimeout(() => {
      let targetId = 'catalog-products';
      if (brandId === 'invicta') targetId = 'brand-section-invicta';
      else if (brandId === 'rolex') targetId = 'brand-section-rolex';
      else if (brandId.startsWith('coming-')) targetId = 'brand-section-coming';

      const el = document.getElementById(targetId) || document.getElementById('catalog-products');
      if (el) {
        const headerOffset = 85;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative">


      {/* ── AMBIENT GLASS BACKGROUND WATERMARK (Persistent luxury feel) ─── */}
      <div className="ambient-watermark-bg" aria-hidden="true">
        <img
          src="/assets/img/krono_k_metallic.png"
          alt=""
          className="watermark-k-img"
        />
      </div>

      {/* ── LUXURY TOP ANNOUNCEMENT BAR ── */}
      <div className="luxury-top-bar">
        <div className="luxury-top-content">
          <span className="lt-badge">✦ PAGO CONTRA ENTREGA</span>
        </div>
      </div>

      
      {/* ═══════════════════════════════════════════════════════════════
          PANTALLA DEDICADA DE MARCA / COLECCIÓN
          Se activa cuando selectedBrand !== null (ej. 'invicta', 'rolex', 'combos', 'emprendedores')
          Muestra ÚNICAMENTE los relojes/modelos de esa marca en una pantalla limpia
      ═══════════════════════════════════════════════════════════════ */}
      {selectedBrand ? (
        <div>
          {/* Header de la Pantalla Dedicada */}
          <header className="site-header dedicated-header" style={{ position: 'sticky', top: 0, zIndex: 990, background: 'rgba(9, 12, 18, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
              <button
                onClick={() => {
                  playTick();
                  setSelectedBrand(null);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="btn-back-header"
              >
                ← Volver a Categorías
              </button>

              <div className="logo-box" onClick={() => { playTick(); setSelectedBrand(null); }} style={{ cursor: 'pointer' }}>
                <div className="logo-img-wrap">
                  <img src="/assets/img/krono_k_metallic.png" alt="Krono" className="logo-img" />
                </div>
                <div>
                  <div className="logo-name">KRONO</div>
                  <div className="logo-sub">Presencia &amp; Estilo</div>
                </div>
              </div>

              <a
                href="https://wa.me/573193620748?text=Hola%20Krono!%20Deseo%20informaci%C3%B3n%20sobre%20los%20relojes."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-header"
              >
                <MessageCircle className="w-4 h-4" /> Asesor WhatsApp
              </a>
            </div>
          </header>

          {/* Contenido de la Pantalla Dedicada */}
          <main className="dedicated-brand-screen">
            <div className="container">

              {/* 1. COLECCIÓN INVICTA */}
              {selectedBrand === 'invicta' && (
                <div className="brand-dedicated-view">
                  <div className="sec-head sr" style={{ marginBottom: 26, textAlign: 'left' }}>
                    <span className="badge-tag-emerald">👑 COLECCIÓN INVICTA OFICIAL</span>
                    <h1 className="sec-h2" style={{ fontSize: '2.1rem', marginTop: 8, color: '#fff' }}>
                      Modelos Invicta en Stock Físico
                    </h1>
                    <p className="sec-p" style={{ margin: '6px 0 0', maxWidth: 740, color: 'var(--t2)', fontSize: '0.95rem' }}>
                      Cajas macizas de 50mm - 54mm, biseles dentados, maquinaria cuarzo de alta presencia y pulso de silicona vulcanizada. Cada pieza incluye estuche rígido acolchado de lujo y batería sellada extra gratis.
                    </p>
                  </div>

                  <div className="prod-list-clean">
                    {invictaProducts.map((p) => (
                      <article key={p.id} className="prod-card-clean">
                        <div className="pcc-img-box" style={{ position: 'relative' }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            loading="lazy"
                            onClick={() => setLightbox({ open: true, img: p.image, title: p.name })}
                            style={{ cursor: 'pointer' }}
                          />
                          {p.stockBadge && (
                            <span className="pcc-stock-badge">{p.stockBadge}</span>
                          )}
                        </div>
                        <div className="pcc-body">
                          <span className="pcc-series">{p.series}</span>
                          <h3 className="pcc-name">{p.name}</h3>
                          <p className="pcc-desc">{p.desc}</p>
                          <div className="pcc-specs-tags">
                            <span>⚙ {p.machinery}</span>
                            <span>📏 {p.caseSize}</span>
                          </div>
                          <div className="pcc-bottom-bar" style={{ marginTop: 12 }}>
                            <span className="pcc-kit-tag">🎁 Incluye Estuche Rígido + Pila Gratis</span>
                            <a
                              href={`https://wa.me/573193620748?text=${encodeURIComponent(`¡Hola Krono! 👋 Deseo consultar disponibilidad y precio del modelo:

⌚ *${p.name}*
🏷️ *Serie:* ${p.series}
🎁 *Incluye:* Estuche Rígido + Pila Sellada Gratis

¿Tienen disponibilidad para envío contra entrega?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={playChime}
                              className="btn-wa-emerald w-full"
                              style={{ marginTop: 8, padding: '10px 14px', fontSize: '0.82rem', fontWeight: 800, borderRadius: 'var(--r1)' }}
                            >
                              <MessageCircle className="w-4 h-4" /> Consultar / Pedir por WhatsApp
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. COLECCIÓN ROLEX STYLE */}
              {selectedBrand === 'rolex' && (
                <div className="brand-dedicated-view">
                  <div className="sec-head sr" style={{ marginBottom: 24, textAlign: 'left' }}>
                    <span className="badge-tag-emerald">💎 COLECCIÓN ROLEX STYLE</span>
                    <h1 className="sec-h2" style={{ fontSize: '2.1rem', marginTop: 8, color: '#fff' }}>
                      Modelos Rolex Style
                    </h1>
                    <p className="sec-p" style={{ margin: '6px 0 0', maxWidth: 740, color: 'var(--t2)', fontSize: '0.95rem' }}>
                      Submariner, Datejust, Day-Date y Daytona. Biseles cerámicos, esferas limpias, pulso Oyster o Jubilee y fechador con lupa cyclops. Incluye estuche rígido acolchado y pila sellada gratis.
                    </p>
                  </div>

                  <div className="rolex-waitlist-card sr">
                    <div className="rwc-left">
                      <div className="rwc-badge-row">
                        <span className="badge-tag-red">🚫 LOTE AGOTADO EN BODEGA</span>
                        <span className="badge-tag-emerald">🚢 NUEVO LOTE EN CAMINO 2026</span>
                      </div>
                      <h4>Aparta tu Rolex Style — Precio Congelado</h4>
                      <p>
                        La colección se agotó en tiempo récord. El nuevo lote viene a Colombia con estuche rígido oficial y pila sellada gratis. <strong>No pagas nada por adelantado</strong>: aparta tu cupo prioritario y te notificamos primero al llegar.
                      </p>
                      <div className="rwc-actions">
                        <a
                          href="https://wa.me/573193620748?text=Hola%20Krono!%20Deseo%20estar%20en%20la%20lista%20de%20espera%20prioritaria%20para%20la%20colecci%C3%B3n%20Rolex%20Style."
                          target="_blank" rel="noopener noreferrer"
                          onClick={playChime}
                          className="btn-wa-emerald"
                          style={{ width: 'auto', padding: '10px 18px' }}
                        >
                          <MessageCircle className="w-4 h-4" /> Apartar en Lista de Espera
                        </a>
                        <button
                          onClick={() => { setSelectedBrand('invicta'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                          className="btn-order-outline"
                          style={{ width: 'auto', padding: '10px 18px', color: '#fff' }}
                        >
                          Ver Invicta Disponibles →
                        </button>
                      </div>
                    </div>

                    <div className="rwc-models-strip">
                      <span className="rwc-strip-label">Modelos del próximo lote:</span>
                      <div className="rwc-models-grid">
                        {rolexProducts.map(p => (
                          <div
                            key={p.id}
                            className="rwc-model-mini"
                            onClick={() => setLightbox({ open: true, img: p.image, title: `${p.name} (Próximo Lote)` })}
                            title="Clic para ver referencia"
                          >
                            <img src={p.image} alt={p.name} loading="lazy" />
                            <span>{p.name.replace('Krono ', '')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. COMBOS & KITS */}
              {selectedBrand === 'combos' && (
                <div className="brand-dedicated-view">
                  <div className="sec-head sr" style={{ marginBottom: 24, textAlign: 'left' }}>
                    <span className="badge-tag-emerald">🎁 COMBOS &amp; KITS DE LUJO</span>
                    <h1 className="sec-h2" style={{ fontSize: '2.1rem', marginTop: 8, color: '#fff' }}>
                      Todo lo que Incluye tu Kit Krono
                    </h1>
                    <p className="sec-p" style={{ margin: '6px 0 0', maxWidth: 740, color: 'var(--t2)', fontSize: '0.95rem' }}>
                      Sin costos ocultos ni letras pequeñas. Reloj de alta presencia + Estuche rígido acolchado de lujo + Batería sellada en blíster de fábrica + Garantía de 30 días.
                    </p>
                  </div>

                  <div className="combo-strip-grid sr">
                    <div className="cs-card">
                      <div className="cs-badge">PIEZA PRINCIPAL</div>
                      <div className="cs-icon green"><Clock className="w-5 h-5 text-emerald-400" /></div>
                      <h4>1x Reloj de Alta Presencia</h4>
                      <p>Caja robusta de 50mm - 54mm, bisel deportivo y pulso reforzado a tu elección.</p>
                      <span className="cs-val">Valor comercial: $140.000 COP</span>
                    </div>

                    <div className="cs-card gift">
                      <div className="cs-badge gold">OBSEQUIO GRATIS</div>
                      <div className="cs-icon gold"><Box className="w-5 h-5 text-amber-400" /></div>
                      <h4>Estuche Rígido Oficial</h4>
                      <p>Caja rígida acolchada de lujo para lucir y proteger tu reloj.</p>
                      <span className="cs-val free">GRATIS ($0)</span>
                    </div>

                    <div className="cs-card gift">
                      <div className="cs-badge gold">OBSEQUIO GRATIS</div>
                      <div className="cs-icon gold"><BatteryCharging className="w-5 h-5 text-amber-400" /></div>
                      <h4>Batería Sellada Extra</h4>
                      <p>Pila sellada en blíster de fábrica para garantizarte años de duración.</p>
                      <span className="cs-val free">GRATIS ($0)</span>
                    </div>

                    <div className="cs-card">
                      <div className="cs-badge blue">TRANSPORTE SEGURO</div>
                      <div className="cs-icon blue"><ShieldCheck className="w-5 h-5 text-sky-400" /></div>
                      <h4>Garantía &amp; Entrega</h4>
                      <p>Inspección 1 a 1, garantía de 30 días y pago contra entrega al recibir.</p>
                      <span className="cs-val secure">100% SEGURO</span>
                    </div>
                  </div>

                  <div className="combo-cta-bridge sr" style={{ marginTop: 28 }}>
                    <div className="ccb-text">
                      <span>El combo de lujo más completo de Colombia</span>
                      <strong className="text-emerald-400">¡Recibe tu reloj listo para usar con estuche y pila gratis!</strong>
                    </div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          playTick();
                          setSelectedBrand('invicta');
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                        className="btn-cta-emerald"
                        style={{ width: 'auto', padding: '10px 22px' }}
                      >
                        <Clock className="w-4 h-4" /> Elegir Reloj para mi Combo →
                      </button>
                      <a
                        href="https://wa.me/573193620748?text=Hola%20Krono!%20Deseo%20informaci%C3%B3n%20sobre%20el%20Combo%20Completo%20(Reloj%20+%20Estuche%20+%20Pila%20Gratis)."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playChime}
                        className="btn-order-outline"
                        style={{ width: 'auto', padding: '10px 22px', color: '#fff' }}
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" /> Pedir Combo por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. LÍNEA EMPRENDEDORES & MAYORISTAS */}
              {selectedBrand === 'emprendedores' && (
                <div className="brand-dedicated-view">
                  <div className="sec-head sr" style={{ marginBottom: 24, textAlign: 'left' }}>
                    <span className="badge-tag-emerald">💼 LÍNEA MAYORISTA &amp; EMPRENDEDOR</span>
                    <h1 className="sec-h2" style={{ fontSize: '2.1rem', marginTop: 8, color: '#fff' }}>
                      Lotes Mayoristas con 60% de Margen
                    </h1>
                    <p className="sec-p" style={{ margin: '6px 0 0', maxWidth: 740, color: 'var(--t2)', fontSize: '0.95rem' }}>
                      Precios mayoristas preferenciales desde 4 unidades con estuches rígidos oficiales y pilas de repuesto selladas incluidas. Gana dinero vendiendo en tu ciudad.
                    </p>
                  </div>

                  {/* Visual Showcase Banner with Orange Case */}
                  <div className="emp-banner-box sr">
                    <div className="ebb-img">
                      <img
                        src="/assets/img/cat_cover_emprendedores.jpg"
                        alt="Maletín mayorista con relojes Invicta y estuches"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="ebb-info">
                      <span className="badge-red-fire">🔥 LOTE MAYORISTA REAL</span>
                      <h3>Kits Listos con Estuches de Lujo &amp; Baterías</h3>
                      <p>
                        Así recibirás tu lote: cada reloj dentro de su estuche oficial acolchado, con etiqueta de autenticidad y pila de repuesto sellada de obsequio.
                      </p>
                      <div className="ebb-features">
                        <span>✅ Listos para entrega inmediata a tus clientes</span>
                        <span>✅ Fotos y videos en HD para tus redes sociales</span>
                        <span>✅ Asesoría comercial directa 1 a 1 por WhatsApp</span>
                      </div>
                    </div>
                  </div>

                  <div className="emp-grid">
                    {ENTREPRENEUR_COMBOS.map((combo, i) => (
                      <div
                        key={combo.id}
                        className={`emp-card ${combo.featured ? 'featured' : ''} sr d${i + 1}`}
                      >
                        <span className="emp-ribbon">{combo.ribbon}</span>

                        <div className="emp-head">
                          <div className="emp-icon">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                          </div>
                          <h3 className="emp-name">{combo.name}</h3>
                          <p className="emp-desc">{combo.subtitle}</p>
                        </div>

                        <div className="emp-pricing">
                          <div className="emp-price-was">${fmt(combo.oldPriceTotal)} COP</div>
                          <div className="emp-price-now">
                            ${fmt(combo.priceTotal)} <small className="emp-curr">COP</small>
                          </div>
                          <div className="emp-price-unit">
                            A solo <strong className="text-emerald-400">${fmt(combo.pricePerUnit)} COP</strong> por reloj con estuche y pila
                          </div>
                          <span className="emp-save-badge">
                            Ahorras ${fmt(combo.savings)} COP · {combo.discountPct}% OFF
                          </span>
                          <div className="emp-profit-callout">
                            📈 Ganancia estimada para ti: <strong>+${fmt(combo.estimatedProfit)} COP</strong>
                          </div>
                        </div>

                        <div className="emp-includes">
                          <h5>¿Qué incluye este lote?</h5>
                          {combo.includes.map((inc, ii) => (
                            <div key={ii} className="emp-item-row">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{inc}</span>
                            </div>
                          ))}
                        </div>

                        <div className="emp-footer">
                          <a
                            href={directComboWa(combo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playChime}
                            className="btn-cta-emerald w-full"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Pedir {combo.name} por WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón inferior para volver */}
              <div style={{ textAlign: 'center', marginTop: 50, paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => {
                    playTick();
                    setSelectedBrand(null);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="btn-back-header"
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  ← Volver a Todas las Categorías
                </button>
              </div>

            </div>
          </main>
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════════════
            PANTALLA PRINCIPAL (HOME LANDING PAGE)
            Se muestra cuando selectedBrand === null
        ═══════════════════════════════════════════════════════════════ */
        <div>
{/* ── 3. SITE HEADER & NAVIGATION ───────────────────────────────────── */}
      <header className="site-header">
        <div className="container nav-wrap">
          {/* Logo Oficial Krono (Nuevo Logo K Metálico) */}
          <a href="#hero" className="logo-box" onClick={playTick}>
            <div className="logo-img-wrap">
              <img
                src="/assets/img/krono_k_metallic.png"
                alt="Krono Relojería Urbana"
                className="logo-img"
              />
            </div>
            <div>
              <div className="logo-name">KRONO</div>
              <div className="logo-sub">Presencia &amp; Estilo · @krono.ibg</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {[
              ['catalog',        'relojes',  '⌚ Catálogo'],
              ['emprendedor',    'combos',   '💼 Emprendedor ($45K)'],
              ['envios-pais',    'envios',   '🚚 Envíos al País'],
              ['order-builder',  'pedido',   '⚡ Pedir Ahora'],
              ['faq',            'faq',      '❓ Dudas'],
            ].map(([sectionId, tabId, label]) => (
              <button
                key={tabId}
                onClick={() => scrollToSection(sectionId, tabId)}
                className={`nav-a ${activeStoreTab === tabId ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Actions & WhatsApp Header */}
          <div className="nav-actions">
            <a
              href="https://instagram.com/krono.ibg?exln=MWFndzM0MjlrN3k0OA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTick}
              className="nav-icon-circle ig-btn"
              title="Instagram @krono.ibg"
              aria-label="Instagram"
            >
              <IgIcon style={{ width: 16, height: 16 }} />
            </a>

            <a
              href="https://www.tiktok.com/@kronos.ibg?_r=1&_t=ZS-9AOvpsNWBao"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTick}
              className="nav-icon-circle tiktok-btn"
              title="TikTok @kronos.ibg"
              aria-label="TikTok"
            >
              <TikTokIcon style={{ width: 15, height: 15 }} />
            </a>

            {/* Mobile hamburger — shows accordion nav */}
            <button
              className="mob-hamburger"
              onClick={() => { playTick(); setMobMenuOpen(true); }}
              aria-label="Abrir menú"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span>MENÚ</span>
            </button>

            <a
              href="https://wa.me/573193620748?text=Hola%20deseo%20informacion%20de%20los%20relojes%20Krono"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTick}
              className="btn-wa-header"
            >
              <Phone className="w-4 h-4 text-white" /> 319 3620748
            </a>
          </div>
        </div>

        {/* Mobile Quick Category Navigation Strip */}
        <div className="mobile-nav-strip">
          {[
            ['catalog',        'relojes',  '⌚ Catálogo'],
            ['emprendedor',    'combos',   '💼 Mayorista'],
            ['envios-pais',    'envios',   '🚚 Envíos'],
            ['order-builder',  'pedido',   '⚡ Pedir'],
            ['faq',            'faq',      '❓ Dudas'],
          ].map(([sectionId, tabId, label]) => (
            <button
              key={tabId}
              onClick={() => scrollToSection(sectionId, tabId)}
              className={`mob-nav-pill ${activeStoreTab === tabId ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* ── MOBILE ACCORDION NAVIGATION OVERLAY ─────────────────────────────── */}
      <div className={`mob-accordion-overlay ${mobMenuOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="mob-acc-header">
          <a href="#hero" className="mob-acc-logo" onClick={() => { playTick(); setMobMenuOpen(false); }}>
            <img src="/assets/img/krono_k_metallic.png" alt="Krono" />
            <span className="mob-acc-logo-name">KRONO</span>
          </a>
          <button className="mob-acc-close" onClick={() => { playTick(); setMobMenuOpen(false); }} aria-label="Cerrar menú">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Accordion list */}
        <div className="mob-acc-list">

          {/* INICIO — direct link */}
          <div className="mob-acc-item">
            <button
              className="mob-acc-toggle direct"
              onClick={() => scrollToSection('hero', 'relojes')}
            >
              🏠 Inicio
            </button>
          </div>

          {/* CATÁLOGO — expandable */}
          <div className="mob-acc-item">
            <button
              className={`mob-acc-toggle ${mobAccSection === 'catalogo' ? 'expanded' : ''}`}
              onClick={() => { playTick(); setMobAccSection(mobAccSection === 'catalogo' ? null : 'catalogo'); }}
            >
              ⌚ Catálogo de Colecciones
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className={`mob-acc-body ${mobAccSection === 'catalogo' ? 'open' : ''}`}>
              <button className="mob-acc-sub" onClick={() => {
                setSelectedBrand('rolex');
                scrollToSection('catalog', 'relojes');
              }}>
                <span className="acc-emoji">💎</span> Rolex Style ({rolexProducts.length} modelos)
              </button>
              <button className="mob-acc-sub" onClick={() => {
                setSelectedBrand('invicta');
                scrollToSection('catalog', 'relojes');
              }}>
                <span className="acc-emoji">👑</span> Colección Invicta ({invictaProducts.length} modelos)
              </button>
              <button className="mob-acc-sub" onClick={() => {
                setSelectedBrand('combos');
                scrollToSection('catalog', 'relojes');
              }}>
                <span className="acc-emoji">🎁</span> Combos &amp; Kits Completos
              </button>
              <button className="mob-acc-sub" onClick={() => {
                setSelectedBrand('emprendedores');
                scrollToSection('catalog', 'relojes');
              }}>
                <span className="acc-emoji">💼</span> Emprendedores (Mayoristas)
              </button>
              <button className="mob-acc-sub" onClick={() => {
                setSelectedBrand(null);
                scrollToSection('catalog', 'relojes');
              }}>
                <span className="acc-emoji">⚡</span> Ver Todas las Categorías
              </button>
            </div>
          </div>

          {/* QUIÉNES SOMOS — direct */}
          <div className="mob-acc-item">
            <button
              className="mob-acc-toggle direct"
              onClick={() => scrollToSection('quienes-somos', 'quienes')}
            >
              🏢 Quiénes Somos
            </button>
          </div>

          {/* COMBOS EMPRENDEDOR — expandable */}
          <div className="mob-acc-item">
            <button
              className={`mob-acc-toggle ${mobAccSection === 'combos' ? 'expanded' : ''}`}
              onClick={() => { playTick(); setMobAccSection(mobAccSection === 'combos' ? null : 'combos'); }}
            >
              💼 Combos Emprendedor ($45K c/u)
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className={`mob-acc-body ${mobAccSection === 'combos' ? 'open' : ''}`}>
              <button className="mob-acc-sub" onClick={() => scrollToSection('emprendedor', 'combos')}>
                <span className="acc-emoji">📦</span> Pack Inicial x4 — $180.000 COP ($45K c/u)
              </button>
              <button className="mob-acc-sub" onClick={() => scrollToSection('emprendedor', 'combos')}>
                <span className="acc-emoji">🔥</span> Combo Pro x5 — $225.000 COP ($45K c/u)
              </button>
              <button className="mob-acc-sub" onClick={() => scrollToSection('emprendedor', 'combos')}>
                <span className="acc-emoji">🏭</span> Lote x10 — $450.000 COP (Precio Fábrica $45K c/u)
              </button>
            </div>
          </div>

          {/* ENVÍOS — expandable */}
          <div className="mob-acc-item">
            <button
              className={`mob-acc-toggle ${mobAccSection === 'envios' ? 'expanded' : ''}`}
              onClick={() => { playTick(); setMobAccSection(mobAccSection === 'envios' ? null : 'envios'); }}
            >
              🚚 Envíos al País
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className={`mob-acc-body ${mobAccSection === 'envios' ? 'open' : ''}`}>
              <button className="mob-acc-sub" onClick={() => scrollToSection('envios-pais', 'envios')}>
                <span className="acc-emoji">📦</span> Pago Contra Entrega en tu Puerta
              </button>
              <button className="mob-acc-sub" onClick={() => scrollToSection('envios-pais', 'envios')}>
                <span className="acc-emoji">🇨🇴</span> Cobertura Nacional — Inter Rapidísimo &amp; DHL
              </button>
              <button className="mob-acc-sub" onClick={() => scrollToSection('envios-pais', 'envios')}>
                <span className="acc-emoji">📋</span> Comprobantes de Envío Reales
              </button>
            </div>
          </div>

          {/* PEDIR AHORA — direct CTA */}
          <div className="mob-acc-item">
            <button
              className="mob-acc-toggle direct"
              onClick={() => {
                playTick(); setMobMenuOpen(false); setActiveStoreTab('pedido');
                document.getElementById('order-builder')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ color: 'var(--green)', fontWeight: 900 }}
            >
              ⚡ Pedir Ahora
            </button>
          </div>

          {/* FAQ */}
          <div className="mob-acc-item">
            <button
              className="mob-acc-toggle direct"
              onClick={() => {
                playTick(); setMobMenuOpen(false);
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              ❓ Preguntas Frecuentes
            </button>
          </div>
        </div>

        {/* Social buttons at bottom */}
        <div className="mob-acc-social">
          <a
            href="https://wa.me/573193620748?text=Hola%20deseo%20pedir%20mi%20reloj%20Krono"
            target="_blank" rel="noopener noreferrer"
            onClick={() => { playTick(); setMobMenuOpen(false); }}
            className="mob-acc-soc-btn wa"
          >
            <Phone className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href="https://instagram.com/krono.ibg"
            target="_blank" rel="noopener noreferrer"
            onClick={() => { playTick(); setMobMenuOpen(false); }}
            className="mob-acc-soc-btn ig"
          >
            <IgIcon style={{ width: 15, height: 15 }} /> Instagram
          </a>
        </div>
      </div>

      <main>
        {/* ── 4. HERO SECTION ─────────────────────────────────────────────── */}
        <section className="hero" id="hero">
          <div className="container hero-grid">
            {/* Left Content */}
            <div>
              <div className="hero-eyebrow sr d1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>🇨🇴 COLOMBIA · <strong className="text-emerald-400">PAGO CONTRA ENTREGA ASEGURADO</strong></span>
              </div>

              <h1 className="hero-h1 sr d2">
                Relojes que <span className="highlight-gold">Imponen Presencia.</span>
              </h1>

              <p className="hero-p sr d2">
                Colección tipo <strong className="text-amber-400">Invicta</strong> y estilo <strong className="text-amber-400">Rolex</strong> a precio directo de importación. Llévate el Kit Completo por solo <strong className="text-emerald-400 text-xl font-black">$85.000 COP</strong> con estuche rígido + pila gratis. <em>¡Sin pagar nada antes!</em>
              </p>

              {/* Price Hero Box compact with High-Converting Colors */}
              <div className="price-hero-box sr d3">
                <div>
                  <div className="offer-label">
                    <span className="badge-red-fire">🔥 OFERTA LIMITADA</span>
                  </div>
                  <div className="price-row">
                    <span className="price-now">$85.000 <small className="price-curr">COP</small></span>
                    <span className="price-was">$175.000</span>
                    <span className="save-tag-red">51% OFF</span>
                  </div>
                  <div className="savings-callout">
                    ✅ ¡Ahorras <strong className="text-emerald-300">$90.000 COP</strong> comprando hoy!
                  </div>
                </div>

                <div className="includes-list">
                  {[
                    [CheckCircle2, '1x Reloj Tipo Invicta o Rolex Style'],
                    [Gift, <><strong>GRATIS:</strong> Estuche Rígido de Protección</>],
                    [BatteryCharging, <><strong>GRATIS:</strong> Batería Sellada de Repuesto</>],
                    [Tag, 'Etiquetas y sellos de autenticidad'],
                  ].map(([Icon, text], i) => (
                    <div key={i} className="inc-row">
                      <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs with vibrant Emerald Green and Urgency */}
              <div className="cta-row sr d3">
                <button
                  onClick={() => scrollToSection('catalog', 'relojes')}
                  className="btn-cta-emerald"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Ver Catálogo de Relojes
                </button>
                <button
                  onClick={() => scrollToSection('emprendedor', 'combos')}
                  className="btn-ghost-gold"
                >
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  Combos Mayorista ($45K)
                </button>
              </div>

              {/* Trust badges */}
              <div className="trust-row sr d4">
                {[
                  [Truck,  <><strong>Pago Contra Entrega:</strong> Pagas en efectivo al recibir</>],
                  [ShieldCheck, <><strong>Despachos Diarios:</strong> Inter Rapidísimo &amp; DHL Asegurado</>],
                  [Star,   <><strong>+500</strong> Clientes Satisfechos en Colombia</>],
                ].map(([Icon, text], i) => (
                  <div key={i} className="trust-item">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual: Clean, sharp real photo without purple overlay */}
            <div className="watch-visual sr-r d2">
              <div className="watch-frame-clean">
                <img
                  src="/assets/img/watch_invicta_gold_subaqua_real.png"
                  alt="Reloj Krono Subaqua Gold Master — Foto 100% Real"
                  className="hero-watch-img"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="float-tag ft1">
                  <div className="fi green-fi"><BatteryCharging className="w-4 h-4 text-emerald-400" /></div>
                  <div className="ft">
                    <strong className="text-emerald-400">+1 Pila de Regalo</strong>
                    <span>Sellada de fábrica</span>
                  </div>
                </div>
                <div className="float-tag ft2">
                  <div className="fi gold-fi"><Box className="w-4 h-4 text-amber-400" /></div>
                  <div className="ft">
                    <strong className="text-amber-400">Estuche Rígido</strong>
                    <span>Presentación amarilla de lujo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. BARRA DE CONFIANZA & SEGURIDAD (Compacta, Alto Impacto) ──── */}
        <section className="trust-strip-bar" id="quienes-somos">
          <div className="container">
            <div className="trust-strip-grid">
              <div className="ts-item sr d1">
                <div className="ts-icon gold"><ShieldCheck className="w-5 h-5 text-amber-400" /></div>
                <div>
                  <h4>Inspección 1 a 1</h4>
                  <p>Revisado antes de despachar · Garantía 30 días</p>
                </div>
              </div>
              <div className="ts-item sr d2">
                <div className="ts-icon green"><CreditCard className="w-5 h-5 text-emerald-400" /></div>
                <div>
                  <h4>Pago Contra Entrega</h4>
                  <p>Pagas al recibir en mano · Cero riesgo en Colombia</p>
                </div>
              </div>
              <div className="ts-item sr d3">
                <div className="ts-icon blue"><Truck className="w-5 h-5 text-sky-400" /></div>
                <div>
                  <h4>Despachos Diarios</h4>
                  <p>Inter Rapidísimo & DHL · Guía oficial 24/7</p>
                </div>
              </div>
              <div className="ts-item sr d4">
                <div className="ts-icon amber"><Gift className="w-5 h-5 text-amber-400" /></div>
                <div>
                  <h4>Kit Completo Incluido</h4>
                  <p>Reloj + Estuche Rígido + Batería Gratis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. SEGMENTED CONTROL / TABS DE NAVEGACIÓN COMPACTOS ─────────── */}
        <div className="store-nav-sticky" id="store-views">
          <div className="container">
            <div className="store-tabs-wrap">
              {[
                { id: 'relojes', sectionId: 'catalog',       icon: Clock, label: '⌚ Catálogo' },
                { id: 'combos',  sectionId: 'emprendedor',   icon: TrendingUp, label: '💼 Emprendedor ($45K)' },
                { id: 'envios',  sectionId: 'envios-pais',   icon: Truck, label: '🚚 Envíos al País' },
                { id: 'pedido',  sectionId: 'order-builder', icon: ShoppingBag, label: '⚡ Pedir Ahora' },
                { id: 'faq',     sectionId: 'faq',           icon: HelpCircle, label: '❓ Dudas' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.sectionId, tab.id)}
                  className={`store-tab-btn ${activeStoreTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 8. CATÁLOGO CON CATEGORÍAS ────────────────────────────────── */}
        <section className="sec catalog-sec" id="catalog">
          <div className="container">
            <div className="sec-head sr">
              <span className="badge-tag-emerald">⌚ CATÁLOGO KRONO</span>
              <h2 className="sec-h2">Selecciona una Categoría</h2>
              <p className="sec-p" style={{ fontSize: '0.95rem', marginTop: 4 }}>
                Toca cualquier categoría para ver los modelos y paquetes disponibles
              </p>
            </div>

            <div className="category-cover-grid sr" id="catalog-categories">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="cat-cover-card"
                  onClick={() => {
                    playTick();
                    setSelectedBrand(cat.id);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                >
                  <div className="cat-cover-img-wrap">
                    <img src={cat.img} alt={cat.name} loading="lazy" />
                    <span className={`cat-cover-badge ${cat.badgeClass}`}>{cat.badge}</span>
                  </div>
                  <div className="cat-cover-info">
                    <h3 className="cat-cover-title">{cat.name}</h3>
                    <p className="cat-cover-sub">{cat.subtitle}</p>
                    <div className="cat-cover-cta-btn">
                      <span>{cat.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. SECCIÓN: ENVÍOS AL PAÍS (DESPACHOS REALES COMPROBADOS) ───── */}
        <section className="sec envios-sec" id="envios-pais">
            <div className="container">
              <div className="sec-head sr">
                <span className="badge-tag-emerald">🚚 DESPACHOS DIARIOS A TODA COLOMBIA</span>
                <h2 className="sec-h2">Comprobantes de Envío Reales</h2>
                <p className="sec-p">
                  Envíos asegurados y pago contra entrega en la puerta de tu casa. Cero anticipos: revisa fotos de despachos diarios, embalaje térmico y guías oficiales:
                </p>
              </div>

              {/* Verified Trust Strip */}
              <div className="proof-banner-emerald sr" style={{ marginBottom: 20 }}>
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong>Compra 100% Segura:</strong> Empaque térmico de protección, número de guía oficial y rastreo 24/7 en tiempo real con <strong>Inter Rapidísimo &amp; DHL</strong>. Pagas al recibir en tu puerta.
                </div>
              </div>

              {/* 4 Clickable Proof Cards (Zoomable 4-Column Grid) */}
              <div className="shipping-proofs-grid-4 sr">
                {SHIPPING_PROOFS.slice(0, 4).map((proof) => (
                  <div
                    key={proof.id}
                    className="shipping-photo-card"
                    onClick={() => {
                      playTick();
                      setLightbox({ open: true, img: proof.image, title: proof.title });
                    }}
                    title="Clic para ampliar comprobante en alta resolución"
                  >
                    <div className="spc-img-wrap">
                      <img src={proof.image} alt={proof.title} loading="lazy" />
                      <span className="spc-badge" style={{ background: proof.badgeColor }}>
                        {proof.badge}
                      </span>
                      <span className="spc-zoom-icon"><Eye className="w-4 h-4" /></span>
                    </div>
                    <div className="spc-info">
                      <div className="spc-carrier">{proof.carrier}</div>
                      <h4 className="spc-title">{proof.title}</h4>
                      <p className="spc-desc">{proof.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cities Coverage Strip */}
              <div className="cities-delivered-bar sr" style={{ marginTop: 22 }}>
                <span className="cd-title">📍 Cobertura y despachos confirmados a:</span>
                <div className="cd-tags">
                  {['Bogotá D.C.', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Cartagena', 'Pereira', 'Armenia', 'Manizales', 'Neiva', 'Pasto', 'Cúcuta', 'Santa Marta', 'Villavicencio', 'Montería', '+900 Municipios'].map((c, idx) => (
                    <span key={idx} className="cd-tag">✓ {c}</span>
                  ))}
                </div>
              </div>

            </div>
          </section>

        

        {/* ── 12. ORDER BUILDER INTERACTIVO ───────────────────────────────── */}
        <section className="sec order-section" id="order-builder">
            <div className="container">
              <div className="sec-head sr">
                <span className="badge-tag-emerald">PEDIDO RÁPIDO &amp; DIRECTO</span>
                <h2 className="sec-h2">Arma tu Pedido en 30 Segundos</h2>
                <p className="sec-p">
                  Selecciona tu modelo y ciudad. Se genera automáticamente el mensaje directo a tu asesor para despachar hoy.
                </p>
              </div>

              <div className="order-box sr">
                <div className="order-grid">

                  {/* Form Column */}
                  <div>
                    {/* Step 1: Model */}
                    <div className="form-step">
                      <div className="step-label">
                        <span className="step-n">1</span>
                        Selecciona tu Modelo de Reloj:
                      </div>
                      <div className="model-grid-scroll">
                        {PRODUCTS.map(watch => (
                          <div
                            key={watch.id}
                            className={`model-opt-card ${selectedModel.id === watch.id ? 'sel' : ''}`}
                            onClick={() => selectModel(watch)}
                          >
                            <img src={watch.image} alt={watch.name} className="model-thumb-clean" loading="lazy" decoding="async" />
                            <div className="mo-info">
                              <h5>{watch.name}</h5>
                              <span className="mo-price">${fmt(watch.price)} COP</span>
                            </div>
                            {selectedModel.id === watch.id && (
                              <span className="mo-check-badge">✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Quantity */}
                    <div className="form-step">
                      <div className="step-label">
                        <span className="step-n">2</span>
                        ¿Cuántos Kits Deseas?
                      </div>
                      <select
                        className="field-dark"
                        value={qty}
                        onChange={e => { playTick(); setQty(Number(e.target.value)); }}
                      >
                        <option value={1}>1 Kit Completo — $85.000 COP</option>
                        <option value={2}>2 Kits — $160.000 COP (¡Ahorras $10.000 adicionales!)</option>
                        <option value={3}>3 Kits — $235.000 COP (¡Ahorras $20.000 adicionales!)</option>
                      </select>
                    </div>

                    {/* Step 3: Payment Method */}
                    <div className="form-step">
                      <div className="step-label">
                        <span className="step-n">3</span>
                        ¿Cómo prefieres pagar tu pedido?
                      </div>
                      <div className="city-grid">
                        {[
                          { id: 'contraentrega', label: '📦 Pago Contra Entrega', sub: 'Pagas en efectivo al recibir en tu puerta' },
                          { id: 'transferencia', label: '💳 Transferencia Directa', sub: 'Nequi · Daviplata · Bancolombia' },
                        ].map(opt => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => { playTick(); setLocation(opt.id); }}
                            className={`city-opt-btn ${location === opt.id ? 'sel' : ''}`}
                          >
                            <div className="font-bold">{opt.label}</div>
                            <div className="city-opt-sub">{opt.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 4: Contact details */}
                    <div className="form-step">
                      <div className="step-label">
                        <span className="step-n">4</span>
                        Tus Datos para el Despacho (Opcional):
                      </div>
                      <input
                        type="text"
                        placeholder="Tu Nombre Completo"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        maxLength={80}
                        autoComplete="name"
                        aria-label="Tu Nombre Completo"
                        className="field-dark"
                        style={{ marginBottom: 10 }}
                      />
                      <input
                        type="text"
                        placeholder="Tu Ciudad, Dirección y Barrio para despacho"
                        value={customerAddr}
                        onChange={e => setCustomerAddr(e.target.value)}
                        maxLength={120}
                        autoComplete="street-address"
                        aria-label="Dirección y Barrio para despacho"
                        className="field-dark"
                      />
                    </div>
                  </div>

                  {/* Summary Column */}
                  <div>
                    <div className="summary-box-card">
                      <div className="sum-title">
                        <span>Resumen de tu Pedido</span>
                        <Crown className="w-5 h-5 text-amber-400" />
                      </div>

                      <div className="sum-rows">
                        <div className="sum-row">
                          <span style={{ maxWidth: 200 }}>{selectedModel.name} ({qty}x)</span>
                          <span className="font-bold text-white">${fmt(subtotal)} COP</span>
                        </div>
                        <div className="sum-row free">
                          <span>Estuche Rígido Oficial</span>
                          <span className="badge-free">GRATIS</span>
                        </div>
                        <div className="sum-row free">
                          <span>Batería Sellada de Repuesto</span>
                          <span className="badge-free">GRATIS</span>
                        </div>
                        <div className="sum-row free">
                          <span>Etiqueta y Sello de Calidad</span>
                          <span className="badge-free">INCLUIDA</span>
                        </div>
                        <div className="sum-row">
                          <span>Forma de Pago:</span>
                          <span className="text-emerald-400 font-bold">
                            {location === 'contraentrega' ? 'Contra Entrega en Puerta' : 'Transferencia Directa'}
                          </span>
                        </div>
                        <div className="sum-total-box">
                          <span>Total a Cancelar:</span>
                          <span className="total-val">${fmt(subtotal)} COP</span>
                        </div>
                      </div>

                      <div className="delivery-note-box">
                        {location === 'contraentrega' ? (
                          <>
                            <strong className="text-emerald-400">📦 Pago Contra Entrega Garantizado:</strong> Despacho asegurado con guía oficial. Cancelas los <strong>${fmt(subtotal)} COP</strong> en efectivo a la transportadora únicamente al recibir y verificar tu kit en mano.
                          </>
                        ) : (
                          <>
                            <strong className="text-amber-400">💳 Transferencia Directa:</strong> Despacho prioritario el mismo día tras validar tu soporte por Nequi, Daviplata o Bancolombia. Te enviamos foto de tu paquete y guía de rastreo oficial 24/7.
                          </>
                        )}
                      </div>

                      <a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleOrder}
                        className="wa-order-btn"
                      >
                        <MessageCircle className="w-5 h-5" />
                        ¡Quiero mi Reloj! Enviar por WhatsApp
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

        {/* ── 13. TESTIMONIOS ─────────────────────────────────────────────── */}
        {/* ── 13. TESTIMONIOS & COMUNIDAD OFICIAL ───────────────────────── */}
        <section className="sec sec-dark" id="testimonios">
          <div className="container">
            <div className="sec-head sr" style={{ marginBottom: 20 }}>
              <span className="badge-tag-emerald">⭐ OPINIONES &amp; COMUNIDAD OFICIAL</span>
              <h2 className="sec-h2">Lo que Dicen Quienes Ya Usan Krono</h2>
              <p className="sec-p">
                Más de 500 compradores satisfechos en toda Colombia. Síguenos y mira las reviews de nuestros clientes:
              </p>

              {/* Social Follow Strip */}
              <div className="social-follow-strip">
                <a
                  href="https://instagram.com/krono.ibg?exln=MWFndzM0MjlrN3k0OA%3D%3D"
                  target="_blank" rel="noopener noreferrer"
                  onClick={playTick}
                  className="social-pill-btn ig"
                >
                  <IgIcon style={{ width: 15, height: 15 }} />
                  <span>Instagram <strong>@krono.ibg</strong></span>
                </a>
                <a
                  href="https://www.tiktok.com/@kronos.ibg?_r=1&_t=ZS-9AOvpsNWBao"
                  target="_blank" rel="noopener noreferrer"
                  onClick={playTick}
                  className="social-pill-btn tt"
                >
                  <TikTokIcon style={{ width: 14, height: 14 }} />
                  <span>TikTok <strong>@kronos.ibg</strong></span>
                </a>
              </div>
            </div>

            <div className="testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`testi-card sr d${i + 1}`}>
                  <div className="stars">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p className="testi-text">"{t.text}"</p>
                  <div className="client-row">
                    <div className="c-avatar">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="c-name">{t.name}</div>
                      <div className="c-detail">{t.city} · <span className="text-amber-400">{t.watch}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 15. FAQ ACCORDION (100% FUNCIONAL & INTERACTIVO) ────────────── */}
        <section className="sec" id="faq">
          <div className="container">
            <div className="sec-head sr">
              <span className="badge-tag-emerald">DUDAS RESUELTAS</span>
              <h2 className="sec-h2">Preguntas Frecuentes</h2>
              <p className="sec-p">Haz clic en cualquier pregunta para ver la respuesta detallada de nuestro equipo.</p>
            </div>

            <div className="faq-list">
              {FAQS.map((faq, idx) => {
                const isOpen = !!openFaqs[idx];
                return (
                  <div key={idx} className={`faq-card ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-q-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">
                        <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? 'text-emerald-400' : 'text-slate-400'}`} />
                        {faq.q}
                      </span>
                      <ChevronDown className={`faq-chevron w-5 h-5 shrink-0 ${isOpen ? 'rotated' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="faq-a-body">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct WhatsApp Assistance inside FAQ */}
            <div className="faq-cta-box sr">
              <span>¿Tienes alguna otra duda o deseas un modelo específico?</span>
              <a
                href="https://wa.me/573193620748?text=Hola%20tengo%20una%20pregunta%20sobre%20los%20relojes%20Krono"
                target="_blank" rel="noopener noreferrer"
                onClick={playTick}
                className="btn-wa-faq"
              >
                <Phone className="w-4 h-4" /> Chatear con el Asesor (319 3620748)
              </a>
            </div>
          </div>
        </section>
      </main>

      
        </div>
      )}

      {/* ── 16. FOOTER CON NUEVO LOGO METÁLICO ────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="logo-box" onClick={playTick}>
                <div className="logo-img-wrap">
                  <img
                    src="/assets/img/krono_k_metallic.png"
                    alt="Krono Relojería Urbana"
                    className="logo-img"
                  />
                </div>
                <div>
                  <div className="logo-name">KRONO</div>
                  <div className="logo-sub">Presencia &amp; Estilo · @krono.ibg</div>
                </div>
              </a>
              <p>
                Especialistas en relojería robusta tipo Invicta y elegancia Rolex Style con despachos diarios y pago contra entrega garantizado a toda Colombia.
              </p>
            </div>

            <div>
              <h4 className="footer-h">Navegación</h4>
              <ul className="footer-links">
                {[
                  ['#hero', 'Inicio'],
                  ['#catalog', 'Catálogo Invicta & Rolex'],
                  ['#quienes-somos', 'Quiénes Somos'],
                  ['#emprendedor', 'Combos Emprendedor'],
                  ['#envios-pais', 'Envíos a Todo el País'],
                  ['#faq', 'Preguntas Frecuentes'],
                ].map(([href, label], i) => (
                  <li key={i}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-h">Contacto Directo</h4>
              <div className="footer-contact">
                <div className="fc-item">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="https://wa.me/573193620748" target="_blank" rel="noopener noreferrer">
                    WhatsApp: +57 319 3620748
                  </a>
                </div>
                <div className="fc-item">
                  <IgIcon style={{ width: 14, height: 14, color: '#f43f5e' }} />
                  <a href="https://instagram.com/krono.ibg?exln=MWFndzM0MjlrN3k0OA%3D%3D" target="_blank" rel="noopener noreferrer">
                    Instagram: @krono.ibg
                  </a>
                </div>
                <div className="fc-item">
                  <TikTokIcon style={{ width: 14, height: 14, color: '#00f2fe' }} />
                  <a href="https://www.tiktok.com/@kronos.ibg?_r=1&_t=ZS-9AOvpsNWBao" target="_blank" rel="noopener noreferrer">
                    TikTok: @kronos.ibg
                  </a>
                </div>
                <div className="fc-item">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Envíos Diarios a Todo Colombia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Krono (@krono.ibg). Todos los derechos reservados. Relojería de Máxima Presencia en Colombia.</p>
          </div>
        </div>
      </footer>

      {/* ── 17. FLOATING ELEMENTS & MOBILE BAR ────────────────────────────── */}

      {/* WhatsApp bubble */}
      {/* WhatsApp bubble with clean online badge */}
      <div className="fab-wa">
        <div className="fab-tooltip">
          🟢 Asesor en Línea · WhatsApp 319 3620748
        </div>
        <a
          href="https://wa.me/573193620748?text=Hola%20deseo%20ordenar%20mi%20reloj%20Krono"
          target="_blank" rel="noopener noreferrer"
          onClick={playTick}
          className="fab-btn-emerald"
          aria-label="Abrir WhatsApp Krono"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* Sticky mobile bottom bar */}
      <div className="mobile-sticky">
        <div className="ms-inner">
          <div className="ms-price">
            <span className="lbl">Kit Completo</span>
            <span className="val text-emerald-400 font-extrabold">$85.000 COP</span>
          </div>
          <button
            onClick={() => scrollToSection('order-builder', 'pedido')}
            className="ms-btn-emerald"
          >
            <ShoppingBag className="w-4 h-4" />
            Pedir Contra Entrega
          </button>
        </div>
      </div>

      {/* Model selected mini toast */}
      <div className={`model-toast ${modelToast.show ? 'show' : ''}`}>
        ✅ Modelo seleccionado: <strong style={{ marginLeft: 6 }}>{modelToast.name}</strong>
      </div>

      {/* Live buyer notification */}
      {buyerToast.buyer && (
        <div className={`buyer-toast ${buyerToast.show ? 'show' : ''}`}>
          <img src="/assets/img/watch_invicta_gold_subaqua_real.png" alt="Reloj" className="bt-thumb" />
          <div className="bt-info">
            <p>
              <strong>{buyerToast.buyer.name}</strong> en {buyerToast.buyer.city} acaba de pedir <em>{buyerToast.buyer.watch}</em>
            </p>
            <span>Hace un momento</span>
          </div>
        </div>
      )}

      {/* Lightbox modal */}
      {lightbox.open && (
        <div
          className="overlay on"
          onClick={() => setLightbox({ open: false, img: '', title: '' })}
        >
          <div className="ov-box" onClick={e => e.stopPropagation()}>
            <button
              className="ov-close"
              onClick={() => setLightbox({ open: false, img: '', title: '' })}
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightbox.img} alt={lightbox.title} className="ov-img-clean" />
            <div className="ov-footer">
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{lightbox.title}</h4>
              <a
                href="#order-builder"
                onClick={() => setLightbox({ open: false, img: '', title: '' })}
                className="btn-cta-emerald"
                style={{ padding: '8px 18px', fontSize: '.84rem' }}
              >
                Pedir este Modelo ($85.000) <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}