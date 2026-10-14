import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import confetti from 'canvas-confetti';
import {
  Crown, CheckCircle2, Gift, Tag, BatteryCharging, Box, ShieldCheck,
  Truck, MapPin, Star, Phone, Camera, ChevronDown, ShoppingBag,
  Zap, Clock, X, Check, ArrowRight, Flame, Sparkles, TrendingUp,
  CreditCard, DollarSign, Award, Layers, MessageCircle
} from 'lucide-react';

import {
  PRODUCTS, ENTREPRENEUR_COMBOS, BENEFITS, PAYMENT_METHODS,
  REAL_PHOTOS, STORIES, TESTIMONIALS, FAQS
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
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== current) {
      setPrev(current);
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

/* ─── Canvas Particles ───────────────────────────────────────────────────── */
function GoldParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.5,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.2 - 0.08,
      alpha: Math.random() * 0.5 + 0.15,
      dAlpha: (Math.random() - 0.5) * 0.005,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha += p.dAlpha;
        if (p.alpha > 0.65 || p.alpha < 0.08) p.dAlpha *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particles"
    />
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
  const [selectedModel, setSelectedModel]   = useState(PRODUCTS[0]);
  const [qty, setQty]                        = useState(1);
  const [location, setLocation]              = useState('ibague');
  const [customerName, setCustomerName]      = useState('');
  const [customerAddr, setCustomerAddr]      = useState('');
  const [activeFilter, setActiveFilter]      = useState('all');
  const [lightbox, setLightbox]              = useState({ open: false, img: '', title: '' });
  const [stories, setStories]               = useState({ open: false, idx: 0 });
  const [activeFaq, setActiveFaq]            = useState(0);
  const [buyerToast, setBuyerToast]          = useState({ show: false, buyer: null });
  const [modelToast, setModelToast]          = useState({ show: false, name: '' });
  const [time, setTime]                      = useState({ h: 2, m: 47, s: 35 });

  useScrollReveal();

  /* Countdown */
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

  /* Buyer toasts loop */
  useEffect(() => {
    const buyers = [
      { name: 'Camilo R.',    city: 'Ibagué (Cádiz)',     watch: 'Krono Subaqua Gold King' },
      { name: 'Andrés M.',    city: 'Ibagué (El Vergel)', watch: 'Krono Chrono Stealth Black' },
      { name: 'Mateo G.',     city: 'Ibagué (Jordan)',    watch: 'Combo Emprendedor x5' },
      { name: 'Sebastián V.', city: 'Bogotá D.C.',        watch: 'Krono Ocean Blue Sapphire' },
      { name: 'David P.',     city: 'Ibagué (Centro)',    watch: 'Krono Venom Red Sport' },
      { name: 'Alejandro T.', city: 'Medellín',           watch: 'Combo Pareja King & Queen' },
    ];
    let i = 0;
    const show = () => {
      setBuyerToast({ show: true, buyer: buyers[i] });
      setTimeout(() => setBuyerToast(p => ({ ...p, show: false })), 4500);
      i = (i + 1) % buyers.length;
    };
    const first = setTimeout(show, 3500);
    const loop  = setInterval(show, 13000);
    return () => { clearTimeout(first); clearInterval(loop); };
  }, []);

  /* Price formatting */
  const fmt = n => n.toLocaleString('es-CO');

  /* Price calc */
  let subtotal = selectedModel.price * qty;
  if (qty === 2 && selectedModel.price === 85000) subtotal = 160000;
  if (qty === 3 && selectedModel.price === 85000) subtotal = 235000;

  /* Custom WhatsApp link for Order Builder */
  const waLink = useCallback(() => {
    let msg  = `¡Hola Juan! 👋 Vengo de la web oficial de Krono (@krono.ibg) y deseo ordenar mi combo:\n\n`;
    msg += `👑 *Modelo Elegido:* ${selectedModel.name}\n`;
    msg += `📦 *Cantidad:* ${qty} kit(s)\n`;
    msg += `🎁 *Obsequios Incluidos:* Estuche Rígido de Lujo + Pila de Repuesto Sellada\n`;
    msg += `📍 *Destino:* ${location === 'ibague' ? 'Ibagué (Tolima) — Pago Contra Entrega Inmediato' : 'Resto de Colombia — Envío Nacional Asegurado'}\n`;
    msg += `💰 *Total a Pagar:* $${fmt(subtotal)} COP\n`;
    if (customerName.trim()) msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerAddr.trim()) msg += `🏠 *Dirección/Barrio:* ${customerAddr.trim()}\n`;
    msg += `\n¿Me confirmas disponibilidad del modelo para coordinar el despacho? ¡Muchas gracias!`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(msg)}`;
  }, [selectedModel, qty, location, customerName, customerAddr, subtotal]);

  /* Direct 1-Click WhatsApp link for a specific product */
  const directProductWa = (product) => {
    const text = `¡Hola Juan! 👋 Deseo comprar en 1 Clic el combo:\n\n👑 *${product.name}*\n💰 *Precio Promo:* $${fmt(product.price)} COP (Ahorro de $${fmt(product.savings)} COP)\n🎁 *Incluye:* Reloj + Estuche Rígido + Pila de Repuesto GRATIS\n\n¿Tienes disponibilidad inmediata para despacho?`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(text)}`;
  };

  /* Direct WhatsApp link for Entrepreneur Combo */
  const directComboWa = (combo) => {
    const text = `¡Hola Juan! 👋 Me interesa el combo mayorista para revender:\n\n💼 *${combo.name}*\n📦 *Unidades:* ${combo.units} Relojes + Estuches + Pilas de repuesto\n💰 *Inversión Total:* $${fmt(combo.priceTotal)} COP ($${fmt(combo.pricePerUnit)} COP / unidad)\n📈 *Ganancia Estimada:* $${fmt(combo.estimatedProfit)} COP\n\n¿Cómo coordinamos el pago y envío de las referencias?`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(text)}`;
  };

  /* Select model + scroll + mini toast */
  const selectModel = useCallback((product) => {
    playTick();
    setSelectedModel(product);
    setModelToast({ show: true, name: product.name });
    setTimeout(() => setModelToast(p => ({ ...p, show: false })), 2200);
  }, []);

  const selectAndScroll = useCallback((product) => {
    selectModel(product);
    setTimeout(() => {
      document.getElementById('order-builder')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [selectModel]);

  /* Order click with chime and confetti */
  const handleOrder = useCallback(() => {
    playChime();
    confetti({
      particleCount: 100, spread: 85,
      origin: { y: 0.75 },
      colors: ['#ffd000', '#d4af37', '#ffffff', '#25d366'],
    });
  }, []);

  /* Filter catalog */
  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => {
        if (activeFilter === 'caballero') return p.gender === 'caballero';
        if (activeFilter === 'dama') return p.gender === 'dama' || p.gender === 'pareja';
        if (activeFilter === 'gold') return p.name.toLowerCase().includes('gold') || p.id.includes('gold');
        if (activeFilter === 'black') return p.name.toLowerCase().includes('black') || p.id.includes('black');
        return true;
      });

  /* Filter categories tabs */
  const filterTabs = [
    { id: 'all',       label: '⚡ Todos los Modelos' },
    { id: 'caballero', label: '👔 Relojes Caballero' },
    { id: 'dama',      label: '🌸 Relojes Dama & Pareja' },
    { id: 'gold',      label: '👑 Edición Oro Real' },
    { id: 'black',     label: '🌑 Stealth Black' },
  ];

  return (
    <div className="min-h-screen">

      {/* ── 1. PROMO MARQUEE BANNER (Continuous announcement bar) ─────────── */}
      <div className="promo-marquee">
        <div className="marquee-track">
          {[
            '🇨🇴 Envíos Contra Entrega en Ibagué el Mismo Día',
            '⚡ Despachos a Todo Colombia (3 a 5 Días Hábiles vía Interrapidísimo)',
            '🎁 Combo Completo por $85.000 COP con Estuche Rígido + Pila de Repuesto Gratis',
            '📞 Línea WhatsApp Directa: 319 3620748 (Atención Juan)',
            '💼 Combos Emprendedor y Mayoristas: Gana hasta 60% de Margen de Reventa',
            '🇨🇴 Envíos Contra Entrega en Ibagué el Mismo Día',
            '⚡ Despachos a Todo Colombia (3 a 5 Días Hábiles vía Interrapidísimo)',
            '🎁 Combo Completo por $85.000 COP con Estuche Rígido + Pila de Repuesto Gratis',
            '📞 Línea WhatsApp Directa: 319 3620748 (Atención Juan)',
            '💼 Combos Emprendedor y Mayoristas: Gana hasta 60% de Margen de Reventa',
          ].map((item, i) => (
            <div key={i} className="marquee-item">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd000] inline" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. URGENCY TICKER (Countdown & offer timer) ───────────────────── */}
      <div className="urgency-ticker">
        <span className="ticker-badge">
          <Zap className="w-3.5 h-3.5" /> OFERTA LIMITADA
        </span>
        <span className="ticker-text">
          🔥 Combo Completo por solo <strong>$85.000 COP</strong> · Estuche + Pila Gratis
        </span>
        <div className="ticker-clock">
          <Clock className="w-3.5 h-3.5 text-[#ffd000]" />
          <span>Termina en:&nbsp;</span>
          <FlipDigit value={String(time.h).padStart(2,'0')} />
          <span className="sep">:</span>
          <FlipDigit value={String(time.m).padStart(2,'0')} />
          <span className="sep">:</span>
          <FlipDigit value={String(time.s).padStart(2,'0')} />
        </div>
      </div>

      {/* ── 3. SITE HEADER & NAVIGATION ───────────────────────────────────── */}
      <header className="site-header">
        <div className="container nav-wrap">
          {/* Logo Oficial Krono */}
          <a href="#hero" className="logo-box" onClick={playTick}>
            <img
              src="/assets/img/krono_logo_official.png"
              alt="Krono Relojería Urbana"
              className="logo-img"
            />
            <div>
              <div className="logo-name">KRONO</div>
              <div className="logo-sub">Relojería Urbana · @krono.ibg</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {[
              ['#hero', 'Inicio'],
              ['#emprendedor', 'Combos Emprendedor'],
              ['#catalog', 'Relojes Caballero'],
              ['#catalog', 'Relojes Dama'],
              ['#beneficios', 'Beneficios'],
              ['#faq', 'Preguntas'],
              ['#order-builder', 'Pedir Ahora'],
            ].map(([href, label], i) => (
              <a key={i} href={href} className="nav-a" onClick={playTick}>{label}</a>
            ))}
          </nav>

          {/* Stories pill, TikTok & WhatsApp CTA */}
          <div className="nav-actions">
            <button
              onClick={() => { playTick(); setStories({ open: true, idx: 0 }); }}
              className="btn-stories-nav"
              title="Ver Stories @krono.ibg"
            >
              <span className="live-dot" />
              <IgIcon style={{ width: 14, height: 14 }} />
              <span>Stories</span>
            </button>

            <a
              href="https://www.tiktok.com/@kronos.ibg?_r=1&_t=ZS-9AOvpsNWBao"
              target="_blank" rel="noopener noreferrer"
              onClick={playTick}
              className="btn-stories-nav"
              style={{
                background: 'rgba(0,242,254,.08)',
                borderColor: 'rgba(0,242,254,.3)',
                color: '#00f2fe'
              }}
              title="Ver TikTok @kronos.ibg"
            >
              <TikTokIcon style={{ width: 13, height: 13 }} />
              <span className="hidden sm:inline">TikTok</span>
            </a>

            <div className="online-chip">
              <span className="pulse" />
              <span className="hidden sm:inline">Juan en Línea</span>
            </div>

            <a
              href="https://wa.me/573193620748?text=Hola%20Juan%20deseo%20informacion%20de%20los%20relojes%20Krono"
              target="_blank" rel="noopener noreferrer"
              onClick={playTick}
              className="btn-wa-header"
            >
              <Phone className="w-4 h-4" /> 319 3620748
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ── 4. HERO SECTION ─────────────────────────────────────────────── */}
        <section className="hero" id="hero">
          <GoldParticles />
          <div className="hero-glow-r" />
          <div className="hero-glow-l" />

          <div className="container hero-grid">
            {/* Left Content */}
            <div>
              <div className="hero-eyebrow sr d1">
                <ShieldCheck className="w-4 h-4" />
                Relojería de Alta Presencia · Ibagué & Colombia
              </div>

              <h1 className="hero-h1 sr d2">
                El Poder y la Elegancia <br />
                que <span className="g">te Distinguen.</span>
              </h1>

              <p className="hero-p sr d2">
                Relojes de presencia masiva y estética imponente <strong>tipo Invicta</strong>. 
                El kit más vendido de Colombia incluye <strong>estuche de lujo y pila sellada</strong> de repuesto.
              </p>

              {/* Price Hero Box */}
              <div className="price-hero-box sr d3">
                <div>
                  <div className="offer-label">PRECIO LANZAMIENTO ESPECIAL</div>
                  <div className="price-row">
                    <span className="price-now">$85.000 <small style={{ fontSize: '1rem', color: '#ffd000' }}>COP</small></span>
                    <span className="price-was">$160.000</span>
                    <span className="save-tag">47% OFF</span>
                  </div>
                </div>
                <div className="includes-list">
                  {[
                    [CheckCircle2, '1x Reloj Tipo Invicta a elección'],
                    [Gift, <><strong>GRATIS:</strong> Estuche de Lujo Rígido</>],
                    [BatteryCharging, <><strong>GRATIS:</strong> Pila de Repuesto Sellada</>],
                    [Tag, 'Etiquetas oficiales de la marca'],
                  ].map(([Icon, text], i) => (
                    <div key={i} className="inc-row">
                      <Icon className="w-4 h-4 text-[#ffd000] shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="cta-row sr d3">
                <a href="#order-builder" onClick={playTick} className="btn-gold">
                  <ShoppingBag className="w-5 h-5" />
                  Pedir Contra Entrega ($85K)
                </a>
                <a href="#emprendedor" onClick={playTick} className="btn-ghost">
                  <TrendingUp className="w-5 h-5 text-[#ffd000]" />
                  Combos Mayoristas
                </a>
                <a href="#real-photos" onClick={playTick} className="btn-ghost">
                  <Camera className="w-5 h-5 text-[#ffd000]" />
                  Fotos Reales
                </a>
              </div>

              {/* Trust badges */}
              <div className="trust-row sr d4">
                {[
                  [MapPin, <><strong>Ibagué:</strong> Pago Contra Entrega Inmediato</>],
                  [Truck,  <><strong>Colombia:</strong> Envíos Rápidos &amp; Asegurados</>],
                  [Star,   <><strong>+500</strong> Clientes Satisfechos</>],
                ].map(([Icon, text], i) => (
                  <div key={i} className="trust-item">
                    <Icon className="w-4 h-4 text-[#ffd000] shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="watch-visual sr-r d2">
              <div className="watch-frame">
                <img
                  src="/assets/img/hero_watch_luxury.jpg"
                  alt="Reloj Krono Subaqua Gold King — Tipo Invicta"
                />
                <div className="float-tag ft1">
                  <div className="fi"><BatteryCharging className="w-4 h-4" /></div>
                  <div className="ft">
                    <strong>+1 Pila de Regalo</strong>
                    <span>Sellada e incluida</span>
                  </div>
                </div>
                <div className="float-tag ft2">
                  <div className="fi"><Box className="w-4 h-4" /></div>
                  <div className="ft">
                    <strong>Caja Dura de Lujo</strong>
                    <span>Presentación amarilla oficial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. CATEGORIES STRIP (Container of time style) ────────────────── */}
        <section className="cat-strip">
          <div className="container cat-strip-inner">
            <span style={{ fontSize: '.8rem', color: 'var(--t3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              Explorar:
            </span>
            {[
              { label: '🔥 El Combo $85K', target: '#combo-detail' },
              { label: '💼 Combos Emprendedor (Lotes x3, x5, x10)', target: '#emprendedor' },
              { label: '👔 Relojes Caballero', target: '#catalog' },
              { label: '🌸 Relojes Dama & Pareja', target: '#catalog' },
              { label: '📸 Fotos Reales Stock Ibagué', target: '#real-photos' },
              { label: '🚚 Envíos & Garantía', target: '#shipping-policy' },
            ].map((chip, i) => (
              <a
                key={i}
                href={chip.target}
                onClick={playTick}
                className="cat-chip"
              >
                {chip.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── 6. BENEFITS BAR ($P Company style) ──────────────────────────── */}
        <section className="benefits-bar" id="beneficios">
          <div className="container">
            <div className="benefits-grid">
              {BENEFITS.map((b, i) => (
                <div key={i} className="benefit-item sr d1">
                  <div className="benefit-icon">
                    {b.icon === 'Truck' && <Truck className="w-5 h-5 text-[#ffd000]" />}
                    {b.icon === 'Gift' && <Gift className="w-5 h-5 text-[#ffd000]" />}
                    {b.icon === 'Phone' && <Phone className="w-5 h-5 text-[#ffd000]" />}
                    {b.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5 text-[#ffd000]" />}
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

        {/* ── 7. COMBO BREAKDOWN ──────────────────────────────────────────── */}
        <section className="sec" id="combo-detail">
          <div className="container">
            <div className="sec-head sr">
              <span className="sec-tag">EL COMBO DEFINITIVO</span>
              <h2 className="sec-h2">¿Qué Recibes por tus $85.000 COP?</h2>
              <p className="sec-p">
                En <strong>Krono</strong> no compras únicamente un reloj; adquieres una experiencia completa
                de lujo y presencia con obsequios útiles para que no gastes un peso adicional.
              </p>
            </div>

            <div className="combo-grid">
              {[
                { n:'01', Icon: Clock, title:'Reloj Estilo Invicta',
                  desc:'Caja maciza de 50 mm con presencia dominante, bisel exterior deportivo, dial multinivel con sub-diales y correa ergonómica anti-sudor con inserciones metálicas.',
                  pill:<><Check className="w-3.5 h-3.5" /> Diseño Imponente</> },
                { n:'02', Icon: Box, title:'Estuche de Lujo Rígido',
                  desc:'Caja rígida amarilla oficial con interior acolchado. Ideal para regalar o para proteger tu reloj de golpes y polvo en todo momento.',
                  pill:<><Gift className="w-3.5 h-3.5" /> Obsequio $0</> },
                { n:'03', Icon: BatteryCharging, title:'Pila de Repuesto Gratis',
                  desc:'Batería original de repuesto sellada en blíster de fábrica. Te ahorras gastos de mantenimiento futuros y aseguras años de uso ininterrumpido.',
                  pill:<><Gift className="w-3.5 h-3.5" /> Obsequio $0</> },
                { n:'04', Icon: Tag, title:'Etiquetas y Sellos',
                  desc:'Cada reloj viene sellado con etiqueta de marca colgante y certificado de inspección previa en Ibagué para garantizar máxima calidad.',
                  pill:<><ShieldCheck className="w-3.5 h-3.5" /> 100% Nuevo</> },
              ].map(({ n, Icon, title, desc, pill }, i) => (
                <div key={n} className={`combo-card sr d${i + 1}`}>
                  <span className="cc-num">{n}</span>
                  <div className="cc-icon">
                    <Icon className="w-6 h-6 text-[#ffd000]" />
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

        {/* ── 8. REAL PHOTOS GALLERY ──────────────────────────────────────── */}
        <section className="sec sec-dark" id="real-photos">
          <div className="container">
            <div className="sec-head sr">
              <span className="sec-tag">TRANSPARENCIA TOTAL</span>
              <h2 className="sec-h2">Fotos 100% Reales de Nuestro Stock</h2>
              <p className="sec-p">
                Cero filtros engañosos. Ves con exactitud las piezas reales, cajas amarillas rígidas
                y pilas selladas que tenemos disponibles en Ibagué para entrega inmediata.
              </p>
            </div>

            <div className="proof-banner sr">
              <ShieldCheck className="w-5 h-5 text-[#ffd000] shrink-0" />
              <span>Lo que ves en estas fotos reales es exactamente lo que llegará a la puerta de tu casa.</span>
            </div>

            <div className="gallery-3">
              {REAL_PHOTOS.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`g-item sr d${i + 1}`}
                  onClick={() => {
                    playTick();
                    setLightbox({ open: true, img: photo.image, title: photo.title });
                  }}
                >
                  <img src={photo.image} alt={photo.title} loading="lazy" />
                  <span className="g-badge">{photo.badge}</span>
                  <div className="g-cap">
                    <h4>{photo.title}</h4>
                    <p>{photo.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. PRODUCT CATALOG (Cards con calidad, precio tachado & WhatsApp 1-Click) */}
        <section className="sec" id="catalog">
          <div className="container">
            <div className="sec-head sr">
              <span className="sec-tag">CATÁLOGO EXCLUSIVO</span>
              <h2 className="sec-h2">Elige el Modelo que Define tu Estilo</h2>
              <p className="sec-p">
                Todos los modelos incluyen el combo promocional de{' '}
                <strong>$85.000 COP</strong> con estuche rígido y pila de repuesto incluida.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="filter-row sr">
              {filterTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { playTick(); setActiveFilter(tab.id); }}
                  className={`f-btn ${activeFilter === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((p, i) => (
                <article key={p.id} className={`prod-card sr d${(i % 3) + 1}`}>
                  <div className="prod-img">
                    <img src={p.image} alt={p.name} loading="lazy" />
                    <span className="p-badge">{p.badge}</span>
                    <span className="p-stock">{p.stock}</span>
                    {/* Quality Tier (SP Company inspiration) */}
                    <span className={`quality-tier ${p.tierClass}`}>
                      <Award className="w-3 h-3" /> {p.tier}
                    </span>
                  </div>

                  <div className="prod-body">
                    <span className="prod-line">{p.series}</span>
                    <h3 className="prod-name">{p.name}</h3>

                    <ul className="prod-specs">
                      {p.specs.slice(0, 3).map((s, si) => (
                        <li key={si}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd000] shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="prod-footer">
                      <div>
                        <span className="p-label">Precio Combo</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                          <span className="p-now">${fmt(p.price)} <small style={{ fontSize: '.75rem', color: 'var(--gold-lt)' }}>COP</small></span>
                          <span className="p-was">${fmt(p.oldPrice)}</span>
                        </div>
                        <span className="p-save">Ahorras ${fmt(p.savings)} COP (-{p.discountPct}%)</span>
                      </div>
                    </div>

                    {/* Direct 1-Click WhatsApp CTA (Strategic conversion element) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <a
                        href={directProductWa(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playChime}
                        className="btn-wa-product"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Comprar en 1 Clic por WhatsApp
                      </a>
                      <button
                        className="btn-ghost"
                        style={{ padding: '9px 14px', fontSize: '.82rem' }}
                        onClick={() => selectAndScroll(p)}
                      >
                        Personalizar en Pedido <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. COMBOS EMPRENDEDOR & MAYORISTA (Container of Time & SP Company style) ── */}
        <section className="sec emprendedor-section" id="emprendedor">
          <div className="container">
            <div className="sec-head sr">
              <span className="sec-tag">LÍNEA MAYORISTA & REVENTA</span>
              <h2 className="sec-h2">Combos Emprendedor: Gana Dinero Vendiendo Krono</h2>
              <p className="sec-p">
                Inspirado en los lotes por volumen de mayoristas líderes. Adquiere lotes de 3, 5 o 10 kits con
                precio preferencial, estuches y pilas incluidas. ¡Multiplica tu capital de inmediato!
              </p>
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
                      <TrendingUp className="w-6 h-6 text-[#ffd000]" />
                    </div>
                    <h3 className="emp-name">{combo.name}</h3>
                    <p className="emp-desc">{combo.subtitle}</p>
                  </div>

                  <div className="emp-pricing">
                    <div className="emp-price-was">${fmt(combo.oldPriceTotal)} COP</div>
                    <div className="emp-price-now">
                      ${fmt(combo.priceTotal)} <small style={{ fontSize: '.9rem', color: 'var(--gold-lt)' }}>COP</small>
                    </div>
                    <div className="emp-price-unit">
                      A solo <strong>${fmt(combo.pricePerUnit)} COP</strong> por reloj con estuche y pila
                    </div>
                    <span className="emp-save">
                      Ahorras ${fmt(combo.savings)} COP · {combo.discountPct}% OFF
                    </span>
                    <div style={{ marginTop: 8, fontSize: '.84rem', color: '#a7f3d0', fontWeight: 700 }}>
                      📈 Ganancia estimada para ti: +${fmt(combo.estimatedProfit)} COP
                    </div>
                  </div>

                  <div className="emp-includes">
                    <h5>¿Qué incluye este lote?</h5>
                    {combo.includes.map((inc, ii) => (
                      <div key={ii} className="emp-item-row">
                        <Check className="w-4 h-4 text-[#ffd000] shrink-0" />
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
                      className="btn-gold"
                      style={{ width: '100%' }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Pedir {combo.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. ORDER BUILDER INTERACTIVO ───────────────────────────────── */}
        <section className="sec order-section" id="order-builder">
          <div className="container">
            <div className="sec-head sr">
              <span className="sec-tag">PEDIDO RÁPIDO & DIRECTO</span>
              <h2 className="sec-h2">Arma tu Pedido en 30 Segundos</h2>
              <p className="sec-p">
                Selecciona tu modelo y ciudad. Se genera automáticamente la plantilla de pedido directo a Juan.
              </p>
            </div>

            <div className="order-box sr">
              <div className="order-grid">

                {/* Form Col */}
                <div>
                  {/* Step 1: Model */}
                  <div className="form-step">
                    <div className="step-label">
                      <span className="step-n">1</span>
                      Selecciona tu Modelo de Reloj
                    </div>
                    <div className="model-grid">
                      {PRODUCTS.map(watch => (
                        <div
                          key={watch.id}
                          className={`model-opt ${selectedModel.id === watch.id ? 'sel' : ''}`}
                          onClick={() => selectModel(watch)}
                        >
                          <img src={watch.image} alt={watch.name} className="model-thumb" />
                          <div className="mo-info">
                            <h5>{watch.name}</h5>
                            <span>${fmt(watch.price)} COP</span>
                          </div>
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
                      className="field"
                      value={qty}
                      onChange={e => { playTick(); setQty(Number(e.target.value)); }}
                    >
                      <option value={1}>1 Kit Completo — $85.000 COP</option>
                      <option value={2}>2 Kits — $160.000 COP (¡Ahorras $10.000!)</option>
                      <option value={3}>3 Kits — $235.000 COP (¡Ahorras $20.000!)</option>
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
                          className={`city-opt ${location === opt.id ? 'sel' : ''}`}
                        >
                          <div>{opt.label}</div>
                          <div style={{ fontSize: '.74rem', opacity: .8, marginTop: 3 }}>
                            {opt.sub}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Contact details */}
                  <div className="form-step">
                    <div className="step-label">
                      <span className="step-n">4</span>
                      Tus Datos de Envío (Opcional)
                    </div>
                    <input
                      type="text"
                      placeholder="Tu Nombre Completo"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="field"
                      style={{ marginBottom: 10 }}
                    />
                    <input
                      type="text"
                      placeholder="Dirección y Barrio en Ibagué / tu Ciudad"
                      value={customerAddr}
                      onChange={e => setCustomerAddr(e.target.value)}
                      className="field"
                    />
                  </div>
                </div>

                {/* Summary Col */}
                <div>
                  <div className="summary-box">
                    <div className="sum-title">
                      <span>Resumen del Pedido</span>
                      <Crown className="w-5 h-5 text-[#ffd000]" />
                    </div>

                    <div className="sum-rows">
                      <div className="sum-row">
                        <span style={{ maxWidth: 180 }}>{selectedModel.name} ({qty}x)</span>
                        <span>${fmt(subtotal)} COP</span>
                      </div>
                      <div className="sum-row free">
                        <span>Estuche de Lujo Amarillo</span>
                        <span>GRATIS</span>
                      </div>
                      <div className="sum-row free">
                        <span>Pila de Repuesto Sellada</span>
                        <span>GRATIS</span>
                      </div>
                      <div className="sum-row free">
                        <span>Etiqueta de la Marca</span>
                        <span>INCLUIDA</span>
                      </div>
                      <div className="sum-row">
                        <span>Entrega:</span>
                        <span style={{ color: '#fbe282', fontWeight: 700, fontSize: '.84rem' }}>
                          {location === 'ibague' ? 'Contra Entrega Ibagué' : 'Envío Nacional'}
                        </span>
                      </div>
                      <div className="sum-total">
                        <span>Total en Mano:</span>
                        <span className="total-val">${fmt(subtotal)} COP</span>
                      </div>
                    </div>

                    <div className="delivery-note">
                      {location === 'ibague' ? (
                        <>
                          <strong>📍 Contra Entrega en Ibagué:</strong> Entrega hoy o en 24h.
                          No pagas nada por adelantado — cancelas los <strong>${fmt(subtotal)} COP</strong> cuando
                          recibas y verifiques tu kit en tus manos.
                        </>
                      ) : (
                        <>
                          <strong>🇨🇴 Envíos a todo Colombia:</strong> Solo abonas el flete (~$15.000 COP)
                          para generar la guía oficial. Los <strong>${fmt(subtotal)} COP</strong> del combo los
                          cancelas a la transportadora al recibir en tu puerta.
                        </>
                      )}
                    </div>

                    <a
                      href={waLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleOrder}
                      className="wa-link"
                    >
                      <Phone className="w-5 h-5" />
                      Enviar Pedido a Juan (WhatsApp)
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── 12. LOGÍSTICA & MÉTODOS DE PAGO ─────────────────────────────── */}
        <section className="sec" id="shipping-policy">
          <div className="container">
            <div className="sec-head sr">
              <span className="sec-tag">LOGÍSTICA & PAGOS</span>
              <h2 className="sec-h2">Comodidad y Confianza Total en tu Entrega</h2>
              <p className="sec-p">
                Diseñamos el método de compra más seguro de Colombia para que nunca pongas en riesgo tu dinero.
              </p>
            </div>

            <div className="ship-grid">
              <div className="ship-box hi sr-l">
                <span className="ship-corner">📍 Entrega Local</span>
                <h3 className="ship-title">
                  <MapPin className="w-6 h-6 text-[#ffd000]" />
                  En Ibagué (Tolima)
                </h3>
                <p className="ship-desc">Atención directa y prioritaria dentro de la ciudad musical.</p>
                <ul className="ship-steps">
                  {[
                    'Pides por WhatsApp con tu dirección y modelo escogido.',
                    'Coordinamos la entrega para el mismo día o en 24 horas.',
                    'Pago Contra Entrega 100%: revisas tu reloj y pagas los $85.000 al domiciliario. ¡Cero riesgo!',
                  ].map((s, i) => (
                    <li key={i}><span className="step-dot">{i + 1}</span><span>{s}</span></li>
                  ))}
                </ul>
              </div>

              <div className="ship-box sr-r">
                <span className="ship-corner">🇨🇴 Envíos Colombia</span>
                <h3 className="ship-title">
                  <Truck className="w-6 h-6 text-[#ffd000]" />
                  Resto de Colombia
                </h3>
                <p className="ship-desc">Despachos asegurados con Interrapidísimo o Envía (3 a 5 días hábiles).</p>
                <ul className="ship-steps">
                  {[
                    'Abonas el valor del flete (~$15.000 COP) para generar la guía oficial con seguro.',
                    'Te enviamos foto del paquete embalado y número de guía para rastrear en tiempo real.',
                    'Pagas los $85.000 COP en efectivo cuando la transportadora llegue a tu puerta.',
                  ].map((s, i) => (
                    <li key={i}><span className="step-dot">{i + 1}</span><span>{s}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Payment methods row (SP Company style) */}
            <div className="payment-methods sr">
              <h4 className="payment-title">Medios de Pago Aceptados:</h4>
              <div className="payment-chips">
                {PAYMENT_METHODS.map((pm, i) => (
                  <div key={i} className="p-chip">
                    <CheckCircle2 className="w-4 h-4 text-[#ffd000]" />
                    <span><strong>{pm.name}:</strong> {pm.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 13. TESTIMONIALS ────────────────────────────────────────────── */}
        <section className="sec sec-dark">
          <div className="container">
            <div className="sec-head sr">
              <span className="sec-tag">OPINIONES REALES</span>
              <h2 className="sec-h2">Lo que Dicen Quienes Ya Usan Krono</h2>
              <p className="sec-p">
                Clientes y emprendedores reales en Ibagué y toda Colombia que elevaron su estilo y sus ingresos.
              </p>
            </div>

            <div className="testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`testi-card sr d${i + 1}`}>
                  <div className="stars">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-[#ffd000] text-[#ffd000]" />
                    ))}
                  </div>
                  <p className="testi-text">"{t.text}"</p>
                  <div className="client-row">
                    <div className="c-avatar">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="c-name">{t.name}</div>
                      <div className="c-detail">{t.city} · {t.watch}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 14. COMUNIDAD OFICIAL (Instagram & TikTok) ────────────────── */}
        <section className="container sr" style={{ marginBottom: 70 }} id="redes">
          <div className="social-community-grid">

            {/* Instagram Card */}
            <div className="social-card ig">
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
                <p className="social-p" style={{ marginTop: 14 }}>
                  Stories diarias con nuevos modelos, videos de los relojes bajo la luz del sol,
                  unboxing de combos y testimonios de entregas reales en Ibagué.
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
            <div className="social-card tt">
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
                <p className="social-p" style={{ marginTop: 14 }}>
                  Videos virales, pruebas de peso y presencia en la muñeca, detalles de los diales
                  y promociones exclusivas para nuestra comunidad en Colombia.
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

        {/* ── 15. FAQ ACCORDION ───────────────────────────────────────────── */}
        <section className="sec" id="faq">
          <div className="container">
            <div className="sec-head sr">
              <span className="sec-tag">DUDAS FRECUENTES</span>
              <h2 className="sec-h2">Preguntas Habituales</h2>
              <p className="sec-p">Todo lo que necesitas saber antes de confirmar tu pedido con Juan.</p>
            </div>

            <div className="faq-list">
              {FAQS.map((faq, idx) => (
                <div key={idx} className={`faq-item sr d${(idx % 3) + 1} ${activeFaq === idx ? 'open' : ''}`}>
                  <button
                    className="faq-q"
                    onClick={() => { playTick(); setActiveFaq(activeFaq === idx ? -1 : idx); }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className="faq-chevron w-5 h-5" />
                  </button>
                  <div className="faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── 16. FOOTER ────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="logo-box" onClick={playTick}>
                <img
                  src="/assets/img/krono_logo_official.png"
                  alt="Krono Relojería Urbana"
                  className="logo-img"
                />
                <div>
                  <div className="logo-name">KRONO</div>
                  <div className="logo-sub">Relojería Urbana · @krono.ibg</div>
                </div>
              </a>
              <p>
                Especialistas en relojería robusta y elegante tipo Invicta en Ibagué, Tolima y
                despachos garantizados a todo Colombia. Atendido directamente por Juan y socio.
              </p>
            </div>

            <div>
              <h4 className="footer-h">Navegación</h4>
              <ul className="footer-links">
                {[
                  ['#hero', 'Inicio'],
                  ['#combo-detail', 'El Combo $85K'],
                  ['#emprendedor', 'Combos Mayoristas'],
                  ['#catalog', 'Catálogo Completo'],
                  ['#shipping-policy', 'Envíos y Pagos'],
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
                  <Phone className="w-4 h-4 text-[#ffd000] shrink-0" />
                  <a href="https://wa.me/573193620748" target="_blank" rel="noopener noreferrer">
                    WhatsApp: +57 319 3620748
                  </a>
                </div>
                <div className="fc-item">
                  <IgIcon style={{ width: 14, height: 14, color: '#fbe282' }} />
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
                  <MapPin className="w-4 h-4 text-[#ffd000] shrink-0" />
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
      <div className="fab-wa">
        <div className="fab-tooltip">
          ¿Preguntas? Chatea con Juan (319 3620748)
        </div>
        <a
          href="https://wa.me/573193620748?text=Hola%20Juan%20deseo%20ordenar%20mi%20reloj%20Krono"
          target="_blank" rel="noopener noreferrer"
          onClick={playTick}
          className="fab-btn"
          aria-label="Abrir WhatsApp"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Sticky mobile bar */}
      <div className="mobile-sticky">
        <div className="ms-inner">
          <div className="ms-price">
            <span className="lbl">Combo Completo</span>
            <span className="val">$85.000 COP</span>
          </div>
          <a href="#order-builder" onClick={playTick} className="ms-btn">
            <ShoppingBag className="w-4 h-4" />
            Pedir Contra Entrega
          </a>
        </div>
      </div>

      {/* Model selected mini toast */}
      <div className={`model-toast ${modelToast.show ? 'show' : ''}`}>
        ✅ Modelo seleccionado: <strong style={{ marginLeft: 6 }}>{modelToast.name}</strong>
      </div>

      {/* Live buyer notification */}
      {buyerToast.buyer && (
        <div className={`buyer-toast ${buyerToast.show ? 'show' : ''}`}>
          <img src="/assets/img/hero_watch_luxury.jpg" alt="Reloj" className="bt-thumb" />
          <div className="bt-info">
            <p>
              <strong>{buyerToast.buyer.name}</strong> en {buyerToast.buyer.city} acaba de pedir <em>{buyerToast.buyer.watch}</em>
            </p>
            <span>Hace un momento</span>
          </div>
        </div>
      )}

      {/* Lightbox modal */}
      <div
        className={`overlay ${lightbox.open ? 'on' : ''}`}
        onClick={() => setLightbox({ open: false, img: '', title: '' })}
      >
        <div className="ov-box" onClick={e => e.stopPropagation()}>
          <button
            className="ov-close"
            onClick={() => setLightbox({ open: false, img: '', title: '' })}
          >
            <X className="w-5 h-5" />
          </button>
          <img src={lightbox.img} alt={lightbox.title} className="ov-img" />
          <div className="ov-footer">
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{lightbox.title}</h4>
            <a
              href="#order-builder"
              onClick={() => setLightbox({ open: false, img: '', title: '' })}
              className="btn-gold"
              style={{ padding: '8px 18px', fontSize: '.84rem' }}
            >
              Pedir este Modelo ($85.000) <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Stories modal */}
      {stories.open && (
        <div
          className="overlay on"
          onClick={() => setStories({ open: false, idx: 0 })}
        >
          <div
            style={{
              position: 'relative', maxWidth: 360, width: '100%',
              background: '#12151e', border: '1px solid rgba(212,175,55,.45)',
              borderRadius: 22, overflow: 'hidden',
              boxShadow: '0 28px 65px rgba(0,0,0,.9)',
              animation: 'popIn .3s ease',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#ffd000,#d4af37)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Crown className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div style={{ fontSize: '.82rem', fontWeight: 700, color: '#fff' }}>@krono.ibg</div>
                  <div style={{ fontSize: '.7rem', color: 'var(--t2)' }}>Ibagué, Tolima</div>
                </div>
              </div>
              <button onClick={() => setStories({ open: false, idx: 0 })}
                style={{ background: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.6)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 5, padding: '10px 16px 0' }}>
              {STORIES.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i <= stories.idx ? '#ffd000' : 'rgba(255,255,255,.2)',
                  transition: 'background .3s'
                }} />
              ))}
            </div>

            {/* Story image */}
            <div style={{ position: 'relative', aspectRatio: '9/16', background: '#000', margin: 12, borderRadius: 14, overflow: 'hidden' }}>
              <img
                src={STORIES[stories.idx].image}
                alt="Story Krono"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', top: 12, left: 12,
                background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)',
                padding: '4px 12px', borderRadius: 99,
                fontSize: 11, color: '#ffd000', fontWeight: 700,
                border: '1px solid rgba(255,208,0,.4)'
              }}>
                {STORIES[stories.idx].tag}
              </div>
              <div style={{
                position: 'absolute', bottom: 0, inset: 'auto 0 0 0',
                padding: '18px 16px',
                background: 'linear-gradient(to top,rgba(0,0,0,.9),transparent)'
              }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '.95rem' }}>
                  {STORIES[stories.idx].title}
                </div>
                <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.75)' }}>
                  {STORIES[stories.idx].subtitle}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, padding: '10px 16px 18px' }}>
              <button
                onClick={() => setStories(p => ({ ...p, idx: Math.max(0, p.idx - 1) }))}
                style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: 'rgba(255,255,255,.06)', color: '#fff',
                  fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', border: 'none'
                }}
              >
                ← Anterior
              </button>
              <a
                href="#order-builder"
                onClick={() => setStories({ open: false, idx: 0 })}
                style={{
                  flex: 1, padding: '10px', borderRadius: 10, textAlign: 'center',
                  background: 'linear-gradient(135deg,#ffd000,#d4af37)',
                  color: '#000', fontWeight: 800, fontSize: '.88rem', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                Pedir este Reloj
              </a>
              <button
                onClick={() => setStories(p => ({ ...p, idx: Math.min(STORIES.length - 1, p.idx + 1) }))}
                style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: 'rgba(255,255,255,.06)', color: '#fff',
                  fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', border: 'none'
                }}
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
