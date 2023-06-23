// const carrito = document.querySelector(".offset-carrito");

export class Shop {
  constructor(){
    this.carrito = [];
    this.precioSubtotal = 0;
    this.precioFinal = 0;
    this.cantidadProductos = 0;
  }

  calculoPrecioSubtotal() {
    this.precioSubtotal = 0;
    for(let producto of this.carrito){
      this.precioSubtotal += producto.subtotal;
    }
  }

  
  agregarAlCarrito(productoNuevo) {
    productoNuevo.subtotal = productoNuevo.precio * productoNuevo.cantidad;
    if (this.carrito.includes(productoNuevo)) {
      console.log("El producto ya existe en el carrito")
    } else {
      this.carrito.push(productoNuevo);
      this.calculoPrecioSubtotal();
    }
  }

  aumentarCantidad(productoNuevo){
    if (this.carrito.includes(productoNuevo)) {
      productoNuevo.cantidad++;
      productoNuevo.subtotal = productoNuevo.precio * productoNuevo.cantidad;
      this.calculoPrecioSubtotal();
    } else {
      console.log("El producto no esta en el carrito")
    }
  }

  disminuirCantidad(productoNuevo){
    let indice = this.carrito.indexOf(productoNuevo);
    if (this.carrito.includes(productoNuevo)) {
      productoNuevo.cantidad--;
      productoNuevo.subtotal = productoNuevo.precio * productoNuevo.cantidad;
      this.calculoPrecioSubtotal();
      if(productoNuevo.cantidad == 0) {
        console.log("Producto eliminado del carrito");
        this.carrito.splice(indice,1);
      }
    } else {
      console.log("El producto no esta en el carrito")
    }
  }

  eliminarProducto(productoEliminar){
    let indice = this.carrito.indexOf(productoEliminar);
    if (this.carrito.includes(productoEliminar)) {
      this.carrito.splice(indice,1);
      this.calculoPrecioSubtotal();
      console.log(`El producto ${productoEliminar.nombre} ha sido eliminado correctamente`)
    } else {
      console.log("El producto no se encuentra en el carrito")
    }
  }

  // Ahora esta hecho con un Prompt, pero va a estar con un input texto cuadno modele bien la pagina(la idea es para la proxima preentrega)
  buscarProducto(){ 
    let productoBuscar = prompt("Ingrese un producto a buscar"); // Con promp provisoria hasta agregar barra de busqueda
    let encontrado = this.carrito.filter(producto => producto.nombre.toLocaleLowerCase().includes(productoBuscar.toLocaleLowerCase()));
    if(encontrado.length > 0) {
      console.log(`El producto ${encontrado[0].nombre} fue agregado al carrito ${encontrado[0].cantidad} veces`)
    } else {
      console.log("Producto no esta en el carrito")
    }
  }

  vaciarCarrito(){
    this.carrito = [];
    this.precioSubtotal = 0;
    this.cantidadProductos = 0;
  }

  // Este metodo se va a utilizar para mostrar los productos en carrito, a implementar en siguiente etapa del HTML/CSS
  mostrarPantalla(){ 
    this.carrito.forEach(producto => {
      let productoAgregar = 
      `
      <div class="offset-cards center">
        <img src="${producto.imagen}" alt="${producto.altImagen}">
        <h5>${producto.nombre}</h5>
        <p>${producto.cantidad}</p>
        <p>${producto.precio}</p>
        <p>${producto.subtotal}</p>
        <button class="borrar-producto">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `
    carrito.insertAdjacentHTML('beforeend', productoAgregar);
    })
  }

  precioDolar() { // Falta hacer que cambie de signo cuando cambia de moneda e implementarlo
    let valorDolar = 500;
    this.precioSubtotal = this.precioSubtotal / valorDolar;
  }

  calculoIva(){
    this.precioFinal = this.precioSubtotal * 1.21;
  }

}

