class Weapon {

  constructor(settings){
    this.name = settings.name;
    this.icon = settings.icon;
    this.art = settings.art;
    this.description = settings.description;
    this.price = settings.price;
    let defaultHands = {
      "royal flush" : 10,
      "five of a kind" : 8,
      "four of a kind" : 6,
      "full house" : 5,
      "flush" : 4,
      "straight" : 3.5,
      "three of a kind" : 3,
      "two pair" : 2.5,
      "pair" : 2,
      "high card" : 1
    }
    // override default hands with any provided hands
    if(settings.hands != null){
      for(let hand in settings.hands){
        defaultHands[hand] = settings.hands[hand];
      }
    }
    this.hands = defaultHands;

    this.handModifier = settings.handModifier;
    this.cardModifier = settings.cardModifier;

  }

  get html() {
    return `<div class='weapon'>
    <div class='name'>${this.name}</div>
    <div class='description'>${this.description}</div>
    <table>
    ${Object.keys(this.hands).map(hand => `<tr class="${hand.replaceAll(" ", "-")}'"><td>${hand}</td><td class='weaponStat'>${this.hands[hand]}x</td></tr>`).join('')}
    </table>
    </div>`;
  }

  computeDamage(hand) {
    let type = hand.type;
    console.log(hand.activeHand);
    let baseDamage = this.hands[type];
    let totalDamage = baseDamage;
    if(this.modifier != null){
      totalDamage = this.modifier(baseDamage, hand);
    }
    totalDamage = Math.ceil(totalDamage);
    return totalDamage;
  }

}

let weapons = {
  "short sword" : new Weapon({name: "short sword", icon: "sho", art: "sho", description: "A short sword, a common weapon for peasants.", price: 10}),
  "long sword" : new Weapon({name: "long sword", icon: "lo", art: "lo", description: "A long sword, a common weapon for knights and warriors.", price: 100, hands: {"pair" : 3, "two pair": 3}}),
  "fire sword" : new Weapon({name: "fire sword", icon: "fi", art: "fi", description: "A sword blessed by fire. Damage for Heart and Diamond cards is increased by 5.", price: 100, hands: {"pair" : 3, "two pair": 3}, cardModifier: function(card){
      // if cards are hearts or diamonds, increase damage by 5
      if(card.suit == "H" || card.suit == "D"){
          return {
            "damage" : 5,
            "effect" : "fire"
          }
        } 
      }
    }),
}