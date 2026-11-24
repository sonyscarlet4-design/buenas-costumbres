(() => {
  'use strict';

  // Cambia '591XXXXXXXX' por el número de 8 dígitos de Bolivia del local (ej. '59167840739')
  const WHATSAPP_NUMERO = '59164100633';

  const BLACKLIST = ['DROP', 'SELECT', 'DELETE', 'INSERT', 'SCRIPT', '<', '>', 'GRATIS', 'HACK', 'TEST123', 'BC-999'];

  const FOTOS_LOCALES = {
    local: './local.jpeg',
    pan: './pan.jpeg',
    pasteles: './pastel.jpeg',
    croissants: './crossan.jpeg',
    queques: './queque.jpeg',
    galletas: './galleta.jpeg',
    alfajores: './alfajor.jpeg',
    cinnabon: './cinnabon.jpeg',
    rollos: './rollos.jpeg',
    empanadas: './empanada.jpeg',
    pieLimon: './pielimon.jpeg',
    pieMaracuya: './piemaracuya.jpeg',
    pieFrutilla: './piefresa.jpeg',
    variado: './empanada.jpeg'
  };
  const CATALOGO_VINTAGE = [
    {
      id: 1,
      codigo: 'BC-01',
      imgKey: 'croissants',
      categoria: 'panaderia',
      categoria_nombre: 'Pan & Croissants',
      nombre: 'Croissants',
      descripcion: 'Hojaldre dorado y tierno recién horneado con aroma mantequilloso.',
      precio: 14.00
    },
    {
      id: 2,
      codigo: 'BC-02',
      imgKey: 'pan',
      categoria: 'panaderia',
      categoria_nombre: 'Pan & Croissants',
      nombre: 'Pan Artesanal',
      descripcion: 'Pan casero de corteza suave y miga esponjosa para acompañar el café.',
      precio: 10.00
    },
    {
      id: 3,
      codigo: 'BC-03',
      imgKey: 'pasteles',
      categoria: 'pasteleria',
      categoria_nombre: 'Pasteles & Dulces',
      nombre: 'Pasteles Vintage',
      descripcion: 'Porción delicada de pastel tradicional de pastelería para la tarde.',
      precio: 18.00
    },
    {
      id: 4,
      codigo: 'BC-04',
      imgKey: 'queques',
      categoria: 'pasteleria',
      categoria_nombre: 'Pasteles & Dulces',
      nombre: 'Queques de la Casa',
      descripcion: 'Queque suave y esponjoso con toque casero tradicional.',
      precio: 15.00
    },
    {
      id: 5,
      codigo: 'BC-05',
      imgKey: 'galletas',
      categoria: 'pasteleria',
      categoria_nombre: 'Pasteles & Dulces',
      nombre: 'Galletas',
      descripcion: 'Galletitas horneadas con textura tierna y sabor dulce delicado.',
      precio: 12.00
    },
    {
      id: 6,
      codigo: 'BC-06',
      imgKey: 'alfajores',
      categoria: 'pasteleria',
      categoria_nombre: 'Pasteles & Dulces',
      nombre: 'Alfajores Clásicos',
      descripcion: 'Suaves alfajores rellenos con dulce de leche cremoso.',
      precio: 13.00
    },
    {
      id: 7,
      codigo: 'BC-07',
      imgKey: 'cinnabon',
      categoria: 'pies',
      categoria_nombre: 'Pies & Rollos',
      nombre: 'Cinnabon de Canela',
      descripcion: 'Rollo esponjoso con canela aromática y glaseado suave.',
      precio: 18.00
    },
    {
      id: 8,
      codigo: 'BC-08',
      imgKey: 'rollos',
      categoria: 'pies',
      categoria_nombre: 'Pies & Rollos',
      nombre: 'Rollos de Canela',
      descripcion: 'Rollito tibio de canela tradicional ideal para merendar.',
      precio: 16.00
    },
    {
      id: 9,
      codigo: 'BC-09',
      imgKey: 'pieLimon',
      categoria: 'pies',
      categoria_nombre: 'Pies & Rollos',
      nombre: 'Pie de Limón',
      descripcion: 'Base crocante con crema cítrica fresca de limón.',
      precio: 17.00
    },
    {
      id: 10,
      codigo: 'BC-10',
      imgKey: 'pieMaracuya',
      categoria: 'pies',
      categoria_nombre: 'Pies & Rollos',
      nombre: 'Pie de Maracuyá',
      descripcion: 'Relleno frutal de maracuyá sobre masa horneada dorada.',
      precio: 17.00
    },
    {
      id: 11,
      codigo: 'BC-11',
      imgKey: 'pieFrutilla',
      categoria: 'pies',
      categoria_nombre: 'Pies & Rollos',
      nombre: 'Pie de Frutilla',
      descripcion: 'Dulce de frutilla sobre base de pastelería artesanal.',
      precio: 18.00
    },
    {
      id: 12,
      codigo: 'BC-12',
      imgKey: 'variado',
      categoria: 'salado',
      categoria_nombre: 'Dulce & Salado',
      nombre: 'Empanadas',
      descripcion: 'Empanadas y variado dulce y salado recién preparado.',
      precio: 16.00
    }
  ];

  const cacheArte = new Map();

  function obtenerArteCuteVintage(clave, titulo, precio) {
    const key = `${clave}|${titulo}|${precio}`;
    if (cacheArte.has(key)) return cacheArte.get(key);

    const local = FOTOS_LOCALES[clave];
    if (local && local.trim() !== '') {
      cacheArte.set(key, local.trim());
      return local.trim();
    }

    const temas = {
      local: { a: '#E8D4B9', b: '#E19E6A', cinta: '#702C37', badge: '#F2B03F', icono: '🕯️☕', sub: 'PLAZA UYUNI · LA PAZ' },
      panaderia: { a: '#E8D4B9', b: '#F2B03F', cinta: '#D64E38', badge: '#702C37', icono: '🥐🥖', sub: 'HORNO VINTAGE' },
      pasteleria: { a: '#E8D4B9', b: '#E19E6A', cinta: '#D64E38', badge: '#6F6F4B', icono: '🧁🍰', sub: 'PASTELERÍA CUTE' },
      pies: { a: '#E8D4B9', b: '#E19E6A', cinta: '#6F6F4B', badge: '#D64E38', icono: '🥧🍯', sub: 'DULCE ARTESANAL' },
      salado: { a: '#E8D4B9', b: '#6F6F4B', cinta: '#702C37', badge: '#F2B03F', icono: '🥟☕', sub: 'DULCE & SALADO' }
    };

    const t = temas[clave] || temas.pasteleria;
    const tituloCorto = String(titulo).slice(0, 22);
    const precioTxt = precio ? `${Number(precio).toFixed(2)} Bs.` : 'Lun–Sáb 11:00–19:00';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="230" viewBox="0 0 440 230">
      <defs>
        <linearGradient id="v" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${t.a}"/>
          <stop offset="100%" stop-color="${t.b}"/>
        </linearGradient>
      </defs>
      <rect width="440" height="230" rx="18" fill="url(#v)"/>
      <rect x="14" y="14" width="412" height="202" rx="14" fill="none" stroke="${t.cinta}" stroke-width="2" stroke-dasharray="6 5"/>
      <circle cx="355" cy="115" r="54" fill="#E8D4B9"/>
      <text x="355" y="126" text-anchor="middle" font-family="sans-serif" font-size="34">${t.icono}</text>
      <text x="30" y="54" font-family="sans-serif" font-size="11" font-weight="bold" fill="${t.cinta}">✿ ${t.sub}</text>
      <text x="30" y="98" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#702C37">${tituloCorto}</text>
      <text x="30" y="132" font-family="sans-serif" font-size="12" fill="#6F6F4B">Buenas Costumbres · Uyuni</text>
      <rect x="30" y="152" width="146" height="30" rx="15" fill="${t.badge}"/>
      <text x="103" y="172" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D4B9">${precioTxt}</text>
    </svg>`;

    const url = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    cacheArte.set(key, url);
    return url;
  }

  function leerStorage(clave, fallback) {
    try {
      const raw = localStorage.getItem(clave);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function escribirStorage(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (_) {}
  }

  const state = {
    productos: CATALOGO_VINTAGE,
    carrito: leerStorage('bc_cute_carrito', []),
    historial: leerStorage('bc_cute_historial', []),
    tema: localStorage.getItem('bc_cute_tema') || 'light',
    categoriaActiva: 'todos',
    busqueda: '',
    timer8s: null,
    segundos: 8,
    deferredPrompt: null
  };

  function escaparHTML(str) {
    const div = document.createElement('div');
    div.textContent = String(str ?? '');
    return div.innerHTML;
  }

  function formatBs(n) {
    return `${Number(n).toFixed(2)} Bs.`;
  }

  function detectarBlacklist(texto) {
    const upper = String(texto).toUpperCase();
    return BLACKLIST.find((tok) => upper.includes(tok)) || null;
  }

  function setErrorCampo(inputId, errId, mensaje) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (err) err.textContent = mensaje || '';
    if (input) input.classList.toggle('input-error', Boolean(mensaje));
  }

  function validarNombreCampo(mostrarSiVacio = false) {
    const nombre = document.getElementById('clienteNombre').value.trim();
    const blNombre = detectarBlacklist(nombre);

    if (blNombre) {
      setErrorCampo('clienteNombre', 'errNombre', `🚫 No se permite "${blNombre}" en el nombre.`);
      return false;
    }
    if (!nombre) {
      setErrorCampo('clienteNombre', 'errNombre', mostrarSiVacio ? '⚠️ Escribe tu nombre.' : '');
      return false;
    }
    if (/[0-9]/.test(nombre)) {
      setErrorCampo('clienteNombre', 'errNombre', '⚠️ Colocaste números en el nombre: solo se permiten letras y espacios.');
      return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      setErrorCampo('clienteNombre', 'errNombre', '⚠️ El nombre no debe llevar símbolos especiales.');
      return false;
    }
    if (nombre.length < 3) {
      setErrorCampo('clienteNombre', 'errNombre', '⚠️ Escribe un nombre de al menos 3 letras.');
      return false;
    }

    setErrorCampo('clienteNombre', 'errNombre', '');
    return true;
  }

  function validarTelefonoCampo(mostrarSiVacio = false) {
    const telefono = document.getElementById('clienteTelefono').value.trim();
    const blTel = detectarBlacklist(telefono);

    if (blTel) {
      setErrorCampo('clienteTelefono', 'errTelefono', `🚫 Valor no permitido ("${blTel}").`);
      return false;
    }
    if (!telefono) {
      setErrorCampo('clienteTelefono', 'errTelefono', mostrarSiVacio ? '⚠️ Escribe tu número de celular.' : '');
      return false;
    }
    if (/[^0-9]/.test(telefono)) {
      setErrorCampo('clienteTelefono', 'errTelefono', '⚠️ Colocaste letras o símbolos en el celular: solo se aceptan números.');
      return false;
    }
    if (!/^[67][0-9]{7}$/.test(telefono)) {
      setErrorCampo('clienteTelefono', 'errTelefono', '⚠️ El celular en Bolivia debe tener 8 números y empezar con 6 o 7.');
      return false;
    }

    setErrorCampo('clienteTelefono', 'errTelefono', '');
    return true;
  }

  function validarNotasCampo() {
    const notas = document.getElementById('notasPedido').value.trim();
    const blNotas = detectarBlacklist(notas);
    if (blNotas) {
      setErrorCampo('notasPedido', 'errNotas', `🚫 Palabra o símbolo bloqueado por lista negra: "${blNotas}".`);
      return false;
    }
    setErrorCampo('notasPedido', 'errNotas', '');
    return true;
  }

  function validarFormulario() {
    const msg = document.getElementById('feedbackForm');

    if (state.carrito.length === 0) {
      msg.textContent = '⚠️ Tu canasta está vacía: agrega al menos un producto del catálogo.';
      return false;
    }

    const okNombre = validarNombreCampo(true);
    const okTelefono = validarTelefonoCampo(true);
    const okNotas = validarNotasCampo();

    if (!okNombre || !okTelefono || !okNotas) {
      msg.textContent = '⚠️ Revisa los campos marcados arriba antes de enviar por WhatsApp.';
      return false;
    }

    msg.textContent = '';
    return true;
  }

  function construirMensajeWhatsApp(orden) {
    const lineas = (orden.items || [])
      .map((item) => `• ${item.cantidad}x ${item.nombre} (${item.codigo}) — ${formatBs(item.precio * item.cantidad)}`)
      .join('\n');

    const partes = [
      `*Pedido · Buenas Costumbres*`,
      `Código: *${orden.codigo}*`,
      `Fecha: ${orden.fecha}`,
      `Cliente: ${orden.cliente}`,
      `Celular: ${orden.telefono}`,
      `Modalidad: ${orden.retiro}`,
      ``,
      `*Detalle del pedido:*`,
      lineas,
      ``,
      `*Total: ${formatBs(orden.total)}*`
    ];

    if (orden.notas) {
      partes.push(`Notas: ${orden.notas}`);
    }

    return partes.join('\n');
  }

  function enviarPedidoAWhatsApp(orden) {
    const mensaje = construirMensajeWhatsApp(orden);
    const numeroLimpio = WHATSAPP_NUMERO.replace(/[^0-9]/g, '');
    const destino = numeroLimpio.length >= 8 ? numeroLimpio : '';
    const url = `https://wa.me/${destino}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function inicializar() {
    aplicarTema(state.tema);

    const imgLocal = document.getElementById('imgLocalCute');
    if (imgLocal) {
      imgLocal.src = obtenerArteCuteVintage('local', 'Buenas Costumbres', null);
    }

    configurarEventos();
    renderizarCarrusel();
    renderizarCarrito();
    renderizarHistorialYBitacora();
    actualizarEstadoOffline();

    if (window.location.protocol.startsWith('http') && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  function actualizarEstadoOffline() {
    const badge = document.getElementById('estadoRed');
    if (!badge) return;
    badge.textContent = navigator.onLine ? '● Offline' : '● Sin red';
  }

  window.addEventListener('online', actualizarEstadoOffline);
  window.addEventListener('offline', actualizarEstadoOffline);

  function aplicarTema(tema) {
    state.tema = tema === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.tema);
    try {
      localStorage.setItem('bc_cute_tema', state.tema);
    } catch (_) {}
    const btnTema = document.getElementById('btnTema');
    if (btnTema) {
      btnTema.textContent = state.tema === 'dark' ? '☀️' : '🌙';
    }
  }

  function renderizarCarrusel() {
    const track = document.getElementById('carruselCatalogo');
    if (!track) return;

    const q = state.busqueda.trim().toLowerCase();
    const filtrados = state.productos.filter((p) => {
      const okCat = state.categoriaActiva === 'todos' || p.categoria === state.categoriaActiva;
      const okTxt =
        p.nombre.toLowerCase().includes(q) ||
        p.codigo.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.categoria_nombre.toLowerCase().includes(q);
      return okCat && okTxt;
    });

    if (filtrados.length === 0) {
      track.innerHTML = '<p>No hay dulces o panes con ese filtro.</p>';
      return;
    }

    const frag = document.createDocumentFragment();
    filtrados.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'vintage-card carrusel-item';
      card.dataset.id = String(p.id);
      card.tabIndex = 0;
      card.setAttribute('aria-label', `${p.nombre}, ${formatBs(p.precio)}`);

      card.innerHTML = `
        <div>
          <div class="img-zoom-wrap">
            <img class="producto-img"
                 loading="eager"
                 decoding="async"
                 src="${obtenerArteCuteVintage(p.imgKey, p.nombre, p.precio)}"
                 alt="${escaparHTML(p.nombre)} - ${escaparHTML(p.descripcion)}">
          </div>
          <div class="producto-meta">
            <span><strong>${escaparHTML(p.codigo)}</strong></span>
            <span class="etiqueta-cute">${escaparHTML(p.categoria_nombre)}</span>
          </div>
          <h3>${escaparHTML(p.nombre)}</h3>
          <p class="producto-desc">${escaparHTML(p.descripcion)}</p>
        </div>
        <div class="producto-footer">
          <span class="precio-tag">${formatBs(p.precio)}</span>
          <button type="button" class="btn btn-coral btn-agregar" data-id="${p.id}">+ Pedir</button>
        </div>
      `;
      frag.appendChild(card);
    });

    track.replaceChildren(frag);
    track.scrollLeft = 0;
  }

  function agregarAlCarrito(idProd) {
    const prod = state.productos.find((p) => Number(p.id) === Number(idProd));
    if (!prod) return;

    const item = state.carrito.find((x) => Number(x.id) === Number(idProd));
    if (item) {
      item.cantidad += 1;
    } else {
      state.carrito.push({
        id: prod.id,
        codigo: prod.codigo,
        nombre: prod.nombre,
        precio: Number(prod.precio),
        cantidad: 1
      });
    }
    escribirStorage('bc_cute_carrito', state.carrito);
    renderizarCarrito();
  }

  function cambiarCantidad(idProd, delta) {
    const idx = state.carrito.findIndex((x) => Number(x.id) === Number(idProd));
    if (idx === -1) return;

    state.carrito[idx].cantidad += delta;
    if (state.carrito[idx].cantidad <= 0) {
      state.carrito.splice(idx, 1);
    }
    escribirStorage('bc_cute_carrito', state.carrito);
    renderizarCarrito();
  }

  function renderizarCarrito() {
    const lista = document.getElementById('listaCarrito');
    const navBadge = document.getElementById('navContadorCarrito');
    const subtotalEl = document.getElementById('txtSubtotal');
    const totalEl = document.getElementById('txtTotal');

    const cantidadTotal = state.carrito.reduce((s, x) => s + x.cantidad, 0);
    const montoTotal = state.carrito.reduce((s, x) => s + x.precio * x.cantidad, 0);

    if (navBadge) navBadge.textContent = cantidadTotal;
    if (subtotalEl) subtotalEl.textContent = formatBs(montoTotal);
    if (totalEl) totalEl.textContent = formatBs(montoTotal);
    if (!lista) return;

    if (state.carrito.length === 0) {
      lista.innerHTML = '<p>Tu canasta está vacía. Agrega algo rico desde el carrusel.</p>';
      return;
    }

    lista.innerHTML = state.carrito
      .map(
        (x) => `
      <div class="carrito-item">
        <div>
          <strong>${escaparHTML(x.nombre)}</strong>
          <div class="producto-meta">${escaparHTML(x.codigo)} · ${formatBs(x.precio)} c/u</div>
        </div>
        <div class="carrito-controles">
          <button type="button" class="btn btn-soft btn-qty" data-id="${x.id}" data-delta="-1" aria-label="Restar">−</button>
          <strong>${x.cantidad}</strong>
          <button type="button" class="btn btn-soft btn-qty" data-id="${x.id}" data-delta="1" aria-label="Sumar">+</button>
        </div>
      </div>`
      )
      .join('');
  }

  function iniciarCuentaRegresiva() {
    if (!validarFormulario()) return;

    const btnConfirmar = document.getElementById('btnIniciarConfirmacion');
    const btnCancelar = document.getElementById('btnCancelarConfirmacion');
    const spanSeg = document.getElementById('contadorSegundos');
    const msg = document.getElementById('feedbackForm');

    state.segundos = 8;
    spanSeg.textContent = state.segundos;
    btnConfirmar.classList.add('hidden');
    btnCancelar.classList.remove('hidden');
    msg.textContent = '⏳ Preparando pedido para WhatsApp en 8s...';

    state.timer8s = setInterval(() => {
      state.segundos -= 1;
      spanSeg.textContent = state.segundos;
      if (state.segundos <= 0) {
        detenerCuentaRegresiva();
        registrarPedido();
      }
    }, 1000);
  }

  function detenerCuentaRegresiva() {
    if (state.timer8s) {
      clearInterval(state.timer8s);
      state.timer8s = null;
    }
    document.getElementById('btnIniciarConfirmacion').classList.remove('hidden');
    document.getElementById('btnCancelarConfirmacion').classList.add('hidden');
  }

  function registrarPedido() {
    const total = state.carrito.reduce((s, x) => s + x.precio * x.cantidad, 0);
    const orden = {
      codigo: `BC-${Date.now().toString().slice(-5)}`,
      cliente: document.getElementById('clienteNombre').value.trim(),
      telefono: document.getElementById('clienteTelefono').value.trim(),
      retiro: document.getElementById('tipoRetiro').value,
      notas: document.getElementById('notasPedido').value.trim(),
      items: [...state.carrito],
      total,
      fecha: new Date().toLocaleString('es-BO')
    };

    state.historial.unshift(orden);
    escribirStorage('bc_cute_historial', state.historial);
    renderizarHistorialYBitacora();

    state.carrito = [];
    escribirStorage('bc_cute_carrito', []);
    renderizarCarrito();
    document.getElementById('formPedido').reset();
    setErrorCampo('clienteNombre', 'errNombre', '');
    setErrorCampo('clienteTelefono', 'errTelefono', '');
    setErrorCampo('notasPedido', 'errNotas', '');
    document.getElementById('feedbackForm').textContent = `✅ Pedido ${orden.codigo} guardado. Abriendo WhatsApp...`;

    enviarPedidoAWhatsApp(orden);
  }

  function renderizarHistorialYBitacora() {
    const histCont = document.getElementById('listaHistorial');
    const bitCont = document.getElementById('listaBitacora');

    if (state.historial.length === 0) {
      if (histCont) histCont.innerHTML = '<p>Sin pedidos guardados todavía.</p>';
      if (bitCont) bitCont.innerHTML = '<p>La bitácora está vacía. Cuando confirmes un pedido aparecerá aquí con su registro completo.</p>';
      return;
    }

    if (histCont) {
      histCont.innerHTML = state.historial
        .map((o) => {
          const detalle = (o.items || []).map((i) => `${i.cantidad}x ${i.nombre}`).join(', ');
          return `
          <article class="carrito-item">
            <div>
              <strong>${escaparHTML(o.codigo)} · ${escaparHTML(o.cliente)}</strong>
              <div class="producto-meta">${escaparHTML(o.retiro)} · ${escaparHTML(o.fecha)}</div>
              <div class="producto-meta">${escaparHTML(detalle)}</div>
            </div>
            <strong class="precio-tag">${formatBs(o.total)}</strong>
          </article>`;
        })
        .join('');
    }

    if (bitCont) {
      bitCont.innerHTML = state.historial
        .map((o) => {
          const detalle = (o.items || []).map((i) => `${i.cantidad}x ${i.nombre}`).join(', ');
          return `
          <div class="bitacora-entrada">
            <div class="producto-meta">
              <strong>[${escaparHTML(o.codigo)}]</strong>
              <span>${escaparHTML(o.fecha)}</span>
            </div>
            <div><strong>Cliente:</strong> ${escaparHTML(o.cliente)} · <strong>Cel.:</strong> ${escaparHTML(o.telefono)}</div>
            <div><strong>Modalidad:</strong> ${escaparHTML(o.retiro)} · <strong>Total:</strong> <span class="precio-tag">${formatBs(o.total)}</span></div>
            <div class="producto-meta"><strong>Detalle:</strong> ${escaparHTML(detalle)}${o.notas ? ` · Notas: ${escaparHTML(o.notas)}` : ''}</div>
          </div>`;
        })
        .join('');
    }
  }

  function abrirModal(idProd) {
    const prod = state.productos.find((p) => Number(p.id) === Number(idProd));
    if (!prod) return;

    document.getElementById('modalContenido').innerHTML = `
      <div class="modal-img-wrap">
        <img src="${obtenerArteCuteVintage(prod.imgKey, prod.nombre, prod.precio)}"
             alt="${escaparHTML(prod.nombre)}">
      </div>
      <p class="producto-meta">${escaparHTML(prod.codigo)} · ${escaparHTML(prod.categoria_nombre)}</p>
      <h3 id="modalTitulo">${escaparHTML(prod.nombre)}</h3>
      <p class="producto-desc">${escaparHTML(prod.descripcion)}</p>
      <div class="producto-footer">
        <span class="precio-tag">${formatBs(prod.precio)}</span>
        <button type="button" class="btn btn-coral" id="btnModalAgregar" data-id="${prod.id}">+ Agregar</button>
      </div>
    `;
    document.getElementById('modalProducto').classList.remove('hidden');
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.deferredPrompt = e;
    document.getElementById('btnInstalarPWA').classList.remove('hidden');
  });

  window.addEventListener('appinstalled', () => {
    state.deferredPrompt = null;
    document.getElementById('btnInstalarPWA').classList.add('hidden');
  });

  function configurarEventos() {
    document.querySelector('.main-nav').addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.vista').forEach((v) => v.classList.add('hidden'));
      document.getElementById(`vista-${btn.dataset.vista}`).classList.remove('hidden');
    });

    const carrusel = document.getElementById('carruselCatalogo');
    document.getElementById('btnPrevCarrusel').addEventListener('click', () => {
      carrusel.scrollBy({ left: -275, behavior: 'smooth' });
    });
    document.getElementById('btnNextCarrusel').addEventListener('click', () => {
      carrusel.scrollBy({ left: 275, behavior: 'smooth' });
    });

    carrusel.addEventListener('click', (e) => {
      const btnAdd = e.target.closest('.btn-agregar');
      if (btnAdd) {
        e.stopPropagation();
        agregarAlCarrito(btnAdd.dataset.id);
        return;
      }
      const item = e.target.closest('.carrusel-item');
      if (item) abrirModal(item.dataset.id);
    });

    document.getElementById('btnTema').addEventListener('click', () => {
      aplicarTema(state.tema === 'light' ? 'dark' : 'light');
    });

    document.getElementById('btnInstalarPWA').addEventListener('click', async () => {
      if (!state.deferredPrompt) return;
      state.deferredPrompt.prompt();
      const { outcome } = await state.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        document.getElementById('btnInstalarPWA').classList.add('hidden');
      }
      state.deferredPrompt = null;
    });

    document.getElementById('inputBuscador').addEventListener('input', (e) => {
      state.busqueda = e.target.value;
      renderizarCarrusel();
    });

    document.querySelector('.categorias-chips').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      state.categoriaActiva = chip.dataset.cat;
      renderizarCarrusel();
    });

    // Validación en vivo de campos
    document.getElementById('clienteNombre').addEventListener('input', () => validarNombreCampo(false));
    document.getElementById('clienteNombre').addEventListener('blur', () => validarNombreCampo(false));

    document.getElementById('clienteTelefono').addEventListener('input', () => validarTelefonoCampo(false));
    document.getElementById('clienteTelefono').addEventListener('blur', () => validarTelefonoCampo(false));

    document.getElementById('notasPedido').addEventListener('input', () => validarNotasCampo());
    document.getElementById('notasPedido').addEventListener('blur', () => validarNotasCampo());

    document.getElementById('btnCerrarModal').addEventListener('click', () => {
      document.getElementById('modalProducto').classList.add('hidden');
    });

    document.getElementById('modalProducto').addEventListener('click', (e) => {
      if (e.target.id === 'modalProducto') e.target.classList.add('hidden');
      const btnModalAdd = e.target.closest('#btnModalAgregar');
      if (btnModalAdd) {
        e.stopPropagation();
        agregarAlCarrito(btnModalAdd.dataset.id);
        document.getElementById('modalProducto').classList.add('hidden');
      }
    });

    document.getElementById('listaCarrito').addEventListener('click', (e) => {
      const btnQty = e.target.closest('.btn-qty');
      if (!btnQty) return;
      e.stopPropagation();
      cambiarCantidad(btnQty.dataset.id, Number(btnQty.dataset.delta));
    });

    document.getElementById('btnIniciarConfirmacion').addEventListener('click', iniciarCuentaRegresiva);
    document.getElementById('btnCancelarConfirmacion').addEventListener('click', () => {
      detenerCuentaRegresiva();
      document.getElementById('feedbackForm').textContent = '❌ Envío a WhatsApp cancelado.';
    });

    document.getElementById('btnLimpiarBitacora').addEventListener('click', () => {
      state.historial = [];
      escribirStorage('bc_cute_historial', []);
      renderizarHistorialYBitacora();
    });
  }

  document.addEventListener('DOMContentLoaded', inicializar);
})();