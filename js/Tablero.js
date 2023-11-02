class Tablero {
    constructor(canvas) {
        this.TABLEROCOLS = 7 // cantidad de columnas
        this.TABLEROROWS = 6; // cantidad de filas
        this.TOTALFICHAS = 42; // total de fichas
        this.RADIOESPACIOS = 30; // radio de mis circulos blancos/ espacios
        this.POSTABLEROX = 415; // posicion del tablero en x (donde inicia su rect)
        this.POSTABLEROY = 85; // posicion del tablero en y (donde inicia su rect)
        this.MULTRADIO = 1.5; // multiplicar el radio x esto (a ojo)
        this.MULTCONT = 70;  // multiplicar el contador x esto (a ojo)

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.fichasPlantas = []; // 21
        this.fichasZombies = []; // 21
        this.turnoDe = 'amarillo'; // siempre empieza el amarillo (plantas)
        this.tablero = [[], [], [], [], [], [], []] // un array de arrays de 6 alto x 7 de ancho
        this.fichaSeleccionada = 99; // un numero del 0 al 20
    }

    nuevaPartida() {
        for (let i = 0; i < this.TABLEROCOLS; i++) { // 7 
            for (let j = 0; j < this.TABLEROROWS; j++) {  // 6 
                // RELLENO TODO EL TABLERO DE FICHAS VACIAS
                let ficha = new Ficha((this.POSTABLEROX + this.RADIOESPACIOS * this.MULTRADIO + this.MULTCONT * i), (this.POSTABLEROY + this.RADIOESPACIOS * this.MULTRADIO + this.MULTCONT * j), this.RADIOESPACIOS, 'ninguno', 'white', null, this.canvas);
                this.tablero[i][j] = ficha;
            }
        }

    }

    cambiarTurno() {
        if (this.turnoDe == 'amarillo') {
            this.turnoDe = 'morado'
        } else if (this.turnoDe == 'morado') {
            this.turnoDe = 'amarillo'
        }
    }

    chequearGanador(posI, posJ) {
        // recorrido horizontal            // recorrido vertical           // recorrido diagonal
        if (this.chequearHorizontal(posJ) || this.chequearVertical(posI) || this.chequearDiagonal()) {
            return true
        } else return false;
    }

    chequearHorizontal(posJ) {
        let count = 0;
        for (let i = 0; i < this.TABLEROCOLS - 1; i++) {
            if (this.tablero[i][posJ].jugador == this.turnoDe && this.tablero[i + 1][posJ].jugador == this.turnoDe) {
                count++;
            }
        }
        if (count == 3) {
            return true;
        } else return false;
    }

    chequearVertical(posI) {
        let count = 0;
        for (let j = 0; j < this.tablero[posI].length - 1; j++) {
            if (this.tablero[posI][j].jugador == this.turnoDe && this.tablero[posI][j + 1].jugador == this.turnoDe) {
                count++;
            }
        }
        if (count == 3) {
            return true;
        } else return false;
    }

    chequearDiagonal() {
        // diagonal ascendente       // diagonaldescendente
        if (this.diagonalAscendente() || this.diagonalDescendente()) {
            return true;
        }
        else return false;
    }

    diagonalAscendente() {
        for (let i = 3; i < this.TABLEROCOLS; i++) {
            for (let j = 0; j < this.TABLEROROWS - 3; j++) {
                if (this.tablero[i][j].jugador == this.turnoDe
                    && this.tablero[i - 1][j + 1].jugador == this.turnoDe
                    && this.tablero[i - 2][j + 2].jugador == this.turnoDe
                    && this.tablero[i - 3][j + 3].jugador == this.turnoDe) {
                    return true;
                }
            }
        }
    }

    diagonalDescendente() {
        for (let i = 3; i < this.TABLEROCOLS; i++) {
            for (let j = 3; j < this.TABLEROROWS; j++) {
                if (this.tablero[i][j].jugador == this.turnoDe
                    && this.tablero[i - 1][j - 1].jugador == this.turnoDe
                    && this.tablero[i - 2][j - 2].jugador == this.turnoDe
                    && this.tablero[i - 3][j - 3].jugador == this.turnoDe) {
                    return true;
                }
            }
        }
    }
}


