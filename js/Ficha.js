class Ficha {
    
    constructor(x, y, radius, jugador, color, imagen, canvas) {
        this.x = x; // posicion de la ficha
        this.y = y; // posicion de la ficha
        this.radius = radius;
        this.jugador = jugador; // rojo o azul
        this.color = color; // es perfectamente eliminable 
        this.imagen = imagen; // mi fichin.png
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.pilePosX=x; // posicion en la pila en x
        this.pilePosY=y; // posicion en la pila en y
        // variable para mover o borrar
        
    }


    // me dibujo
    dibujarFicha() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.fill();
        this.context.closePath();
        if (this.imagen!=null) {
            this.context.drawImage(this.imagen, this.x - this.radius, this.y - this.radius, 2*this.radius, 2*this.radius);
        }
    }

    // chequeo si me clickearon
    isClicked(clickx, clicky) {
        return Math.sqrt((clickx - this.x) ** 2 + (clicky - this.y) ** 2) < this.radius;
    }

    // posiciono en una nueva posicion
    posicionarFicha(posx, posy) {
        this.x = posx;
        this.y = posy;
    }


    volverALaPila(){
        this.x=this.pilePosX;
        this.y=this.pilePosY;
    }

}


/*
class Ficha {
    constructor(posX, posY, rad, fill, start, end,ctx) {
        this.posX = posX;
        this.posY = posY;
        this.rad = rad;
        this.fill = fill;
        this.start = start;
        this.end = end;
        this.ctx = ctx;
        this.ubicada = false;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rad, this.start, this.end);
        this.ctx.fillStyle=this.fill;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;

        return Math.sqrt(_x * _x + _y * _y) < this.rad;
    }

     // posiciono en una nueva posicion
     posicionarFicha(posx, posy) {
        this.posX = posx;
        this.posY = posy;
    }

    setPosX(posX) {
        this.posX = posX;
        this.draw();
    }

    setPosY(posY) {
        this.posY = posY;
        this.draw();
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.getPosY;
    }
    
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const drawCircle = () => {
    clearCanvas();
    tablero.dibujarTablero();
    circulos.forEach(element => {
        element.draw();
    });
};
*/