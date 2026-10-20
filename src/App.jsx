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
  const [location, setLocation]                  = useState('ibague');
  const [customerName, setCustomerName]          = useState('');
  const [customerAddr, setCustomerAddr]          = useState('');
  const [activeCatalogTab, setActiveCatalogTab]  = useState('all'); // 'all' | 'invicta' | 'rolex'
  const [activeStoreTab, setActiveStoreTab]      = useState('relojes'); // 'relojes' | 'quienes' | 'combos' | 'envios' | 'incluye' | 'pedido' | 'todo'
  const [openAccordion, setOpenAccordion]        = useState('invicta'); // 'invicta' | 'rolex'
  const [lightbox, setLightbox]                  = useState({ open: false, img: '', title: '' });
  const [boltMediaMode, setBoltMediaMode]        = useState('photo'); // 'photo' | 'video' for Invicta Bolt Silver
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
      { name: 'Camilo R.',    city: 'Ibagué (Cádiz)',     watch: 'Krono Subaqua Gold Master' },
      { name: 'Andrés M.',    city: 'Ibagué (El Vergel)', watch: 'Krono Datejust Two-Tone Gold' },
      { name: 'Mateo G.',     city: 'Ibagué (Jordán)',    watch: 'Combo Emprendedor x5 Pro' },
      { name: 'Sebastián V.', city: 'Bogotá D.C.',        watch: 'Krono Oyster Submariner Black' },
      { name: 'David P.',     city: 'Cali (Valle)',       watch: 'Krono Ghost Skeleton Cyber' },
      { name: 'Alejandro T.', city: 'Medellín',           watch: 'Pack Emprendedor x3 Inicial' },
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
    msg += `📍 *Destino:* ${location === 'ibague' ? 'Ibagué (Tolima) — Pago Contra Entrega Inmediato' : 'Resto de Colombia — Envío Nacional Asegurado'}\n`;
    msg += `💰 *Total a Cancelar:* $${fmt(subtotal)} COP\n`;
    if (customerName.trim()) msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerAddr.trim()) msg += `🏠 *Dirección/Barrio:* ${customerAddr.trim()}\n`;
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
      { id: 'quienes-somos', tab: 'quienes' },
      { id: 'catalog', tab: 'relojes' },
      { id: 'emprendedor', tab: 'combos' },
      { id: 'envios-pais', tab: 'envios' },
      { id: 'combo-detail', tab: 'incluye' },
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

      {/* ── LUXURY TOP ANNOUNCEMENT BAR (Clean, prestigious, high conversion) ── */}
      <div className="luxury-top-bar">
        <div className="luxury-top-content">
          <span className="lt-badge">✦ IBAGUÉ &amp; COLOMBIA</span>
          <span className="lt-text">
            Despachos Diarios · <strong>Pago Contra Entrega</strong> · Kit Completo <strong className="highlight-gold">$85.000 COP</strong> (Reloj + Estuche Rígido + Pila Gratis)
          </span>
          <span className="lt-badge highlight-green">Garantía 30 Días</span>
        </div>
      </div>

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
              ['catalog',        'relojes',  '⌚ Catálogo ($85K)'],
              ['quienes-somos',  'quienes',  '🏢 Quiénes Somos'],
              ['emprendedor',    'combos',   '💼 Combos Emprendedor'],
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
            ['quienes-somos',  'quienes',  '🏢 Nosotros'],
            ['emprendedor',    'combos',   '💼 Emprendedor'],
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
              ⌚ Catálogo ($85K)
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className={`mob-acc-body ${mobAccSection === 'catalogo' ? 'open' : ''}`}>
              <button className="mob-acc-sub" onClick={() => {
                setActiveCatalogTab('all');
                scrollToSection('catalog', 'relojes');
              }}>
                <span className="acc-emoji">⚡</span> Todos los Modelos ({PRODUCTS.length} relojes)
              </button>
              <button className="mob-acc-sub" onClick={() => {
                setActiveCatalogTab('invicta');
                scrollToSection('catalog', 'relojes');
              }}>
                <span className="acc-emoji">👑</span> Colección Invicta ({invictaProducts.length} modelos)
              </button>
              <button className="mob-acc-sub" onClick={() => {
                setActiveCatalogTab('rolex');
                scrollToSection('catalog', 'relojes');
              }}>
                <span className="acc-emoji">💎</span> Colección Rolex Style ({rolexProducts.length} modelos)
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
                <span className="acc-emoji">📍</span> Ibagué — Entrega Hoy Mismo
              </button>
              <button className="mob-acc-sub" onClick={() => scrollToSection('envios-pais', 'envios')}>
                <span className="acc-emoji">🇨🇴</span> Nacional — Inter Rapidísimo & DHL
              </button>
              <button className="mob-acc-sub" onClick={() => scrollToSection('envios-pais', 'envios')}>
                <span className="acc-emoji">📋</span> Ver Comprobantes de Envío Reales
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
              ⚡ Pedir Ahora ($85.000 COP)
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
                <span>🇨🇴 Ibagué &amp; Colombia · <strong className="text-emerald-400">PAGO CONTRA ENTREGA</strong></span>
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
                  onClick={() => scrollToSection('order-builder', 'pedido')}
                  className="btn-cta-emerald"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Pedir Contra Entrega ($85K)
                </button>
                <button
                  onClick={() => scrollToSection('emprendedor', 'combos')}
                  className="btn-ghost-gold"
                >
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  Combos Emprendedor ($45K)
                </button>
                <button
                  onClick={() => scrollToSection('envios-pais', 'envios')}
                  className="btn-ghost-white"
                >
                  <Truck className="w-5 h-5 text-emerald-400" />
                  Envíos al País
                </button>
              </div>

              {/* Trust badges */}
              <div className="trust-row sr d4">
                {[
                  [MapPin, <><strong>Ibagué:</strong> Pago Contra Entrega Inmediato</>],
                  [Truck,  <><strong>Colombia:</strong> Envíos Rápidos Inter Rapidísimo</>],
                  [Star,   <><strong>+500</strong> Clientes Satisfechos</>],
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

        {/* ── 5. SECCIÓN: QUIÉNES SOMOS CORTO (TRANSPARENCIA & CONFIANZA) ──── */}
        <section className="sec quienes-sec" id="quienes-somos">
          <div className="container">
            <div className="quienes-card sr">
              <div className="quienes-header">
                <span className="badge-tag-emerald">🏢 SOBRE KRONO RELOJERÍA</span>
                <h2 className="quienes-h2">
                  Relojería de Alto Perfil <span className="highlight-gold">Sin Intermediarios</span>
                </h2>
                <p className="quienes-p">
                  En <strong>Krono (@krono.ibg)</strong> nacimos en <strong>Ibagué, Tolima</strong>, con un propósito directo: poner en tu muñeca piezas imponentes inspiradas en la robustez de <em>Invicta</em> y la distinción de <em>Rolex</em>, sin cobrarte los sobreprecios de centros comerciales. Despachamos directamente desde nuestra bodega local a todo Colombia.
                </p>
              </div>

              <div className="quienes-grid">
                <div className="q-item">
                  <div className="q-icon-box gold">
                    <ShieldCheck className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4>Inspección 1 a 1 con Guantes</h4>
                  <p>Antes de salir, cada reloj es probado minuciosamente, se verifica el sello hermético y se embala protegido.</p>
                </div>

                <div className="q-item">
                  <div className="q-icon-box green">
                    <CreditCard className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4>Pago Contra Entrega Cero Riesgo</h4>
                  <p>No arriesgas tu dinero por internet. En Ibagué y a nivel nacional pagas al recibir y verificar tu producto.</p>
                </div>

                <div className="q-item">
                  <div className="q-icon-box blue">
                    <Truck className="w-6 h-6 text-sky-400" />
                  </div>
                  <h4>Despachos Diarios con Guía</h4>
                  <p>Alianzas directas con Inter Rapidísimo, DHL y Servientrega con guía de rastreo en tiempo real.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. BENEFITS BAR ─────────────────────────────────────────────── */}
        <section className="benefits-bar" id="beneficios">
          <div className="container">
            <div className="benefits-grid">
              {BENEFITS.map((b, i) => (
                <div key={i} className="benefit-item sr d1">
                  <div className="benefit-icon">
                    {b.icon === 'Truck' && <Truck className="w-5 h-5 text-emerald-400" />}
                    {b.icon === 'Gift' && <Gift className="w-5 h-5 text-amber-400" />}
                    {b.icon === 'Phone' && <Phone className="w-5 h-5 text-emerald-400" />}
                    {b.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5 text-sky-400" />}
                  </div>
                  <div className="benefit-text">
                    <h4>{b.title}</h4>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. SEGMENTED CONTROL / TABS DE NAVEGACIÓN ───────────────────── */}
        <div className="store-nav-sticky" id="store-views">
          <div className="container">
            <div className="store-tabs-wrap">
              {[
                { id: 'relojes', sectionId: 'catalog',       icon: Clock, label: '⌚ Relojes ($85K)' },
                { id: 'combos',  sectionId: 'emprendedor',   icon: TrendingUp, label: '💼 Combos ($45K)' },
                { id: 'envios',  sectionId: 'envios-pais',   icon: Truck, label: '🚚 Envíos al País' },
                { id: 'quienes', sectionId: 'quienes-somos', icon: Award, label: '🏢 Quiénes Somos' },
                { id: 'incluye', sectionId: 'combo-detail',  icon: Gift, label: '🎁 ¿Qué Incluye?' },
                { id: 'pedido',  sectionId: 'order-builder', icon: ShoppingBag, label: '⚡ Pedir Ahora' },
                { id: 'faq',     sectionId: 'faq',           icon: HelpCircle, label: '❓ Preguntas' },
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

        {/* ── 8. CATÁLOGO CON CATEGORÍAS ROLEX & INVICTA ──────────────────── */}
        <section className="sec catalog-sec" id="catalog">
          <div className="container">
            <div className="sec-head sr">
              <span className="badge-tag-emerald">⌚ CATÁLOGO EXCLUSIVO 2026</span>
              <h2 className="sec-h2">
                Cualquier Modelo a solo <span className="highlight-gold">$85.000 COP</span>
              </h2>
              <p className="sec-p">
                🎁 Incluye <strong>Reloj + Estuche Rígido + Batería Sellada Gratis</strong>. Pago Contra Entrega en Ibagué y Envíos a todo Colombia.
              </p>

              {/* Brand Tabs Filter */}
              <div className="brand-filter-pill-row">
                <button
                  onClick={() => { playTick(); setActiveCatalogTab('all'); }}
                  className={`brand-pill ${activeCatalogTab === 'all' ? 'active' : ''}`}
                >
                  ⚡ Todos los Modelos ({PRODUCTS.length})
                </button>
                <button
                  onClick={() => { playTick(); setActiveCatalogTab('invicta'); }}
                  className={`brand-pill ${activeCatalogTab === 'invicta' ? 'active' : ''}`}
                >
                  👑 Colección Invicta ({invictaProducts.length})
                </button>
                <button
                  onClick={() => { playTick(); setActiveCatalogTab('rolex'); }}
                  className={`brand-pill ${activeCatalogTab === 'rolex' ? 'active' : ''}`}
                >
                  💎 Colección Rolex Style ({rolexProducts.length})
                </button>
              </div>
            </div>

            {/* Categoría 1: Colección Invicta */}
            {(activeCatalogTab === 'all' || activeCatalogTab === 'invicta') && (
              <div className="brand-section-block">
                <div className="brand-category-header">
                  <div className="bch-left">
                    <span className="bch-badge gold">👑 FUERZA &amp; PRESENCIA PESADA</span>
                    <h3 className="bch-title">Colección Invicta (Subaqua, Bolt &amp; Skeleton)</h3>
                    <p className="bch-sub">Cajas de 50mm - 54mm, biseles dentados, tornillería perimetral y pulso de silicona vulcanizada.</p>
                  </div>
                  <span className="bch-price-pill">$85.000 COP c/u</span>
                </div>

                {/* ── INVICTA SHOWCASE: Video real en vivo de la colección ─── */}
                <div className="invicta-video-showcase-card sr">
                  <div>
                    <span className="bch-badge gold" style={{ marginBottom: 6, display: 'inline-block' }}>🎬 VIDEO REAL EN CAJA OFICIAL</span>
                    <h3 className="ivs-title">Krono Bolt Phantom Silver — En Vivo desde Bodega</h3>
                    <p className="ivs-desc">
                      Mira el reloj que más piden: esfera plateada texturizada, números en relieve gigantes y caja de 54mm.
                      Grabado en nuestra bodega con caja Invicta original. <strong>Sin filtros, sin edición.</strong>
                    </p>
                    <div className="ivs-features">
                      <span>⚡ 54mm Caja Maciza</span>
                      <span>💎 Esfera Plateada</span>
                      <span>🛡️ Garantía 30 Días</span>
                      <span>📦 Caja Invicta Real</span>
                    </div>
                    <div className="ivs-price-row">
                      <span className="ivs-price">$85.000 <small>COP</small></span>
                      <span className="ivs-save">53% OFF</span>
                    </div>
                    <a
                      href="https://wa.me/573193620748?text=Hola%20Krono!%20Vi%20el%20video%20del%20Bolt%20Phantom%20Silver%20y%20me%20interesa.%20%C2%BFTiene%20disponibilidad%3F"
                      target="_blank" rel="noopener noreferrer"
                      onClick={playChime}
                      className="btn-wa-emerald"
                      style={{ width: '100%', justifyContent: 'center', maxWidth: 320 }}
                    >
                      <MessageCircle style={{ width: 16, height: 16 }} /> Lo Quiero — WhatsApp Directo
                    </a>
                  </div>
                  <div className="ivs-phone-frame">
                    <video
                      src="/assets/img/shipping_video_real.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="ivs-video"
                    >
                      Tu navegador no soporta video HTML5.
                    </video>
                  </div>
                </div>

                <div className="prod-list-clean">
                  {invictaProducts.map((p) => {
                    const isBolt = p.id === 'krono-bolt-silver-phantom';
                    return (
                    <article key={p.id} className="prod-card-clean">
                      <div className="pcc-img-box" style={{ position: 'relative' }}>
                        {/* Photo / Video toggle for Bolt Silver Phantom */}
                        {isBolt && (
                          <div className="card-media-toggle">
                            <button
                              className={`cmt-btn ${boltMediaMode === 'photo' ? 'active' : ''}`}
                              onClick={(e) => { e.stopPropagation(); setBoltMediaMode('photo'); }}
                            >📷 Foto</button>
                            <button
                              className={`cmt-btn ${boltMediaMode === 'video' ? 'active' : ''}`}
                              onClick={(e) => { e.stopPropagation(); setBoltMediaMode('video'); }}
                            >🎬 Video</button>
                          </div>
                        )}

                        {isBolt && boltMediaMode === 'video' ? (
                          <video
                            src="/assets/img/shipping_video_real.mp4"
                            autoPlay muted loop playsInline preload="metadata"
                            className="pcc-card-video"
                            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
                          />
                        ) : (
                          <img
                            src={p.image}
                            alt={p.name}
                            loading="lazy"
                            onClick={() => setLightbox({ open: true, img: p.image, title: p.name })}
                            style={{ cursor: 'zoom-in' }}
                          />
                        )}
                        <span className="pcc-badge-top">{p.badge}</span>
                        {(!isBolt || boltMediaMode === 'photo') && (
                          <button className="pcc-zoom-btn" title="Ampliar foto" onClick={() => setLightbox({ open: true, img: p.image, title: p.name })}>
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="pcc-content">
                        <div className="pcc-header">
                          <div>
                            <span className="pcc-series">{p.series}</span>
                            <h4 className="pcc-name">{p.name}</h4>
                          </div>
                          <span className="pcc-stock-badge">{p.stock}</span>
                        </div>

                        <p className="pcc-spec-text">{p.specs[0]}</p>

                        <div className="pcc-pricing">
                          <div className="pcc-prices">
                            <span className="pcc-was">Antes <s>${fmt(p.oldPrice)}</s></span>
                            <span className="pcc-now">${fmt(p.price)} <small>COP</small></span>
                          </div>
                          <span className="pcc-savings-pill">
                            🔥 Ahorras ${fmt(p.savings)} ({p.discountPct}% OFF)
                          </span>
                        </div>

                        <div className="pcc-actions">
                          <a
                            href={directProductWa(p)}
                            target="_blank" rel="noopener noreferrer"
                            onClick={playChime}
                            className="btn-wa-emerald"
                          >
                            <MessageCircle className="w-4 h-4" /> ¡Lo Quiero! (WhatsApp)
                          </a>
                          <button
                            className="btn-order-outline"
                            onClick={() => selectAndScroll(p)}
                          >
                            Armar Pedido <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Categoría 2: Colección Rolex Style — AGOTADO */}
            {(activeCatalogTab === 'all' || activeCatalogTab === 'rolex') && (
              <div className="brand-section-block" style={{ marginTop: 40 }}>
                <div className="brand-category-header rolex-header">
                  <div className="bch-left">
                    <span className="bch-badge green">💎 PRESTIGIO &amp; ELEGANCIA CLÁSICA</span>
                    <h3 className="bch-title">Colección Rolex Style (Submariner, Datejust, Day-Date, Daytona)</h3>
                    <p className="bch-sub">Biseles estriados, cerámicos, esferas limpias, pulso Oyster o Jubilee y lupa de fechador de alta distinción.</p>
                  </div>
                  <span className="bch-price-pill" style={{ background: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.4)', color: '#f87171' }}>🚫 AGOTADO</span>
                </div>

                {/* AVISO AGOTADO PROMINENTE */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(17,24,39,0.95))',
                  border: '1px solid rgba(239,68,68,0.35)',
                  borderRadius: 'var(--r3)',
                  padding: '20px 24px',
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}>
                  <span style={{ fontSize: '2rem' }}>🚫</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 900, fontSize: '1rem', color: '#f87171', marginBottom: 4 }}>
                      Colección Rolex Style — Agotada hasta nuevo aviso
                    </p>
                    <p style={{ fontSize: '0.84rem', color: 'var(--t2)', margin: 0 }}>
                      Estamos reabasteciendo. Escríbenos por WhatsApp para estar en la <strong style={{ color: 'var(--green)' }}>lista de espera prioritaria</strong> y ser el primero en recibir tu pedido cuando llegue el nuevo lote.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/573193620748?text=Hola%20Krono!%20Me%20interesa%20la%20colecci%C3%B3n%20Rolex%20Style.%20%C2%BFCu%C3%A1ndo%20llega%20el%20nuevo%20lote%3F%20Quiero%20quedar%20en%20lista%20de%20espera."
                    target="_blank" rel="noopener noreferrer"
                    onClick={playChime}
                    className="btn-wa-emerald"
                    style={{ flexShrink: 0 }}
                  >
                    <MessageCircle style={{ width: 16, height: 16 }} /> Lista de Espera
                  </a>
                </div>

                <div className="prod-list-clean">
                  {rolexProducts.map((p) => (
                    <article key={p.id} className="prod-card-clean rolex-card" style={{ opacity: 0.55, pointerEvents: 'none', filter: 'grayscale(0.6)' }}>
                      <div className="pcc-img-box" style={{ position: 'relative' }}>
                        <img src={p.image} alt={p.name} loading="lazy" />
                        {/* AGOTADO overlay */}
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(0,0,0,0.55)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 'inherit',
                        }}>
                          <span style={{
                            background: 'rgba(239,68,68,0.9)',
                            color: '#fff', fontWeight: 900, fontSize: '0.82rem',
                            padding: '6px 14px', borderRadius: 'var(--rF)',
                            letterSpacing: '0.05em',
                          }}>🚫 AGOTADO</span>
                        </div>
                      </div>

                      <div className="pcc-content">
                        <div className="pcc-header">
                          <div>
                            <span className="pcc-series">{p.series}</span>
                            <h4 className="pcc-name">{p.name}</h4>
                          </div>
                          <span className="pcc-stock-badge" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}>
                            Agotado
                          </span>
                        </div>
                        <p className="pcc-spec-text">{p.specs[0]}</p>
                        <div className="pcc-pricing" style={{ opacity: 0.5 }}>
                          <div className="pcc-prices">
                            <span className="pcc-was">Antes <s>${fmt(p.oldPrice)}</s></span>
                            <span className="pcc-now">${fmt(p.price)} <small>COP</small></span>
                          </div>
                        </div>
                        <div className="pcc-actions">
                          <button className="btn-wa-emerald" disabled style={{ opacity: 0.4, cursor: 'not-allowed' }}>
                            <MessageCircle className="w-4 h-4" /> No Disponible
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Wholesale Nudge */}
            <div className="wholesale-nudge sr">
              <span>💼 <strong>¿Deseas comprar por lote para revender?</strong> Precios mayoristas desde <strong>$64.000 COP/reloj</strong> · hasta <strong className="text-emerald-400">60% de margen</strong></span>
              <a
                href="#emprendedor"
                onClick={playTick}
                className="btn-nudge-emerald"
              >
                Ver Combos Emprendedor <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── 9. COMBOS EMPRENDEDOR & MAYORISTA ───────────────────────────── */}
        <section className="sec emprendedor-section" id="emprendedor">
            <div className="container">
              <div className="sec-head sr">
                <span className="badge-tag-emerald">💼 LÍNEA EMPRENDEDOR &amp; MAYORISTA</span>
                <h2 className="sec-h2">Combos Emprendedor: Gana Dinero Vendiendo Krono</h2>
                <p className="sec-p">
                  Armamos lotes especiales con los <strong>modelos Invicta reales</strong> que tenemos en bodega con sus <strong>cajas amarillas rígidas</strong> y <strong>baterías selladas</strong> incluidas. Obtén hasta un <strong>60% de ganancia</strong> directa.
                </p>
              </div>

              {/* Visual Showcase Banner with Real Photo */}
              <div className="emp-banner-box sr">
                <div className="ebb-img">
                  <img
                    src="/assets/img/media_1791997978060.png"
                    alt="Stock real de Invicta con estuches amarillos y pilas"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="ebb-info">
                  <span className="badge-red-fire">🔥 FOTO 100% REAL DE NUESTRO STOCK</span>
                  <h3>Kits Listos con Estuches Amarillos de Lujo &amp; Baterías</h3>
                  <p>
                    Así recibirás tu lote: cada reloj dentro de su caja amarilla rígida oficial, con almohadilla de protección, etiqueta de la marca y pila de repuesto sellada de obsequio.
                  </p>
                  <div className="ebb-features">
                    <span>✅ Listos para entrega inmediata</span>
                    <span>✅ Fotos en HD para tus redes</span>
                    <span>✅ Asesoría comercial personalizada</span>
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

              {/* Quick switch to individual watches */}
              <div className="switch-to-single sr">
                <p>
                  ⌚ <strong>¿Solo buscas 1 reloj para uso personal?</strong> Llévatelo en combo completo por solo <strong>$85.000 COP</strong>.
                </p>
                <button 
                  onClick={() => { playTick(); setActiveStoreTab('relojes'); document.getElementById('store-views')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-ghost-gold" 
                >
                  Ver Catálogo Individual ($85K) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

        {/* ── 10. SECCIÓN: ENVÍOS AL PAÍS (DESPACHOS REALES COMPROBADOS) ───── */}
        <section className="sec envios-sec" id="envios-pais">
            <div className="container">
              <div className="sec-head sr">
                <span className="badge-tag-emerald">🚚 TRANSPARENCIA &amp; DESPACHOS DIARIOS</span>
                <h2 className="sec-h2">Envíos Reales a Todo el País</h2>
                <p className="sec-p">
                  Aquí no hay promesas vacías: mira los <strong>paquetes sellados</strong>, <strong>guías oficiales de Inter Rapidísimo y DHL</strong> y pedidos despachados directamente por WhatsApp a clientes en toda Colombia.
                </p>
              </div>

              {/* Trust Callout Banner */}
              <div className="proof-banner-emerald sr">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <strong>Seguridad Garantizada:</strong> Todos los paquetes viajan asegurados con empaque térmico de protección y número de guía oficial para rastreo 24/7 en tiempo real.
                </div>
              </div>

              {/* Grid de Comprobantes de Envío Reales */}
              <div className="shipping-proof-grid">
                {SHIPPING_PROOFS.map((proof, i) => (
                  <div
                    key={proof.id}
                    className={`sp-card sr d${(i % 3) + 1}`}
                    onClick={() => {
                      playTick();
                      setLightbox({ open: true, img: proof.image, title: proof.title });
                    }}
                  >
                    <div className="sp-img-box">
                      <img src={proof.image} alt={proof.title} loading="lazy" />
                      <span className="sp-badge-tag" style={{ background: proof.badgeColor }}>
                        {proof.badge}
                      </span>
                    </div>
                    <div className="sp-body">
                      <div className="sp-meta-top">
                        <span className="sp-city"><MapPin className="w-3.5 h-3.5 text-emerald-400 inline" /> {proof.city}</span>
                        <span className="sp-carrier">{proof.carrier}</span>
                      </div>
                      <h4 className="sp-title">{proof.title}</h4>
                      <p className="sp-desc">{proof.desc}</p>
                      <button className="sp-expand-link">
                        <Eye className="w-3.5 h-3.5" /> Ver Comprobante Completo
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Cities Marquee */}
              <div className="cities-delivered-bar sr">
                <span className="cd-title">📍 Ciudades con Despachos Confirmados:</span>
                <div className="cd-tags">
                  {['Bogotá D.C.', 'Cali (Valle)', 'Medellín', 'Barranquilla', 'Bucaramanga', 'Ibagué (Local)', 'Pereira', 'Armenia', 'Neiva', 'Pasto', 'Cartagena', 'Cúcuta', 'Villavicencio', 'Santa Marta'].map((c, idx) => (
                    <span key={idx} className="cd-tag">✓ {c}</span>
                  ))}
                </div>
              </div>

              {/* ── VIDEO REAL DE DESPACHOS ──────────────────────────────── */}
              <div className="shipping-video-block sr">
                <div className="shipping-video-label">
                  <Camera className="w-5 h-5 text-emerald-400" />
                  <span>Video Real: Despachos Diarios desde Ibagué</span>
                  <span className="badge-live">🔴 REAL</span>
                </div>
                <div className="shipping-video-card">
                  <div className="shipping-video-meta">
                    <div className="shipping-video-icon">
                      <Send className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3>📦 Mira Cómo Despachamos tus Pedidos</h3>
                      <p>Video 100% real de nuestros despachos diarios — embalaje, guías y entrega a transportadora</p>
                    </div>
                  </div>
                  {/* VIDEO REAL — Despachos desde Ibagué (Formato Smartphone 9:16) */}
                  <div className="shipping-phone-mockup">
                    <div className="phone-island-top">
                      <span>Krono Ibagué</span>
                      <div className="phone-pill-cam">
                        <div className="phone-cam-dot" />
                      </div>
                      <span>4G 🔋</span>
                    </div>
                    <div className="video-vertical-wrap">
                      <video
                        src="/assets/img/shipping_video_real.mp4"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        Tu navegador no soporta video HTML5.
                      </video>
                    </div>
                  </div>
                </div>
                <p style={{ textAlign: 'center', color: 'var(--t3)', fontSize: '0.78rem', marginTop: 10 }}>
                  ¿Quieres ver más envíos en tiempo real? Síguenos en{' '}
                  <a href="https://instagram.com/krono.ibg" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>@krono.ibg</a>
                  {' '}·{' '}
                  <a href="https://www.tiktok.com/@kronos.ibg" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>@kronos.ibg</a>
                </p>
              </div>

            </div>
          </section>

        {/* ── 11. DETALLE DEL COMBO $85.000 ────────────────────────────────── */}
        <section className="sec" id="combo-detail">
            <div className="container">
              <div className="sec-head sr">
                <span className="badge-tag-emerald">KIT COMPLETO $85K</span>
                <h2 className="sec-h2">¿Qué Recibes por tus $85.000 COP?</h2>
                <p className="sec-p">
                  Todo lo necesario en una sola compra. Cero costos ocultos ni cobros sorpresa.
                </p>
              </div>

              <div className="combo-grid">
                {[
                  { n:'01', Icon: Clock, title:'Reloj de Alta Presencia',
                    desc:'Caja deportiva robusta de 50mm - 54mm con bisel giratorio y pulso reforzado.',
                    pill:<><Check className="w-3.5 h-3.5 text-emerald-400" /> Diseño Imponente</> },
                  { n:'02', Icon: Box, title:'Estuche Rígido de Protección',
                    desc:'Caja rígida acolchada oficial para guardar y lucir tu reloj con elegancia.',
                    pill:<><Gift className="w-3.5 h-3.5 text-amber-400" /> Obsequio $0</> },
                  { n:'03', Icon: BatteryCharging, title:'Batería de Repuesto Sellada',
                    desc:'Pila sellada en blíster de fábrica para garantizarte años de duración.',
                    pill:<><Gift className="w-3.5 h-3.5 text-amber-400" /> Obsequio $0</> },
                  { n:'04', Icon: Tag, title:'Etiquetas y Sellos Oficiales',
                    desc:'Inspección física previa en Ibagué y certificado de calidad garantizada.',
                    pill:<><ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> 100% Nuevo</> },
                ].map(({ n, Icon, title, desc, pill }, i) => (
                  <div key={n} className={`combo-card sr d${i + 1}`}>
                    <span className="cc-num">{n}</span>
                    <div className="cc-icon">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="cc-title">{title}</h3>
                    <p className="cc-desc">{desc}</p>
                    <span className="cc-pill">
                      {pill}
                    </span>
                  </div>
                ))}
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

                    {/* Step 3: Location */}
                    <div className="form-step">
                      <div className="step-label">
                        <span className="step-n">3</span>
                        ¿Dónde te encuentras?
                      </div>
                      <div className="city-grid">
                        {[
                          { id: 'ibague',   label: '📍 Ibagué (Tolima)',    sub: 'Pago Contra Entrega Inmediato' },
                          { id: 'nacional', label: '🇨🇴 Resto de Colombia', sub: 'Envío Nacional Asegurado' },
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
                        placeholder="Dirección y Barrio en Ibagué / Tu Ciudad"
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
                          <span>Método de Entrega:</span>
                          <span className="text-emerald-400 font-bold">
                            {location === 'ibague' ? 'Contra Entrega Ibagué' : 'Envío Nacional'}
                          </span>
                        </div>
                        <div className="sum-total-box">
                          <span>Total a Cancelar:</span>
                          <span className="total-val">${fmt(subtotal)} COP</span>
                        </div>
                      </div>

                      <div className="delivery-note-box">
                        {location === 'ibague' ? (
                          <>
                            <strong className="text-emerald-400">📍 Contra Entrega en Ibagué:</strong> Entrega hoy mismo o en 24h. No pagas nada por adelantado — cancelas los <strong>${fmt(subtotal)} COP</strong> cuando recibas y verifiques tu kit en tus manos.
                          </>
                        ) : (
                          <>
                            <strong className="text-amber-400">🇨🇴 Envíos a todo Colombia:</strong> Solo abonas el flete (~$15.000 COP) para generar la guía oficial con seguro. Los <strong>${fmt(subtotal)} COP</strong> del reloj los pagas en efectivo a la transportadora al recibir en tu puerta.
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
        <section className="sec sec-dark">
          <div className="container">
            <div className="sec-head sr">
              <span className="badge-tag-emerald">OPINIONES COMPROBADAS</span>
              <h2 className="sec-h2">Lo que Dicen Quienes Ya Usan Krono</h2>
              <p className="sec-p">
                Clientes y emprendedores reales en Ibagué y toda Colombia que confirmaron calidad, rapidez y confianza.
              </p>
            </div>

            <div className="testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`testi-card sr d${i + 1}`}>
                  <div className="stars">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} size={18} fill="#f59e0b" color="#f59e0b" />
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

        {/* ── 14. COMUNIDAD OFICIAL (Instagram & TikTok) ──────────────────── */}
        <section className="container sr" style={{ marginBottom: 60 }} id="redes">
          <div className="social-community-grid">
            {/* Instagram Card */}
            <div className="social-card ig-box">
              <div>
                <div className="social-head">
                  <div className="social-badge-icon ig-bg">
                    <IgIcon style={{ width: 22, height: 22 }} />
                  </div>
                  <div className="social-info">
                    <h4>Instagram Oficial</h4>
                    <span>@krono.ibg</span>
                  </div>
                </div>
                <p className="social-p">
                  Stories diarias con nuevos modelos, fotos reales, videos de los relojes bajo la luz del sol y despachos en Ibagué.
                </p>
              </div>
              <a
                href="https://instagram.com/krono.ibg?exln=MWFndzM0MjlrN3k0OA%3D%3D"
                target="_blank" rel="noopener noreferrer"
                onClick={playTick}
                className="btn-ig-pill"
              >
                <IgIcon style={{ width: 17, height: 17 }} />
                Seguir en Instagram @krono.ibg
              </a>
            </div>

            {/* TikTok Card */}
            <div className="social-card tt-box">
              <div>
                <div className="social-head">
                  <div className="social-badge-icon tt-bg">
                    <TikTokIcon style={{ width: 22, height: 22 }} />
                  </div>
                  <div className="social-info">
                    <h4>TikTok Oficial</h4>
                    <span>@kronos.ibg</span>
                  </div>
                </div>
                <p className="social-p">
                  Pruebas de peso en muñeca, detalles de la maquinaria, unboxing y promociones exclusivas para nuestra comunidad.
                </p>
              </div>
              <a
                href="https://www.tiktok.com/@kronos.ibg?_r=1&_t=ZS-9AOvpsNWBao"
                target="_blank" rel="noopener noreferrer"
                onClick={playTick}
                className="btn-tt-pill"
              >
                <TikTokIcon style={{ width: 17, height: 17 }} />
                Seguir en TikTok @kronos.ibg
              </a>
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
                Especialistas en relojería robusta tipo Invicta y elegancia Rolex Style en Ibagué, Tolima y despachos con cobro contra entrega garantizados a todo Colombia.
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
                  <span>Ibagué, Tolima, Colombia</span>
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
