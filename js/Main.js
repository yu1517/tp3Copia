document.addEventListener('DOMContentLoaded', function () {
    // CONSTANTES
    const FICHASTOTALES = 42; // borrar si no se usa
    const FICHASJUGADOR = 21;
    const RADIOESPACIOS = 30;
    const DESELECCIONAR = 99;
    const POSYENCIMATABLERO = 45; // la posicion y suficiente para evaluar si meto o no la ficha
    const INICIOTABLEROX = 430; // inicio del tablero en X
    const FINTABLEROX = 920; // final del tableor en X

    // VARIABLES
    let canvas = document.getElementById ('myCanvas');
    let ctx = canvas.getContext('2d')
    let partida;
    let imageData = null;
    /*
    let btnreload = document.getElementById('reload');
    let avisorojo = document.getElementById('avisorojo');
    let avisoazul = document.getElementById('avisoazul');
    */
    /*
    btnreload.addEventListener('click', function () {
        imageData = null;
        iniciar();
    });
*/
    iniciar();

    // FUNCIONES
    function iniciar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        partida = new Tablero(canvas);
        partida.nuevaPartida();
        dibujarFondo();
        escucharEventos();
    }

    function dibujarFondo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (imageData != null) {
            ctx.putImageData(imageData, 0, 0);
            dibujarTablero();

        } else {
            let background = new Image();
            background.src = "../img/fondo-tablero.jpg";
            background.onload = function () {
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                crearFichas();
            }
        }
    }


    function crearFichas() {
        let imagenFichasPlantas = new Image();
        imagenFichasPlantas.src = './img/ficha-planta.png';
        imagenFichasPlantas.onload = () => {
            for (let i = 0; i < FICHASJUGADOR; i++) {
                ficha = new Ficha(300, 50 + (i * 25), RADIOESPACIOS, 'amarillo', 'yellow', imagenFichasPlantas, canvas); // poner datos de la ficha
                partida.fichasPlantas.push(ficha);
            }

            let imagenFichasZombies = new Image();
            imagenFichasZombies.src = './img/ficha-zombie.png';
            imagenFichasZombies.onload = () => {
                for (let i = 0; i < FICHASJUGADOR; i++) {
                    ficha = new Ficha(1035, 50 + (i * 25), RADIOESPACIOS, 'morado', 'purple', imagenFichasZombies, canvas); //modifico la pos de las fichas
                    partida.fichasZombies.push(ficha);
                }
                dibujarTablero();
            }
        }

    }

    function dibujarTablero() {
        // el tablero
        ctx.fillStyle = "rgb(28, 138, 46)";
        //ctx.fillRect((canvas.width - 500) / 2, (canvas.height - 450) / 2, 500, 450);
        ctx.fillRect(420, 80, 500, 450);
        // la base del tablero
        ctx.fillStyle = "rgb(20, 65, 34)"
        //ctx.fillRect((canvas.width - 540) / 2, (canvas.height - 30) / 2, 540, 30);
        ctx.fillRect(400, 525, 540, 30)

        // mis agujeros
        for (let i = 0; i < partida.tablero.length; i++) {
            for (let j = 0; j < partida.tablero[i].length; j++) {
                partida.tablero[i][j].dibujarFicha();
            }
        }

        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height) // despues de mi tablero
        dibujarFichas();
        crearAviso();
    }

    function dibujarFichas() {
        // fichas de cada player
        for (let i = 0; i < partida.fichasPlantas.length; i++) {
            partida.fichasPlantas[i].dibujarFicha(); // dibujo mis fichas rojas   
        }
        for (let i = 0; i < partida.fichasZombies.length; i++) {
            partida.fichasZombies[i].dibujarFicha(); // dibujo mis fichas azules
        }
    }

    function crearAviso(ganador){
        if (ganador) {
            if (ganador === 'amarillo') {
                alert("¡Ganaste! Amarillo es el ganador.");
            } else if (ganador === 'morado') {
                alert("¡Ganaste! Morado es el ganador.");
            }    
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // para que se congele al ganar
        }
    }



    function escucharEventos() {
        canvas.addEventListener('mousedown', (event) => {
            // verificar si se clickeo alguna de mis fichas
            if (partida.turnoDe == 'amarillo') {
                let i = 0;
                let clickeado = false;
                // RECORRO CADA FICHIN ROJO Y LE PREGUNTO SI LO CLICKEARON
                while (i < partida.fichasPlantas.length && !clickeado) {
                    if (partida.turnoDe == partida.fichasPlantas[i].jugador) { // iniciando el rojo 
                        if (partida.fichasPlantas[i].isClicked(event.offsetX, event.offsetY)) { // pregunto si le clickearon alguna ficha
                            partida.fichaSeleccionada = i;
                            clickeado = true;
                        }
                    }
                    i++;
                }

            } else if (partida.turnoDe == 'morado') {
                let j = 0;
                let clickeado = false;
                while (j < partida.fichasZombies.length && !clickeado) {
                    if (partida.turnoDe == partida.fichasZombies[j].jugador) {
                        if (partida.fichasZombies[j].isClicked(event.offsetX, event.offsetY)) {
                            partida.fichaSeleccionada = j;
                            clickeado = true;
                        }
                    }
                    j++;
                }
            }
        })

        canvas.addEventListener('mousemove', (event) => {
            if (partida.fichaSeleccionada < 21 && partida.fichaSeleccionada >= 0) {
                if (partida.turnoDe == 'amarillo') {
                    partida.fichasPlantas[partida.fichaSeleccionada].posicionarFicha(event.offsetX, event.offsetY);
                }
                else if ((partida.turnoDe == 'morado')) {
                    partida.fichasZombies[partida.fichaSeleccionada].posicionarFicha(event.offsetX, event.offsetY);
                }
                dibujarFondo();
            }
        })

        canvas.addEventListener('mouseup', (event) => {
            eventoTerminado()
        })

        canvas.addEventListener('mouseover', () => {
            eventoTerminado()
        })

        canvas.addEventListener('mouseleave',()=>{
            eventoTerminado();
            let selection=window.getSelection();
            selection.removeAllRanges();
            // evita que se seleccione todo al hacer mouseleave con el click presionado 
            // y se intente draggear el contenido de la pagina seleccionado en lugar de la ficha
        })
    }

    function eventoTerminado() {
        let ingreso = verificarSiIngreso();
        if (!ingreso) {
            if (imageData != null) {
                //volver a la pila
                // pregunto de quien es el turno para saber que array mirar
                if (partida.turnoDe == 'amarillo') {
                    if (partida.fichasPlantas[partida.fichaSeleccionada] != null)
                        partida.fichasPlantas[partida.fichaSeleccionada].volverALaPila();

                } else if (partida.turnoDe == 'morado') {
                    if (partida.fichasPlantas[partida.fichaSeleccionada] != null)
                        partida.fichasZombies[partida.fichaSeleccionada].volverALaPila();

                }
                dibujarFondo();
            }

        } else {
            partida.cambiarTurno()
            dibujarFondo()
        }
        partida.fichaSeleccionada = DESELECCIONAR;
    }

    

    /*
    function crearAviso(ganador) {
        // avisito
        if (ganador) {
            let imagenganador = new Image();
            imagenganador.src = './images/ganaste.png'
            imagenganador.onload = () => {
                ctx.fillStyle = "rgb(0,0,0)"
                if (ganador == 'amarillo') {
                    ctx.drawImage(imagenganador, 150, 10, 150, 50)
                }
                else if (ganador == 'morado') {
                    ctx.drawImage(imagenganador, 670, 10, 150, 50)
                }
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height) // para que se congele al ganar
            }

        }

        if (partida.turnoDe == 'amarillo') {
            // algo
            avisorojo.classList.remove('ocultar')
            avisoazul.classList.add('ocultar')
        } else if (partida.turnoDe == 'morado') {
            // algo
            avisoazul.classList.remove('ocultar')
            avisorojo.classList.add('ocultar')
        } else {
            avisorojo.classList.add('ocultar')
            avisoazul.classList.add('ocultar')
        }


    }*/

    function verificarSiIngreso() {
        let fichas;
        // pregunto de quien es el turno para saber que array mirar
        if (partida.turnoDe == 'amarillo') {
            fichas = partida.fichasPlantas[partida.fichaSeleccionada];
        } else if (partida.turnoDe == 'morado') {
            fichas = partida.fichasZombies[partida.fichaSeleccionada];
        }
        if (fichas != null) {
            if (fichas.y < POSYENCIMATABLERO && (fichas.x > INICIOTABLEROX && fichas.x < FINTABLEROX)) { // pregunto si esta sobre el tablero
                for (let i = 0; i < partida.tablero.length; i++) {
                    // posicion en x de cada circulo tablero[i][0].x + - el radio /2 
                    let mayor = partida.tablero[i][0].x + (RADIOESPACIOS / 2); // pos + 1/3 radio
                    let menor = partida.tablero[i][0].x - (RADIOESPACIOS / 2) // pos + 1/3 radio
                    if (fichas.x < mayor && fichas.x > menor) {
                        let j = 5;
                        while (j >= 0) {
                            if (partida.tablero[i][j].jugador == 'ninguno') {
                                partida.tablero[i][j].jugador = partida.turnoDe;
                                partida.tablero[i][j].color = fichas.color;
                                partida.tablero[i][j].imagen = fichas.imagen;

                                if (partida.turnoDe == 'amarillo') {
                                    partida.fichasPlantas.splice(partida.fichaSeleccionada, 1);
                                }
                                else if (partida.turnoDe == 'morado') {
                                    partida.fichasZombies.splice(partida.fichaSeleccionada, 1);
                                }
                                dibujarFondo();
                                if (partida.chequearGanador(i, j)) {
                                    ganador(partida.turnoDe)
                                    partida.turnoDe = 'ninguno'
                                } else if (partida.fichasZombies.length == 0 && partida.fichasPlantas.length == 0) {
                                    partida.turnoDe = 'ninguno'
                                }
                                return true;
                            }

                            j--;


                        }
                    }
                }
                return false;
            } else {
                return false;
            }
        }

    }


    function ganador(ganador) {
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        // TBC
        if (ganador == 'amarillo') {
            crearAviso('amarillo')
        } else if (ganador == 'morado') {
            crearAviso('morado')
        }
    }
})







