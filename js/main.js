const main = document.getElementsByTagName("main").item(0);
const productgrid = document.getElementById("product-grid");
const customModal = document.getElementById("customModal");
const ulMenu = document.getElementById("ulMenu");

const URLMain = "https://fakestoreapi.com/products/"; //debe llevar diagonal al final para facilitar escritura de futuros parametros agregados
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
                            <a href="#" class="btn btn-primary btn-detalles">Ver más</a>
                        </div>
                    </div>
               </div>
            </div>`);
        });

        //Funcionalidad Modal, por terminar
        // const botonesDetalles = document.querySelectorAll(".btn-detalles");
        // botonesDetalles.forEach((btn) => {
        //     btn.addEventListener("click", function(event){
        //         event.preventDefault(); // para que no recargue la página
        //         customModal.style.display = "block";
        //     });
        // });

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


function getCategories(){
    const options ={"method": "GET"};
    fetch(URLMain+"categories/", options)
    .then((response) =>{
        //console.log(response);
        response.json().then((res)=>{
            //console.log("categories:", res);
            res.forEach((cat)=>{
                ulMenu.insertAdjacentHTML("afterbegin",
                    `<li><a class="dropdown-item" style="cursor:pointer;" onclick="getData('category/${(cat.replace("'","%27"))}');">${cat}</a></li>`);   //No usar el replace porque no es una solucion global, solo particular   
            });
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
getData("");


