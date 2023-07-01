// const carrito = document.querySelector(".offset-carrito");

export class Shop {
  constructor(){
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    this.carrito = carrito || [];
    this.precioSubtotal = 0;
    this.precioFinal = 0;
    this.cantidadProductos = 0;
  }

  




  // Agregar al Carrito, chequea si existe en carrito, si tiene stock y luego agrega

  agregarAlCarrito(productoNuevo) {

    // Cheque si existe en carrito
    if (this.carrito.includes(productoNuevo)) {
      console.log("El producto ya existe en el carrito")
      alert("El producto ya ha sido ingresado.\nPara comprar más agregue desde la sección carrito")


    // Chequea si el producto tiene stock
    } else if (productoNuevo.installments.quantity <= 0) {
      console.log("Producto sin stock")

    // Agrega al carrito
    } else {
      this.carrito.push(productoNuevo);
      productoNuevo.installments.quantity--;
      productoNuevo.cantidad = 1;
      productoNuevo.subtotal = productoNuevo.price * productoNuevo.cantidad;
      this.calculoPrecioSubtotal();
      this.calculoCantidad()
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
      // console.log(productoNuevo.subtotal)
      // console.log(productoNuevo.cantidad)
    }
  }


  //Aumenta cantidad en carrito en 1

  aumentarCantidad(productoNuevo){

    // Cheque si tiene Stock
    if (productoNuevo.installments.quantity <= 0) {
      console.log("Producto sin stock");
      alert("Producto sin Stock")
    // Chequea que el producto este y suma una unidad al carrito
    } else if (this.carrito.includes(productoNuevo)) {
      productoNuevo.cantidad++;
      productoNuevo.subtotal = productoNuevo.price * productoNuevo.cantidad;
      productoNuevo.installments.quantity--;
      this.calculoCantidad()
      this.calculoPrecioSubtotal()
      localStorage.setItem("carrito", JSON.stringify(this.carrito));

    // Si no esta en carrito avisa que no esta
    } else {
      console.log("El producto no esta en el carrito")
    }
  }


  //Disminuye cantidad en carrito en 1

  disminuirCantidad(productoNuevo){
    let indice = this.carrito.indexOf(productoNuevo);
    if (this.carrito.includes(productoNuevo)) {
      productoNuevo.cantidad--;
      productoNuevo.subtotal = productoNuevo.price * productoNuevo.cantidad;
      productoNuevo.installments.quantity++;
      this.calculoCantidad()
      this.calculoPrecioSubtotal()
      if(productoNuevo.cantidad == 0) {
        console.log("Producto eliminado del carrito");
        this.carrito.splice(indice,1);
      }
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    } else {
      console.log("El producto no esta en el carrito")
      alert("El producto no se encuentra en el carrito")
    }
  }


  // Elimina el producto en el carrito

  eliminarProducto(productoEliminar){
    let nombre = productoEliminar.title ? productoEliminar.title.split(' ').slice(0, 3).join(' ') : "";
    let indice = this.carrito.indexOf(productoEliminar);
    if (this.carrito.includes(productoEliminar)) {
      this.carrito.splice(indice,1);
      this.calculoCantidad()
      this.calculoPrecioSubtotal()
      console.log(`El producto ${nombre} ha sido eliminado correctamente`)
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    } else {
      console.log("El producto no se encuentra en el carrito")
      alert("El producto no se encuentra en el carrito");

    }
  }


  // Buscador de producto

  buscarProducto(buscar, productos){ 
    return productos.filter(producto => {
      const productoBuscar = new RegExp(buscar, 'gi');
      return producto.title.match(productoBuscar);
    })
  }


  // Elimina todos los productos del carrito

  vaciarCarrito(){
    this.carrito = [];
    this.precioSubtotal = 0;
    this.cantidadProductos = 0;
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }


  // Calculo subtotal
  
  calculoPrecioSubtotal() {
    this.precioSubtotal = 0;
    for(let producto of this.carrito){
      this.precioSubtotal += producto.subtotal;
    }
  }


  // Calculo cantidad total

  calculoCantidad() {
    this.cantidadProductos = 0;
    for(let producto of this.carrito){
      this.cantidadProductos += producto.cantidad;
    }
  }

  // Calculo Precio Final

  calculoIva(){
    this.precioFinal = (this.precioSubtotal * 1.21).toFixed(2);
  }



// METODOS TODAVIA NO IMPLEMENTADOS


  // Este metodo se va a utilizar para mostrar los productos en carrito, a implementar en siguiente etapa del HTML/CSS
  


  precioDolar() { // Falta hacer que cambie de signo cuando cambia de moneda e implementarlo
    let valorDolar = 500;
    this.precioSubtotal = this.precioSubtotal / valorDolar;
  }



  
  

}

