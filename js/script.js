import { productos } from "./productos.js";
import { Shop } from './Shop.js';


// Creacion de catalogo

const catalogo = document.getElementById("catalogo");
productos.forEach(producto => {
  // console.log(producto);
  let productoCatalogo = `
  <div class="catalogo-cards center-column">
    <img src="${producto.imagen}" alt="${producto.altImagen}">
    <h2>${producto.nombre}</h2>
    <p>${producto.descripcion}</p>
    <p>Precio: $ ${producto.precio}</p>
    <p class="imagen-no-real">La imagen puede no corresponder al producto real.</p>
    <div class="center">
      <button class="agregarCarrito" value="${producto.id}">Agregar al Carrito</button>
      <button class="agregarCantidad" value="${producto.id}">+</button>
      <button class="disminuirCantidad" value="${producto.id}">-</button>
      <button class="borrarProducto" value="${producto.id}">Borrar</button>
    </div>
  </div>
  `
  catalogo.insertAdjacentHTML("beforeend", productoCatalogo);
  
});



// Llamado de botones

const botonAgregarCarrito = document.querySelectorAll(".agregarCarrito");
const botonAgregarCantidad = document.querySelectorAll(".agregarCantidad");
const botonDisminuirCantidad = document.querySelectorAll(".disminuirCantidad");
const botonBorrarProducto = document.querySelectorAll(".borrarProducto");


const botonCarrito = document.getElementById("carrito");
const botonBorrarCarrito = document.getElementById("borrar-carrito");
const botonBuscarProducto = document.getElementById("buscar-producto");


// Llamdo HTML

const precioFinalImpreso = document.getElementById("precio-final");
const precioSubtotalImpreso = document.getElementById("subtotal");
// const moneda = document.querySelectorAll(".moneda");

const cantidadImpresa = document.getElementById("cantidad");

// Creacion del Shop
const tienda = new Shop();


// Funciones

function actualizarPrecioCantidad(){
  tienda.calculoIva();
  precioSubtotalImpreso.innerHTML = tienda.precioSubtotal;
  cantidadImpresa.innerHTML = tienda.carrito.length;
  precioFinalImpreso.innerHTML = tienda.precioFinal;
}

//Eventos

botonAgregarCarrito.forEach(boton => {
  boton.addEventListener("click", () => {
    let producto = productos.find(producto => producto.id == boton.value);
    tienda.agregarAlCarrito(producto);
    actualizarPrecioCantidad();

  })
})


botonAgregarCantidad.forEach(boton => {
  boton.addEventListener("click", () => {
    let producto = productos.find(producto => producto.id == boton.value);
    tienda.aumentarCantidad(producto);
    actualizarPrecioCantidad();

  })
})


botonDisminuirCantidad.forEach(boton => {
  boton.addEventListener("click", () => {
    let producto = productos.find(producto => producto.id == boton.value);
    tienda.disminuirCantidad(producto);
    actualizarPrecioCantidad();

  })
})


botonBorrarProducto.forEach(boton => {
  boton.addEventListener("click", () => {
    let producto = productos.find(producto => producto.id == boton.value);
    tienda.eliminarProducto(producto);
    actualizarPrecioCantidad();

  })
})


botonCarrito.addEventListener("click", () => {
  if (tienda.carrito.length > 0) {
    console.table(tienda.carrito);
  } else {
    console.log("Carrito Vacio")
  }

})


botonBorrarCarrito.addEventListener("click", () => {
  tienda.vaciarCarrito();
  actualizarPrecioCantidad();
  console.log("Carrito borrado")
})

botonBuscarProducto.addEventListener("click", () => {
  tienda.buscarProducto();
})
