/*//CONSTANTES
const FICHASJUGADOR = 20;
const RADIOESPACIOS = 30;


//VARIABLES
let canvas = document.getElementById ('myCanvas');
let ctx = canvas.getContext("2d");

let canvasHeight = 800;
let canvasWidth = 800;
let circulos = [];
let getCirculo = null;
let mouseDown = false;

let partida;
let imageData = null;

iniciar();

// FUNCIONES
function iniciar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    partida = new TableroPosta(canvas, 6, 7, RADIOESPACIOS);
    partida.nuevaPartida();
    dibujarFondo();
    //escucharEventos();
}

function dibujarFondo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (imageData != null) {
        ctx.putImageData(imageData, 0, 0);
        dibujarTablero();

    } else {
        let fondoImage = new Image();
        fondoImage.src = "../img/fondo-tablero.jpg";
        let opacity = 0.5;
        fondoImage.onload = function () {
            ctx.globalAlpha = opacity;
            ctx.drawImage(fondoImage, 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
            crearFichas();
        }
    }
}

function crearFichas() {
    let imagenFichasPlantas = new Image();
    imagenFichasPlantas.src = './img/ficha-planta.png';
    imagenFichasPlantas.onload = () => {
        for (let i = 0; i < FICHASJUGADOR; i++) {
            ficha = new Ficha(100, 50 + (i * 25), RADIOESPACIOS, 'amarillo', 'yellow', imagenFichasPlantas, canvas); // poner datos de la ficha
            partida.fichasPlantas.push(ficha);
        }

        let imagenFichasZombie = new Image();
        imagenFichasZombie.src = './img/ficha-zombie.png';
        imagenFichasZombie.onload = () => {
            for (let i = 0; i < FICHASJUGADOR; i++) {
                ficha = new Ficha(875, 50 + (i * 25), RADIOESPACIOS, 'gris', 'grey', imagenFichasZombie, canvas);
                partida.fichasZombies.push(ficha);
            }
            dibujarTablero();
        }
    }
} 

function dibujarTablero() {
    partida.dibujarTablero();
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    dibujarFichas();
}

*/

