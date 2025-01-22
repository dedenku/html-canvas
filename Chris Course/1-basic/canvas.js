const canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const particleInput = document.querySelector('#quantity');

let particleCount = Math.floor((innerWidth + innerHeight) / 3);

particleInput.value = particleCount;
particleInput.max = particleCount * 2;

const R = Math.floor(Math.random() * 256);
const G = Math.floor(Math.random() * 256);
const B = Math.floor(Math.random() * 256);
const A = Math.random();
let px = Math.floor(Math.random() * (window.innerWidth - 100));
let py = Math.floor(Math.random() * (window.innerHeight - 100));

let mouse = {
    x: undefined,
    y: undefined
}
let touch = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener('touchmove', function (e) {
    touch.x = e.changedTouches[0].screenX;
    touch.y = e.changedTouches[0].screenY;
    // console.log(touch.x, touch.y)
})
window.addEventListener('touchend', function (e) {
    touch.x = undefined;
    touch.y = undefined;
    // console.log(touch.x, touch.y)
})


let circles = [];

// window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderParticle();
    particleInput.value = particleCount;
})

const maxRadius = 40;
// const minRadius = 2;

particleInput.addEventListener('input', () => {
    // Konversi nilai input ke number
    let value = parseInt(particleInput.value);

    // Validasi nilai
    if (value > parseInt(particleInput.max)) {
        value = parseInt(particleInput.max);
        // Update nilai yang ditampilkan di input
        particleInput.value = value;
    }
    // Validasi nilai minimal
    else if (value < 1 || isNaN(value)) {
        value = 1;
        particleInput.value = value;
    }

    // Update jumlah partikel
    particleCount = value;
    renderParticle();

})

function Circle(x, y, dx, dy, rad) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.minRad = rad;

    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);

    this.draw = function () {
        // ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${R},${G},${B})`;
        ctx.fill();
    }

    this.update = function () {
        if (this.x + this.rad > innerWidth || this.x - this.rad < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.rad > innerHeight || this.y - this.rad < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if ((mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) || (touch.x - this.x < 50 && touch.x - this.x > -50
                && touch.y - this.y < 50 && touch.y - this.y > -50)
        ) {
            if (this.rad < maxRadius) {
                this.rad += 1;
            }
        } else if (this.rad > this.minRad) {
            this.rad -= 1;
        }

        this.draw();
    }
}

function renderParticle() {
    circles = [];
    for (let i = 0; i < particleCount; i++) {
        let rad = (Math.floor(Math.random() * 5)) + 1;
        let x = Math.random() * (innerWidth - rad * 2) + rad;
        let dx = (Math.random() - 0.5) * 3;
        let y = Math.random() * (innerHeight - rad * 2) + rad;
        let dy = (Math.random() - 0.5) * 3;
        circles.push(new Circle(x, y, dx, dy, rad));
    }
}

renderParticle();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circles.length; i++) {
        // circle.draw();
        circles[i].update();

    }

}

animate();
// animate();