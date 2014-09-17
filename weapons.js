function weapon(name, icon, art, price, speed, q2, q3, q4, q5, w2, w3, w4, w5, ws, e2, e3, e4, e5, es){
  this.name = name;
  this.icon = icon;
  this.art = art;
  this.price = price;
  this.speed = speed;
  this.q2 = q2;
  this.q3 = q3;
  this.q4 = q4;
  this.q5 = q5;
  this.w2 = w2;
  this.w3 = w3;
  this.w4 = w4;
  this.w5 = w5;
  this.ws = ws;
  this.e2 = e2;
  this.e3 = e3;
  this.e4 = e4;
  this.e5 = e5;
  this.es = es;
}

var weapons = {
  crit : function(multiplier, damage) {
    // insert code for crit animation here


    return multiplier * damage;
  },

  computeDamage : function(weapon, q, w, e) {
    damage = weapon['q' + q];
    if(weapon['w' + w] != null){
      damage = weapon['w' + w](damage);
    }
    if(weapon['e' + e] != null){
      damage = this.crit(weapon['e' + e], damage);
    }
    return damage;
  },

  shortSword : new weapon(
      "Short Sword",
      null,
      null,
      100, 
      0,
      //q's
      1, 
      2, 
      3, 
      4, 
      //w's
      null, 
      null, 
      null, 
      null, 
      null, 
      //e's
      null, 
      null, 
      null, 
      null, 
      2 
  ),
    
  longSword : new weapon(
      "Long Sword",
      null,
      null,
      500, 
      0,
      //q's
      2, 
      3, 
      3, 
      5, 
      //w's
      null, 
      null, 
      null, 
      null, 
      null, 
      //e's
      null, 
      null, 
      null, 
      1.5, 
      2 
  ),
    
};
