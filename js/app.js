//Varibles
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el  carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        /* console.log('vaciando carrito...') */ //probamos que funcione el código
        articulosCarrito = []; //reseteramos el carrito(arreglo)
        limpiarHTML();  //eliminadmos todo el html
    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);   
    }
}

//Elimina curso del carrito
function eliminarCurso(e){
    /* console.log('desde eliminarCurso'); */ //para comprobar el codigo
    /* console.log(e.target.classList); */
    if(e.target.classList.contains('borrar-curso')){
        /* console.log(e.target.getAttribute('data-id')); */
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !==cursoId);
        console.log(articulosCarrito);

        carritoHTML(); //Iterar sobre el carrito y mostrar su html

    }
}


//Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){
    /* console.log(curso) */

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    /* console.log(infoCurso) */

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id ===infoCurso.id);
    /* console.log(existe); */ // compruebo si funciona el código
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => { //.map me crea un nuevo array
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso; //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Crear un arreglo vacio para que se guarde en el carrito, agrega elementos al arreglo de carrito
    /* articulosCarrito = [...articulosCarrito, infoCurso]; */
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        /* console.log(curso); */ //Una vez que funciona extraigo en un objeto
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML =`
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
            `;

            //Agrega el HTML del carrito en el body
            contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma lenta:
    /* contenedorCarrito.innerHTML = ''; */

    //Forma rápida:
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

