/**
 * KRONO (@krono.ibg) - Interactive Logic
 * Dynamic Catalog, WhatsApp Order Builder, Lightbox & Conversion Engines
 */

// Model Catalog Data
const WATCH_MODELS = [
  {
    id: 'gold-king',
    name: 'Krono Subaqua Gold King',
    category: 'gold',
    series: 'Edición Máxima Presencia',
    price: 85000,
    oldPrice: 165000,
    image: 'assets/img/hero_watch_luxury.jpg',
    badge: '🔥 El Más Vendido',
    stock: 'Quedan 3 uds',
    specs: [
      'Bisel deportivo dorado con números en relieve',
      'Pulso de silicona ultra-confort con eslabones dorados',
      'Esfera multinivel con diales cronográficos de lujo',
      'Caja de 50mm con acabados cepillados de alta gama'
    ]
  },
  {
    id: 'black-stealth',
    name: 'Krono Chrono Stealth Black',
    category: 'black',
    series: 'Colección Midnight Titan',
    price: 85000,
    oldPrice: 160000,
    image: 'assets/img/showcase_box.jpg',
    badge: '⚡ Edición Limitada',
    stock: 'Última unidad',
    specs: [
      'Acabado negro mate táctico con acentos dorados',
      'Cristal mineral resistente a rayones y golpes leves',
      'Correa ergonómica reforzada anti-sudor',
      'Elegancia imponente para ocasiones formales o casuales'
    ]
  },
  {
    id: 'ocean-blue',
    name: 'Krono Ocean Blue Ice',
    category: 'blue',
    series: 'Deep Diver Heritage',
    price: 85000,
    oldPrice: 170000,
    image: 'assets/img/showcase_box.jpg',
    badge: '💎 Novedad',
    stock: 'Disponible',
    specs: [
      'Esfera azul zafiro reflectiva de alto impacto',
      'Bisel exterior de alto relieve con contraste oscuro',
      'Agujas con acabado luminiscente para la noche',
      'Detalles de corona y pulsadores estilo Invicta Pro'
    ]
  },
  {
    id: 'red-venom',
    name: 'Krono Venom Red Sport',
    category: 'red',
    series: 'Motorsport Performance',
    price: 85000,
    oldPrice: 165000,
    image: 'assets/img/models_stacked.png',
    badge: '🏎️ Look Deportivo',
    stock: 'Quedan 2 uds',
    specs: [
      'Pulso rojo vibrante de silicona de grado médico',
      'Caja robusta con tornillería perimetral visible',
      'Dial esqueletado vanguardista de alta tecnología',
      'Look agresivo e imponente para destacar'
    ]
  },
  {
    id: 'silver-gold',
    name: 'Krono Master Two-Tone Gold',
    category: 'gold',
    series: 'Executive Luxury Series',
    price: 85000,
    oldPrice: 165000,
    image: 'assets/img/wrist_lifestyle_krono.jpg',
    badge: '👑 Exclusivo',
    stock: 'Disponible',
    specs: [
      'Combinación regia de oro pulido y negro profundo',
      'Diseño inspirado en el icónico Invicta Reserve',
      'Doble hebilla de acero inoxidable grabada',
      'El favorito para ejecutivos y amantes del lujo'
    ]
  },
  {
    id: 'boxes-kit',
    name: 'Combo Completo Krono ($85K)',
    category: 'gold',
    series: 'Kit Completo Garantizado',
    price: 85000,
    oldPrice: 160000,
    image: 'assets/img/boxes_and_kits.png',
    badge: '🎁 Incluye 2 Obsequios',
    stock: 'Stock en Ibagué',
    specs: [
      '1x Reloj Tipo Invicta a elección',
      '1x Estuche de lujo amarillo Invicta rígido',
      '1x Pila original de repuesto sellada GRATIS',
      '1x Etiqueta y sello de autenticidad Krono'
    ]
  }
];

// App State
let selectedModelId = 'gold-king';
let selectedQty = 1;
let selectedLocation = 'ibague'; // 'ibague' | 'nacional'
const WHATSAPP_PHONE = '573193620748';

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog('all');
  renderModelSelector();
  updateOrderSummary();
  initCountdown();
  initFAQ();
  initLightbox();
  initBuyerToast();
  initSmoothScroll();
});

