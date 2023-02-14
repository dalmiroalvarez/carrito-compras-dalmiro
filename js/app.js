//VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos')

let articulosCarrito = [];

cargarEventListeners();
    function cargarEventListeners() {
        listaCursos.addEventListener('click', agregarCurso);

        carrito.addEventListener('click', eliminarCurso)

        vaciarCarritoBtn.addEventListener('click', () => {
            articulosCarrito = [];

            limpiarHTML();
        })
    }

//FUNCIONES 

//Agregar Curso
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
        
    }
}


// Eliminar un Curso
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        carritoHTML();
    }
}

//Contenido del HTML del curso clickeado

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Ver si un elemento ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }            
        })
        articulosCarrito = [...cursos];

    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Agregando elementos al carrito    
    console.log(articulosCarrito);

    carritoHTML();
}

// Mostrando items del carrito en HTML

function carritoHTML() {
    
    limpiarHTML();
    //Recorre el carrito
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `             
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${curso.id}'> X </a>
            </td>

        `;

        contenedorCarrito.appendChild(row);
    })
}

//Eliminar los cursos del HTML

function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
}