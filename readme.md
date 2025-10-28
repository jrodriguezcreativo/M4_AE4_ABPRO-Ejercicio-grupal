# M4_AE4_ABPRO-Ejercicio grupal

## Simulación — Sistema de pedidos para cafetería

### Descripción
Proyecto grupal que simula el flujo de preparación de una orden en una cafetería.  
Cada ítem (café, pan, jugo) se prepara en tiempos distintos y puede fallar (ingrediente no disponible).  
Se usa JavaScript con promesas y async/await para manejar la asincronía y el control de errores.

### Objetivos
- Practicar Promesas y manejo de errores con `.then/.catch` y `async/await`.  
- Encadenar tareas asincrónicas sin detener el flujo en caso de fallos parciales.  
- Usar `Promise.allSettled()` para una versión paralela (bonus).  

### Estructura del proyecto
```
M4_AE4_ABPRO-Ejercicio grupal
|-- main.js
|-- readme.md
```


### Ejecutar la simulación
1. Abrir una terminal en la carpeta del proyecto.  
2. Ejecutar `node main.js`.  
3. Revisar la salida en la consola para ver tiempos, fallos y el resumen del pedido.

### Autor
**Jorge Rodriguez**
