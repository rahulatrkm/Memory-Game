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

let shuffled = shuffle(cardList);
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
let t = 0
let temp, temp1, temp2;
let matched = 0;

// click handler for what happens after clicking the card
let clickHandler = function (event) {
    let card = event.target;
    const oneCardOpen = card.classList.contains('open');
    if ((!oneCardOpen) && card.classList.contains('card')) {
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


const deck = document.querySelector(".deck");
const container = document.querySelector(".container");
deck.addEventListener('click', clickHandler, false);

// function for displaying 
function displayOne(first) {
    $(first).addClass("open show");
    t = 1;
}

// function for hiding the first card if there is no match
var hideOne = function(temp2) {
    $(temp2).removeClass("open show");
    t = 0
}


// function for displaying the matched cards
function displayTwo(first) {
    $(temp2).removeClass("open show");
    first.classList.add("match");
    temp2.classList.add("match");
    matched += 2;
    t = 0;
    if (matched === 16) {
        var element = document.getElementsByClassName("deck");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}