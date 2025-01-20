class Hand extends GameElement {
    deck = null;
    hand = [];

    constructor(){
        super();
        this.deck = new Deck();
        this.dealNewHand();
        this.addEventListener('click', this.click.bind(this));
    }

    css(){
        return `
            :host {
                width: 785px;
                height: 160px;
                padding: 20px 0px;    
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            
            ::slotted(game-card) {
                transform: rotate(0deg);
                position: relative;
                top: 0px;
                box-shadow: 0 0 8px 0 #000;
            }

            [name="x0"]::slotted(game-card) {
                transform: rotate(-10deg);
                top: 29px;
            }

            [name="x1"]::slotted(game-card) {
                transform: rotate(-6.6deg);
                top: 13px;
            }

            [name="x2"]::slotted(game-card) {
                transform: rotate(-3.3deg);
                top: 4px;
            }

            [name="x3"]::slotted(game-card) {
                transform: rotate(0deg);
                top: 0px;
            }

            [name="x4"]::slotted(game-card) {
                transform: rotate(3.3deg);
                top: 4px;
            }

            [name="x5"]::slotted(game-card) {
                transform: rotate(6.6deg);
                top: 13px;
            }

            [name="x6"]::slotted(game-card) {
                transform: rotate(10deg);
                top: 29px;
            }

            :host(#enemyHand) [name="x0"]::slotted(game-card) {
                transform: rotate(10deg);
                top: -7px;
            }

            :host(#enemyHand) [name="x1"]::slotted(game-card) {
                transform: rotate(6.6deg);
                top: 9px;
            }

            :host(#enemyHand) [name="x2"]::slotted(game-card) {
                transform: rotate(3.3deg);
                top: 20px;
            }

            :host(#enemyHand) [name="x3"]::slotted(game-card) {
                transform: rotate(0deg);
                top: 25px;
            }

            :host(#enemyHand) [name="x4"]::slotted(game-card) {
                transform: rotate(-3.3deg);
                top: 20px;
            }

            :host(#enemyHand) [name="x5"]::slotted(game-card) {
                transform: rotate(-6.6deg);
                top: 9px;
            }

            :host(#enemyHand) [name="x6"]::slotted(game-card) {
                transform: rotate(-10deg);
                top: -7px;
            }
        `
    }

    html(){
        return `
            <slot name="x0"></slot>
            <slot name="x1"></slot>
            <slot name="x2"></slot>
            <slot name="x3"></slot>
            <slot name="x4"></slot>
            <slot name="x5"></slot>
            <slot name="x6"></slot>
        `
    }

    addCard(card, x){
        this.hand.push(card);
        this.appendChild(card);
        card.x = x;
    }

    adjustTransforms(){
        this.querySelectorAll("game-card").forEach((card, i) => {
            card.style.transform = `rotate(${i * 10}deg)`;
            card.style.top = `${i * 10}px`;
        })
    }

    dealNewHand(){
        for(let x = this.hand.length; x < 7; x++){
            this.addCard(this.deck.drawCard(), x);
        }
    }   

    click(e){
        let card = e.target.closest("game-card");
        this.querySelectorAll("game-card[selected]").forEach(card => {
            card.toggleAttribute("selected", false);
            document.querySelector("#cardEffects").querySelectorAll("card-effect[effect='selected']").forEach(effect => {
                effect.remove();
            });
        });
        game.selectedCard = card;
        card.toggleAttribute("selected", true);
        card.createEffect("selected");
    }
}

customElements.define("game-hand", Hand);