// Render Catalog Grid
function renderCatalog(filter) {
  const container = document.getElementById('catalog-products-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? WATCH_MODELS 
    : WATCH_MODELS.filter(item => item.category === filter);

  container.innerHTML = filtered.map(watch => `
    <article class="product-card" data-category="${watch.category}">
      <div class="product-media">
        <img src="${watch.image}" alt="${watch.name}" loading="lazy">
        <span class="product-badge-top">${watch.badge}</span>
        <span class="product-stock-tag">${watch.stock}</span>
      </div>
      <div class="product-content">
        <span class="product-series">${watch.series}</span>
        <h3 class="product-name">${watch.name}</h3>
        <ul class="product-specs-list">
          ${watch.specs.map(s => `<li><i class="fa-solid fa-circle-check"></i> ${s}</li>`).join('')}
        </ul>
        <div class="product-pricing-footer">
          <div class="price-col">
            <span class="label">Precio Kit Completo</span>
            <span class="value">$${watch.price.toLocaleString('es-CO')} COP</span>
          </div>
          <button class="btn-select-model" onclick="selectModelAndScroll('${watch.id}')">
            <span>Pedir Este</span>
            <i class="fa-brands fa-whatsapp"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Filter button handlers
window.filterCatalog = function(category, element) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  renderCatalog(category);
};

// Render Radio Models inside the Order Builder
function renderModelSelector() {
  const container = document.getElementById('model-options-container');
  if (!container) return;

  container.innerHTML = WATCH_MODELS.map(watch => `
    <div class="model-option-card ${watch.id === selectedModelId ? 'active' : ''}" 
         onclick="chooseModel('${watch.id}')" id="model-opt-${watch.id}">
      <img src="${watch.image}" alt="${watch.name}" class="model-option-thumb">
      <div class="model-option-info">
        <h5>${watch.name}</h5>
        <span>$${watch.price.toLocaleString('es-CO')} COP</span>
      </div>
    </div>
  `).join('');
}

// Select model programmatically
window.chooseModel = function(modelId) {
  selectedModelId = modelId;
  document.querySelectorAll('.model-option-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.getElementById(`model-opt-${modelId}`);
  if (activeCard) activeCard.classList.add('active');
  updateOrderSummary();
};

window.selectModelAndScroll = function(modelId) {
  chooseModel(modelId);
  const target = document.getElementById('order-builder');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

// Location Toggle
window.setLocation = function(loc) {
  selectedLocation = loc;
  document.getElementById('btn-loc-ibague')?.classList.toggle('active', loc === 'ibague');
  document.getElementById('btn-loc-nacional')?.classList.toggle('active', loc === 'nacional');
  updateOrderSummary();
};

// Quantity Change
window.onQtyChange = function(newQty) {
  selectedQty = parseInt(newQty, 10) || 1;
  updateOrderSummary();
};

// Update Order Summary & WhatsApp Link
function updateOrderSummary() {
  const model = WATCH_MODELS.find(m => m.id === selectedModelId) || WATCH_MODELS[0];
  
  // Pricing logic: $85k per kit. Small combo promo if 2+
  let unitPrice = 85000;
  let subtotal = unitPrice * selectedQty;
  if (selectedQty === 2) subtotal = 160000; // $10k discount
  if (selectedQty === 3) subtotal = 235000; // $20k discount

  // Elements
  const summaryModelName = document.getElementById('summary-model-name');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryShipping = document.getElementById('summary-shipping');
  const summaryTotal = document.getElementById('summary-total');
  const deliveryNotice = document.getElementById('delivery-notice-text');

  if (summaryModelName) {
    summaryModelName.textContent = `${model.name} (${selectedQty}x Combo)`;
  }
  if (summarySubtotal) {
    summarySubtotal.textContent = `$${subtotal.toLocaleString('es-CO')} COP`;
  }

  if (selectedLocation === 'ibague') {
    if (summaryShipping) summaryShipping.textContent = 'Contra Entrega en Ibagué';
    if (summaryTotal) summaryTotal.textContent = `$${subtotal.toLocaleString('es-CO')} COP`;
    if (deliveryNotice) {
      deliveryNotice.innerHTML = `
        <strong>📍 Pago Contra Entrega en Ibagué:</strong> Entrega inmediata hoy mismo o en 24h. No pagas nada por adelantado, pagas tus <strong>$${subtotal.toLocaleString('es-CO')} COP</strong> cuando tengas tu kit en las manos.
      `;
    }
  } else {
    const fleteAprox = 15000;
    if (summaryShipping) summaryShipping.textContent = `Flete anticipado de ~$${fleteAprox.toLocaleString('es-CO')} COP`;
    if (summaryTotal) summaryTotal.textContent = `$${subtotal.toLocaleString('es-CO')} COP (al recibir)`;
    if (deliveryNotice) {
      deliveryNotice.innerHTML = `
        <strong>🇨🇴 Envíos a todo Colombia:</strong> Para generar tu guía de envío seguro, únicamente abonas el costo del flete (aprox $15.000 COP) y los <strong>$${subtotal.toLocaleString('es-CO')} COP</strong> del combo los pagas en tu casa u oficina cuando llegue la transportadora.
      `;
    }
  }

  // Update WhatsApp Button link
  const btnWhatsApp = document.getElementById('btn-submit-order');
  if (btnWhatsApp) {
    const customerName = document.getElementById('customer-name')?.value.trim() || '';
    const customerAddress = document.getElementById('customer-address')?.value.trim() || '';

    let message = `¡Hola Juan! 👋 Vengo de la página web de Krono (@krono.ibg) y deseo solicitar mi pedido:\n\n`;
    message += `👑 *Combo Seleccionado:* ${model.name}\n`;
    message += `📦 *Cantidad:* ${selectedQty} kit(s)\n`;
    message += `🎁 *Obsequios:* Estuche de Lujo + Pila de Repuesto Gratis + Etiqueta de Marca\n`;
    message += `📍 *Ubicación:* ${selectedLocation === 'ibague' ? 'Ibagué (Pago Contra Entrega Local)' : 'Resto de Colombia (Envío Nacional)'}\n`;
    message += `💰 *Total Combo:* $${subtotal.toLocaleString('es-CO')} COP\n`;
    
    if (customerName) message += `👤 *Nombre:* ${customerName}\n`;
    if (customerAddress) message += `🏠 *Dirección/Barrio:* ${customerAddress}\n`;

    message += `\n¿Me podrías confirmar disponibilidad inmediata para el despacho? Muchas gracias.`;

    const encoded = encodeURIComponent(message);
    btnWhatsApp.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
  }
}

// Countdown Urgency Timer
function initCountdown() {
  const hoursSpan = document.getElementById('timer-hours');
  const minsSpan = document.getElementById('timer-mins');
  const secsSpan = document.getElementById('timer-secs');
  if (!hoursSpan) return;

  let totalSeconds = 2 * 3600 + 47 * 60 + 35; // 2h 47m 35s initial

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 3 * 3600; // Reset
    } else {
      totalSeconds--;
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursSpan.textContent = String(h).padStart(2, '0');
    minsSpan.textContent = String(m).padStart(2, '0');
    secsSpan.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// FAQ Accordion
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// Lightbox Modal
function initLightbox() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-lightbox-img');
  const modalTitle = document.getElementById('modal-lightbox-title');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalImg) return;

  window.openLightbox = function(src, title) {
    modalImg.src = src;
    if (modalTitle) modalTitle.textContent = title || 'Detalle del Producto';
    modal.classList.add('active');
  };

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

// Live Buyer Social Proof Toast
function initBuyerToast() {
  const toast = document.getElementById('buyer-toast');
  const toastText = document.getElementById('toast-buyer-text');
  const toastTime = document.getElementById('toast-buyer-time');
  if (!toast || !toastText) return;

  const buyers = [
    { name: 'Camilo R.', city: 'Ibagué (Cádiz)', watch: 'Krono Subaqua Gold King' },
    { name: 'Andrés M.', city: 'Ibagué (El Vergel)', watch: 'Krono Chrono Stealth Black' },
    { name: 'Mateo G.', city: 'Ibagué (Jordan)', watch: 'Combo Completo x2' },
    { name: 'Sebastián V.', city: 'Bogotá D.C.', watch: 'Krono Ocean Blue Ice' },
    { name: 'David P.', city: 'Ibagué (Centro)', watch: 'Krono Venom Red Sport' },
    { name: 'Alejandro T.', city: 'Medellín', watch: 'Krono Subaqua Gold King' }
  ];

  let index = 0;

  function showNextBuyer() {
    const buyer = buyers[index];
    toastText.innerHTML = `<strong>${buyer.name}</strong> en ${buyer.city} acaba de pedir <em>${buyer.watch}</em>`;
    toastTime.textContent = 'Hace un momento';
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);

    index = (index + 1) % buyers.length;
  }

  // First show after 4 seconds, then repeat periodically
  setTimeout(() => {
    showNextBuyer();
    setInterval(showNextBuyer, 14000);
  }, 4000);
}

// Mobile Menu and Smooth Scroll
function initSmoothScroll() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu-list');

  mobileToggle?.addEventListener('click', () => {
    if (navMenu.style.display === 'flex') {
      navMenu.style.display = 'none';
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '74px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = '#0a0c12';
      navMenu.style.padding = '20px';
      navMenu.style.borderBottom = '1px solid #d4af37';
    }
  });
}
