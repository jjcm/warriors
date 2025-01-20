class Card extends GameElement {
    static observedAttributes = ["suit", "rank"];

    _active = false;
    modifier = null;
    _x;
    _y;
    deckPosition;

    constructor() {
        super();
    }

    css(){
        return `
            :host {
                width: 113px;
                height: 136px;
                background-image: url(images/cardBg.png);
                background-repeat: no-repeat;
            }
            :host > * {
                pointer-events: none;
            }
            img {
                width: 100%;
                height: 100%;
            }
            .activeCard {
                display: block;
            }
        `;
    }

    html(){
        return `
            <div class='activeCard'></div>
            <img src='images/cards/${this.suit}${this.rank}.png'/>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case "suit":
                this.select('img').src = `images/cards/${newValue}${this.rank}.png`;
                break;
            case "rank":
                this.select('img').src = `images/cards/${this.suit}${newValue}.png`;
                break;
        }  
    }

    set active(value){
        this._active = value;
        this.dom.classList.toggle("active", value);
    }

    get active(){
        return this._active;
    }

    set x(value){
        this._x = value;
        this.setAttribute("slot", `x${value} ${this.y ? "y" + this.y : ""}`.trim());
    }

    get x(){
        return this._x;
    }

    set y(value){   
        this._y = value;
        this.setAttribute("slot", `${this.x ? "x" + this.x : ""} y${value}`.trim());
    }

    get y(){
        return this._y;
    }

    get suit(){
        return this.getAttribute("suit");
    }

    set suit(value){
        this.setAttribute("suit", value);
    }

    get rank(){
        return this.getAttribute("rank");
    }

    set rank(value){
        this.setAttribute("rank", value);
    }

    create(rank, suit, modifier){
        let card = document.createElement("game-card");
        card.rank = rank;
        card.suit = suit;
        card.modifier = modifier;
        return card;
    }

    createEffect(kind){
        let effect = document.createElement("card-effect");
        effect.setAttribute("effect", kind);
        let cardBox = this.getBoundingClientRect();
        effect.style.top = (((cardBox.top + cardBox.bottom) / 2) - 68) + "px";
        effect.style.left = (((cardBox.left + cardBox.right) / 2) - 56.5) + "px";
        // get computed style for the card, then apply it to the effect
        let cardStyle = window.getComputedStyle(this);
        effect.style.transform = cardStyle.transform;
        effect.addEventListener("animationend", ()=>{
            effect.remove();
        });
        document.getElementById("cardEffects").appendChild(effect);
    }

}

customElements.define("game-card", Card);