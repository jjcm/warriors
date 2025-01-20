class Board extends GameElement {
    deck = null;
    board = null;
    firstCard = null;
    secondCard = null;

    constructor(){
        super();
        this.deck = new Deck();
        this.dealNewBoard();
        this.addEventListener("click", this.boardAction.bind(this));
    }

    css() {
        return `
            :host {
                width: 585px;
                height: 700px;
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: repeat(5, 1fr);
            }
            
            .empty-card {
                width: 113px;
                height: 136px;
                background-image: url(images/cardBg.png);
                background-repeat: no-repeat;
                scale: 0.9;
            }
            
            ::slotted(game-card) {
                transition: scale 0.1s ease-out, filter 0.2s ease-out;
                scale: 0.9;
                filter: brightness(1);
            }
            ::slotted(.active) {
                z-index: 100;
                scale: 1.0;
                filter: brightness(1.2);
            }
            ::slotted(.inactive) {
                scale: 0.9;
                filter: brightness(0.8);
            }
        `
    }

    html() {
        return `
            <slot name="x0 y0"><div class="empty-card"></div></slot>
            <slot name="x1 y0"><div class="empty-card"></div></slot>
            <slot name="x2 y0"><div class="empty-card"></div></slot>
            <slot name="x3 y0"><div class="empty-card"></div></slot>
            <slot name="x4 y0"><div class="empty-card"></div></slot>
            <slot name="x0 y1"><div class="empty-card"></div></slot>
            <slot name="x1 y1"><div class="empty-card"></div></slot>
            <slot name="x2 y1"><div class="empty-card"></div></slot>
            <slot name="x3 y1"><div class="empty-card"></div></slot>
            <slot name="x4 y1"><div class="empty-card"></div></slot>
            <slot name="x0 y2"><div class="empty-card"></div></slot>
            <slot name="x1 y2"><div class="empty-card"></div></slot>
            <slot name="x2 y2"><div class="empty-card"></div></slot>
            <slot name="x3 y2"><div class="empty-card"></div></slot>
            <slot name="x4 y2"><div class="empty-card"></div></slot>
            <slot name="x0 y3"><div class="empty-card"></div></slot>
            <slot name="x1 y3"><div class="empty-card"></div></slot>
            <slot name="x2 y3"><div class="empty-card"></div></slot>
            <slot name="x3 y3"><div class="empty-card"></div></slot>
            <slot name="x4 y3"><div class="empty-card"></div></slot>
            <slot name="x0 y4"><div class="empty-card"></div></slot>
            <slot name="x1 y4"><div class="empty-card"></div></slot>
            <slot name="x2 y4"><div class="empty-card"></div></slot>
            <slot name="x3 y4"><div class="empty-card"></div></slot>
            <slot name="x4 y4"><div class="empty-card"></div></slot>
        `
    }

    addCard(card, x, y){
        this.board[x][y] = card;
        card.x = x;
        card.y = y;
        this.appendChild(card);
    }  

    dealNewBoard(){
        console.log("dealNewBoard");
        this.innerHTML = "";
        this.board = new Array(5).fill().map(column => Array(5));
        for(let x = 1; x < 4; x++){
            for(let y = 1; y < 4; y++){
                this.addCard(this.deck.drawCard(), x, y);
            }
        }
    }


    boardAction(e){
        if(game.turn == "player" && game.selectedCard){
            let destination = e.composedPath()[0];
            let x = destination.closest('slot').name.split(' ')[0].split('x')[1];
            let y = destination.closest('slot').name.split(' ')[1].split('y')[1];

            //clear the effect
            document.querySelector('game-board').querySelectorAll("game-card[selected]").forEach(card => {
                card.toggleAttribute("selected", false);
            });

            document.querySelector("#cardEffects").querySelectorAll("card-effect[effect='selected']").forEach(effect => {
                effect.remove();
            });

            game.animateMoveCard(game.selectedCard, destination, function(){
                this.addCard(game.selectedCard, x, y);
                if(this.firstCard == null){ 
                    this.firstCard = game.selectedCard;
                }
                else {
                    this.secondCard = game.selectedCard;
                    let hand = this.getHandFromCoordinates(this.firstCard.x, this.firstCard.y, this.secondCard.x, this.secondCard.y);
                    hand.scoreHand();
                }
                game.selectedCard = null;
            }.bind(this)); 
        }
    }

    getHandFromCoordinates(x1, y1, x2, y2){
        let hand = new Array(5);

        //vertical
        if(x1 == x2){
            for(let y = 0; y < 5; y++){
                hand[y] = this.board[x1][y];
            }
        }
        //horizontal
        else if(y1 == y2){
            for(let x = 0; x < 5; x++){
                hand[x] = this.board[x][y1];
            }
        }
        //diagonal with a card in the top left corner
        else if(x1 == y1){
            for(let xy = 0; xy < 5; xy++){
                hand[xy] = this.board[xy][xy];
            }
        }
        //diagonal with a card in the bottom left corner
        else if (x1 == y2){
            for(let xy = 0; xy < 5; xy++){
                hand[xy] = this.board[xy][4 - xy];
            }
        }

        return new PlayedHand(hand);
    }
}   

customElements.define("game-board", Board);