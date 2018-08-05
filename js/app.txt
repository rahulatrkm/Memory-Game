/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


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
let temp, temp1, temp2 = 0;

let clickHandler = function (event) {
    let first = event.target;
    if (temp2) {
        console.log(temp2);
        console.log(first);
    }
    
    if (t === 0) {
        temp2 = first;
        temp = first.firstChild.nextSibling.className;
        displayOne(first);
    } else {
        temp1 = first.firstChild.nextSibling.className;
        if (temp === temp1) {
            displayTwo(first, temp2);
        }
        else {
            hideOne(temp2);
        }
    }
}

const card = document.querySelector(".deck");
card.addEventListener('click', clickHandler, false);

function displayOne(first) {
    first.classList.add("open");
    first.classList.add("show");
    first.removeEventListener('click', clickHandler);
    t = 1;
}

function hideOne(first) {
    first.classList.remove("open");
    first.classList.remove("show");
    first.addEventListener('click', clickHandler);
    t = 0
}

function displayTwo(first, second) {
    first.classList.remove("open");
    first.classList.remove("show");
    first.removeEventListener('click', clickHandler);
    first.classList.add("match");
    second.classList.add("match");
    t = 0;
}