/*
function dibujarTablero() {
    // el tablero
    ctx.fillStyle = "rgb(28, 138, 46)";
    ctx.fillRect(220, 80, 500, 450);
    // la base del tablero
    ctx.fillStyle = "rgb(20, 65, 34)"
    ctx.fillRect(200, 525, 540, 30)

    // mis agujeros
    for (let i = 0; i < partida.tablero.length; i++) {
        for (let j = 0; j < partida.tablero[i].length; j++) {
            partida.tablero[i][j].dibujarFicha();
        }
    }

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height) // despues de mi tablero
    dibujarFichas();
    //crearAviso();
}
*/

/*
function dibujarFichas() {
    partida.dibujarFichas();
}
*/

/*
function dibujarFichas() {
    // fichas de cada player
    for (let i = 0; i < partida.fichasRojas.length; i++) {
        partida.fichasRojas[i].dibujarFicha(); // dibujo mis fichas rojas   
    }
    for (let i = 0; i < partida.fichasAzules.length; i++) {
        partida.fichasAzules[i].dibujarFicha(); // dibujo mis fichas azules
    }
}   
*/
/*
canvas.addEventListener("mouseup", (e) => {
    if(getCirculo!=null){
        tablero.isInTablero(getCirculo);
    }
    mouseDown = false;
    getCirculo = null;
    
});

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(e.offsetY);
    circulos.forEach(element => {
        if (element.isPointInside(x, y)) {
            getCirculo = element;
        }
    });
});

canvas.addEventListener("mousemove", (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    if (getCirculo != null && mouseDown == true && getCirculo.ubicada==false) {
        getCirculo.setPosX(x);
        getCirculo.setPosY(y);
        drawCircle();
    }
});

*/
// const fondoImage = new Image();
// fondoImage.src = "../img/fondo-tablero.jpg";

