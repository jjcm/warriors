function weapon(name, icon, art, price, speed, q2, q3, q4, q5, w2, w3, w4, w5, ws, e2, e3, e4, e5, es){
  this.name = name;
  this.icon = icon;
  this.art = art;
  this.price = price;
  this.speed = speed;
  this.q1 = 1;
  this.q2 = q2;
  this.q3 = q3;
  this.q4 = q4;
  this.q5 = q5;
  this.w1 = 0;
  this.w2 = w2;
  this.w3 = w3;
  this.w4 = w4;
  this.w5 = w5;
  this.ws = ws;
  this.e1 = 1;
  this.e2 = e2;
  this.e3 = e3;
  this.e4 = e4;
  this.e5 = e5;
  this.es = es;
  
}

var weapons = {
  getWeaponTableHTML : function(weapon) {
    return "<div class='weapon'>"
      + "<table><tr>"
      + "<td class='weaponQ2 weaponStat'>" + ( weapon.q2 == null ? "" : weapon.q2 ) + "</td>"
      + "<td class='weaponQ3 weaponStat'>" + ( weapon.q3 == null ? "" : weapon.q3 ) + "</td>"
      + "<td class='weaponQ4 weaponStat'>" + ( weapon.q4 == null ? "" : weapon.q4 ) + "</td>"
      + "<td class='weaponQ5 weaponStat'>" + ( weapon.q5 == null ? "" : weapon.q5 ) + "</td>"
      + "<td class='weaponW2 weaponStat'>" + ( weapon.w2 == null ? "" : weapon.w2 ) + "</td>"
      + "<td class='weaponW3 weaponStat'>" + ( weapon.w3 == null ? "" : weapon.w3 ) + "</td>"
      + "<td class='weaponW4 weaponStat'>" + ( weapon.w4 == null ? "" : weapon.w4 ) + "</td>"
      + "<td class='weaponW5 weaponStat'>" + ( weapon.w5 == null ? "" : weapon.w5 ) + "</td>"
      + "<td class='weaponE2 weaponStat'>" + ( weapon.e2 == null ? "" : weapon.e2 ) + "</td>"
      + "<td class='weaponE3 weaponStat'>" + ( weapon.e3 == null ? "" : weapon.e3 ) + "</td>"
      + "<td class='weaponE4 weaponStat'>" + ( weapon.e4 == null ? "" : weapon.e4 ) + "</td>"
      + "<td class='weaponE5 weaponStat'>" + ( weapon.e5 == null ? "" : weapon.e5 ) + "</td>"
      + "</tr></table>"
      + "</div>";
  }, 

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
      0, 
      0, 
      0, 
      0, 
      5, 
      //e's
      1, 
      1, 
      1, 
      1, 
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
      0, 
      0, 
      0, 
      0, 
      5, 
      //e's
      1, 
      1, 
      1, 
      1.5, 
      2 
  ),
    
  potato : new weapon(
      "Potato",
      null,
      null,
      500, 
      0,
      //q's
      20, 
      38, 
      89, 
      500, 
      //w's
      0, 
      0, 
      0, 
      0, 
      0, 
      //e's
      1, 
      2, 
      5, 
      1.5, 
      2 
  ),
    
};
