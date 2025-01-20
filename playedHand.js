class PlayedHand {
    #type;

    constructor(cards){
        this.cards = cards;
        this.activeCards = [];
        this.determineActiveHand();
    }

    get type(){
        return this.#type;
    }

    get activeHand(){
        return {
            type: this.#type,
            activeCards: this.activeCards
        }
    }

    determineActiveHand(){
        this.activeCards = [];
        // check what poker hand the 5 cards are
        // return the type of hand

        // check for flush
        let flush = true
        let flushSuit = this.cards[0].suit
        for(let i = 1; i < this.cards.length; i++){
            if(this.cards[i].suit != flushSuit){
                flush = false;
                break;
            }
        }

        // check for rank matches
        let ranks = {}
        for(let i = 0; i < this.cards.length; i++){
            ranks[this.cards[i].rank] = (ranks[this.cards[i].rank] || 0) + 1;
        }
        let fiveMatch = 0
        let fourMatch = 0
        let threeMatch = 0
        let twoMatch = 0
        let oneMatch = 0
        for(let rank in ranks){
            if(ranks[rank] == 5){
                fiveMatch++;
            }
            if(ranks[rank] == 4){
                fourMatch++;
            }
            if(ranks[rank] == 3){
                threeMatch++;
            }
            if(ranks[rank] == 2){
                twoMatch++
            }
            if(ranks[rank] == 1){
                oneMatch++
            }
        }

        // check for straight
        let straight = false
        let royal = false
        if(oneMatch == 5){
            if(ranks['10'] && ranks['J'] && ranks['Q'] && ranks['K'] && ranks['A']){
                straight = true;
                royal = true;
            }
            let straightRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
            let indexes = []
            for(let rank in ranks){
                indexes.push(straightRanks.indexOf(rank))
            }
            indexes.sort((a, b) => a - b)
            if(indexes[4] - indexes[0] == 4){
                straight = true;
            }
        }

        let type = "high card"
        // check for royal flush
        if(royal && flush && straight){
            type = "royal flush";
        }

        // check for straight flush
        else if(straight && flush){
            type = "straight flush";
        }

        // check for 5 of a kind
        else if(fiveMatch == 1){
            type = "five of a kind";
        }

        // check for flush
        else if(flush){
            type = "flush";
        }   

        // check for straight
        else if(straight){
            type = "straight";
        }

        // check for 4 of a kind
        else if(fourMatch == 1){
            type = "four of a kind";
        }   

        // check for full house
        else if(threeMatch == 1 && twoMatch == 1){
            type = "full house";    
        }

        // check for 3 of a kind
        else if(threeMatch == 1){
            type = "three of a kind";
        }   

        // check for 2 pair
        else if(twoMatch == 2){
            type = "two pair";
        }

        // check for pair
        else if(twoMatch == 1){
            type = "pair";
        }

        this.#type = type;

        console.log("checking for hands")
        //if type matches a flush, straight, royal flush, straight flush, or five of a kind, set active cards to the cards that make up the hand
        if(type.match("flush|straight|royal flush|straight flush|five of a kind")){
            this.activeCards = this.cards;
        }

        //if type matches a four of a kind, set active cards to the cards that make up the hand
        else if(type.match("four of a kind")){
            for(let rank in ranks){
                if(ranks[rank] == 4){
                    this.activeCards.push(...this.cards.filter(card => card.rank == rank));
                }
            }
        }

        else if(type.match("full house")){
            for(let rank in ranks){
                if(ranks[rank] == 3){
                    this.activeCards.push(...this.cards.filter(card => card.rank == rank));
                }
                if(ranks[rank] == 2){
                    this.activeCards.push(...this.cards.filter(card => card.rank == rank));
                }
            }
        }

        //if type matches a three of a kind, set active cards to the cards that make up the hand
        else if(type.match("three of a kind")){
            for(let rank in ranks){
                if(ranks[rank] == 3){
                    this.activeCards.push(...this.cards.filter(card => card.rank == rank));
                }
            }
        }

        //if type matches a two pair or a pair, set active cards to the cards that make up the hand
        else if(type.match("pair")){
            console.log(ranks)
            for(let rank in ranks){
                if(ranks[rank] == 2){
                    console.log('two match!')
                    this.activeCards.push(...this.cards.filter(card => card.rank == rank));
                }
            }
        }

        //if type matches a high card, set active cards to the highest ranked card
        else if(type.match("high card")){
            for(let rank in ranks){
                if(ranks[rank] == 1){
                    this.activeCards = this.cards.filter(card=>card.rank == rank);
                }
            }
        }

        //sort active cards by x and y
        this.activeCards.sort((a, b) => a.x - b.x || a.y - b.y);

        return {
            type: this.#type,
            activeCards: this.activeCards
        }
    }

    scoreHand(){

        let additionalDamage = 0;

        // set each non-active card to inactive
        let inactiveCards = this.cards.filter(card => !this.activeCards.includes(card));
        inactiveCards.forEach(card => {
            card.classList.add("inactive");
        });

        // set each active card to active
        this.activeCards.forEach((card, i) => {
            setTimeout(() => {
                card.classList.add("active");
            }, 1);
            // trigger each card's effect every 0.2 seconds
            setTimeout(() => {
                let cardModifier = player.weapon.cardModifier(card);
                card.createEffect(cardModifier?.effect);
                additionalDamage += cardModifier?.damage || 0;
            }, 220 * i + 200);
        });

        setTimeout(() => {
            this.cards.forEach(card => {
                card.className = "";
            });
        }, 220 * this.activeCards.length + 800);

        let damage = player.weapon.computeDamage(this) + additionalDamage;
        console.log(`${this.#type} damage: ${damage}`);
        return damage;
    }
}