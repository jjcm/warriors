class Deck {
    cards = [];
    discard = [];

    constructor(deck) {
        if(deck != null)
            this.cards = cards;
        else {
            this.cards = this.generateBlankDeck();
            this.shuffleDeck();
        }
    }
    generateBlankDeck() {
        let blankDeck = [];
        let ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let suits = ["C", "D", "H", "S"];
        for(let rank of ranks){
            for(let suit of suits){
                blankDeck.push(Card.prototype.create(rank, suit));
            }
        }
        return blankDeck;
    }
    shuffleDeck() {
        // perform a Fisher-Yates shuffle
        for(let i = this.cards.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    drawCard() {
        if(this.cards.length == 0){
            this.cards = this.discard;
            this.discard = [];
            this.shuffleDeck();
        }   
        let card = this.cards.shift();
        this.discard.push(card);
        return card
    }
}