/* ─────────────────────────────────────────────────────────────────────────
   KRONO (@krono.ibg) ─ Catálogo & Datos Comerciales v4.0
   Categorías: Invicta Collection & Rolex Style Collection
   Combos Emprendedor armados con fotos reales
   ───────────────────────────────────────────────────────────────────────── */

export const PRODUCTS = [
  /* ══════════════════════════════════════════════════════════════════════════
     COLECCIÓN INVICTA (Fuerza, Gran Presencia & Deporte Urbano)
     ══════════════════════════════════════════════════════════════════════════ */
  {
    id: 'krono-gold-subaqua-real',
    name: 'Subaqua Gold',
    brand: 'Colección Invicta',
    category: 'invicta',
    gender: 'caballero',
    series: 'Imperial Gold Master 2026',
    tier: 'Línea Imperial Gold',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 175000,
    savings: 90000,
    discountPct: 51,
    image: '/assets/img/watch_invicta_gold_subaqua_real.png',
    badge: '🔥 100% Real · El Más Buscado',
    stock: 'Quedan 2 uds',
    specs: [
      'Bisel exterior de oro pulido con relieves e inserciones triangulares negras',
      'Esfera dorada brillante con fechador funcional y tres subdiales deportivos',
      'Pulso de silicona vulcanizada negra con eslabones dorados entrelazados',
      'Caja monumental de 52mm con corona atornillada y protectores laterales',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'krono-bolt-silver-phantom',
    name: 'Bolt Silver',
    brand: 'Colección Invicta',
    category: 'invicta',
    gender: 'caballero',
    series: 'Bolt Magnum Power Collection',
    tier: 'Línea Magnum Heavy',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 180000,
    savings: 95000,
    discountPct: 53,
    image: '/assets/img/watch_invicta_bolt_silver_real.png',
    badge: '⚡ Números Gigantes en Relieve',
    stock: 'Quedan 2 uds',
    specs: [
      'Impactante esfera plateada texturizada con números arábigos gigantes (12, 2, 4, 6, 8, 10)',
      'Bisel deportivo negro carbón ionizado con escala de minutos grabada',
      'Pulso de silicona ergonómica de alta resistencia con pasador de acero',
      'Caja maciza de 54mm diseñada para máxima presencia en muñeca',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'krono-skeleton-cyber-red',
    name: 'Skeleton Red',
    brand: 'Colección Invicta',
    category: 'invicta',
    gender: 'caballero',
    series: 'Colección Cyber Esqueleto 2026',
    tier: 'Línea Mecánica Cyber',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 175000,
    savings: 90000,
    discountPct: 51,
    image: '/assets/img/watch_invicta_skeleton_red.png',
    badge: '🔥 Lanzamiento Cyber Red',
    stock: 'Quedan 2 uds',
    specs: [
      'Maquinaria mecánica esqueletada visible a dos caras con engranajes en movimiento',
      'Bisel dentado negro carbón ionizado de 52mm con escala de minutos en relieve',
      'Pulso de silicona roja deportiva de grado militar hipoalergénica',
      'Caja con tornillería perimetral visible y rubíes mecánicos en dial',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'krono-subaqua-gold-white',
    name: 'Subaqua White',
    brand: 'Colección Invicta',
    category: 'invicta',
    gender: 'caballero',
    series: 'Imperial Chrono Edition',
    tier: 'Línea Imperial Gold',
    tierClass: 'tier-premium',
    price: 85000,
    oldPrice: 170000,
    savings: 85000,
    discountPct: 50,
    image: '/assets/img/watch_invicta_gold_chrono.png',
    badge: '👑 Élite Gold Master',
    stock: 'Quedan 3 uds',
    specs: [
      'Bisel labrado en oro reluciente con textura tallada artesanal',
      'Esfera blanca polar con tres subdiales funcionales y fechador a las 4',
      'Pulso de silicona vulcanizada negra con inserciones doradas entrelazadas',
      'Caja robusta de 52mm de presencia imponente para muñecas de alto perfil',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'krono-bolt-zeus-magnum',
    name: 'Bolt Magnum',
    brand: 'Colección Invicta',
    category: 'invicta',
    gender: 'caballero',
    series: 'Zeus Magnum Power Collection',
    tier: 'Línea Zeus Heavy',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 180000,
    savings: 95000,
    discountPct: 53,
    image: '/assets/img/watch_invicta_gold_magnum.jpg',
    badge: '⚡ Presencia Extrema Gold',
    stock: 'Solo 1 unidad',
    specs: [
      'Impactante esfera dorada texturizada con números arábigos gigantes en alto relieve',
      'Escala taquimétrica exterior y marcadores de cronómetro de alta precisión',
      'Caja monumental de 54mm con bisel grabado de estilo Zeus Bolt',
      'Correa ergonómica reforzada con eslabones dorados entrelazados',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },
  {
    id: 'krono-skeleton-silver-steel',
    name: 'Skeleton Silver',
    brand: 'Colección Invicta',
    category: 'invicta',
    gender: 'caballero',
    series: 'Titanium Steel Horizon',
    tier: 'Línea Cyber Steel',
    tierClass: 'tier-plus',
    price: 85000,
    oldPrice: 165000,
    savings: 80000,
    discountPct: 48,
    image: '/assets/img/watch_invicta_skeleton_silver.png',
    badge: '⚡ Maquinaria Esqueletada',
    stock: 'Solo 1 unidad',
    specs: [
      'Bisel de acero plateado pulido con textura deportiva e índices grabados',
      'Esfera esqueletada futurista que exhibe el corazón y balance mecánico',
      'Correa deportiva de silicona negra con pasadores de acero y hebilla grabada',
      'Agujas esqueletadas luminiscentes para lectura nocturna',
      'Incluye estuche rígido de lujo y pila sellada'
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     COLECCIÓN ROLEX STYLE (Elegancia Clásica, Prestigio & Distinción)
     ══════════════════════════════════════════════════════════════════════════ */
  {
    id: 'krono-rolex-submariner-black',
    name: 'Submariner Black',
    brand: 'Colección Rolex Style',
    category: 'rolex',
    gender: 'caballero',
    series: 'Oyster Professional Series',
    tier: 'Línea Submariner Élite',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 180000,
    savings: 95000,
    discountPct: 53,
    image: '/assets/img/watch_rolex_submariner_black.jpg',
    badge: '🚫 AGOTADO — Próximamente',
    stock: 'AGOTADO hasta nuevo aviso',
    specs: [
      'Bisel giratorio cerámico negro profundo graduado de 60 minutos',
      'Esfera negra azabache con marcadores luminiscentes y lupa cíclope de fecha a las 3',
      'Brazalete Oyster de acero inoxidable 316L con eslabones macizos cepillados',
      'Caja clásica de 41mm con protectores de corona para máxima distinción',
      'Incluye estuche rígido y pila sellada de fábrica'
    ]
  },
  {
    id: 'krono-rolex-datejust-twotone',
    name: 'Datejust Two-Tone',
    brand: 'Colección Rolex Style',
    category: 'rolex',
    gender: 'caballero',
    series: 'Imperial Classic Series',
    tier: 'Línea Jubilee Prestige',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 180000,
    savings: 95000,
    discountPct: 53,
    image: '/assets/img/watch_rolex_datejust_twotone.jpg',
    badge: '🚫 AGOTADO — Próximamente',
    stock: 'AGOTADO hasta nuevo aviso',
    specs: [
      'Bisel estriado icónico facetado bañado en oro amarillo reflectivo',
      'Esfera champagne sunburst con lupa cíclope de aumento sobre el fechador',
      'Brazalete Jubilee de cinco piezas entrelazadas en acero pulido y oro',
      'Caja de 41mm con brillo espejo de máxima elegancia ejecutiva',
      'Incluye estuche rígido y pila sellada de fábrica'
    ]
  },
  {
    id: 'krono-rolex-daydate-green',
    name: 'Day-Date Emerald',
    brand: 'Colección Rolex Style',
    category: 'rolex',
    gender: 'caballero',
    series: 'President Prestige Collection',
    tier: 'Línea Oro Total',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 185000,
    savings: 100000,
    discountPct: 54,
    image: '/assets/img/watch_rolex_daydate_green.jpg',
    badge: '🚫 AGOTADO — Próximamente',
    stock: 'AGOTADO hasta nuevo aviso',
    specs: [
      'Radiante dial verde esmeralda con números romanos dorados en alto relieve',
      'Ventana panorámica de día a las 12 y lente de fecha a las 3 en punto',
      'Bisel estriado en oro con pulso President de eslabones semicirculares',
      'Caja de 40mm dorada con brillo pulido de alta joyería',
      'Incluye estuche rígido y pila sellada de fábrica'
    ]
  },
  {
    id: 'krono-rolex-daytona-panda',
    name: 'Daytona Panda',
    brand: 'Colección Rolex Style',
    category: 'rolex',
    gender: 'caballero',
    series: 'Motorsport Chrono Series',
    tier: 'Línea Cosmograph Sport',
    tierClass: 'tier-exclusive',
    price: 85000,
    oldPrice: 180000,
    savings: 95000,
    discountPct: 53,
    image: '/assets/img/watch_rolex_daytona_panda.jpg',
    badge: '🚫 AGOTADO — Próximamente',
    stock: 'AGOTADO hasta nuevo aviso',
    specs: [
      'Esfera blanca polar con tres subdiales de cronógrafo en contraste negro',
      'Bisel taquimétrico cerámico negro con escala numérica para velocidad',
      'Pulsadores tipo crono y brazalete Oyster macizo de acero inoxidable',
      'Caja deportiva de 40mm inspirada en las pistas de carreras más legendarias',
      'Incluye estuche rígido y pila sellada de fábrica'
    ]
  }
];

/* ── COMBOS PARA EMPRENDEDORES & MAYORISTAS ────────────────────────────────
   Armados con los modelos Invicta reales (cajas amarillas + pilas)
   mostrados en el stock físico real
   ───────────────────────────────────────────────────────────────────────── */
export const ENTREPRENEUR_COMBOS = [
  {
    id: 'lote-emprendedor-4',
    name: 'Pack Emprendedor Inicial (Lote x4)',
    subtitle: 'Ideal para arrancar tu negocio de relojería con bajo capital y retorno rápido',
    units: 4,
    priceTotal: 180000,
    pricePerUnit: 45000,
    oldPriceTotal: 340000,
    savings: 160000,
    discountPct: 47,
    estimatedProfit: 160000,
    featured: false,
    soldOut: true,
    ribbon: '🔴 AGOTADO',
    badgeColor: 'var(--red)',
    image: '/assets/img/media_1791997974589.png',
    includes: [
      '4 Relojes tipo Invicta a elección (Subaqua, Bolt, Skeleton)',
      '4 Estuches amarillos rígidos acolchados de presentación',
      '4 Pilas de repuesto selladas de fábrica en blíster',
      'Fotos y videos en alta resolución para tus estados de WhatsApp e Instagram',
      'Asesoría comercial directa para revenderlos a $85.000 COP c/u ($40K de ganancia limpia por reloj)'
    ]
  },
  {
    id: 'lote-negocio-5',
    name: 'Combo Mayorista Pro (Lote x5)',
    subtitle: 'El paquete preferido por revendedores a nivel nacional por su alta rotación',
    units: 5,
    priceTotal: 225000,
    pricePerUnit: 45000,
    oldPriceTotal: 450000,
    savings: 225000,
    discountPct: 50,
    estimatedProfit: 200000,
    featured: true,
    soldOut: true,
    ribbon: '🔴 AGOTADO',
    badgeColor: 'var(--red)',
    image: '/assets/img/media_1791997978060.png',
    includes: [
      '5 Relojes Invicta surtidos (los 5 modelos top en ventas comprobadas)',
      '5 Estuches rígidos amarillos de lujo individuales',
      '5 Pilas de repuesto selladas de fábrica en blíster',
      'Material publicitario digital completo listo para subir',
      'Garantía directa de 30 días con recambio inmediato',
      'Margen neto estimado de +$200.000 COP al revender a $85.000'
    ]
  },
  {
    id: 'lote-container-10',
    name: 'Caja Distribuidor Container (Lote x10)',
    subtitle: 'Precio directo de importación para tiendas, boutiques y distribuidores comerciales',
    units: 10,
    priceTotal: 450000,
    pricePerUnit: 45000,
    oldPriceTotal: 900000,
    savings: 450000,
    discountPct: 50,
    estimatedProfit: 400000,
    featured: false,
    soldOut: true,
    ribbon: '🔴 AGOTADO',
    badgeColor: 'var(--red)',
    image: '/assets/img/models_stacked.png',
    includes: [
      '10 Relojes surtidos de máxima presencia (Invicta + Rolex Style a elección)',
      '10 Estuches oficiales de protección rígidos',
      '10 Pilas selladas de repuesto de larga vida',
      'Envío Nacional Prioritario GRATIS a cualquier rincón de Colombia',
      'Precio imbatible de solo $45.000 COP por kit completo',
      'Margen neto proyectado: más de +$400.000 COP limpios al revender'
    ]
  }
];

export const BENEFITS = [
  {
    title: 'Envíos Asegurados a Todo Colombia',
    desc: 'Despachos diarios con cobertura nacional y número de guía oficial para rastreo 24/7.',
    icon: 'Truck'
  },
  {
    title: 'Estuche de Regalo Incluido',
    desc: 'Todos los combos incluyen estuche rígido acolchado de protección sin ningún costo adicional.',
    icon: 'Gift'
  },
  {
    title: 'Soporte Personalizado 1 a 1',
    desc: 'Atención directa por WhatsApp con tu asesor. Te enviamos foto de tu kit antes de embalar.',
    icon: 'Phone'
  },
  {
    title: 'Garantía Krono 30 Días',
    desc: 'Respaldo directo sobre maquinaria y funcionamiento. Compra con total tranquilidad.',
    icon: 'ShieldCheck'
  }
];

export const PAYMENT_METHODS = [
  { name: 'Pago Contra Entrega (Efectivo)', desc: 'Pagas al recibir y verificar tu paquete en mano' },
  { name: 'Nequi', desc: 'Transferencia directa al instante sin comisión' },
  { name: 'Daviplata', desc: 'Pago rápido desde tu celular' },
  { name: 'Bancolombia', desc: 'Transferencia o consignación a la mano' }
];

/* ── COMPROBANTES DE ENVÍO REALES A TODO EL PAÍS (Fotos 100% Únicas) ─────── */
export const SHIPPING_PROOFS = [
  {
    id: 0,
    title: 'Lote Diario Listo para Despacho',
    city: 'Envíos Diarios Nacionales',
    carrier: 'Inter Rapidísimo / DHL',
    badge: '🚀 Despachos Masivos',
    badgeColor: '#10b981',
    desc: 'Paquetes embalados con empaque térmico de alta seguridad, guías impresas y entrega diaria a la transportadora.',
    image: '/assets/img/shipping_batch_packages.png'
  },
  {
    id: 1,
    title: 'Guías Impresas y Rotuladas',
    city: 'Empaque de Seguridad',
    carrier: 'Sobres de Alta Protección',
    badge: '📋 Guías Certificadas',
    badgeColor: '#3b82f6',
    desc: 'Cada sobre sellado cuenta con código de barras y QR para rastreo oficial en línea.',
    image: '/assets/img/shipping_labels_ready.png'
  },
  {
    id: 2,
    title: 'Entrega Directa con Guía Oficial',
    city: 'Cobertura Nacional',
    carrier: 'Inter Rapidísimo Asegurado',
    badge: '🚚 En Camino a Destino',
    badgeColor: '#ef4444',
    desc: 'Paquetes entregados en punto oficial de mensajería con seguro de transporte.',
    image: '/assets/img/shipping_proof_bogota.png'
  },
  {
    id: 3,
    title: 'Pago Contra Entrega a Domicilio',
    city: 'Ciudades & Municipios',
    carrier: 'Transportadora Oficial',
    badge: '📦 Contra Entrega 100%',
    badgeColor: '#f59e0b',
    desc: 'Entrega en la puerta de tu casa con pago en efectivo al recibir y verificar tu reloj en mano.',
    image: '/assets/img/shipping_proof_valle.png'
  }
];

export const REAL_PHOTOS = SHIPPING_PROOFS;

export const TESTIMONIALS = [
  {
    name: 'Carlos Restrepo',
    city: 'Medellín (Antioquia)',
    watch: 'Krono Subaqua Gold Master',
    rating: 5,
    text: 'El reloj tiene un peso y una presencia tremenda. Se ve súper fino y la caja amarilla le da un toque muy elegante. Me llegó rápido y pagué contra entrega a la transportadora. 10 de 10.'
  },
  {
    name: 'Felipe Arango',
    city: 'Bogotá D.C.',
    watch: 'Krono Bolt Phantom Silver',
    rating: 5,
    text: 'Sinceramente por $85.000 con estuche y pila de repuesto pensé que era broma, pero llegó impecable a Bogotá. El asesor me mandó la guía rápido y pagué al recibir en la puerta. Muy recomendados.'
  },
  {
    name: 'Juan Manuel Guzmán',
    city: 'Cali (Valle)',
    watch: 'Combo Emprendedor x5',
    rating: 5,
    text: 'Compré el lote x5 para revender entre mis compañeros. En menos de una semana los vendí todos y me gané más de $200.000 limpios. Excelente calidad y soporte del asesor.'
  }
];

export const FAQS = [
  {
    q: '¿Qué incluye exactamente el kit de $85.000 COP?',
    a: 'Recibes el combo completo: 1 reloj a tu elección, 1 estuche rígido acolchado de lujo (GRATIS), 1 batería sellada de repuesto (GRATIS) y etiquetas de autenticidad. Cero costos ocultos.'
  },
  {
    q: '¿Cómo funciona el Pago Contra Entrega?',
    a: 'No pagas nada por adelantado. Te enviamos el paquete con guía oficial y seguro. Lo recibes en tu puerta, verificas tu kit en mano y le cancelas en efectivo a la transportadora.'
  },
  {
    q: '¿Cómo se maneja el envío a todo Colombia?',
    a: 'Despachamos por Inter Rapidísimo o DHL con número de guía oficial y rastreo 24/7 en tiempo real hasta tu puerta.'
  },
  {
    q: '¿Qué garantía tienen los relojes?',
    a: 'Cuentas con 30 días de garantía directa por maquinaria y funcionamiento. Cada pieza es inspeccionada minuciosamente antes de ser empacada.'
  },
  {
    q: '¿Cómo compro al por mayor para revender?',
    a: 'Tenemos lotes desde 4 unidades a solo $45.000 COP por kit (reloj + estuche rígido + pila). Te brindamos fotos y videos en HD para tus redes y asesoría comercial.'
  },
  {
    q: '¿Puedo pedir fotos o video real antes del envío?',
    a: '¡Totalmente! Escríbenos al WhatsApp 319 3620748 y tu asesor te enviará un video corto en alta definición mostrando los detalles de la pieza exacta que se te enviará.'
  }
];

