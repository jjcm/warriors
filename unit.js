function unit(name, icon, artwork, hp, speed, exp, weapon){
  this.name = name;
  this.icon = icon;
  this.artwork = artwork;
  this.hp = hp;
  this.speed = speed;
  this.exp = exp;
  this.weapon = weapon;
  this.currentHp = hp;
}

var units = {
  getHpHTML : function(unit) {
    return "<div class='hp'>"
      + "<div class='hpLabel'>HP: </div>" 
      + "<div class='currentHp'>" + unit.currentHp + "</div>"
      + "<div class='divider'>/</div>" 
      + "<div class='maxHp'>" + unit.hp + "</div>"
      + "</div>";
  }
};
