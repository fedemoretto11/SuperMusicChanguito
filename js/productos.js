// Funcion que obtiene la informacion de la API de MELI
export async function obtenerProductos(categoria, limite) {
  try {
    const result = await fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${categoria}&limit=${limite}`);
    const productos = await result.json();
    return productos.results;
  } catch (error) {
    console.log(error);
  }
}


// CardCatalogo
function card({id,imagen, altImagen, nombre,descripcion,cantidadDisponible, precio, moneda}) { 
  return `
    <div class="catalogo-cards center-column">
      <img src="${imagen}" alt="${altImagen}">
      <h2>${nombre}</h2>
      <p class="catalogo-cards_descripcion">${descripcion}</p>
      <p>Stock: ${cantidadDisponible}</p>
      <p>Precio: ${moneda} ${precio.toLocaleString()}</p>
      <div class="center catalogo-cards_buttons">
        <button class="agregarCarrito" value="${id}">Agregar al Carrito</button>
      </div>
    </div>
    `

}

// Card Carrito
function cardCarrito({id,imagen, altImagen, nombre,cantidad, precio, moneda}) { 
  return `
    <div class="offset-cards center">
      <img src="${imagen}" alt="${altImagen}">
      <h4 id="${id}">${nombre}</h4>
      <p>Cant: ${cantidad}</p>
      <p>${moneda} ${precio.toLocaleString()}</p>
      <div class="center offset-cards_buttons">
        <button class="agregarCantidad" value="${id}">+</button>
        <button class="disminuirCantidad" value="${id}">-</button>
        <button class="borrarProducto" value="${id}">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    </div>
    `

}

// Renderizacion Card catalogo
export function renderizar(item) {
  let name = item.title ? item.title.split(' ').slice(0, 3).join(' ') : "";
  const producto = {
    id: item.id,
    imagen: item.thumbnail,
    altImagen: item.title,
    nombre: name,
    descripcion: item.title,
    cantidadDisponible: item.installments.quantity,
    precio: item.price,
    moneda: item.currency_id === "ARS" ? "$" : "USD",
  }

  let productoRenderizado = card(producto);
  return productoRenderizado;
}

// Renderizacion Card carrito
export function productoParaCarrito(item) {
  let name = item.title ? item.title.split(' ').slice(0, 3).join(' ') : "";
  const producto = {
    id: item.id,
    imagen: item.thumbnail,
    altImagen: item.title,
    nombre: name,
    cantidad: item.cantidad,
    precio: item.subtotal,
    moneda: item.currency_id === "ARS" ? "$" : "USD",
  }
  return cardCarrito(producto);
}


