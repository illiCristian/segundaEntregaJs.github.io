const contenedorCarrito = document.getElementById("carrito-contenedor");
const borrarItemCarrito = document.getElementById("trash");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contador");
const contadorCarrito1 = document.getElementById("contador1");
const precioTotal = document.getElementById("precio-total");

let carrito = [];

/* get local storage */
 document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
       actualizarCarrito();
   }
  })

//  let carritoStorage = JSON.parse(localStorage.getItem("carrito"));

//   if(carritoStorage){
//     carrito = carritoStorage;
//   }else{
//     console.log('no esta guardado');
//   }

class Producto{
    constructor(id,nombre,descripcion,precio,img,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.cantidad = cantidad;
    }
}

const productos = [];

let producto1 = new Producto(1,'Bolsitas Cumpleaños','papel fotografico 120 gr, 17 cm x 10,5 cm x 3,5 cm',150,"https://madaradesign.netlify.app/img/disenos%20personalizados/linea1%20(3).jpeg",0);
let producto2 = new Producto(2,'Pokemones de apego','20 cm de alto, relleno de vellon siliconado',350,"https://i.ibb.co/v30CSMN/Whats-App-Image-2022-09-28-at-10-05-41-1.jpg",0);
let producto3 = new Producto(3,"Vaso Acrilico","personalizado con vinilo holografico",500,"https://i.ibb.co/mvTRtfF/vaso.jpg",0);
let producto4 = new Producto(4,'Muñecos de apego','20 cm aprox, rellenos de vellon siliconado',350,"https://i.ibb.co/Lx7v4y5/Whats-App-Image-2022-09-28-at-10-05-42.jpg",0);
let producto5 = new Producto(5,'Cartuchera','21cm x 12cm personalizable',400,"https://i.ibb.co/fqQsVxw/Whats-App-Image-2022-09-28-at-10-05-41.jpg",0);
let producto6 = new Producto(6,'Taza HellFire Club!','ceramica',1000,"https://i.ibb.co/XFQyVqQ/Whats-App-Image-2022-09-28-at-10-05-42-2.jpg",0);
let producto7 = new Producto(7,'Gorra trucker','parche bordado personalizable',1000,"https://i.ibb.co/QHmBJp3/Whats-App-Image-2022-09-28-at-10-05-42-1.jpg",0);
let producto8 = new Producto(8,'Leo Messi + Copa Mundial','20 cm relleno de vellon siliconado',600,"https://i.ibb.co/sQYxdgd/Whats-App-Image-2022-09-28-at-10-05-40.jpg",0);


productos.push(producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8);

console.log(productos);

let div = document.getElementById('contenedor-div');


productos.forEach(el=>{
    let productoRenderizado = document.createElement('div');
    productoRenderizado.innerHTML=`
    <div class="my-2 px-2">
        <div class="card wimg" style="width: 15rem;">
            <img src="${el.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-decoration-underline text-center">${el.nombre}</h5>
                <p class="card-text text-center">${el.descripcion}.</p>
                <p class="card-text text-center ">Precio: $${el.precio}.</p>
                <a href="#" class="btn btn-primary btn-carrito" id="${el.id}">Agregar al carrito</a>
            </div>
        </div>
    </div>
    `
    div.append(productoRenderizado);
    
    const boton = document.getElementById(el.id);

    boton.addEventListener("click", ()=> {
        let productoExiste = carrito.find(item => item.id === el.id);
        console.log(el.id);
        if(productoExiste !== undefined){
            productoExiste.precio = productoExiste.precio + el.precio;
            productoExiste.cantidad = productoExiste.cantidad + 1;
        }else{
            carrito.push({
                id: el.id,
                nombre: el.nombre,
                descripcion: el.descripcion,
                precio: el.precio,
                img: el.img,
                cantidad: el.cantidad +1
            })
            
        }
        actualizarCarrito();    
     console.log(carrito);       
    });

    
})


const actualizarCarrito = () => {

    contenedorCarrito.innerHTML="";
    carrito.forEach(prod =>{
    
    const carritoActualizado = document.createElement("div");
     carritoActualizado.innerHTML =`
     <div class="card mb-3" style="max-width: 600px;">
         <div class="row g-0">
             <div class="col-md-4 align-items-center">
                <img src="${prod.img}" class="img-fluid rounded-start" alt="...">
    </div>
        <div class="col-md-8">
        <div class="card-body card-carrito">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">${prod.descripcion}.</p>
            <p class="card-text"><small class="text-muted">Cantidad: ${prod.cantidad}</small></p>
            <p class="card-text"><small class="text-muted">Precio: $${prod.precio}</small></p>
            
            <button id="trash" onclick="borrarItemCarr(${prod.id})"><i class="fas fa-trash-alt mr-3"></i></button>
        </div>
        </div>
    </div>
    </div>
     `
    
    //  <a href="#" class="btn btn-primary btn-sm" id="${prod.id}">Borrar compra</a>
    contenedorCarrito.appendChild(carritoActualizado);
    
     
    })
    localStorage.setItem("carrito", JSON.stringify(carrito));

    contadorCarrito.innerText = carrito.length;
    contadorCarrito1.innerText= carrito.length;
    precioTotal.innerText = carrito.reduce((acum, el) => acum + el.precio,0);
}

const borrarItemCarr = (prod) => {
    const item = carrito.find(el=> el.id === prod.id);
    const indice = carrito.indexOf(item);
    carrito.splice(indice,1);
    actualizarCarrito();
}

vaciarCarrito.addEventListener("click", ()=> {
    carrito.length = 0;
    actualizarCarrito();
})