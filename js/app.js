/*
 * Create a list that holds all of your cards
 */
let cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube', 'fa-leaf', 'fa-bomb'];
//console.log(shuffle(cardList));

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method above
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle the cards
let shuffled = shuffle(cardList);
// don't shuffle the cards to see working of winning
// let shuffled = cardList;
shuffled.forEach(icon => {
    $('ul.deck').append(`<li class="card">
                <i class="fa ${icon}"></i>
            </li>`);
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let t = 0;
let temp, temp1, temp2;
let matched = 0;
let move = 1;

// click handler for what happens after clicking the card
let clickHandler = function (event) {
    document.querySelector('.moves').textContent = move;
    let card = event.target;
    const oneCardOpen = card.classList.contains('open');
    const matchedCard = card.classList.contains('match');
    if ((!oneCardOpen) && card.classList.contains('card') && (!matchedCard)) {
        if (t === 0) {
            temp2 = card;
            temp = card.firstChild.nextSibling.className;
            displayOne(card);
        } else {
            temp1 = card.firstChild.nextSibling.className;
            if (temp === temp1) {
                displayTwo(card);
            }
            else {
                hideOne(temp2);
                card.addEventListener('click', clickHandler, false);
            }
        }
    }
}

// function for displaying 
function displayOne(first) {
    $(first).addClass("open show");
    move += 1;
    t = 1;
}

// function for hiding the first card if there is no match
var hideOne = function(temp2) {
    $(temp2).removeClass("open show");
    // getting all the stars
    let star = $('.fa-star');
    // removing the star if incorrect guess
    $(star[star.length - 1]).toggleClass('fa-star fa-star-o');
    move += 1;
    t = 0
}

// function for restarting the game
var restarting = function () {
    move = 0;
    matched = 0;
    t = 0;
    temp = null;
    temp1 = null;
    temp2 = null;
    $('.match').removeClass('match');
    $('.open').removeClass('open show');
    $('.fa-star-o').toggleClass('fa-star-o fa-star');
    // shuffling yet to be implemented
    shuffled = shuffle(cardList);
}

// function for displaying the matched cards
function displayTwo(first) {
    $(temp2).removeClass("open show");
    first.classList.add("match");
    temp2.classList.add("match");
    matched += 2;
    move += 1;
    t = 0;
    if (matched === 16) {
        // console.log('won');
        $(".container").empty();
        let stars = $('.fa-star').length;
        $('.won').append(`
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10"
                points="100.2,40.2 51.5,88.8 29.8,67.5 " />
        </svg>
        <p><b>Congratulations! You Won!</b></p><p>With ${move} Moves and ${stars} Stars</p><p>Woooooo!<p>
        <button class = 'btn btn-info playAgain'>Play again!</button>`);
        $('.playAgain').on("click", playAgain);
    }
}

const deck = document.querySelector(".deck");
const container = document.querySelector(".container");
deck.addEventListener('click', clickHandler, false);
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restarting);

var playAgain = function () {
    $(".won").empty();
    $(".container").append(`
        <header>
            <h1>Matching Game</h1>
        </header>

        <section class="score-panel">
            <ul class="stars">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
            </ul>

            <span class="moves"></span> Moves

            <div class="restart">
                <i class="fa fa-repeat"></i>
            </div>
        </section>

        <ul class="deck">
        </ul>
        `);
    shuffled = shuffle(cardList);
    shuffled.forEach(icon => {
        $('ul.deck').append(`<li class="card">
                    <i class="fa ${icon}"></i>
                </li>`);
    });
    document.querySelector(".deck").addEventListener('click', clickHandler, false);
    document.querySelector('.restart').addEventListener('click', restarting);
    document.querySelector('.restart').click();
}