import { obtenerProductos, renderizar} from './productos.js';
import { Shop } from './Shop.js';




// Creacion de catalogo
const botonesCategorias = document.querySelectorAll(".nav-button_link");
const catalogo = document.getElementById("catalogo");


// Mostra catalogo

let catalogoProductos = await obtenerProductos();
// console.log(catalogoProductos);

function actualizarCatalogo(){
  catalogo.innerHTML = "";
  catalogoProductos.forEach(producto => {
    let productoCatalogo = renderizar(producto);
    catalogo.insertAdjacentHTML("beforeend", productoCatalogo);
    
  });
}
actualizarCatalogo()


  // Mostrare disitntas categorias del catalogo

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {
    e.preventDefault();   
    botonesCategorias.forEach(b => {
      b.classList.remove("active");
    })
    boton.classList.add("active");


    if (boton.classList.contains("active")) {
      catalogo.innerHTML = "";
      let categoria = boton.dataset.category;
      obtenerProductos(categoria)
        .then(data => {
          catalogoProductos = data;
          console.log(catalogoProductos)
          actualizarCatalogo();
          botonAgregarCarrito.forEach (boton => {
            console.log(boton)
          })
      })
    }
  })
})

// Llamado de botones

const botonAgregarCarrito = document.querySelectorAll(".agregarCarrito");
botonAgregarCarrito.forEach (boton => {
  console.log(boton)
})

const botonAgregarCantidad = document.querySelectorAll(".agregarCantidad");
const botonDisminuirCantidad = document.querySelectorAll(".disminuirCantidad");
const botonBorrarProducto = document.querySelectorAll(".borrarProducto");

const botonCarrito = document.getElementById("carrito");
const botonBorrarCarrito = document.getElementById("borrar-carrito");

// Llamdo HTML

const buscadorInput = document.getElementById("buscador-input_buscar");
const precioFinalImpreso = document.getElementById("precio-final");
const precioSubtotalImpreso = document.getElementById("subtotal");
const cantidadImpresa = document.getElementById("cantidad");

// Creacion del Shop

const tienda = new Shop();





// Funciones

// Calculo de IVA
function actualizarPrecioCantidad(){
  if(tienda.carrito.length == 0) {
    precioSubtotalImpreso.innerHTML = 0;
    cantidadImpresa.innerHTML = 0;
    precioFinalImpreso.innerHTML = 0;
  }
  for (let producto of tienda.carrito) {
    tienda.calculoIva();
    precioSubtotalImpreso.innerHTML = tienda.precioSubtotal;
    cantidadImpresa.innerHTML = tienda.cantidadProductos;
    precioFinalImpreso.innerHTML = tienda.precioFinal;

    console.log(tienda.precioSubtotal)
    console.log(producto.cantidad)

  }
}


//Eventos

// Agregar al carrito

botonAgregarCarrito.forEach(boton => {
  boton.addEventListener("click", (e) => {
    console.log(boton.value)
    e.preventDefault();
    let producto = catalogoProductos.find(producto => producto.id == boton.value);
    tienda.agregarAlCarrito(producto);
    actualizarPrecioCantidad();
  })
})


// Aumentar cantidad

botonAgregarCantidad.forEach(boton => {
  boton.addEventListener("click", () => {
    let producto = catalogoProductos.find(producto => producto.id == boton.value);
    tienda.aumentarCantidad(producto);
    actualizarPrecioCantidad();

  })
})


// Disminuir cantidad

botonDisminuirCantidad.forEach(boton => {
  boton.addEventListener("click", () => {
    let producto = catalogoProductos.find(producto => producto.id == boton.value);
    tienda.disminuirCantidad(producto);
    actualizarPrecioCantidad();

  })
})


// Borrar producto

botonBorrarProducto.forEach(boton => {
  boton.addEventListener("click", () => {
    let producto = catalogoProductos.find(producto => producto.id == boton.value);
    tienda.eliminarProducto(producto);
    actualizarPrecioCantidad();

  })
})


// Mostrar carrito

botonCarrito.addEventListener("click", () => {
  if (tienda.carrito.length > 0) {
    console.table(tienda.carrito);
    console.log(tienda.carrito);
    
    // console.log(catalogoProductos);
  } else {
    console.log("Carrito Vacio")
    console.log(tienda.carrito);
  }

})


// Borrar carrito

botonBorrarCarrito.addEventListener("click", () => {
  tienda.vaciarCarrito();
  actualizarPrecioCantidad();
  console.log("Carrito borrado")
})


// Buscador de productos

buscadorInput.addEventListener("keyup", () => {
  let buscar = buscadorInput.value;
  let resultados = tienda.buscarProducto(buscar, catalogoProductos);
  catalogo.innerHTML = ''
  resultados.forEach(resultado => {
    let resRend = renderizar(resultado);
    catalogo.insertAdjacentHTML("beforeend", resRend);
  })
})





















