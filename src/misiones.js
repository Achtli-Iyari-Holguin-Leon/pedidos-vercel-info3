// ============================================================================
//  MISIONES — Sistema de Pedidos y Clientes · Informática III (Grupo 1301)
// ============================================================================
//  Este es el ÚNICO archivo de lógica que vas a modificar.
//
//  Cada función está "vacía" a propósito. Tu sitio publicado en Vercel tiene un
//  panel de verificación que corre casos de prueba contra estas funciones y te
//  dice cuál falla, qué esperaba y qué obtuvo. Lee el caso que falla ANTES de
//  cambiar código: así se trabaja con pruebas unitarias (lo verás en 3.4).
//
//  Puedes verificar sin publicar con:  npm run verificar
//
//  Orden recomendado: 1 → 2 → 3 → 4 → 5. La 6 es para Destacado.
// ============================================================================

import { ESTADOS } from './datos.js'

//MISION 1:

export function totalPedido(pedido) {
  const items = pedido.items || []
  const descuento = pedido.descuento || 0

  const subtotal = items.reduce((suma, item) => {
    return suma + item.cantidad * item.precioUnitario
  }, 0)

  const total = subtotal * (1 - descuento)

  return Math.round((total + Number.EPSILON) * 100) / 100
}

//MISION 2:

export function puedeTransicionar(actual, nuevo) {
  const indiceActual = ESTADOS.indexOf(actual)
  const indiceNuevo = ESTADOS.indexOf(nuevo)

  return indiceActual !== -1 && indiceNuevo === indiceActual + 1
}

//MISION 3

export function validarCliente(cliente) {
  const errores = []

  if (!cliente.nombre || !cliente.nombre.trim()) {
    errores.push('nombre_requerido')
  }

  const telefono = (cliente.telefono || '').replace(/[\s-]/g, '')

  if (!/^\d{10}$/.test(telefono)) {
    errores.push('telefono_invalido')
  }

  const email = (cliente.email || '').trim()

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.push('email_invalido')
  }

  return errores
}


 // MISION 4

export function resumenPorEstado(pedidos) {
  const resumen = {}

  ESTADOS.forEach(estado => {
    resumen[estado] = 0
  })

  pedidos.forEach(pedido => {
    if (ESTADOS.includes(pedido.estado)) {
      resumen[pedido.estado]++
    }
  })

  return resumen
}

// MISION 5

export function buscarPedidos(pedidos, texto) {
  const normalizar = valor =>
    String(valor || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

  const busqueda = normalizar(texto || '').trim()

  if (!busqueda) {
    return pedidos
  }

  return pedidos.filter(pedido =>
    normalizar(pedido.cliente).includes(busqueda)
  )
}

// MISION 6

export function topClientes(pedidos, n) {
  const totales = {}

  pedidos.forEach(pedido => {
    const cliente = pedido.cliente

    if (!(cliente in totales)) {
      totales[cliente] = 0
    }

    totales[cliente] += totalPedido(pedido)
  })

  return Object.entries(totales)
    .map(([cliente, total]) => ({
      cliente,
      total: Math.round((total + Number.EPSILON) * 100) / 100
    }))
    .sort((a, b) =>
      b.total - a.total ||
      a.cliente.localeCompare(b.cliente, 'es')
    )
    .slice(0, n)
}