/**
class TableroPosta {
    constructor(canvas, filas, columnas, casillaSize) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.filas = filas;
        this.columnas = columnas;
        this.casillaSize = casillaSize;
        //this.tablero = [];
        this.tablero = new Array(columnas); // Inicializa el array
            for (let i = 0; i < columnas; i++) {
                this.tablero[i] = new Array(filas); // Inicializa cada columna del tablero
            }

        this.fichasPlantas = [];
        this.fichasZombies = [];

        this.tableroX = (this.canvas.width - (casillaSize * columnas)) / 2;
        this.tableroY = 80;
    }

    dibujarTablero() {
        this.context.fillStyle = "rgb(28, 138, 46)";
        this.context.fillRect(220, 80, 500, 450);
        this.context.fillStyle = "rgb(20, 65, 34)";
        this.context.fillRect(200, 525, 540, 30);

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                const x = this.tableroX + j * this.casillaSize;
                const y = this.tableroY + i * this.casillaSize;
                //const cuadrado = new Cuadrado(x, y, this.casillaSize, "red", this.context);
                cuadrado.draw();

                const centerX = x + this.casillaSize / 2;
                const centerY = y + this.casillaSize / 2;
               // const ficha = new Ficha(centerX, centerY, 30, "black", 0, 2 * Math.PI, this.context);
                ficha.draw();
            }
        }
    }

    isInTablero(ficha) {
        if (ficha.getPosX() >= this.tableroX && ficha.getPosX() <= this.tableroX + (this.columnas * this.casillaSize)) {
            for (let i = 1; i <= this.columnas; i++) {
                if (getCirculo.getPosX() < this.tableroX + (i * this.casillaSize)) {
                    ficha.setPosX(this.tableroX + i * (this.casillaSize) - (this.casillaSize / 2));
                    ficha.setPosY(535);
                    ficha.ubicada = true;
                    drawCircle();
                    break;
                }
            }
        }
    }

    nuevaPartida() {
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                let ficha = new Ficha((this.tableroX + this.casillaSize / 2 + i * this.casillaSize), (this.tableroY + this.casillaSize / 2 + j * this.casillaSize), 30, 'ninguno', 'white', null, this.canvas);
                this.tablero[i][j] = ficha;
            }
        }
    }

    dibujarFichas() {
        for (let i = 0; i < this.fichasPlantas.length; i++) {
            this.fichasPlantas[i].draw();
        }
        for (let i = 0; i < this.fichasZombies.length; i++) {
            this.fichasZombies[i].draw();
        }
    }
}
*/

/*
class TableroPosta {

    constructor(canvas, filas, columnas, casillaSize) {
        this.TABLEROCOLS = 7
        this.TABLEROROWS = 6;
        this.POSTABLEROX = 215;
        this.RADIOESPACIOS = 30; 
        this.MULTRADIO = 1.5; 
        this.MULTCONT = 70;
        this.POSTABLEROY = 85;

        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.filas = filas;
        this.columnas = columnas;
        this.casillaSize = casillaSize;
        this.tablero = [];

        this.fichasRojas = []; // 21
        this.fichasAzules = []; // 21


        this.tableroX = (this.canvas.width - (casillaSize * columnas)) / 2;
        this.tableroY = 80;

        for (let i = 0; i < filas; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < columnas; j++) {
                this.tablero[i][j] = 0;
            }
        }
    }

    dibujarTablero(fondoImage) {
        
        this.context.drawImage(fondoImage,0,0,this.canvas.width,this.canvas.height);

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                const x = this.tableroX + j * this.casillaSize;
                const y = this.tableroY + i * this.casillaSize;
                const cuadrado = new Cuadrado(x, y, this.casillaSize,"red",this.context);
                cuadrado.draw();

                // Dibuja el círculo en el centro del cuadrado
                const centerX = x + this.casillaSize / 2;
                const centerY = y + this.casillaSize / 2;
                const ficha = new Ficha(centerX, centerY, 30, "black", 0, 2 * Math.PI,this.context);
                ficha.draw();
            }
        }
    }

    isInTablero=(ficha)=>{

        if(ficha.getPosX()>=this.tableroX && ficha.getPosX()<= this.tableroX+(this.columnas*this.casillaSize)){
            for(let i=1;i<=this.columnas;i++){
                if(getCirculo.getPosX()<this.tableroX+(i*this.casillaSize)){
                    ficha.setPosX(this.tableroX+ i*(this.casillaSize)-(this.casillaSize/2));
                    ficha.setPosY(535);
                    ficha.ubicada=true;
                    drawCircle();
                    break;
                }
            }
        }
    }

    nuevaPartida() {
        for (let i = 0; i < this.TABLEROCOLS; i++) { // 7 
            for (let j = 0; j < this.TABLEROROWS; j++) {  // 6 
                // RELLENO TODO EL TABLERO DE FICHAS VACIAS
                let ficha = new Ficha((this.POSTABLEROX + this.RADIOESPACIOS * this.MULTRADIO + this.MULTCONT * i), (this.POSTABLEROY + this.RADIOESPACIOS * this.MULTRADIO + this.MULTCONT * j), this.RADIOESPACIOS, 'ninguno', 'white', null, this.canvas);
                this.tablero[i][j] = ficha;
            }
        }

    }

}
*/
