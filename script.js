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
    while (deck.length>0) {
        console.log(deck.length);
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


// test functions

function render() {
    clearAllFields();
    for (let i = 0; i < deck.length; i++) {
        let id = `field_${i % 7}`;
        let card = deck[i];
        renderField(id, card);
    }
}

function renderField(id, card) {
    let frame = document.getElementById(id);
    frame.innerHTML += /*html*/`
        <div class="card face_${card}"></div>
    `;
}

function clearAllFields() {
    for (let i = 0; i < 7; i++) {
        document.getElementById(`field_${i}`).innerHTML = '';

    }
}