import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import confetti from 'canvas-confetti';
import {
  Crown, CheckCircle2, Gift, Tag, BatteryCharging, Box, ShieldCheck,
  Truck, MapPin, Star, Phone, Camera, ChevronDown, ChevronRight, ShoppingBag,
  Zap, Clock, X, Check, ArrowRight, Flame, Sparkles, TrendingUp,
  CreditCard, DollarSign, Award, Layers, MessageCircle, HelpCircle,
  Package, ExternalLink, RefreshCw, Send, Eye, Moon, Sun, RotateCw, Compass, Info
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

/* ─── SVG WhatsApp ────────────────────────────────────────────────────────── */
function WhatsAppIcon({ className, style }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: 20, height: 20, flexShrink: 0, display: 'inline-block', ...style }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
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
  const [cart, setCart] = useState([
    {
      id: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      price: PRODUCTS[0].price,
      brand: PRODUCTS[0].brand,
      image: PRODUCTS[0].image,
      category: PRODUCTS[0].category,
      qty: 1
    }
  ]);
  const [userHasSelectedWatch, setUserHasSelectedWatch] = useState(true);
  const [orderCategoryTab, setOrderCategoryTab] = useState('invicta'); // 'invicta' | 'rolex' | 'combos'
  const [location, setLocation]                  = useState('contraentrega'); // 'contraentrega' | 'transferencia'
  const [customerName, setCustomerName]          = useState('');
  const [customerAddr, setCustomerAddr]          = useState('');
  const [activeCatalogTab, setActiveCatalogTab]  = useState('all'); // 'all' | 'invicta' | 'rolex'
  const [selectedBrand, setSelectedBrand]        = useState(null);  // null = grid, 'colecciones' | 'invicta' | 'rolex' | 'combos' | 'emprendedores'
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

  /* Compatibility alias for components referencing single selected model or total qty */
  const selectedModel = cart[0] || PRODUCTS[0];
  const qty = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalUnits = qty;

  /* Cart actions */
  const addToCart = useCallback((product) => {
    playTick();
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand || 'Krono',
          image: product.image,
          category: product.category || 'invicta',
          qty: 1
        }
      ];
    });
    setUserHasSelectedWatch(true);
    setModelToast({ show: true, name: product.name, action: 'add' });
    setTimeout(() => setModelToast(p => ({ ...p, show: false })), 2200);
  }, []);

  const updateCartQty = useCallback((productId, delta) => {
    playTick();
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === productId) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    playTick();
    setCart(prev => {
      const target = prev.find(item => item.id === productId);
      if (target) {
        setModelToast({ show: true, name: target.name, action: 'remove' });
        setTimeout(() => setModelToast(p => ({ ...p, show: false })), 2000);
      }
      return prev.filter(item => item.id !== productId);
    });
  }, []);

  /* Compatibility alias for selectModel */
  const selectModel = useCallback((product) => {
    addToCart(product);
  }, [addToCart]);

  /* Multi-product price & promo calculation */
  const rawSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const standardWatchesCount = cart
    .filter(item => item.price === 85000)
    .reduce((acc, item) => acc + item.qty, 0);

  // Promo 2 x 160k (-10k), 3 x 235k (-20k), 4+ (-10k per additional watch)
  const discount = standardWatchesCount >= 2 ? (standardWatchesCount - 1) * 10000 : 0;
  const subtotal = Math.max(0, rawSubtotal - discount);

  /* Custom WhatsApp link for Multi-Product Order Builder */
  const waLink = useCallback(() => {
    let msg  = `¡Hola Krono! 👋 Deseo información y disponibilidad para el siguiente pedido:\n\n`;
    if (cart.length === 0) {
      msg += `⌚ Deseo consultar disponibilidad de los modelos para envío con Pago Contra Entrega.\n`;
    } else {
      msg += `🛍️ *Modelos Seleccionados:*\n`;
      cart.forEach((item) => {
        msg += `• *${item.name}* (${item.qty} ${item.qty === 1 ? 'unidad' : 'unidades'}) — [${item.brand}]\n`;
      });
      msg += `\n🎁 *Incluye:* ${totalUnits} Estuche(s) Rígido(s) + ${totalUnits} Batería(s) Sellada(s) Gratis\n`;
      msg += `💳 *Forma de Pago:* ${location === 'contraentrega' ? 'Pago Contra Entrega en la Puerta' : 'Transferencia Directa'}\n`;
    }
    if (customerName.trim()) msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerAddr.trim()) msg += `📍 *Ciudad y Dirección:* ${customerAddr.trim()}\n`;
    msg += `\n¿Me confirman disponibilidad y el valor total con envío? ¡Muchas gracias!`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(msg)}`;
  }, [cart, totalUnits, location, customerName, customerAddr]);

  /* Direct 1-Click WhatsApp link for a specific product */
  const directProductWa = (product) => {
    const text = `¡Hola Krono! 👋 Deseo consultar información y disponibilidad de este modelo:\n\n⌚ *${product.name}*\n💎 *Línea:* ${product.brand}\n🎁 *Incluye:* Reloj + Estuche Rígido + Pila de Repuesto Gratis\n📦 *Envío:* Pago Contra Entrega\n\n¿Me confirman el valor con despacho a mi ciudad? ¡Muchas gracias!`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(text)}`;
  };

  /* Direct WhatsApp link for Entrepreneur Combo */
  const directComboWa = (combo) => {
    const text = `¡Hola Krono! 👋 Me interesa comprar para revender:\n\n💼 *${combo.name}*\n📦 *Unidades:* ${combo.units} Relojes + ${combo.units} Estuches Rígidos + ${combo.units} Pilas\n💰 *Inversión:* $${fmt(combo.priceTotal)} COP ($${fmt(combo.pricePerUnit)} COP / unidad)\n📈 *Margen Estimado:* +$${fmt(combo.estimatedProfit)} COP de ganancia limpia\n\n¿Cómo coordinamos el despacho y los modelos a elección?`;
    return `https://wa.me/573193620748?text=${encodeURIComponent(text)}`;
  };

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

  /* ── Richard Mille 360 Rolex Submariner State ────────────────────────── */
  const [rmNightMode, setRmNightMode] = useState(false);
  const [rmAngle, setRmAngle] = useState(0); // -180 to 180 degrees
  const [isRmDragging, setIsRmDragging] = useState(false);
  const [rmActiveTab, setRmActiveTab] = useState('360'); // '360' | 'intro' | 'acabados' | 'ficha'
  const [rmHotspot, setRmHotspot] = useState(null); // 'bezel' | 'cyclops' | 'crown' | 'bracelet'
  const [rmModal, setRmModal] = useState(null); // null | 'intro' | 'acabados' | 'ficha'

  const rmDragStartRef = useRef({ clientX: 0, startAngle: 0 });
  const rmStageRef = useRef(null);
  const rmTargetAngleRef = useRef(0);
  const rmCurrentAngleRef = useRef(0);
  const rmTargetTiltRef = useRef({ x: 0, y: 0 });
  const rmCurrentTiltRef = useRef({ x: 0, y: 0 });
  const rmWatchWrapperRef = useRef(null);
  const rmSheenRef = useRef(null);

  /* Mouse/Touch Drag Handlers for 360 spin */
  const handleRmDragStart = useCallback((clientX) => {
    setIsRmDragging(true);
    rmDragStartRef.current = {
      clientX,
      startAngle: rmTargetAngleRef.current
    };
  }, []);

  const handleRmDragMove = useCallback((clientX) => {
    if (!isRmDragging) return;
    const deltaX = clientX - rmDragStartRef.current.clientX;
    let newAngle = rmDragStartRef.current.startAngle + deltaX * 0.45;
    if (newAngle > 180) newAngle -= 360;
    if (newAngle < -180) newAngle += 360;
    rmTargetAngleRef.current = newAngle;
  }, [isRmDragging]);

  const handleRmDragEnd = useCallback(() => {
    setIsRmDragging(false);
  }, []);

  /* Mouse Tilt parallax over stage */
  const handleRmMouseMove = useCallback((e) => {
    if (isRmDragging) {
      handleRmDragMove(e.clientX);
      return;
    }
    const stage = rmStageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const tiltY = ((e.clientX - cx) / (rect.width / 2)) * 14;
    const tiltX = -((e.clientY - cy) / (rect.height / 2)) * 10;
    rmTargetTiltRef.current = { x: tiltX, y: tiltY };
  }, [isRmDragging, handleRmDragMove]);

  /* Smooth RAF loop for lerping angle and tilt */
  useEffect(() => {
    let raf;
    const update = () => {
      rmCurrentAngleRef.current += (rmTargetAngleRef.current - rmCurrentAngleRef.current) * 0.12;
      rmCurrentTiltRef.current.x += (rmTargetTiltRef.current.x - rmCurrentTiltRef.current.x) * 0.08;
      rmCurrentTiltRef.current.y += (rmTargetTiltRef.current.y - rmCurrentTiltRef.current.y) * 0.08;

      const angle = rmCurrentAngleRef.current;
      const tiltX = rmCurrentTiltRef.current.x;
      const tiltY = rmCurrentTiltRef.current.y;

      if (rmWatchWrapperRef.current) {
        rmWatchWrapperRef.current.style.transform = `perspective(1200px) rotateY(${angle + tiltY}deg) rotateX(${tiltX}deg)`;
      }
      if (rmSheenRef.current) {
        rmSheenRef.current.style.background = `linear-gradient(${125 + angle}deg, transparent 25%, rgba(255,255,255,0.22) 50%, transparent 75%)`;
      }

      setRmAngle(Math.round(angle));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Preload the 4 luxury watch images so angle switching has zero lag */
  useEffect(() => {
    const imgs = [
      '/assets/img/rolex_submariner_rm360.jpg',
      '/assets/img/rolex_submariner_lume.jpg',
      '/assets/img/rolex_submariner_45deg.jpg',
      '/assets/img/rolex_submariner_left45.jpg',
    ];
    imgs.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /* Robust back navigation for mobile and desktop */
  const handleBackNavigation = useCallback(() => {
    playTick();
    if (selectedBrand === 'colecciones') {
      setSelectedBrand(null);
    } else {
      setSelectedBrand('colecciones');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [selectedBrand]);

  /* Native phone / browser back button support */
  useEffect(() => {
    if (selectedBrand) {
      window.history.pushState({ brand: selectedBrand }, '');
    }
    const onPop = () => {
      if (selectedBrand) {
        if (selectedBrand === 'colecciones') {
          setSelectedBrand(null);
        } else {
          setSelectedBrand('colecciones');
        }
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [selectedBrand]);

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

  /* Las 4 colecciones en formato minimalista de lujo (Sin descripciones, solo foto y nombre) */
  const COLLECTIONS_LIST = [
    {
      id: 'invicta',
      name: 'INVICTA',
      img: '/assets/img/cat_cover_invicta_v2.jpg',
      soldOut: false,
    },
    {
      id: 'rolex',
      name: 'ROLEX',
      img: '/assets/img/cat_cover_rolex.jpg',
      soldOut: false,
    },
    {
      id: 'combos',
      name: 'COMBOS',
      img: '/assets/img/cat_cover_combos.jpg',
      soldOut: true,
    },
    {
      id: 'emprendedores',
      name: 'EMPRENDEDORES',
      img: '/assets/img/cat_cover_emprendedores.jpg',
      soldOut: true,
    },
  ];

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
      img: '/assets/img/cat_cover_invicta_v2.jpg',
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
    <div className={`min-h-screen relative ${userHasSelectedWatch ? 'has-sticky' : ''}`}>


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
          <span className="lt-badge">✦ &nbsp;Bienvenido a Krono &nbsp;✦</span>
        </div>
      </div>

      
      {/* ═══════════════════════════════════════════════════════════════
          PANTALLA DEDICADA DE MARCA / COLECCIÓN
          Se activa cuando selectedBrand !== null (ej. 'colecciones', 'invicta', 'rolex', 'combos', 'emprendedores')
      ═══════════════════════════════════════════════════════════════ */}
      {selectedBrand ? (
        <div>
          {/* Header de la Pantalla Dedicada */}
          <header className="site-header dedicated-header">
            <div className="container dedicated-header-inner">
              <button
                type="button"
                onClick={handleBackNavigation}
                onTouchEnd={e => { e.preventDefault(); handleBackNavigation(); }}
                className="btn-back-header"
                aria-label="Volver"
              >
                <span className="back-arrow">←</span>
                <span className="back-text-full">{selectedBrand === 'colecciones' ? 'Volver al Inicio' : 'Volver a Colecciones'}</span>
                <span className="back-text-short">{selectedBrand === 'colecciones' ? 'Inicio' : 'Colección'}</span>
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
                onClick={playTick}
                className="btn-wa-header"
                title="WhatsApp Krono"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon style={{ width: 22, height: 22 }} />
              </a>
            </div>
          </header>

          {/* Contenido de la Pantalla Dedicada */}
          <main className="dedicated-brand-screen">
            <div className="container">

              {/* 0. PANTALLA EXCLUSIVA DE COLECCIONES (Estilo Minimalista: Solo Foto y Nombre) */}
              {selectedBrand === 'colecciones' && (
                <div className="brand-dedicated-view collections-screen-view">
                  <div className="collections-editorial-header">
                    <div className="collections-monogram">
                      <img src="/assets/img/krono_k_metallic.png" alt="Krono" />
                    </div>
                    <h1 className="collections-main-title">COLECCIONES</h1>
                  </div>

                  <div className="collections-grid-minimal">
                    {COLLECTIONS_LIST.map((col) => (
                      <article
                        key={col.id}
                        className={`col-minimal-card ${col.soldOut ? 'sold-out' : ''}`}
                        onClick={() => {
                          playTick();
                          setSelectedBrand(col.id);
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                      >
                        <div className="cmc-img-box">
                          {col.soldOut && (
                            <span className="cmc-soldout-badge">AGOTADO</span>
                          )}
                          <img
                            src={col.img}
                            alt={col.name}
                            loading="eager"
                          />
                        </div>
                        <h2 className="cmc-title">{col.name}</h2>
                        <span className="cmc-explore">{col.soldOut ? '🔴 Temporalmente Agotado' : 'Ver Modelos →'}</span>
                      </article>
                    ))}
                  </div>

                  <div className="collections-wholesale-strip">
                    <button
                      onClick={() => {
                        playTick();
                        setSelectedBrand('emprendedores');
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      className="btn-link-wholesale"
                    >
                      💼 Ver Catálogo para Emprendedores y Mayoristas (Agotado) →
                    </button>
                  </div>
                </div>
              )}

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
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '5px 14px', borderRadius: 999, marginBottom: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                      <span style={{ color: '#fca5a5', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>🔴 COMBOS AGOTADOS TEMPORALMENTE</span>
                    </div>
                    <h1 className="sec-h2" style={{ fontSize: '2.1rem', marginTop: 8, color: '#fff' }}>
                      Kits Promocionales Krono
                    </h1>
                    <p className="sec-p" style={{ margin: '6px 0 0', maxWidth: 740, color: '#fca5a5', fontSize: '0.95rem' }}>
                      ⚠️ <strong>Aviso de inventario:</strong> Todos los combos con estuche rígido y batería sellada extra se encuentran temporalmente sin stock. Puedes adquirir modelos individuales en stock de <strong>Invicta</strong> y <strong>Rolex Style</strong> o anotarte en la lista de espera para el próximo despacho.
                    </p>
                  </div>

                  <div className="combo-strip-grid sr" style={{ opacity: 0.85 }}>
                    <div className="cs-card">
                      <div className="cs-badge" style={{ background: '#ef4444', color: '#fff' }}>AGOTADO</div>
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
                      <span style={{ color: '#f87171' }}>Próxima disponibilidad en camino</span>
                      <strong className="text-white">Puedes adquirir modelos individuales disponibles o reservar cupo:</strong>
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
                        <Clock className="w-4 h-4" /> Ver Relojes Individuales Disponibles (Invicta) →
                      </button>
                      <a
                        href="https://wa.me/573193620748?text=Hola%20Krono!%20Deseo%20anotarme%20a%20la%20lista%20de%20espera%20para%20cuando%20lleguen%20nuevos%20Combos."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playChime}
                        className="btn-order-outline"
                        style={{ width: 'auto', padding: '10px 22px', color: '#fff', borderColor: 'rgba(239, 68, 68, 0.5)' }}
                      >
                        <MessageCircle className="w-4 h-4 text-red-400" /> Lista de Espera por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. LÍNEA EMPRENDEDORES & MAYORISTAS */}
              {selectedBrand === 'emprendedores' && (
                <div className="brand-dedicated-view">
                  <div className="sec-head sr" style={{ marginBottom: 24, textAlign: 'left' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '5px 14px', borderRadius: 999, marginBottom: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                      <span style={{ color: '#fca5a5', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>🔴 LOTES MAYORISTAS AGOTADOS</span>
                    </div>
                    <h1 className="sec-h2" style={{ fontSize: '2.1rem', marginTop: 8, color: '#fff' }}>
                      Línea Mayorista &amp; Emprendedores
                    </h1>
                    <p className="sec-p" style={{ margin: '6px 0 0', maxWidth: 740, color: '#fca5a5', fontSize: '0.95rem' }}>
                      ⚠️ <strong>Aviso a mayoristas:</strong> Todos los paquetes de emprendedor (Lotes x4, x5 y x10) están <strong>temporalmente agotados</strong> debido a la alta rotación comercial. Estamos reservando cupos con prioridad para el próximo despacho nacional.
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
                        style={{ filter: 'grayscale(0.6) brightness(0.7)' }}
                      />
                    </div>
                    <div className="ebb-info">
                      <span className="badge-red-fire" style={{ background: '#ef4444' }}>🔴 PRÓXIMA IMPORTACIÓN EN CAMINO · AGOTADO</span>
                      <h3>Kits Mayoristas con Estuches &amp; Baterías</h3>
                      <p>
                        Lotes especiales con estuches rígidos oficiales, pilas de repuesto selladas y asesoría comercial. Reserva tu cupo para garantizar inventario en tu ciudad.
                      </p>
                      <div className="ebb-features">
                        <span>🔴 Stock actual: 0 unidades disponibles</span>
                        <span>✅ Lista de espera abierta con reserva preferencial</span>
                        <span>✅ Notificación directa 1 a 1 por WhatsApp al arribar</span>
                      </div>
                    </div>
                  </div>

                  <div className="emp-grid">
                    {ENTREPRENEUR_COMBOS.map((combo, i) => (
                      <div
                        key={combo.id}
                        className={`emp-card ${combo.featured ? 'featured' : ''} sold-out sr d${i + 1}`}
                      >
                        <span className="emp-ribbon" style={{ background: '#ef4444', color: '#fff' }}>🔴 AGOTADO</span>

                        <div className="emp-head">
                          <div className="emp-icon">
                            <TrendingUp className="w-6 h-6 text-red-400" />
                          </div>
                          <h3 className="emp-name">{combo.name}</h3>
                          <p className="emp-desc">{combo.subtitle}</p>
                        </div>

                        <div className="emp-pricing" style={{ opacity: 0.85 }}>
                          <div className="emp-price-was">${fmt(combo.oldPriceTotal)} COP</div>
                          <div className="emp-price-now">
                            ${fmt(combo.priceTotal)} <small className="emp-curr">COP</small>
                          </div>
                          <div className="emp-price-unit">
                            A solo <strong className="text-emerald-400">${fmt(combo.pricePerUnit)} COP</strong> por reloj con estuche y pila
                          </div>
                          <span className="emp-save-badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
                            Agotado Temporalmente · Cupo Reservable
                          </span>
                          <div className="emp-profit-callout">
                            📈 Ganancia proyectada: <strong>+${fmt(combo.estimatedProfit)} COP</strong>
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
                            href={`https://wa.me/573193620748?text=${encodeURIComponent(`¡Hola Krono! 👋 Veo que el *${combo.name}* está agotado. Deseo apartar mi cupo preferencial en la lista de espera para el próximo lote mayorista.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playChime}
                            className="btn-order-outline w-full"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 8,
                              borderColor: 'rgba(239, 68, 68, 0.5)',
                              color: '#fca5a5',
                              padding: '11px 16px',
                              borderRadius: 'var(--r1)',
                              fontWeight: 800,
                              fontSize: '0.86rem',
                              textDecoration: 'none'
                            }}
                          >
                            <MessageCircle className="w-4 h-4 text-red-400" />
                            Apartar Cupo Próximo Lote ({combo.name})
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón inferior para volver */}
              {/* Botón inferior para volver */}
              <div className="bottom-back-bar">
                <button
                  type="button"
                  onClick={handleBackNavigation}
                  onTouchEnd={e => { e.preventDefault(); handleBackNavigation(); }}
                  className="btn-back-header large-bottom-back"
                  aria-label="Volver"
                >
                  <span className="back-arrow">←</span>
                  <span>{selectedBrand === 'colecciones' ? 'Volver al Inicio' : 'Volver a Colecciones'}</span>
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
              <div className="logo-sub">Presencia &amp; Estilo</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {[
              ['coleccion-btn',  'relojes',  '⌚ Colección'],
              ['emprendedor',    'combos',   '💼 Mayorista (Agotado)'],
              ['envios-pais',    'envios',   '🚚 Envíos al País'],
              ['order-builder',  'pedido',   '⚡ Pedir Ahora'],
              ['faq',            'faq',      '❓ Dudas'],
            ].map(([sectionId, tabId, label]) => (
              <button
                key={tabId}
                onClick={() => {
                  if (sectionId === 'coleccion-btn') {
                    playTick();
                    setSelectedBrand('colecciones');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  } else {
                    scrollToSection(sectionId, tabId);
                  }
                }}
                className={`nav-a ${activeStoreTab === tabId ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Actions & WhatsApp Header */}
          <div className="nav-actions">
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
              title="WhatsApp Krono"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon style={{ width: 22, height: 22 }} />
            </a>
          </div>
        </div>

        {/* Mobile Quick Category Navigation Strip */}
        <div className="mobile-nav-strip">
          {[
            ['coleccion-btn',  'relojes',  '⌚ Colección'],
            ['emprendedor',    'combos',   '💼 Mayorista (Agotado)'],
            ['envios-pais',    'envios',   '🚚 Envíos'],
            ['order-builder',  'pedido',   '⚡ Pedir'],
            ['faq',            'faq',      '❓ Dudas'],
          ].map(([sectionId, tabId, label]) => (
            <button
              key={tabId}
              onClick={() => {
                if (sectionId === 'coleccion-btn') {
                  playTick();
                  setSelectedBrand('colecciones');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                } else {
                  scrollToSection(sectionId, tabId);
                }
              }}
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

          {/* COLECCIONES — Pantalla Exclusiva */}
          <div className="mob-acc-item">
            <button
              className="mob-acc-toggle direct"
              onClick={() => {
                playTick();
                setMobMenuOpen(false);
                setSelectedBrand('colecciones');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              style={{ color: 'var(--green)', fontWeight: 800 }}
            >
              ⌚ Colecciones (Invicta · Rolex)
            </button>
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
              style={{ color: '#f87171' }}
            >
              💼 Combos Emprendedor — 🔴 AGOTADOS
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className={`mob-acc-body ${mobAccSection === 'combos' ? 'open' : ''}`}>
              <button className="mob-acc-sub" onClick={() => scrollToSection('emprendedor', 'combos')}>
                <span className="acc-emoji">📦</span> Pack Inicial x4 — 🔴 Agotado
              </button>
              <button className="mob-acc-sub" onClick={() => scrollToSection('emprendedor', 'combos')}>
                <span className="acc-emoji">🔥</span> Combo Pro x5 — 🔴 Agotado
              </button>
              <button className="mob-acc-sub" onClick={() => scrollToSection('emprendedor', 'combos')}>
                <span className="acc-emoji">🏭</span> Lote x10 — 🔴 Agotado
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
            <WhatsAppIcon style={{ width: 16, height: 16 }} /> WhatsApp
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
                { id: 'combos',  sectionId: 'emprendedor',   icon: TrendingUp, label: '💼 Emprendedor (Agotado)' },
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

        {/* ── 8. SECCIÓN COLECCIONES (Estilo Minimalista: Solo Foto y Marca) ─ */}
        <section className="sec catalog-sec" id="catalog">
          <div className="container">
            <div className="collections-editorial-header sr">
              <div className="collections-monogram">
                <img src="/assets/img/krono_k_metallic.png" alt="Krono" />
              </div>
              <h2 className="collections-main-title">COLECCIONES</h2>
            </div>

            <div className="collections-grid-minimal sr" id="catalog-categories">
              {COLLECTIONS_LIST.map((col) => (
                <article
                  key={col.id}
                  className={`col-minimal-card ${col.soldOut ? 'sold-out' : ''}`}
                  onClick={() => {
                    playTick();
                    setSelectedBrand(col.id);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                >
                  <div className="cmc-img-box">
                    {col.soldOut && (
                      <span className="cmc-soldout-badge">AGOTADO</span>
                    )}
                    <img src={col.img} alt={col.name} loading="lazy" />
                  </div>
                  <h3 className="cmc-title">{col.name}</h3>
                  <span className="cmc-explore">{col.soldOut ? '🔴 Temporalmente Agotado' : 'Ver Modelos →'}</span>
                </article>
              ))}
            </div>

            <div className="collections-wholesale-strip sr" style={{ marginTop: 24, textAlign: 'center' }}>
              <button
                onClick={() => {
                  playTick();
                  setSelectedBrand('emprendedores');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="btn-link-wholesale"
              >
                💼 Ver Catálogo para Emprendedores y Mayoristas (Agotado) →
              </button>
            </div>
          </div>
        </section>

        {/* ── 10. SECCIÓN: ENVÍOS AL PAÍS (DESPACHOS REALES COMPROBADOS) ───── */}
        <section className="sec envios-sec" id="envios-pais">
            <div className="container">
              <div className="sec-head sr">
                <span className="badge-tag-emerald">🚚 ENVÍOS A TODO EL PAÍS</span>
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

              {/* Envíos a Todo el País */}
              <div className="proof-banner-emerald sr" style={{ marginTop: 20, justifyContent: 'center', textAlign: 'center' }}>
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
                  🇨🇴 Envíos a <strong className="text-emerald-400">Todo el País</strong>
                </span>
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
                    {/* Step 1: Model with Brand Selection Tabs */}
                    <div className="form-step">
                      <div className="step-label">
                        <span className="step-n">1</span>
                        Selecciona Tus Modelos Favoritos:
                      </div>

                      {/* Hint for combining models */}
                      <div className="order-multi-hint">
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span><strong>¡Arma tu pedido combinado!</strong> Puedes elegir varios modelos de diferentes marcas a la vez en un solo envío.</span>
                      </div>

                      {/* Tabs de Marcas / Combos */}
                      <div className="order-brand-tabs">
                        <button
                          type="button"
                          className={`order-brand-tab ${orderCategoryTab === 'invicta' ? 'active' : ''}`}
                          onClick={() => { playTick(); setOrderCategoryTab('invicta'); }}
                        >
                          👑 Invicta
                        </button>
                        <button
                          type="button"
                          className={`order-brand-tab ${orderCategoryTab === 'rolex' ? 'active' : ''}`}
                          onClick={() => { playTick(); setOrderCategoryTab('rolex'); }}
                        >
                          💎 Rolex Style
                        </button>
                        <button
                          type="button"
                          className={`order-brand-tab ${orderCategoryTab === 'combos' ? 'active' : ''}`}
                          onClick={() => { playTick(); setOrderCategoryTab('combos'); }}
                          style={orderCategoryTab === 'combos' ? {} : { color: '#f87171' }}
                        >
                          🎁 Combos (Agotado)
                        </button>
                      </div>

                      {/* Lista de Relojes según Marca */}
                      <div className="model-grid-scroll">
                        {orderCategoryTab === 'combos' ? (
                          <div style={{
                            padding: '24px 16px',
                            textAlign: 'center',
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.28)',
                            borderRadius: 14,
                            margin: '8px 0'
                          }}>
                            <span style={{
                              display: 'inline-block',
                              background: '#ef4444',
                              color: '#fff',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              padding: '4px 12px',
                              borderRadius: 999,
                              marginBottom: 10
                            }}>🔴 COMBOS TEMPORALMENTE AGOTADOS</span>
                            <h4 style={{ color: '#fff', margin: '4px 0 8px', fontSize: '1.02rem', fontWeight: 800 }}>
                              Lotes y Combos Sin Stock Inmediato
                            </h4>
                            <p style={{ color: 'var(--t2)', fontSize: '0.85rem', margin: '0 0 16px', lineHeight: 1.45 }}>
                              Debido a la alta demanda nacional, todos los combos y paquetes mayoristas se encuentran agotados. Te invitamos a seleccionar piezas individuales disponibles de <strong>Invicta</strong> o <strong>Rolex Style</strong>.
                            </p>
                            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={() => { playTick(); setOrderCategoryTab('invicta'); }}
                                className="btn-cta-emerald"
                                style={{ padding: '8px 16px', fontSize: '0.82rem', width: 'auto' }}
                              >
                                👑 Ver Modelos Invicta en Stock
                              </button>
                              <button
                                type="button"
                                onClick={() => { playTick(); setOrderCategoryTab('rolex'); }}
                                className="btn-order-outline"
                                style={{ padding: '8px 16px', fontSize: '0.82rem', width: 'auto', color: '#fff' }}
                              >
                                💎 Ver Modelos Rolex en Stock
                              </button>
                            </div>
                          </div>
                        ) : (
                          PRODUCTS.filter(p => p.category === orderCategoryTab).map(watch => {
                            const cartItem = cart.find(i => i.id === watch.id);
                            const isSelected = !!cartItem;
                            return (
                              <div
                                key={watch.id}
                                className={`model-opt-card ${isSelected ? 'sel' : ''}`}
                                onClick={() => {
                                  if (isSelected) {
                                    removeFromCart(watch.id);
                                  } else {
                                    addToCart(watch);
                                  }
                                }}
                                title={isSelected ? "Haz clic para quitar este modelo del pedido" : "Haz clic para agregar al pedido"}
                              >
                                <div className="mo-left">
                                  <img src={watch.image} alt={watch.name} className="model-thumb-clean" loading="lazy" decoding="async" />
                                  <div className="mo-info">
                                    <h5 title={watch.name}>{watch.name}</h5>
                                    <div className="mo-meta-row">
                                      <span className="mo-price text-emerald-400 font-bold">Consultar Precio</span>
                                      <span className="mo-line-pill">{watch.brand}</span>
                                      {isSelected && <span className="mo-sel-hint">✓ En pedido</span>}
                                    </div>
                                  </div>
                                </div>

                                <div className="mo-actions">
                                  {isSelected ? (
                                    <div className="mo-qty-control" onClick={e => e.stopPropagation()}>
                                      <button
                                        type="button"
                                        className="mo-qty-btn"
                                        onClick={() => updateCartQty(watch.id, -1)}
                                        aria-label="Disminuir cantidad"
                                        title="Disminuir cantidad"
                                      >
                                        -
                                      </button>
                                      <span className="mo-qty-val">{cartItem.qty}</span>
                                      <button
                                        type="button"
                                        className="mo-qty-btn"
                                        onClick={() => updateCartQty(watch.id, 1)}
                                        aria-label="Aumentar cantidad"
                                        title="Aumentar cantidad"
                                      >
                                        +
                                      </button>
                                      <button
                                        type="button"
                                        className="mo-del-btn"
                                        onClick={() => removeFromCart(watch.id)}
                                        aria-label="Quitar modelo"
                                        title="Quitar este modelo del pedido"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      className="mo-add-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(watch);
                                      }}
                                    >
                                      + Agregar
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Contador total de seleccionados */}
                      <div className="order-qty-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="order-qty-label">
                            {totalUnits === 0 ? 'Sin modelos seleccionados' : (
                              <>
                                Total en pedido: <strong className="text-emerald-400">{totalUnits} {totalUnits === 1 ? 'kit' : 'kits'}</strong>
                              </>
                            )}
                          </span>
                        </div>
                        {cart.length > 0 && (
                          <button
                            type="button"
                            onClick={() => { playTick(); setCart([]); }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#f87171',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              fontWeight: 700,
                              padding: '4px 8px'
                            }}
                          >
                            Vaciar selección
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Step 2: Payment Method */}
                    <div className="form-step">
                      <div className="step-label">
                        <span className="step-n">2</span>
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

                    {/* Step 3: Contact details */}
                    <div className="form-step">
                      <div className="step-label">
                        <span className="step-n">3</span>
                        Tus Datos para el Despacho:
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>Resumen de tu Pedido</span>
                          <span className="cart-items-counter-badge">{totalUnits}</span>
                        </div>
                        <Crown className="w-5 h-5 text-amber-400" />
                      </div>

                      {/* Lista de productos elegidos en el carrito */}
                      {cart.length === 0 ? (
                        <div className="empty-cart-box">
                          <p style={{ margin: 0 }}>Ningún modelo seleccionado todavía.</p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--green)', marginTop: 4, display: 'inline-block' }}>
                            Selecciona tus modelos favoritos en el Paso 1 ↑
                          </span>
                        </div>
                      ) : (
                        <div className="sum-cart-items-list">
                          {cart.map(item => (
                            <div key={item.id} className="sum-cart-item-row">
                              <div className="sci-details">
                                <img src={item.image} alt={item.name} className="sci-thumb" />
                                <div className="sci-meta">
                                  <span className="sci-name" title={item.name}>{item.name}</span>
                                  <span className="sci-brand">{item.brand}</span>
                                  <span className="sci-price text-emerald-400 font-bold">A cotizar en WhatsApp</span>
                                </div>
                              </div>
                              <div className="sci-actions">
                                <div className="sci-qty-pill">
                                  <button
                                    type="button"
                                    className="sci-btn"
                                    onClick={() => updateCartQty(item.id, -1)}
                                    aria-label="Menos"
                                  >
                                    -
                                  </button>
                                  <span className="sci-qty-num">{item.qty}</span>
                                  <button
                                    type="button"
                                    className="sci-btn"
                                    onClick={() => updateCartQty(item.id, 1)}
                                    aria-label="Más"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  className="sci-del-btn"
                                  onClick={() => removeFromCart(item.id)}
                                  title="Eliminar del pedido"
                                  aria-label="Eliminar"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="sum-rows">
                        <div className="sum-row free">
                          <span>{totalUnits}x Estuche Rígido Oficial</span>
                          <span className="badge-free">GRATIS</span>
                        </div>
                        <div className="sum-row free">
                          <span>{totalUnits}x Batería Sellada de Repuesto</span>
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
                          <span>Precio y Promoción:</span>
                          <span className="total-val text-emerald-400" style={{ fontSize: '1.05rem' }}>A negociar en WhatsApp</span>
                        </div>
                      </div>

                      <div className="delivery-note-box">
                        <strong className="text-emerald-400">📦 Envío Contra Entrega Asegurado:</strong> Despachamos a toda Colombia sin anticipos. Te confirmamos el mejor precio negociado y disponibilidad en segundos por WhatsApp.
                      </div>

                      <a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleOrder}
                        className="wa-order-btn"
                      >
                        <MessageCircle className="w-5 h-5" />
                        {totalUnits > 1 ? 'Consultar Precios y Pedir por WhatsApp' : 'Consultar Precio y Pedir por WhatsApp'}
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
                <WhatsAppIcon style={{ width: 18, height: 18 }} /> Chatear con el Asesor
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
                  <WhatsAppIcon style={{ width: 16, height: 16, color: '#25d366' }} className="shrink-0" />
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
      {/* ── FLOATING SOCIAL DOCK (WhatsApp, TikTok, Instagram - Estilo Referencia) ── */}
      <aside className="floating-social-dock" aria-label="Canales oficiales Krono">
        <a
          href="https://wa.me/573193620748?text=Hola%20Krono!%20Deseo%20informaci%C3%B3n%20sobre%20las%20colecciones."
          target="_blank"
          rel="noopener noreferrer"
          className="fsd-btn wa"
          title="WhatsApp Asesor Oficial"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon style={{ width: 22, height: 22 }} />
        </a>
        <a
          href="https://www.tiktok.com/@kronos.ibg?_r=1&_t=ZS-9AOvpsNWBao"
          target="_blank"
          rel="noopener noreferrer"
          className="fsd-btn tiktok"
          title="TikTok Krono"
          aria-label="TikTok"
        >
          <TikTokIcon style={{ width: 18, height: 18 }} />
        </a>
        <a
          href="https://instagram.com/krono.ibg?exln=MWFndzM0MjlrN3k0OA%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="fsd-btn ig"
          title="Instagram Krono"
          aria-label="Instagram"
        >
          <IgIcon style={{ width: 18, height: 18 }} />
        </a>
      </aside>

      {/* Sticky mobile bottom bar — ONLY shown when the user has actually selected a watch */}
      {userHasSelectedWatch && cart.length > 0 && (
        <div className="mobile-sticky">
          <div className="ms-inner">
            <div className="ms-price">
              <span className="lbl" style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {totalUnits} {totalUnits === 1 ? 'Reloj' : 'Relojes'} en pedido
              </span>
              <span className="val text-emerald-400 font-extrabold">Cotizar en WhatsApp</span>
            </div>
            <button
              onClick={() => scrollToSection('order-builder', 'pedido')}
              className="ms-btn-emerald"
            >
              <ShoppingBag className="w-4 h-4" />
              Consultar Pedido
            </button>
          </div>
        </div>
      )}

      {/* Model selected mini toast */}
      <div className={`model-toast ${modelToast.show ? 'show' : ''} ${modelToast.action === 'remove' ? 'toast-removed' : ''}`}>
        {modelToast.action === 'remove' ? '🗑️ Quitado del pedido: ' : '✅ Modelo agregado: '}
        <strong style={{ marginLeft: 6 }}>{modelToast.name}</strong>
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
                href={`https://wa.me/573193620748?text=${encodeURIComponent(`¡Hola Krono! 👋 Deseo consultar información y disponibilidad de este modelo:\n\n⌚ *${lightbox.title}*\n🎁 *Incluye:* Estuche Rígido + Batería Sellada Gratis\n📦 *Envío:* Pago Contra Entrega\n\n¿Tienen disponibilidad para envío inmediato? ¡Muchas gracias!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setLightbox({ open: false, img: '', title: '' })}
                className="btn-cta-emerald"
                style={{ padding: '8px 18px', fontSize: '.84rem' }}
              >
                <MessageCircle className="w-4 h-4" /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}