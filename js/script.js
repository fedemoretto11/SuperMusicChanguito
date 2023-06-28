import { obtenerProductos, renderizar} from './productos.js';
import { Shop } from './Shop.js';

// Llamado de botones
let botonAgregarCarrito = "" ; // Agregar Carrito -- PRODUCTO -- INICIALICACION SOLAMENTE
let botonAgregarCantidad = ""; // Sumar unidad a carrito -- PRODUCTO -- INICIALICACION SOLAMENTE
let botonDisminuirCantidad = ""; // Restar unidad carrito -- PRODUCTO -- INICIALICACION SOLAMENTE
let botonBorrarProducto = ""; // Borrar el producto del carrito -- PRODUCTO -- INICIALICACION SOLAMENTE

const botonCarrito = document.getElementById("carrito"); // Boton para abrir el carrito -- CARRITO
const botonBorrarCarrito = document.getElementById("borrar-carrito"); // Borrar TODO el carrito -- CARRITO
const botonComprar = document.getElementById("comprar"); // Boton Comprar -- CARRITO

const botonesCategorias = document.querySelectorAll(".nav-button_link"); // Botones para cambiar categoria (guitarra, piano, bateria)


// Llamdo HTML

const buscadorInput = document.getElementById("buscador-input_buscar"); // Input texto buscador parte superior
const precioSubtotalImpreso = document.getElementById("subtotal"); // Subtotal en pantalla
const cantidadImpresa = document.getElementById("cantidad"); // Cantidad de productos en pantalla
const precioFinalImpreso = document.getElementById("precio-final"); // Precio final en pantalla

// Creacion de catalogo

const catalogo = document.getElementById("catalogo"); // Section Catalogo, aca se va a renderizar cada CARD

// Creacion del Shop

const tienda = new Shop(); // Instanciacion del Shop




// Mostrar catalogo

let catalogoProductos = await obtenerProductos(); // Asigna a la variable los productos obtenidos a traves de la API de MELI
console.log(catalogoProductos);


// Esta funcion actualiza el Catalogo mostrado en pantalla
async function actualizarCatalogo(){
  catalogo.innerHTML = "";
  catalogoProductos.forEach(producto => {
    let productoCatalogo = renderizar(producto);
    catalogo.insertAdjacentHTML("beforeend", productoCatalogo);
    botonAgregarCarrito = document.querySelectorAll(".agregarCarrito"); // Asignacion de boton
    botonAgregarCantidad = document.querySelectorAll(".agregarCantidad"); // Asignacion de boton
    botonDisminuirCantidad = document.querySelectorAll(".disminuirCantidad"); // Asignacion de boton
    botonBorrarProducto = document.querySelectorAll(".borrarProducto"); // Asignacion de boton
    
  });
  agregarEventListeners();
}

await actualizarCatalogo()






  // Mostrar disitntas categorias del catalogo

  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      botonesCategorias.forEach(button => {
        button.classList.remove("active");
      })
      boton.classList.add("active")

      let categoria = boton.dataset.category;
      obtenerProductos(categoria)
        .then(resultado => {
          catalogoProductos = resultado;
          actualizarCatalogo();
          
        })
      agregarEventListeners();
    })  
  })


  //Eventos
function agregarEventListeners(){

  // Agregar al carrito
  botonAgregarCarrito.forEach(boton => {
    boton.addEventListener("click", () => {
      let producto = catalogoProductos.find(producto => producto.id == boton.value);
      tienda.agregarAlCarrito(producto);
      actualizarCatalogo();
      actualizarPrecioCantidad();
    })
  })

  // Aumentar cantidad
  botonAgregarCantidad.forEach(boton => {
    boton.addEventListener("click", () => {
      let producto = catalogoProductos.find(producto => producto.id == boton.value);
      tienda.aumentarCantidad(producto);
      actualizarCatalogo();
      actualizarPrecioCantidad();

    })
  })


  // Disminuir cantidad
  botonDisminuirCantidad.forEach(boton => {
    boton.addEventListener("click", () => {
      let producto = catalogoProductos.find(producto => producto.id == boton.value);
      tienda.disminuirCantidad(producto);
      actualizarCatalogo();
      actualizarPrecioCantidad();

    })
  })


  // Borrar producto
  botonBorrarProducto.forEach(boton => {
    boton.addEventListener("click", () => {
      let producto = catalogoProductos.find(producto => producto.id == boton.value);
      tienda.eliminarProducto(producto);
      actualizarPrecioCantidad();
      actualizarCatalogo();

    })
  })

}

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
      precioSubtotalImpreso.innerHTML = tienda.precioSubtotal.toFixed(2);
      cantidadImpresa.innerHTML = tienda.cantidadProductos;
      precioFinalImpreso.innerHTML = tienda.precioFinal;
  
      // console.log(tienda.precioSubtotal)
      // console.log(producto.cantidad)
  
    }
  }
















