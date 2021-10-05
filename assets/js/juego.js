/**
 *  2C = Dos de Tréboles
 *  2D = Dos de Diamantes
 *  2H = Dos de Corazones
 *  2S = Dos de Picas
 */


// Función anónima autoinvocada ( Patrón módulo);
const miModulo = (() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    // Esta función inicia el juego por defecto es 2 jugador      
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for ( let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
 
    };

    // Esta función crea una nueva baraja
    const crearDeck = () => {

        deck = [];
        for ( let i = 2; i <= 10; i++ ) {
            for ( let tipo of tipos ) {
                deck.push( i + tipo );
            }
        }

        for ( let tipo of tipos ) {
            for ( let esp of especiales ) {
                deck.push( esp + tipo );
            }
        }
        return _.shuffle( deck );

    };


    // Esta función me permite pedir una carta
    const pedirCarta = () => {
        if ( deck.length === 0 ) {
            throw 'No hay cartas en la baraja'; 
        }
        return deck.pop();
    };

    // Esta función sirve para saber el valor de la carta
    const valorCarta = ( carta ) => {
        const valor = carta.substring( 0, carta.length - 1 );
        return ( isNaN( valor ) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    };

    // Función que sirve para acumular puntos tanto de jugador como PC
    // Turno: 0 = primer jugador y el último será el PC
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const  crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () =>{

        const [ puntosMinimos, puntosPC ] = puntosJugadores;
        // Para que aparezca el mensaje después de la carta del ordenador
        setTimeout(() => {
            if( puntosPC === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Ordenador gana')
            } else if( puntosPC > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('PC Gana')
            }
        }, 100 );
    };
    // Turno del ordenador
    const turnoPC = ( puntosMinimos ) => {

        let puntosPC = 0;

        do {
            const carta = pedirCarta();
            puntosPC = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1 );

        } while(  ( puntosPC < puntosMinimos)  && (puntosMinimos <= 21 ) );

        determinarGanador();
    }

    // Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0 );

        crearCarta( carta, 0 );


        if (puntosJugador > 21) {
            // console.warn( 'Lo siento perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoPC(puntosJugador);


        } else if (puntosJugador === 21) {
            // console.warn( '21 Genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoPC(puntosJugador);
        }

    });



    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoPC( puntosJugadores[0] );

    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });

    // Lo único que será público
    return {
        nuevoJuego: inicializarJuego
    };
})();

