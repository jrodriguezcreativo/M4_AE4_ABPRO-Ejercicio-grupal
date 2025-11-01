// ----------------------------
// Función auxiliar: aleatorio en segundos
// Genera un número decimal entre min y max (segundos)
// ----------------------------
const aleatorioEnSegundos = (min, max) => {
  return Math.random() * (max - min) + min
}

// ----------------------------
// prepararCafe: retorna una promesa
// Demora entre 1 y 3 segundos. 20% de probabilidad de fallo.
// ----------------------------
const prepararCafe = () => {
  return new Promise((resolve, reject) => {
    const tiempo = aleatorioEnSegundos(1, 3)
    const falla = Math.random() < 0.2

    setTimeout(() => {
      if (falla) {
        reject('No se pudo preparar el café: falta café')
      } else {
        resolve(`Café listo en ${tiempo.toFixed(2)} segundos`)
      }
    }, tiempo * 1000)
  })
}

// ----------------------------
// tostarPan: retorna una promesa
// Demora entre 2 y 4 segundos. 20% de probabilidad de fallo.
// ----------------------------
const tostarPan = () => {
  return new Promise((resolve, reject) => {
    const tiempo = aleatorioEnSegundos(2, 4)
    const falla = Math.random() < 0.2

    setTimeout(() => {
      if (falla) {
        reject('No se pudo tostar el pan: no hay pan disponible')
      } else {
        resolve(`Pan tostado en ${tiempo.toFixed(2)} segundos`)
      }
    }, tiempo * 1000)
  })
}

// ----------------------------
// exprimirJugo: retorna una promesa
// Demora entre 1 y 2 segundos. 20% de probabilidad de fallo.
// ----------------------------
const exprimirJugo = () => {
  return new Promise((resolve, reject) => {
    const tiempo = aleatorioEnSegundos(1, 2)
    const falla = Math.random() < 0.2

    setTimeout(() => {
      if (falla) {
        reject('No se pudo exprimir el jugo: no hay fruta disponible')
      } else {
        resolve(`Jugo listo en ${tiempo.toFixed(2)} segundos`)
      }
    }, tiempo * 1000)
  })
}

// ----------------------------
// resumenPedido: imprime qué ítems estuvieron listos y cuáles no
// Recibe un objeto con la estructura { cafe, pan, jugo }
// Cada propiedad debe ser { ok: boolean, mensaje: string }
// ----------------------------
const resumenPedido = (estado) => {
  console.log('\n--- Resumen del pedido ---')
  const items = ['cafe', 'pan', 'jugo']
  items.forEach((item) => {
    const registro = estado[item]
    if (!registro) {
      console.log(`${item}: No se intentó`)
      return
    }
    if (registro.ok) {
      console.log(`${item}: Listo — ${registro.mensaje}`)
    } else {
      console.log(`${item}: Falló — ${registro.mensaje}`)
    }
  })
  console.log('--------------------------\n')
}

// ----------------------------
// realizarPedido_then: encadena con .then/.catch
// Controla errores en cada paso y sigue al siguiente.
// ----------------------------
const realizarPedido_then = () => {
  const estado = { cafe: null, pan: null, jugo: null }

  prepararCafe()
    .then((resCafe) => {
      estado.cafe = { ok: true, mensaje: resCafe }
      console.log(resCafe)
      return tostarPan()
    })
    .catch((errCafe) => {
      estado.cafe = { ok: false, mensaje: errCafe }
      console.log(errCafe)
      return tostarPan()
    })
    .then((resPan) => {
      estado.pan = { ok: true, mensaje: resPan }
      console.log(resPan)
      return exprimirJugo()
    })
    .catch((errPan) => {
      estado.pan = { ok: false, mensaje: errPan }
      console.log(errPan)
      return exprimirJugo()
    })
    .then((resJugo) => {
      estado.jugo = { ok: true, mensaje: resJugo }
      console.log(resJugo)
    })
    .catch((errJugo) => {
      estado.jugo = { ok: false, mensaje: errJugo }
      console.log(errJugo)
    })
    .finally(() => {
      resumenPedido(estado)
    })
}

// ----------------------------
// realizarPedido_async: misma lógica con async/await y try/catch
// Ejecuta cada paso en orden y captura errores por separado.
// ----------------------------
const realizarPedido_async = async () => {
  const estado = { cafe: null, pan: null, jugo: null }

  try {
    const resCafe = await prepararCafe()
    estado.cafe = { ok: true, mensaje: resCafe }
    console.log(resCafe)
  } catch (errCafe) {
    estado.cafe = { ok: false, mensaje: errCafe }
    console.log(errCafe)
  }

  try {
    const resPan = await tostarPan()
    estado.pan = { ok: true, mensaje: resPan }
    console.log(resPan)
  } catch (errPan) {
    estado.pan = { ok: false, mensaje: errPan }
    console.log(errPan)
  }

  try {
    const resJugo = await exprimirJugo()
    estado.jugo = { ok: true, mensaje: resJugo }
    console.log(resJugo)
  } catch (errJugo) {
    estado.jugo = { ok: false, mensaje: errJugo }
    console.log(errJugo)
  }

  resumenPedido(estado)
}

// ----------------------------
// realizarPedido_paralelo: usa Promise.allSettled para ejecutar en paralelo
// Útil para preparar todo al mismo tiempo y luego resumir resultados.
// ----------------------------
const realizarPedido_paralelo = async () => {
  const promesas = [prepararCafe(), tostarPan(), exprimirJugo()]
  const resultados = await Promise.allSettled(promesas)

  const estado = { cafe: null, pan: null, jugo: null }

  resultados.forEach((r, i) => {
    const nombre = i === 0 ? 'cafe' : i === 1 ? 'pan' : 'jugo'
    if (r.status === 'fulfilled') {
      estado[nombre] = { ok: true, mensaje: r.value }
      console.log(r.value)
    } else {
      estado[nombre] = { ok: false, mensaje: r.reason }
      console.log(r.reason)
    }
  })

  resumenPedido(estado)
}

// ----------------------------
// Llamadas de ejemplo
// Descomenta la que quieras probar y ejecuta: node main.js
// ----------------------------

// realizarPedido_then()
// realizarPedido_async()
realizarPedido_paralelo()
