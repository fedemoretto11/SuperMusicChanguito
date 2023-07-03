import { obtenerProductos, renderizar, productoParaCarrito} from './productos.js';
import { Shop } from './Shop.js';

// Llamado de botones
let botonAgregarCarrito = "" ; // Agregar Carrito -- PRODUCTO -- INICIALICACION SOLAMENTE
let botonAgregarCantidad = ""; // Sumar unidad a carrito -- PRODUCTO -- INICIALICACION SOLAMENTE
let botonDisminuirCantidad = ""; // Restar unidad carrito -- PRODUCTO -- INICIALICACION SOLAMENTE
let botonBorrarProducto = ""; // Borrar el producto del carrito -- PRODUCTO -- INICIALICACION SOLAMENTE
const botonCarrito = document.getElementById("boton-carrito"); // Boton para abrir el carrito -- CARRITO
const botonBorrarCarrito = document.getElementById("borrar-carrito"); // Borrar TODO el carrito -- CARRITO
const botonComprar = document.getElementById("comprar"); // Boton Comprar -- CARRITO
const botonesCategorias = document.querySelectorAll(".nav-button_link"); // Botones para cambiar categoria (guitarra, piano, bateria)
const botonesPaginas = document.querySelectorAll(".paginas-botones");

// Llamdo HTML
const buscadorInput = document.getElementById("buscador-input_buscar"); // Input texto buscador parte superior
const precioSubtotalImpreso = document.getElementById("subtotal"); // Subtotal en pantalla
const cantidadImpresa = document.getElementById("cantidad"); // Cantidad de productos en pantalla
const carrito = document.getElementById('carrito'); // Carrito, se trae para desplegar el menu
let carritoProductos = document.querySelector('.carrito-productos'); // Div para insertar productos (Carrito)
const cantidadCarrito = document.querySelector(".cantidad-carrito");

// Creacion de catalogo
const catalogo = document.getElementById("catalogo"); // Section Catalogo, aca se va a renderizar cada CARD

// Creacion del Shop
const tienda = new Shop(); // Instanciacion del Shop


// Variables categoria y limite para pasar como parametros en funcion de cambiar de categoria y mostrar cantidad de tarjetas por pagina
let categoria = "MLA417638";
let limite = 8;

// Mostrar catalogo
let catalogoProductos = await obtenerProductos(categoria,limite); // Asigna a la variable los productos obtenidos a traves de la API de MELI


// Esta funcion actualiza el Catalogo mostrado en pantalla
async function actualizarCatalogo(){
  catalogo.innerHTML = "";
  catalogoProductos.forEach(producto => {
    let productoCatalogo = renderizar(producto);
    catalogo.insertAdjacentHTML("beforeend", productoCatalogo);
  });
  botonAgregarCarrito = document.querySelectorAll(".agregarCarrito"); // Asignacion de boton    
  agregarEventListeners();
  cantidadProductoCarrito()
}
await actualizarCatalogo();
// console.log(catalogoProductos)

// Mostrar Productos en carrito
function mostrarPantallaCarrito(){ 
  
  carritoProductos.innerHTML = '';
  if (tienda.carrito.length > 0) {
    tienda.carrito.forEach(producto => {
      let productoAgregar = productoParaCarrito(producto);
      carritoProductos.insertAdjacentHTML('beforeend', productoAgregar);
    })
  } else {
    carritoProductos.innerHTML = '<h2>No hay items</h2>';
  }
  botonAgregarCantidad = document.querySelectorAll(".agregarCantidad"); // Asignacion de boton
  botonDisminuirCantidad = document.querySelectorAll(".disminuirCantidad"); // Asignacion de boton
  botonBorrarProducto = document.querySelectorAll(".borrarProducto"); // Asignacion de boton
  agregarEventListenersCarrito()
  // actualizarPrecioCantidad()
}




