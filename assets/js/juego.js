/**
 *  2C = Dos de Tréboles
 *  2D = Dos de Diamantes
 *  2H = Dos de Corazones
 *  2S = Dos de Picas
 */


// Función anónima autoinvocada ( Patrón módulo);
(() => {
    'use strict'

    let deck  = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosOrdernador = 0;

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasOrdenador = document.querySelector('#ordenador-cartas');

    const puntosHTML = document.querySelectorAll('small');

    // Esta función crea una nueva baraja
    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }


        // console.log( deck);
        deck = _.shuffle(deck);
        // console.log( deck);

        return deck;

    };

    crearDeck();

    // Esta función me permite pedir una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }
        const carta = deck.pop();
        //console.log( carta );
        return carta;
    };

    // pedirCarta();

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

        //let puntos  = 0;
        //if ( isNaN( valor)) {
        //    // No es un número
        //    puntos = ( valor  === 'A') ? 11 : 10;
        //}else{
        //    // Es numero
        //    // Convertimos el valor Sting a number mediante el * 1
        //    puntos = valor * 1;
        //}
        //console.log( puntos );
    };

    // Turno del ordenador
    const turnoOrdenador = (puntosMinimos) => {

        do {

            const carta = pedirCarta();

            puntosOrdernador = puntosOrdernador + valorCarta(carta);
            puntosHTML[1].innerText = puntosOrdernador;

            // Crear carta
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasOrdenador.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosOrdernador < puntosMinimos) && (puntosMinimos <= 21));


        // Para que aparezca el mensaje después de la carta del ordenador
        setTimeout(() => {
            if (puntosOrdernador === puntosMinimos) {
                alert('Empate');
            } else if (puntosMinimos > 21) {
                alert('Has perdido');
            } else if (puntosOrdernador > 21) {
                alert('Has ganado');
            } else {
                alert('El ordenador ganó');
            }
        }, 25);

    }

    // Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;

        // Crear carta
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            // console.warn( 'Lo siento perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);


        } else if (puntosJugador === 21) {
            // console.warn( '21 Genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);
        }

    });



    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoOrdenador(puntosJugador);

    });

    btnNuevo.addEventListener('click', () => {

        console.clear();

        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosOrdernador = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasOrdenador.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    });
})();

