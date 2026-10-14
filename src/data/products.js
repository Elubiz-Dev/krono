/* ─────────────────────────────────────────────────────────────────────────
   KRONO (@krono.ibg) ─ Catálogo & Datos Comerciales v3.0
   Inspirado en la estructura de Container Of Time & $P Company
   Optimizado para conversión por WhatsApp y venta minorista/mayorista
   ───────────────────────────────────────────────────────────────────────── */

export const PRODUCTS = [
  {
    id: 'gold-subaqua',
    name: 'Krono Subaqua Gold King',
    category: 'caballero',
    gender: 'caballero',
    series: 'Edición Máxima Presencia',
    tier: 'Línea Premium',
    tierClass: 'tier-premium',
    price: 85000,
    oldPrice: 165000,
    savings: 80000,
    discountPct: 48,
    image: '/assets/img/hero_watch_luxury.jpg',
    badge: '🔥 El Más Vendido',
    stock: 'Quedan 3 uds',
    specs: [
      'Bisel deportivo dorado con números en alto relieve',
      'Pulso de silicona ultra-confort con inserciones doradas',
      'Esfera multinivel con diales cronográficos de lujo',
      'Caja de 50mm con acabados cepillados de alta gama',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'chrono-stealth-black',
    name: 'Krono Chrono Stealth Black',
    category: 'caballero',
    gender: 'caballero',
    series: 'Colección Midnight Titan',
    tier: 'Línea Plus',
    tierClass: 'tier-plus',
    price: 85000,
    oldPrice: 160000,
    savings: 75000,
    discountPct: 47,
    image: '/assets/img/showcase_box.jpg',
    badge: '⚡ Edición Limitada',
    stock: 'Última unidad',
    specs: [
      'Acabado negro mate táctico con acentos dorados',
      'Cristal mineral resistente a rayones y golpes leves',
      'Correa ergonómica reforzada anti-sudor',
      'Elegancia imponente para ocasiones formales o casuales',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'ocean-blue-ice',
    name: 'Krono Ocean Blue Sapphire',
    category: 'caballero',
    gender: 'caballero',
    series: 'Deep Diver Heritage',
    tier: 'Línea Premium',
    tierClass: 'tier-premium',
    price: 85000,
    oldPrice: 170000,
    savings: 85000,
    discountPct: 50,
    image: '/assets/img/showcase_box.jpg',
    badge: '💎 Novedad',
    stock: 'Disponible',
    specs: [
      'Esfera azul zafiro reflectiva de alto impacto visual',
      'Bisel exterior de alto relieve con contraste oscuro',
      'Agujas con acabado luminiscente para la noche',
      'Detalles de corona y pulsadores estilo Invicta Pro',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'venom-red-sport',
    name: 'Krono Venom Red Sport',
    category: 'caballero',
    gender: 'caballero',
    series: 'Motorsport Performance',
    tier: 'Línea Plus',
    tierClass: 'tier-plus',
    price: 85000,
    oldPrice: 165000,
    savings: 80000,
    discountPct: 48,
    image: '/assets/img/models_stacked.png',
    badge: '🏎️ Look Deportivo',
    stock: 'Quedan 2 uds',
    specs: [
      'Pulso rojo vibrante de silicona de grado médico',
      'Caja robusta con tornillería perimetral visible',
      'Dial esqueletado vanguardista de alta tecnología',
      'Look agresivo e imponente para destacar donde vayas',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'master-two-tone',
    name: 'Krono Master Two-Tone Gold',
    category: 'caballero',
    gender: 'caballero',
    series: 'Executive Luxury Series',
    tier: 'Línea Exclusiva',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 175000,
    savings: 90000,
    discountPct: 51,
    image: '/assets/img/wrist_lifestyle_krono.jpg',
    badge: '👑 Exclusivo',
    stock: 'Disponible',
    specs: [
      'Combinación regia de oro pulido y negro profundo',
      'Diseño inspirado en el icónico Invicta Reserve',
      'Doble hebilla de acero inoxidable grabada',
      'El favorito para ejecutivos y amantes del lujo',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'krono-dama-rose-gold',
    name: 'Krono Dama Queen Rosé Gold',
    category: 'dama',
    gender: 'dama',
    series: 'Feminine Elegance Collection',
    tier: 'Línea Premium',
    tierClass: 'tier-premium',
    price: 85000,
    oldPrice: 160000,
    savings: 75000,
    discountPct: 47,
    image: '/assets/img/showcase_box.jpg',
    badge: '🌸 Línea Dama',
    stock: 'Disponible',
    specs: [
      'Caja delicada de 38mm en tono oro rosa reluciente',
      'Incrustaciones brillantes tipo circonia en bisel',
      'Pulso ergonómico suave en silicona rosada pastel',
      'Maquinaria japonesa de cuarzo de alta precisión',
      'Incluye estuche de lujo acolchado y pila de repuesto'
    ]
  },
  {
    id: 'combo-pareja-royal',
    name: 'Combo Pareja King & Queen (2 Relojes)',
    category: 'dama',
    gender: 'pareja',
    series: 'Duo Lovers Edition',
    tier: 'Línea Exclusiva',
    tierClass: 'tier-exclusive',
    price: 160000,
    oldPrice: 320000,
    savings: 160000,
    discountPct: 50,
    image: '/assets/img/models_stacked.png',
    badge: '❤️ Combo Pareja',
    stock: 'Stock en Ibagué',
    specs: [
      '1x Reloj Caballero Subaqua Gold King 50mm',
      '1x Reloj Dama Queen Rosé Gold 38mm',
      '2x Estuches rígidos de lujo individuales',
      '2x Pilas de repuesto originales selladas',
      'Envío prioritario con obsequio especial'
    ]
  },
  {
    id: 'combo-completo-box',
    name: 'Kit Completo Krono ($85K)',
    category: 'caballero',
    gender: 'caballero',
    series: 'Combo Oficial Garantizado',
    tier: 'Línea Plus',
    tierClass: 'tier-plus',
    price: 85000,
    oldPrice: 160000,
    savings: 75000,
    discountPct: 47,
    image: '/assets/img/boxes_and_kits.png',
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

/* ── COMBOS PARA EMPRENDEDORES & MAYORISTAS ────────────────────────────────
   Inspirado en la categorización de Container Of Time (lotes x4, x10)
   y $P Company (Combos Emprendedor para generar ingresos)
   ───────────────────────────────────────────────────────────────────────── */
export const ENTREPRENEUR_COMBOS = [
  {
    id: 'lote-emprendedor-3',
    name: 'Combo Emprendedor (Lote x3)',
    subtitle: 'Ideal para iniciar tu negocio de relojería con bajo capital',
    units: 3,
    priceTotal: 225000,
    pricePerUnit: 75000,
    oldPriceTotal: 480000,
    savings: 255000,
    discountPct: 53,
    estimatedProfit: 135000,
    featured: false,
    ribbon: 'Inicia Hoy',
    badgeColor: 'var(--blue)',
    includes: [
      '3 Relojes tipo Invicta a elección del catálogo',
      '3 Estuches rígidos de lujo amarillos incluidos',
      '3 Pilas de repuesto selladas de fábrica',
      'Asesoría comercial directa de Juan para revender',
      'Margen sugerido: revéndelos a $120.000 c/u'
    ]
  },
  {
    id: 'lote-negocio-5',
    name: 'Combo Mayorista Pro (Lote x5)',
    subtitle: 'El más solicitado por emprendedores en Ibagué y Tolima',
    units: 5,
    priceTotal: 345000,
    pricePerUnit: 69000,
    oldPriceTotal: 800000,
    savings: 455000,
    discountPct: 57,
    estimatedProfit: 255000,
    featured: true,
    ribbon: '🔥 Más Rentable',
    badgeColor: 'var(--gold)',
    includes: [
      '5 Relojes tipo Invicta surtidos (los más vendidos)',
      '5 Estuches de presentación rígidos de lujo',
      '5 Pilas de repuesto selladas de alta duración',
      'Fotos en alta resolución listas para tus redes sociales',
      'Garantía total de satisfacción y recambio de piezas'
    ]
  },
  {
    id: 'lote-container-10',
    name: 'Caja Container Mayorista (Lote x10)',
    subtitle: 'Precio distribuidor oficial para tiendas, boutiques y revendedores',
    units: 10,
    priceTotal: 640000,
    pricePerUnit: 64000,
    oldPriceTotal: 1600000,
    savings: 960000,
    discountPct: 60,
    estimatedProfit: 560000,
    featured: false,
    ribbon: 'Precio Fábrica',
    badgeColor: 'var(--red)',
    includes: [
      '10 Relojes surtidos de máxima presencia y demanda',
      '10 Estuches oficiales rígidos de protección',
      '10 Pilas selladas de repuesto de respaldo',
      'Envío prioritario gratis a cualquier ciudad de Colombia',
      'Precio imbatible de solo $64.000 COP por unidad'
    ]
  }
];

export const BENEFITS = [
  {
    title: 'Envíos Garantizados',
    desc: 'Ibagué entrega el mismo día con pago contra entrega. Nacional 3 a 5 días con guía oficial.',
    icon: 'Truck'
  },
  {
    title: 'Estuche de Regalo Incluido',
    desc: 'Todos los combos incluyen estuche rígido amarillo acolchado oficial sin ningún sobrecosto.',
    icon: 'Gift'
  },
  {
    title: 'Soporte Personalizado',
    desc: 'Atención 1 a 1 por WhatsApp con Juan. Te mandamos video y foto de tu reloj antes de empacar.',
    icon: 'Phone'
  },
  {
    title: 'Garantía Krono 90 Días',
    desc: '3 meses de respaldo en maquinaria cuarzo y pila. Compra con total tranquilidad y respaldo local.',
    icon: 'ShieldCheck'
  }
];

export const PAYMENT_METHODS = [
  { name: 'Pago Contra Entrega (Efectivo)', desc: 'Pagas al recibir en Ibagué o Colombia' },
  { name: 'Nequi', desc: 'Transferencia directa al instante' },
  { name: 'Daviplata', desc: 'Sin comisiones desde tu celular' },
  { name: 'Bancolombia', desc: 'A la mano o cuenta corriente' }
];

export const REAL_PHOTOS = [
  {
    id: 1,
    title: 'Exhibidor Real con Teléfono',
    desc: 'Línea de atención 319 3620748 visible. Piezas reales disponibles en Ibagué.',
    badge: 'Menos de 90K 🚨',
    image: '/assets/img/showcase_box.jpg'
  },
  {
    id: 2,
    title: 'Modelos con Estuches Amarillos',
    desc: 'Cajas rígidas de presentación y protección de alta gama.',
    badge: 'Con Estuches',
    image: '/assets/img/models_stacked.png'
  },
  {
    id: 3,
    title: 'Kits Listos con Pilas de Repuesto',
    desc: 'Baterías adicionales de repuesto selladas en blíster de fábrica.',
    badge: 'Pila Gratis',
    image: '/assets/img/boxes_and_kits.png'
  }
];

export const STORIES = [
  {
    id: 1,
    title: 'Nuevo Ingreso',
    subtitle: 'Lote de 8 relojes en Ibagué',
    image: '/assets/img/showcase_box.jpg',
    tag: '📦 Stock Local'
  },
  {
    id: 2,
    title: 'Unboxing Amarillo',
    subtitle: 'Estuche de lujo y pila sellada',
    image: '/assets/img/boxes_and_kits.png',
    tag: '🎁 Kit Completo'
  },
  {
    id: 3,
    title: 'En la Muñeca',
    subtitle: 'Presencia masiva tipo Invicta',
    image: '/assets/img/wrist_lifestyle_krono.jpg',
    tag: '👑 Puesto en Mano'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Carlos Restrepo',
    city: 'Ibagué (El Vergel)',
    watch: 'Krono Subaqua Gold King',
    rating: 5,
    text: 'El reloj tiene un peso y una presencia tremenda. Se ve súper fino y la caja amarilla le da un toque muy elegante. Me lo entregaron en El Vergel el mismo día y pagué contra entrega. 10 de 10.'
  },
  {
    name: 'Felipe Arango',
    city: 'Bogotá D.C.',
    watch: 'Krono Stealth Black',
    rating: 5,
    text: 'Sinceramente por $85.000 con estuche y pila de repuesto pensé que era broma, pero llegó impecable a Bogotá. Juan me mandó la guía de Interrapidísimo rápido y pagué el reloj al recibir. Muy honestos.'
  },
  {
    name: 'Juan Manuel Guzmán',
    city: 'Ibagué (Centro)',
    watch: 'Combo Emprendedor x5',
    rating: 5,
    text: 'Compré el lote x5 para revender entre mis compañeros de trabajo. En menos de una semana los vendí todos a $125.000 cada uno y me gané más de $280.000 limpios. Excelente calidad y soporte de Juan.'
  }
];

export const FAQS = [
  {
    q: '¿Qué incluye exactamente el precio promocional de $85.000 COP?',
    a: 'El combo de $85.000 COP incluye: 1 reloj estilo Invicta de alta presencia a tu elección, 1 caja rígida amarilla de presentación y protección acolchada, 1 batería de repuesto original sellada en blíster y las etiquetas de la marca. Cero costos ocultos ni cargos sorpresa.'
  },
  {
    q: '¿Cómo funciona el pago contra entrega en Ibagué?',
    a: 'En Ibagué no pagas absolutamente nada por adelantado. Te comunicas con Juan por WhatsApp, nos das tu dirección y modelo preferido, te lo enviamos con nuestro domiciliario de confianza, lo revisas en persona y le pagas en efectivo o por Nequi/Daviplata en la puerta de tu casa.'
  },
  {
    q: '¿Cómo se maneja el envío al resto de Colombia y cuánto tarda?',
    a: 'Para envíos nacionales fuera de Ibagué, tardamos entre 3 a 5 días hábiles a través de Interrapidísimo o Envía. Solo cancelas el valor del flete (aprox $15.000 COP) para generar la guía oficial con seguro. El valor de tu reloj ($85.000 COP) lo pagas en efectivo directamente a la transportadora al recibir.'
  },
  {
    q: '¿Qué garantía tienen los relojes y los combos?',
    a: 'Todos nuestros relojes cuentan con 90 días (3 meses) de garantía total sobre el mecanismo de cuarzo y batería. Cada pieza es inspeccionada rigurosamente antes de empacar. Si notas cualquier inconformidad de fábrica, Juan te soluciona de inmediato.'
  },
  {
    q: '¿Cómo funcionan los Combos Emprendedor y lotes mayoristas?',
    a: 'Diseñamos lotes especiales de 3, 5 y 10 unidades con precios desde $64.000 COP por kit (reloj + estuche + pila). Son ideales para revender en tu ciudad, empresa o redes sociales. Cada lote incluye material fotográfico en alta resolución y asesoría directa de Juan para que vendas rápido.'
  },
  {
    q: '¿Cómo realizo el pago si escojo Nequi, Daviplata o Bancolombia?',
    a: 'El pago se coordina directamente por WhatsApp con Juan. Una vez que apruebes el modelo y la entrega, te compartimos los códigos QR oficiales de Nequi y Daviplata para transferir sin comisiones bancarias.'
  }
];
