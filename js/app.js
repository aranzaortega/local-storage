// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event listeners
eventListeners();

function eventListeners(){
    // Cunado el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo (cargado)
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearListaHTML();
    });
}


// Funciones
function agregarTweet(e){
    e.preventDefault();

    // Textarea donde el usuario escribe

    const tweet = document. querySelector('#tweet').value;

    // Validación

    if(tweet === ''){
        mostrarError('Un tweet no puede ir vacío');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet // = tweet : tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    crearListaHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar en el HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Eliminar la alerta después de 3 seg
    setTimeout (() => {
        mensajeError.remove();
    }, 3000);
}

function crearListaHTML(){
    limpiarListaHTML();

    if (tweets.length > 0){
        tweets.forEach( tweet => {
            
            // Agregar un botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Como pasaremos parámetros se hace un arrow function
            btnEliminar.onclick= () => {
                borrarTweet(tweet.id);
            }

            // Crear HTML list
            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);

            // Insertar HTML
            listaTweets.appendChild(li);
        })
    }

    sicronizarStorage();
}

function limpiarListaHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function sicronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id){
    // Para eliminar el tweet selecionado
    tweets = tweets.filter( tweet => tweet.id !== id);
}