// Funciones varias
  
  //Mostrar en pantalla subtotal y cantidad
  function actualizarPrecioCantidad(){
    if(tienda.carrito.length == 0) {
      precioSubtotalImpreso.innerHTML = 0;
      cantidadImpresa.innerHTML = 0;
    }
    tienda.calculoIva();
    precioSubtotalImpreso.innerHTML = tienda.precioSubtotal.toLocaleString();
    cantidadImpresa.innerHTML = tienda.cantidadProductos;
  }

  //Agrega saca y modifica la cantidad de productros en el carrito(icono rojo)
  function cantidadProductoCarrito(){
    cantidadCarrito.innerHTML = '';
    if(tienda.carrito.length > 0) {
      cantidadCarrito.style.display = "inline";
      cantidadCarrito.innerHTML = tienda.carrito.length;
    } else {
      cantidadCarrito.style.display = "none";
      cantidadCarrito.innerHTML = '';
    }
  }

  //Eventos de botones de tarjetas
  function agregarEventListeners(){
    // Agregar al carrito
    botonAgregarCarrito.forEach(boton => {
      boton.addEventListener("click", () => {
        let producto = catalogoProductos.find(producto => producto.id == boton.value);
        tienda.agregarAlCarrito(producto);
        cantidadProductoCarrito()
        actualizarCatalogo();
        actualizarPrecioCantidad();
      })
      mostrarPantallaCarrito();
    })
  }
  //Eventos de botones de tarjetas de carrito
  function agregarEventListenersCarrito() {
    // Aumentar cantidad
    if (tienda.carrito.length > 0) {
      botonAgregarCantidad.forEach(boton => {
        boton.addEventListener("click", () => {
          tienda.aumentarCantidad(boton.value);
          actualizarPrecioCantidad();
          actualizarCatalogo();
          cantidadProductoCarrito()
        })
      })
      
      // Disminuir cantidad
      botonDisminuirCantidad.forEach(boton => {
        boton.addEventListener("click", () => {
          tienda.disminuirCantidad(boton.value);
          actualizarCatalogo();
          actualizarPrecioCantidad();
          cantidadProductoCarrito()
        })
      })
      // Borrar producto
      botonBorrarProducto.forEach(boton => {
        boton.addEventListener("click", () => {
          tienda.eliminarProducto(boton.value);
          actualizarPrecioCantidad();
          actualizarCatalogo();
          cantidadProductoCarrito()
        })
      })
    }
  }











// Eventos 

  // Mostrar disitntas categorias del catalogo
  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      botonesCategorias.forEach(button => {
        button.classList.remove("active");
      })
      boton.classList.add("active")

      categoria = boton.dataset.category;
      obtenerProductos(categoria, limite)
        .then(resultado => {
          catalogoProductos = resultado;
          actualizarCatalogo();
          
        })
      agregarEventListeners();
    })  
  })


  // Mostrar cantidad de tarjetas por pagina
  botonesPaginas.forEach(boton => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      limite = boton.value;
      console.log(limite);
      console.log(categoria);

      obtenerProductos(categoria, limite)
        .then(resultado => {
          catalogoProductos = resultado;
          actualizarCatalogo();
          
        })
      agregarEventListeners();
    })
  })


  // Mostrar carrito
  botonCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    if (carrito.classList.contains("offset-active")) {
      carrito.style.right = "-1000px"
      carrito.classList.remove("offset-active")
    } else {
      carrito.style.right = "0px";
      carrito.classList.add("offset-active");
    }
  })


  // Borrar carrito
  botonBorrarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    if (tienda.carrito.length > 0) {
      tienda.vaciarCarrito();
      actualizarPrecioCantidad();
      mostrarPantallaCarrito()
      cantidadProductoCarrito()
      console.log("Carrito borrado")
    } else {
      console.log("Carrito sin productos")

    }
  })

  //Comprar (Por ahora solo muestra mensaje en consola)
  botonComprar.addEventListener("click", (e) => {
    e.preventDefault();
    if (tienda.carrito.length > 0) {
      console.log(tienda.carrito);
      console.log("USTED COMPRA LOS PRODUCTOS DEL CHANGO")
    } else {
      console.log("Carrito Vacio")
    }
  })


  // Buscador de productos
  buscadorInput.addEventListener("keyup", () => {
    let buscar = buscadorInput.value;
    let resultados = tienda.buscarProducto(buscar, catalogoProductos);
    catalogo.innerHTML = ''
    resultados.forEach(resultado => {
      let resRend = renderizar(resultado);
      catalogo.insertAdjacentHTML("beforeend", resRend);
      botonAgregarCarrito = document.querySelectorAll(".agregarCarrito"); // Asignacion de boton    

    })
    agregarEventListeners();
  })





















