//Variables globales
var velocity = 70;
var size = 10;



class object {
    constructor() {
        this.size = size;
    }
    golpe(obj) {
        var difx = Math.abs(this.x - obj.x);
        var dify = Math.abs(this.y - obj.y);
        if (difx >= 0 && difx < size && dify >= 0 && dify < size) {
            return true;
        } else {
            return false;
        }
    }
}

class snake extends object {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.next = null;
    }
    dibujar(ctx) {
        if (this.next != null) {
            this.next.dibujar(ctx);
        }
        ctx.fillStyle = "#ffff";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    setxy(x, y) {
        if (this.next != null) {
            this.next.setxy(this.x, this.y);
        }
        this.x = x;
        this.y = y;
    }
    meter() {
        if (this.next == null) {
            this.next = new snake(this.x, this.y);
        } else {
            this.next.meter();
        }
    }
    verSiguiente() {
        return this.next;
    }
}

class Comida extends object {
    constructor() {
        super();
        this.x = this.generate();
        this.y = this.generate();
    }
    generate() {
        var num = (Math.floor(Math.random() * 59)) * 10;
        return num;
    }
    colocar() {
        this.x = this.generate();
        this.y = this.generate();
    }
    dibujar(ctx) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

var head = new snake(20, 20);
var comida = new Comida();
var ex = true;
var ey = true;
var xdir = 0;
var ydir = 0;

function move() {
    var nx = head.x + xdir;
    var ny = head.y + ydir;
    head.setxy(nx, ny);
}
function control(event) {
    var cod = event.keyCode;
    if (ex) {
        if (cod == 38) {
            ydir = -size;
            xdir = 0;
            ex = false;
            ey = true;
            document.getElementById("arriba").style.color = "white";
            document.getElementById("abajo").style.color = "rgb(46, 46, 46)";
            document.getElementById("izquierda").style.color = "rgb(46, 46, 46)";
            document.getElementById("derecha").style.color = "rgb(46, 46, 46)";
            document.getElementById("arriba").style.border = " 2px solid #fff";
            document.getElementById("derecha").style.border = "2px solid rgb(46, 46, 46)";
            document.getElementById("abajo").style.border = "2px solid rgb(46, 46, 46)";
            document.getElementById("izquierda").style.border = "2px solid rgb(46, 46, 46)";

        }
        if (cod == 40) {
            ydir = size;
            xdir = 0;
            ex = false;
            ey = true;
            document.getElementById("abajo").style.color = "white";
            document.getElementById("izquierda").style.color = "rgb(46, 46, 46)";
            document.getElementById("arriba").style.color = "rgb(46, 46, 46)";
            document.getElementById("derecha").style.color = "rgb(46, 46, 46)";
            document.getElementById("abajo").style.border = "2px solid #fff";
            document.getElementById("derecha").style.border = "2px solid rgb(46, 46, 46)";
            document.getElementById("arriba").style.border = "2px solid rgb(46, 46, 46)";
            document.getElementById("izquierda").style.border = "2px solid rgb(46, 46, 46)";
        }
    }
    if (ey) {
        if (cod == 37) {
            ydir = 0;
            xdir = -size;
            ey = false;
            ex = true;
            document.getElementById("izquierda").style.color = "white";
            document.getElementById("abajo").style.color = "rgb(46, 46, 46)";
            document.getElementById("arriba").style.color = "rgb(46, 46, 46)";
            document.getElementById("derecha").style.color = "rgb(46, 46, 46)";
            document.getElementById("izquierda").style.border = "2px solid #fff";
            document.getElementById("derecha").style.border = "2px solid rgb(46, 46, 46)";
            document.getElementById("abajo").style.border = "2px solid rgb(46, 46, 46)";
            document.getElementById("arriba").style.border = "2px solid rgb(46, 46, 46)";
        }
        if (cod == 39) {
            ydir = 0;
            xdir = size;
            ey = false;
            ex = true;
            document.getElementById("derecha").style.color = "white";
            document.getElementById("abajo").style.color = "rgb(46, 46, 46)";
            document.getElementById("arriba").style.color = "rgb(46, 46, 46)";
            document.getElementById("izquierda").style.color = "rgb(46, 46, 46)";
            document.getElementById("derecha").style.border = "2px solid #fff";
            document.getElementById("arriba").style.border = "2px solid rgb(46, 46, 46)";
            document.getElementById("abajo").style.border = "2px solid rgb(46, 46, 46)";
            document.getElementById("izquierda").style.border = "2px solid rgb(46, 46, 46)";
        }
    }
}

function GameOver() {
    xdir = 0;
    ydir = 0;
    ex = true;
    ey = true;
    head = new snake(20, 20);
    comida = new Comida();
    var capa = document.getElementById("capa");
    var h1 = document.createElement("h1");
    h1.innerHTML = "GAME OVER";
    capa.appendChild(h1);
    if (h1.innerHTML == "GAME OVER")
    {
        setTimeout(() => { location.reload() }, 800);
        
    }
    //alert("GAME OVER");
}

function choquepared() {
    if (head.x < 0 || head.x > 590 || head.y < 0 || head.y > 590) {
        GameOver();
    }
}
function choquecuerpo() {
    var temp = null;
    try {
        temp = head.verSiguiente().verSiguiente();
    } catch (err) {
        temp = null;
    }
    while (temp != null) {
        if (head.golpe(temp)) {

            GameOver();
        } else {
            temp = temp.verSiguiente();
        }
    }
}

function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    head.dibujar(ctx);
    comida.dibujar(ctx);
}
function main() {
    choquecuerpo();
    choquepared();
    draw();
    move();
    if (head.golpe(comida)) {
        comida.colocar();
        head.meter();
    }
}
setInterval("main()", velocity);