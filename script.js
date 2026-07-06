// ------------------------------
// Abrir invitación
// ------------------------------

const bienvenida = document.getElementById("bienvenida");
const contenido = document.getElementById("contenido");
const botonAbrir = document.getElementById("abrir");

botonAbrir.addEventListener("click", () => {

    bienvenida.style.opacity = "0";

    setTimeout(() => {

        bienvenida.style.display = "none";
        contenido.style.display = "block";

        lanzarConfeti();

    }, 900);

});

// ------------------------------
// Música
// ------------------------------

const audio = document.getElementById("audio");
const botonMusica = document.getElementById("musica");

let reproduciendo = false;

botonMusica.addEventListener("click", () => {

    if(reproduciendo){

        audio.pause();
        botonMusica.innerHTML = "🎵 Música";

    }else{

        audio.play();
        botonMusica.innerHTML = "⏸ Pausar";

    }

    reproduciendo = !reproduciendo;

});

// ------------------------------
// Cuenta regresiva
// ------------------------------

const fechaEvento = new Date("July 15, 2026 16:00:00").getTime();

setInterval(() => {

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;

    if(diferencia <= 0){

        document.getElementById("dias").innerHTML = "00";
        document.getElementById("horas").innerHTML = "00";
        document.getElementById("minutos").innerHTML = "00";
        document.getElementById("segundos").innerHTML = "00";

        return;
    }

    const dias = Math.floor(diferencia / (1000*60*60*24));

    const horas = Math.floor((diferencia % (1000*60*60*24)) / (1000*60*60));

    const minutos = Math.floor((diferencia % (1000*60*60)) / (1000*60));

    const segundos = Math.floor((diferencia % (1000*60)) / 1000);

    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;

},1000);

// ------------------------------
// Confeti sencillo
// ------------------------------

function lanzarConfeti(){

    for(let i=0;i<150;i++){

        const confeti = document.createElement("div");

        confeti.style.position = "fixed";
        confeti.style.width = "8px";
        confeti.style.height = "8px";

        confeti.style.background =
        `hsl(${Math.random()*360},100%,50%)`;

        confeti.style.left =
        Math.random()*100 + "vw";

        confeti.style.top = "-20px";

        confeti.style.borderRadius = "50%";

        confeti.style.zIndex = "9999";

        document.body.appendChild(confeti);

        let y = -20;
        let x = Math.random()*10-5;

        const intervalo = setInterval(()=>{

            y += 6;

            confeti.style.top = y+"px";

            confeti.style.left =
            (parseFloat(confeti.style.left)+x)+"px";

            if(y>window.innerHeight){

                clearInterval(intervalo);

                confeti.remove();

            }

        },20);

    }

}

// ------------------------------
// Animación al hacer scroll
// ------------------------------

const secciones = document.querySelectorAll("section");

const observador = new IntersectionObserver((entradas)=>{

    entradas.forEach((entrada)=>{

        if(entrada.isIntersecting){

            entrada.target.style.opacity="1";
            entrada.target.style.transform="translateY(0)";

        }

    });

});

secciones.forEach((sec)=>{

    sec.style.opacity="0";
    sec.style.transform="translateY(50px)";
    sec.style.transition="1s";

    observador.observe(sec);

});

const canvas = document.getElementById("particulas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particulas = [];

for(let i=0;i<80;i++){

    particulas.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*3+1,
        dx:(Math.random()-0.5)*0.5,
        dy:(Math.random()-0.5)*0.5
    });

}

function animar(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particulas.forEach(p=>{

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(255,215,0,0.8)";
        ctx.fill();

        p.x+=p.dx;
        p.y+=p.dy;

        if(p.x<0)p.x=canvas.width;
        if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height;
        if(p.y>canvas.height)p.y=0;

    });

    requestAnimationFrame(animar);

}

animar();

window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

});