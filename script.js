let deck = [];
let cardstacks = { "0": [], "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "11": [], "12": [], }

function startPage() {
    prepareGame();
}

/**
 * This function returns a rendom number betwen 0 (included) and  "limit"(excluded) that is given to the function 
 * 
 * @param {int} limit - betwen this number and 0 is the random output
 * @returns {int} - gives the random number
 */
function rndNum(limit) {
    let rnd = Math.random();
    let number = Math.floor(rnd * limit);
    return number;
}

/**
 * This function fills the deck array with the numbers from 1 to 52.
 */
function fillDeck() {
    for (let i = 1; i <= 52; i++) {
        deck.push(i);
    }
}

/**
 * This function shuffles the deck randomly
 */
function shuffleDeck() {
    let shuffeld = [];
    while (deck.length != 0) {
        const rnd = rndNum(deck.length);
        shuffeld.push(deck[rnd]);
        deck.splice(rnd, 1);
    }
    deck = shuffeld;
}

/**
 * this function prepares the game for a new round.
 * create a deck of cards shuffles them and deals them out.
 */
function prepareGame() {
    fillDeck();
    shuffleDeck();
    dealOutCards();
    openFirstCard();
    renderLowerField();
}

/**
 * this function distributes the shuffled cards to the individual playing fields
 */
function dealOutCards() {
    for (let i = 0; i < 7; i++) {
        for (let j = i; j < 7; j++) {
            let card = createCard(deck[deck.length - 1]);
            cardstacks[j].push(card);
            deck.splice(deck.length - 1, 1);
        }
    }
    while (deck.length > 0) {
        let card = createCard(deck[deck.length - 1]);
        cardstacks[7].push(card);
        deck.splice(deck.length - 1, 1);
    }
}

/**
 * this function creates an object of a playing card.
 * @param {int} index this number represent a playing card from 1 to 52
 * @returns {object} this is the card object with folloring keys:
 * "number" the number of the card.
 * "facedown" decides whether the card faces down or  faces up default is face down
 * "colorRed" tells if the color of this card is red 
 */
function createCard(index) {
    let color = (index > 26) ? true : false;
    let card = {
        "number": index,
        "facedown": true,
        "colorRed": color
    }
    return card;
}

function openFirstCard() {
    for (let i = 0; i < 7; i++) {
        cardstacks[i][cardstacks[i].length-1].facedown=false;        
    }
}




// search function

function getDeepestDiv(id) {
    return findDeepestDiv(document.getElementById(id));
}

function findDeepestDiv(parentcontainer) {
    let childcontainer = searchForDiv(parentcontainer);
    if (!childcontainer) {
        return parentcontainer;
    } else {
        return findDeepestDiv(childcontainer);
    }
}

function searchForDiv(target) {
    return target.querySelector("div");
}

// test functions


function renderLowerField() {
    for (let i = 0; i < 7; i++) {
        renderStack(i);
    }
}

function renderStack(number) {
    clearField(number);
    // let frame = document.getElementById(`field_${number}`);
    for (let i = 0; i < cardstacks[number].length; i++) {
        const card = cardstacks[number][i];
        let frame = getDeepestDiv(`field_${number}`);
        if (i == 0) {
            frame.innerHTML += printFirstCard(card);
        } else {
            frame.innerHTML += printCard(card);
        }

    }

}


function printCard(card) {
    let face = (card.facedown) ? 'face_0' : `face_${card.number}`;
    return /*html*/`
        <div class="card stack ${face}"></div>
    `;
}

function printFirstCard(card) {
    let face = (card.facedown) ? 'face_0' : `face_${card.number}`;
    return /*html*/`
        <div class="card stack ${face}" style="margin-top: 0px;"></div>
    `;
}

function clearAllFields() {
    for (let i = 0; i < 13; i++) {
        clearField(i);
    }
}

function clearField(index) {
    document.getElementById(`field_${index}`).innerHTML = '';
}