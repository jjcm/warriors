var board, playerStats, enemyStats, playerTick, enemyTick, playerDeck, enemyDeck, tempCard1, tempCard2, turn, boardHighlight, attackContainer, attackWindow; 
var eo;

var debugtmp;

var animationEndEvent = "webkitAnimationEnd";

function elementCard(quas, wex, exort, dom){
    this.quas = quas;
    this.wex = wex;
    this.exort = exort;
    this.dom = dom;
    this.x;
    this.y;
    this.active;
}

function attack(quas, wex, exort){
    this.quas = quas;
    this.wex = wex;
    this.exort = exort;
}


var elements = {
    playerDeck : new Array(5),
    enemyDeck : new Array(5),
    board : new Array(5),

    createBlankBoard : function(){
        this.board = new Array(5);
        for(i = 0; i < 5; i++){
            this.board[i] = new Array(5);
        }
    },
    addCard : function(card, x, y){
        this.board[x][y] = card;
        card.x = x;
        card.y = y;
        console.log("Placed a new card at " + x + "," + y + ":");
        console.log(this.board[x][y]);
    },
    getRandomCard : function(){
        card = new elementCard(
            Math.floor(Math.random() * 3) + 1,
            Math.floor(Math.random() * 5) + 1,
            Math.floor(Math.random() * 7) + 1
        );
        card.active = false;
        return card;
    },
    dealInitialBoard : function(){
        for(x = 1; x < 4; x++){
            for(y = 1; y < 4; y++){
                this.board[x][y] = this.getRandomCard();
                console.log("Placed a new card at " + x + "," + y + ":");
                console.log(this.board[x][y]);
            }
        }
    },
    play : function(card1, x1, y1, card2, x2, y2){
        this.addCard(card1, x1, y1);
        this.addCard(card2, x2, y2);
        this.scorePlay(x1, y1, x2, y2);
    },
    scorePlay : function(x1, y1, x2, y2){
        quasMatches = new Array(3);
        i = 3; while(i--) quasMatches[i] = 0;

        wexMatches = new Array(5);
        i = 5; while(i--) wexMatches[i] = 0;

        exortMatches = new Array(7);
        i = 7; while(i--) exortMatches[i] = 0;
        //vertical
        if(x1 == x2){
            console.log("vertical play");
            for(y = 0; y < 5; y++){
                quas = this.board[x1][y].quas - 1;
                wex = this.board[x1][y].wex - 1;
                exort = this.board[x1][y].exort - 1;
                quasMatches[quas] = quasMatches[quas] + 1;
                wexMatches[wex] = wexMatches[wex] + 1;
                exortMatches[exort] = exortMatches[exort] + 1;
            }
            console.log(quasMatches);
            console.log(wexMatches);
            console.log(exortMatches);

            boardHighlight.className = "vertical x" + (parseInt(x1) + 1);
            setTimeout(function(){
                boardHighlight.classList.add("fadeOut");
            }, 2000);
            setTimeout(function(){
                boardHighlight.className = "";
            }, 3500);


            //quas
            console.log("Quas Score: " + this.scoreQuas(quasMatches));
            console.log("Wex Score: " + this.scoreWex(wexMatches));
            console.log("Exort Score: " + this.scoreExort(exortMatches));
        }
        //horizontal
        else if(y1 == y2){
            console.log("horizontal play");
            for(x = 0; x < 5; x++){
                quas = this.board[x][y1].quas - 1;
                wex = this.board[x][y1].wex - 1;
                exort = this.board[x][y1].exort - 1;
                quasMatches[quas] = quasMatches[quas] + 1;
                wexMatches[wex] = wexMatches[wex] + 1;
                exortMatches[exort] = exortMatches[exort] + 1;
            }
            console.log(quasMatches);
            console.log(wexMatches);
            console.log(exortMatches);

            boardHighlight.className = "horizontal y" + (parseInt(y1) + 1);
            setTimeout(function(){
                boardHighlight.classList.add("fadeOut");
            }, 2000);
            setTimeout(function(){
                boardHighlight.className = "";
            }, 3500);

            //quas
            console.log("Quas Score: " + this.scoreQuas(quasMatches));
            console.log("Wex Score: " + this.scoreWex(wexMatches));
            console.log("Exort Score: " + this.scoreExort(exortMatches));
        }
        //diagonal with a card in the top left corner
        else if(x1 == y1){
            console.log("diagonal (top left) play");
            for(xy = 0; xy < 5; xy++){
                quas = this.board[xy][xy].quas - 1;
                wex = this.board[xy][xy].wex - 1;
                exort = this.board[xy][xy].exort - 1;
                quasMatches[quas] = quasMatches[quas] + 1;
                wexMatches[wex] = wexMatches[wex] + 1;
                exortMatches[exort] = exortMatches[exort] + 1;
            }
            console.log(quasMatches);
            console.log(wexMatches);
            console.log(exortMatches);

            boardHighlight.className = "diagonalTL";
            setTimeout(function(){
                boardHighlight.classList.add("fadeOut");
            }, 2000);
            setTimeout(function(){
                boardHighlight.className = "";
            }, 3500);

            //quas
            console.log("Quas Score: " + this.scoreQuas(quasMatches));
            console.log("Wex Score: " + this.scoreWex(wexMatches));
            console.log("Exort Score: " + this.scoreExort(exortMatches));
        }
        //diagonal with a card in the bottom left corner
        else if (x1 == y2){
            console.log("diagonal (top right) play");
            for(xy = 0; xy < 5; xy++){
                quas = this.board[xy][4 - xy].quas - 1;
                wex = this.board[xy][4 - xy].wex - 1;
                exort = this.board[xy][4 - xy].exort - 1;
                quasMatches[quas] = quasMatches[quas] + 1;
                wexMatches[wex] = wexMatches[wex] + 1;
                exortMatches[exort] = exortMatches[exort] + 1;
            }
            console.log(quasMatches);
            console.log(wexMatches);
            console.log(exortMatches);

            boardHighlight.className = "diagonalTR";
            setTimeout(function(){
                boardHighlight.classList.add("fadeOut");
            }, 2000);
            setTimeout(function(){
                boardHighlight.className = "";
            }, 3500);

            //quas
            console.log("Quas Score: " + this.scoreQuas(quasMatches));
            console.log("Wex Score: " + this.scoreWex(wexMatches));
            console.log("Exort Score: " + this.scoreExort(exortMatches));
        }

        this.drawAttackAnimation(this.scoreQuas(quasMatches), this.scoreWex(wexMatches), this.scoreExort(exortMatches));
    },

    drawAttackAnimation : function(q, w, e){
        attackContainer.className = "attack";


        setTimeout(function(){
            attackContainer.classList.add("attackRemove");
        }, 3000);
        setTimeout(function(){
            attackContainer.className = "";
        }, 3500);


        unit = turn == "player" ? player : enemy;
        attackWindow.innerHTML = unit.weapon.name + " hit for " + unit.weapon["q" + q] + " damage!!!";
    },

    scoreQuas : function(quas){
        return Math.max(
            quas[0],
            Math.max(quas[1], quas[2])
        );
    },

    scoreWex : function(wex){
        score = 1;
        for(i = 0; i < 5; i++){
            score = Math.max(wex[i], score);
        }
        if(score == 1)
            score = "STRAIGHT";
        return score;
    },

    scoreExort : function(exort){
        score = 1;
        for(i = 0; i < 7; i++){
            score = Math.max(exort[i], score);
        }
        if(score == 1){
            if(
                (exort[0] == 0 && exort[1] == 0) ||
                (exort[0] == 0 && exort[6] == 0) ||
                (exort[5] == 0 && exort[6] == 0)
            )
            score = "STRAIGHT";
        }
        return score;
    },

    drawBoard : function(){
        board.innerHTML = "";
        for(x = 0; x < 5; x++){
            for(y = 0; y < 5; y++){
                card = document.createElement("div");
                if(this.board[x][y] == null){
                    card.className = "card"
                    + " empty"
                    + " x" + x
                    + " y" + y;
                    card.innerHTML = elements.getCardHTML();
                    board.appendChild(card);
                }
                else if(this.board[x][y] == "highlighted"){
                    card.className = "card"
                    + " highlighted"
                    + " x" + x
                    + " y" + y;
                    board.appendChild(card);
                    card.innerHTML = elements.getCardHTML();
                }
                else {
                    card.innerHTML = elements.getCardHTML(this.board[x][y].quas, this.board[x][y].wex, this.board[x][y].exort);
                    card.className = "card" 
                        + " quas" + this.board[x][y].quas
                        + " wex" + this.board[x][y].wex
                        + " exort" + this.board[x][y].exort
                        + " x" + x
                        + " y" + y;
                    board.appendChild(card);
                    this.board[x][y].dom = card;
                }
            }
        }
    },

    dealPlayerCards : function(){
        for(i = 0; i < 5; i++){
            if(this.playerDeck[i] == null){
                this.playerDeck[i] = this.getRandomCard();
            }
        }
        this.drawPlayerCards();
    },

    drawPlayerCards : function(){
        playerDeck.innerHTML = "";
        for(i = 0; i < 5; i++){
            card = document.createElement("div");
            if(this.playerDeck[i] == null){
                card.className = "card"
                    + " empty"
                    + " x" + i;
                playerDeck.appendChild(card);
            }
            else{
                card.innerHTML = elements.getCardHTML(this.playerDeck[i].quas, this.playerDeck[i].wex, this.playerDeck[i].exort, i, null);
                card.className = "card" 
                    + " quas" + this.playerDeck[i].quas
                    + " wex" + this.playerDeck[i].wex
                    + " exort" + this.playerDeck[i].exort
                    + " x" + i
                    + (this.playerDeck[i].active ? " active" : "");
                playerDeck.appendChild(card);
                this.playerDeck[i].dom = card;
            }
        }
    },

    dealEnemyCards : function(){
        for(i = 0; i < 5; i++){
            if(this.enemyDeck[i] == null){
                this.enemyDeck[i] = this.getRandomCard();
            }
        }
        this.drawEnemyCards();
    },

    drawEnemyCards : function(){
        enemyDeck.innerHTML = "";
        for(i = 0; i < 5; i++){
            card = document.createElement("div");
            if(this.enemyDeck[i] == null){
                card.className = "card"
                    + " empty"
                    + " x" + i;
                enemyDeck.appendChild(card);
            }
            else{
                card.innerHTML = elements.getCardHTML(this.enemyDeck[i].quas, this.enemyDeck[i].wex, this.enemyDeck[i].exort, i, null);
                card.className = "card" 
                    + " quas" + this.enemyDeck[i].quas
                    + " wex" + this.enemyDeck[i].wex
                    + " exort" + this.enemyDeck[i].exort
                    + " x" + i;
                enemyDeck.appendChild(card);
                this.enemyDeck[i].dom = card;
            }
        }
    },

    getCardHTML : function(q, w, e, x, y){
        html = "<div class='activeCard'></div>";
        if(q != null)
            html = html + "<div class='q" + q + "'></div>"
        if(w != null)
            html = html + "<div class='w" + w + "'></div>"
        if(e != null)
            html = html + "<div class='e" + e + "'></div>"
        if(x != null)
            html = html + "<div class='touchTargetOverlay x" + x + "'></div>";
        return html;
    },

    boardAction : function(e){
        className = e.toElement.className.split(" ");
        if(className[0] == "activeCard")
            className = e.toElement.parentElement.className.split(" ");
        y = className.pop().charAt(1);
        x = className.pop().charAt(1);

        if(tempCard1 == null){
            elements.board[x][y] = elements.getRandomCard();
        }
        else if(tempCard2 == null){
            tempCard1.x = x;
            tempCard1.y = y;
            elements.animateMoveCard(tempCard1, x, y, function(){
                x = tempCard1.x;
                y = tempCard1.y;
                elements.board[x][y] = tempCard1;

                elements.playerDeck[tempCard1.deckPosition] = null;
                elements.drawPlayerCards();

                //left side, top left, bottom left
                if(x == 0){
                    //top left
                    if(y == 0){
                        elements.board[4][4] = "highlighted";
                    }
                    //bottom left
                    else if(y == 4){
                        elements.board[4][0] = "highlighted";
                    }
                    //left side
                    else {
                        elements.board[4][y] = "highlighted";
                    }
                }
                //right side, top right, bottom right
                else if(x == 4){
                    //top right
                    if(y == 0){
                        elements.board[0][4] = "highlighted";
                    }
                    //bottom right
                    else if(y == 4){
                        elements.board[0][0] = "highlighted";
                    }
                    //right side
                    else {
                        elements.board[0][y] = "highlighted";
                    }

                }
                //top side
                else if(y == 0){
                    elements.board[x][4] = "highlighted";
                }
                //bottom side
                else {
                    elements.board[x][0] = "highlighted";
                }

                elements.drawBoard();
            });
        }
        else {
            tempCard2.x = x;
            tempCard2.y = y;
            elements.animateMoveCard(tempCard2, x, y, function(){
                x = tempCard2.x;
                y = tempCard2.y;
                elements.board[x][y] = tempCard2;

                elements.playerDeck[tempCard2.deckPosition] = null;
                elements.drawPlayerCards();

                elements.scorePlay(tempCard1.x, tempCard1.y, tempCard2.x, tempCard2.y);
                tempCard1 = tempCard2 = null;
                if(turn == "player"){
                    elements.dealPlayerCards();
                    playerTick = playerTick - 100;
                }
                else{
                    elements.dealEnemyCards();
                    enemyTick = enemyTick - 100;
                }

                elements.drawBoard();
                elements.decideTurn();
            });
        }

    },

    decideTurn : function(){
        //increment the ATB guage until one of them is over 100
        while(playerTick < 100 && enemyTick < 100){
            playerTick += player.speed;
            enemyTick += enemy.speed;
        }


        turn = playerTick > enemyTick ? "player" : "enemy";
        console.log(turn + "'s turn.");
    },

    playerDeckAction : function(e){
        className = e.toElement.className.split(" ");
        x = className.pop().charAt(1);
        if(tempCard1 == null){
            tempCard1 = elements.playerDeck[x];
            tempCard1.deckPosition = x;
        }
        else {
            tempCard2 = elements.playerDeck[x];
            tempCard2.deckPosition = x;
        }
        elements.playerDeck[x].active = true;
        //elements.playerDeck[x] = null;
        elements.drawPlayerCards();
    },

    enemyDeckAction : function(e){
        className = e.toElement.className.split(" ");
        x = className.pop().charAt(1);
        if(tempCard1 == null){
            tempCard1 = elements.enemyDeck[x];
        }
        else {
            tempCard2 = elements.enemyDeck[x];
        }
        elements.enemyDeck[x] = null;
        elements.drawEnemyCards();
    },

    animateMoveCard : function(card, x, y, callback){
        card.dom.style.zIndex = 10000;
        card.dom.classList.remove("x" + card.deckPosition);
        card.dom.className = card.dom.className + " x" + x + " y" + y + " cardMove";
        card.dom.addEventListener(animationEndEvent, function(){callback()});
    },

    drawEnemyStats : function(){

        hp = document.createElement('div');
        hp.innerHTML = 
            "<div class='hp'>"
            + "<div class='hpLabel'>HP: </div>" 
            + "<div class='currentHp'>" + enemy.currentHp + "</div>"
            + "<div class='divider'>/</div>" 
            + "<div class='maxHp'>" + enemy.hp + "</div>"
            + "</div>";

        weapon = document.createElement('div');
        weapon.innerHTML = 
            "<div class='weapon'>"
            + "<div class='weaponLabel'>weapon: </div>" 
            + "<div class='weaponName'>" + enemy.weapon.name + "</div>"
            + "<div class='weaponQ2'>" + enemy.weapon.q2 + "</div>"
            + "<div class='weaponQ3'>" + enemy.weapon.q2 + "</div>"
            + "<div class='weaponQ4'>" + enemy.weapon.q2 + "</div>"
            + "<div class='weaponQ5'>" + enemy.weapon.q2 + "</div>"
            + "<div class='weaponW2'>" + enemy.weapon.w2 + "</div>"
            + "<div class='weaponW3'>" + enemy.weapon.w3 + "</div>"
            + "<div class='weaponW4'>" + enemy.weapon.w4 + "</div>"
            + "<div class='weaponW5'>" + enemy.weapon.w5 + "</div>"
            + "<div class='weaponE2'>" + enemy.weapon.e2 + "</div>"
            + "<div class='weaponE3'>" + enemy.weapon.e3 + "</div>"
            + "<div class='weaponE4'>" + enemy.weapon.e4 + "</div>"
            + "<div class='weaponE5'>" + enemy.weapon.e5 + "</div>"
            + "<div class='weaponQ1'>/</div>" 
            + "<div class='maxHp'>" + enemy.hp + "</div>"
            + "</div>";



        enemyStats.appendChild(hp);
        enemyStats.appendChild(weapon);
    },

    init : function(){
        turn = "player";
        playerTick = 0;
        enemyTick = 0;
        elements.decideTurn();

        elements.createBlankBoard();
        elements.dealInitialBoard();
        board = document.getElementById('board');
        playerDeck = document.getElementById('playerDeck');
        enemyDeck = document.getElementById('enemyDeck');
        playerStats = document.getElementById('playerStats');
        enemyStats = document.getElementById('enemyStats');

        boardHighlight = document.getElementById('boardHighlight');
        attackContainer = document.getElementById('attackContainer');
        attackWindow = document.getElementById('attack');
        elements.drawBoard();
        board.addEventListener("click", function(e){
            elements.boardAction(e);
        });

        elements.dealPlayerCards();
        elements.dealEnemyCards();

        enemyDeck.addEventListener("click", function(e){
            if(turn == "enemy"){
                elements.enemyDeckAction(e);
            }
        });
        playerDeck.addEventListener("click", function(e){
            if(turn == "player"){
                elements.playerDeckAction(e);
            }
        });
    }
};

var player;
var enemy;
//on ready
document.addEventListener( "DOMContentLoaded", function(){
    player = new unit(10, 10, 0, weapons.shortSword);
    enemy = new unit(10, 1, 0, weapons.longSword);
    elements.init();

});

