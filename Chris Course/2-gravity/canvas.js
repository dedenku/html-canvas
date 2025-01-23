const canvas = document.getElementById('my-canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');


let balls = []
var colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];
const gravity = 1;
const friction = 0.88;

let mouse = {
    x: undefined,
    y: undefined
}
let touch = {
    x: undefined,
    y: undefined
}

// Event listener
window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

// window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

window.addEventListener('click', () => {
    init();
})

function Ball(x, y, dx, dy, rad, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = color;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    this.update = function () {
        if (this.x + this.rad + this.dx > innerWidth || this.x - this.rad < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.rad + this.dy > innerHeight || this.y - this.rad < 0) {
            this.dy = -this.dy;
            this.dy = this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (Math.abs(this.dy) < 0.001 && this.y + this.rad >= innerHeight) {
            this.dy = 0;
            this.dx = 0;
            this.y = innerHeight - this.rad; // Pastikan bola tepat di dasar
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

const ballCount = Math.floor((innerWidth + innerHeight) / 4)

function init() {
    balls = []
    // let ball = new Ball(x, y, dx, dy, 50);
    for (let i = 0; i < ballCount; i++) {
        let radius = randomIntFromRange(10, 25);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius * 10);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-1, 3);
        let color = randomColor(colors);
        balls.push(new Ball(x, y, dx, dy, radius, color))
        balls[i].draw();
        // balls[i].update();
    }
    // ball.draw();
    // ball.update();

}


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < balls.length; i++) {
        // circle.draw();
        balls[i].update();

    }
}

init();
animate();
