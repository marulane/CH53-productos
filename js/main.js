const main = document.getElementsByTagName("main").item(0);
const productgrid = document.getElementById("product-grid");
const customModal = document.getElementById("customModal");

const URLMain = "https://fakestoreapi.com/products/"; //debe llevar diagonal al final para facilitar escritura de futuros parametros agregados
//La URL regresa un array de objetos
function getData(){
    //const options ={"method": "GET"};
    fetch(URLMain)//options)
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

getData();


