const main = document.getElementsByTagName("main").item(0);
const productgrid = document.getElementById("product-grid");
const customModal = document.getElementById("customModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalFooter = document.getElementById("modalFooter");
const modalPrice = document.getElementById("modalPrice");
const closeModalBtn = document.getElementById("closeModalBtn");


const ulMenu = document.getElementById("ulMenu"); //lista de categorías (dropdown o menú lateral)

const URLMain = "https://fakestoreapi.com/products/"; //debe llevar diagonal al final para facilitar escritura de subrutas
//La URL regresa un array de objetos
function getData(cat){
    productgrid.innerHTML = ""; // Limpia productos anteriores
    //const options ={"method": "GET"};
    fetch(URLMain+cat)//options) 
    .then((response)=> response.json())
    .then((data)=> {
        data.forEach((e) => {
            productgrid.insertAdjacentHTML("beforeend",
            `<div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100">
                    <img src="${e.image}" class="card-img-top"  alt="${e.title}" style="width: 100%; height: 200px; object-fit: contain;">
                    <div class="card-body">
                        <h5 class="card-title">${e.title}</h5>
                        <p class="card-text">${e.description.slice(0,100)}</p>
                        <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-primary btn-detalles" 
                            data-title="${e.title}"
                            data-description ="${e.description}"
                            data-category ="${e.category}"
                            data-price ="${e.price}">
                            Ver más</a>
                        </div>
                    </div>
               </div>
            </div>`);
        });

        //Funcionalidad Modal
        //Constante que almacena todos los elementos con la clase .btn-detalles (uno para cada tarjeta de producto creada)
        const botonesDetalles = document.querySelectorAll(".btn-detalles");
        botonesDetalles.forEach((btn) => {
            //Agrega un event listener a cada botón
            btn.addEventListener("click", function(event){
                event.preventDefault(); 
                //Revela al modal
                customModal.style.display = "block";
                //Lee y muestra los atributos data que se almacenaron de cada botón 
                //Nombre de producto, descripción, precio y categoría
                modalTitle.innerHTML= `<p>${btn.dataset.title}</p>`; 
                modalBody.innerHTML= `<p>${btn.dataset.description}</p> 
                                        <span class="badge text-bg-info">Price: $${btn.dataset.price}</span>`;
                modalFooter.innerHTML= `<strong><mark>Category: ${btn.dataset.category}</mark></strong>`;
            });
        });

    })
    //     console.log(response);
    //    // Convertir la resouesta a un formato JSON
    //     response.json()//.then((res)=>{
    //     console.log(res.length);
    //     console.log(res[19].title, res[19].price);
     //})
    .catch((err) => {
        main.insertAdjacentHTML("beforeend",
            `<div class="alert alert-danger" role="alert">
            ${err.message}
            </div>`);
    });
}//getData

//Cerrando modal
closeModalBtn.addEventListener("click", ()=>{
    customModal.style.display = "none";
})

//Función para obtener las categorías desde la API
function getCategories(){
    const options ={"method": "GET"};
    fetch(URLMain+"categories/", options)
    //Obtiene los nombres de las categorías
    .then((response) =>{
        //console.log(response);
        response.json().then((res)=>{
            //console.log("categories:", res);
            res.forEach((cat)=>{
                //Agregamos la categoría obtenida a la lista del HTML después de su apertura
                ulMenu.insertAdjacentHTML("afterbegin",
                    `<li><a class="dropdown-item" style="cursor:pointer;" onclick="getData('category/${(cat.replace("'","%27"))}');">${cat}</a></li>`);   //No usar el replace porque no es una solucion global, solo particular   
            });
                    //Insertamos a cada categoría un el evento onclick que ejecuta getData pasando como parámetro la subruta 'category' + nombre de la categoría obtenida en la iteración del forEach
                    //Ejemplo de ruta: /category/electronics
        });
    })
    .catch((err) => {
        main.insertAdjacentHTML("beforeend",
            `<div class="alert alert-danger" role="alert">
            ${err.message}
            </div>`);
    });
}

getCategories();
getData(""); //Por defecto debe haber un parámetro así que lo pasamos como cadena vacía para que funcione


