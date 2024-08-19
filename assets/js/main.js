/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const getDeck = () => {
    let deck = [];

    const suits = [
        "club",
        "diamond",
        "heart",
        "spade",
    ];
    
    const ranks = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
    ];

    suits.forEach(
        suit => ranks.forEach(
            rank => {
                deck.push( { suit, rank } );
            }
        )
    )

    shuffleArray( deck );    

    return deck;
}

let currentCard;

const cardEl = ( suit, rank ) => $( `<div class="card back"><div class="${suit} suit top"></div><div class="rank top">${rank}</div><div class="${suit} suit bottom"></div><div class="rank bottom">${rank}</div></div>` );

$( function() {

    const flipCurrentCard = () => $(currentCard).toggleClass( "back" );

    const newGame = () => {
        $(".card").remove();

        const deck = getDeck();

        deck.forEach(
            ({ suit, rank }) => {
                $( "body" ).append( cardEl( suit, rank ) )
            }
        )
    
        $( ".card" ).draggable({
            stack: ".card",
            start: card => {
                currentCard = card.target;
            }
        });

    }

    $( document ).keypress( e => {

        if (e.key === 'f') {
            flipCurrentCard();
        }

        if (e.key === 'n') {
            newGame();
        }
        
    } );

    $( "#flip" ).click( flipCurrentCard );

    $( "#newGame" ).click( newGame );

    newGame();
} );