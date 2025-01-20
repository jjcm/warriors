class Unit {
  constructor(name, icon, artwork, hp, speed, exp, weapon){
    this.name = name;
    this.icon = icon;
    this.artwork = artwork;
    this.hp = hp;
    this.speed = speed;
    this.exp = exp;
    this.weapon = weapon;
    this.currentHp = hp;
  }

  get html() {
    return `<div class='unit'>
      <div class='name'>${this.name}</div>
      <div class='hp'><span class='hpLabel'>HP: </span><span class='currentHp'>${this.currentHp}</span><span class='divider'>/</span><span class='maxHp'>${this.hp}</span></div>
      <div class='weapon'>${this.weapon.html}</div>
      <div class='attack'></div>
    </div>`;
  } 
}