// fondoImage.onload = () => {
//     // Llama a una función para dibujar el tablero con el fondo una vez que la imagen esté lista.
//     tablero.dibujarTablero(fondoImage);
//     const c1 = new Ficha(50, 70, 30, "white", 0, 2 * Math.PI,ctx);
//     const c2 = new Ficha(50, 200, 30, "white", 0, 2 * Math.PI,ctx);
//     const c3 = new Ficha(80, 400, 30, "white", 0, 2 * Math.PI,ctx);
//     const c4 = new Ficha(80, 500, 30, "white", 0, 2 * Math.PI,ctx);
    
    
//     circulos.push(c1,c2,c3,c4);
    
//     drawCircle();
// };

//tablero.dibujarTablero(fondoImage);


/*
document.addEventListener('DOMContentLoaded', function () {
    // VARIABLES
    let canvas = document.getElementById ('myCanvas');
    let ctx = canvas.getContext("2d");
    let game;   

    startGame();

    //FUNCIONES
    function startGame(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //game = new Board(canvas);
        //game.newGame();
        drawBackground();
        //listenEvent();
    }

    function drawBackground(){
        // Crea una nueva imagen
        let background = new Image();
        background.src ="../img/fondo-tablero.jpg";

        // Opacidad deseada (0 a 1, donde 0 es completamente transparente y 1 es completamente opaco)
        let opacity = 0.5; // Cambia este valor según lo que desees

        // Dibuja la imagen de fondo una vez que se haya cargado
        background.onload = function () {
        ctx.globalAlpha = opacity;
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1; // Restablece la opacidad a su valor predeterminado
        }
    }

    function drawBoard(){

        //tablero
        ctx.fillStyle = "rgb(28, 138, 46)";
        ctx.fillRect(220, 80, 500, 450);

        //base del tablero
        ctx.fillStyle = "rgb(20, 65, 34)"
        ctx.fillRect(200, 525, 540, 30)

        // mis agujeros
        for (let i = 0; i < game.board.length; i++) {
            for (let j = 0; j < game.board[i].length; j++) {
                game.board[i][j].drawToken();
            }
        }
        
    }

})

*/