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

// ----------------------------------------------------------------------------
// MISIÓN 4 · RF5 — ¿Cuántos pedidos hay en cada estado?
// ----------------------------------------------------------------------------
// Devuelve un objeto con TODOS los estados como llave, aunque tengan 0:
//   { registrado: 3, en_preparacion: 3, listo: 2, entregado: 2 }
// Con una lista vacía, todos van en 0.
export function resumenPorEstado(pedidos) {
  return {} // TODO
}

// ----------------------------------------------------------------------------
// MISIÓN 5 · RF5 — Buscar pedidos por nombre de cliente
// ----------------------------------------------------------------------------
// Devuelve los pedidos cuyo cliente CONTIENE el texto buscado, sin importar
// mayúsculas ni acentos: "ramirez" encuentra a "Ana Ramírez" y "JOSÉ" a
// "José Martínez". Un texto vacío (o solo espacios) devuelve todos.
// Pista: 'Ramírez'.normalize('NFD').replace(/[̀-ͯ]/g, '')
//        Investiga qué hace NFD. Es un problema real en sistemas en español.
export function buscarPedidos(pedidos, texto) {
  return [] // TODO
}

// ----------------------------------------------------------------------------
// MISIÓN 6 · DESTACADO — Los mejores clientes
// ----------------------------------------------------------------------------
// Devuelve los `n` clientes que más han gastado, sumando el total de TODOS sus
// pedidos (reutiliza totalPedido, no copies la lógica).
// Formato: [{ cliente: 'Ana Ramírez', total: 1316 }, ...]
// Orden: total de mayor a menor; si empatan, por nombre alfabético.
// Pista: un objeto acumulador, luego Object.entries, map y sort.
export function topClientes(pedidos, n) {
  return [] // TODO
}
