function gameOver() {
    if (matchedCards.length === icons.length) {
        clearInterval(Timer);
        switchTimer = true; 
        numberTime.innerHTML = second;
        alert(`Well done! You took ${moves} moves and ${second} seconds.
    Your star rating is ${starNumber}. Do you want to play again? `);
    }
}


function setTimer() {
    second++;
    numberTime.innerHTML = second;
}


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
 * Icons List created to hold all the icons of the cards.
 * This is how we identify each card.
 */
let icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
    "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt",
    "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"
];

let deck = document.querySelector(".deck");

//Moves
var numberMoves = document.querySelector(".moves");
var moves = 0;
numberMoves.innerHTML = 0;
//Stars: Initialisation with 3 stars.
var starNumber = 3;
var numberStars = document.querySelector(".stars");
numberStars.innerHTML =
    `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;
//Timer
var second = 0;
var numberTime = document.querySelector(".timer");
numberTime.innerHTML = second;
let switchTimer = true; // Toggle switch true to enable timer in the loop
//Cards
var openedCards = [];
var matchedCards = [];

shuffle(icons);
/*
 * Looping through our Icons array, we create 16 cards by adding the
 * 'card' class to each card.
 */
function createCards() {
    for (i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        deck.appendChild(card);
        //Add click event to each card to add interactivity feature
        click(card);
    };

    /*
     * When a card is clicked, toggle timer on.
     * Then, Toggle switch to false to prevent timer
     * running at irregular intervals as a result of every click
     */
    function click(card) {
        card.addEventListener("click", function() {
            if (switchTimer) {
                Timer = setInterval(setTimer, 1000);;
                switchTimer = false;
            }
            //Compare cards, and toggle each card's class depending on status
            card.classList.add("open", "show", "disabled");
            openedCards.push(this);
            if (openedCards.length === 2) {
                moves++;
                numberMoves.innerHTML = moves;
                //Cards matched
                if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
                    openedCards[0].classList.add("match", "disabled");
                    openedCards[1].classList.add("match", "disabled");
                    matchedCards.push(openedCards[0], openedCards[1]);
                    openedCards = [];
                    //Cards unmatched
                } else {
                    openedCards[0].classList.remove("open", "show", "disabled");
                    openedCards[1].classList.remove("open", "show", "disabled");
                    openedCards = [];
                }
            }

            //Star ratings determined
            if (moves < 15) {
                starNumber = 3;
                numberStars.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
            } else if (moves < 25) {
                starNumber = 2;
                numberStars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`

            } else {
                starNumber = 1;
                numberStars.innerHTML = `<li><i class="fa fa-star"></i></li>`

            }
            gameOver();


        });
    }
};

createCards();

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
    //Stop timer and reset time to 0
    clearInterval(Timer);
    switchTimer = true;
    second = 0;
    numberTime.innerHTML = second;

    //Reset number of moves to 0
    moves = 0;
    numberMoves.innerHTML = moves;

    //Reset number of stars to 3
    numberStars.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;

    //Reset cards and create cards again
    deck.innerHTML = "";
    matchedCards = [];
    openedCards = [];
    createCards();
});
