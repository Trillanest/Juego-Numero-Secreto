let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 40;
let intentosMaximos = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    }
}

function verificarIntento() {
    let valorInput = document.getElementById('valorUsuario').value;
    let numeroDeUsuario = parseInt(valorInput);
    
    if (isNaN(numeroDeUsuario)) {
        return;
    }
    
    intentos++;
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Felicidades! Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (intentos >= intentosMaximos) {
        asignarTextoElemento('p', `Agotaste tus ${intentosMaximos} intentos. El número secreto era ${numeroSecreto}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));
    
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}. Tienes ${intentosMaximos} intentos.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    limpiarCaja();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

function reiniciarJuego() {
    listaNumerosSorteados = [];
    condicionesIniciales();
}

document.getElementById('valorUsuario').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarIntento();
    }
});

condicionesIniciales();
