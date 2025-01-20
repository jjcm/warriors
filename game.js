var board, playerStats, enemyStats, playerTick, enemyTick, playerDeck, enemyDeck, tempCard1, tempCard2, turn, turnNumber, attackContainer, attackWindow; 

var game = {
    playerDeck : new Deck(),
    playerHand : new Array(5),
    enemyDeck : new Deck(),
    enemyHand : new Array(5),
    boardDeck : new Deck(),
    board : new Array(5).fill().map(column => Array(5)),
    turn : "player",
    turnNumber : -1,
    playerTick : 0,
    enemyTick : 0,

    addCard : function(card, x, y){
        this.board[x][y] = card;
        card.x = x;
        card.y = y;
    },
    play : function(card1, x1, y1, card2, x2, y2){
        this.addCard(card1, x1, y1);
        this.addCard(card2, x2, y2);
        this.scorePlay(x1, y1, x2, y2);
    },
    scorePlay : function(x1, y1, x2, y2){
        let hand = new Array(5);
        //vertical
        if(x1 == x2){
            console.log("vertical play with fire");
            for(y = 0; y < 5; y++){
                hand[y] = this.board[x1][y];
                this.board[x1][y].dom.classList.add("fire");
                console.log(this.board[x1][y].dom);
            }
        }
        //horizontal
        else if(y1 == y2){
            console.log("horizontal play");
            for(x = 0; x < 5; x++){
                hand[x] = this.board[x][y1];
            }

        }
        //diagonal with a card in the top left corner
        else if(x1 == y1){
            console.log("diagonal (top left) play");
            for(xy = 0; xy < 5; xy++){
                hand[xy] = this.board[xy][xy];
            }


        }
        //diagonal with a card in the bottom left corner
        else if (x1 == y2){
            console.log("diagonal (top right) play");
            for(xy = 0; xy < 5; xy++){
                hand[xy] = this.board[xy][4 - xy];
            }

        }

        let handType = new PlayedHand(hand);
        
        unit = turn == "player" ? player : enemy;

        let damage = unit.weapon.computeDamage(handType);
        console.log(`player hit for ${damage} damage with ${unit.weapon.name} and a ${handType.type} hand!`);

        damagedUnit = game.turn == "player" ? enemy : player;
        damagedUnit.currentHp = damagedUnit.currentHp - damage;

        if(damagedUnit.currentHp < 0){ 
            damagedUnit.currentHp = 0;
        }

        this.drawAttackAnimation(damage, hand);
        return hand;
    },

    drawAttackAnimation : function(damage, hand){
        attackContainer.className = "attack";

        console.log(hand);
        for(i = 0; i < hand.length; i++){
            let cardEffect = document.createElement("div");
            cardEffect.className = "cardEffect";
            cardEffect.style.left = hand[i].x + "px";
            cardEffect.style.top = hand[i].y + "px";
            cardEffects.appendChild(cardEffect);
        }

        setTimeout(function(){
            attackContainer.classList.add("attackRemove");
        }, 3000);
        setTimeout(function(){
            attackContainer.className = "";
        }, 3500);


        unit = game.turn == "player" ? player : enemy;
        attackWindow.innerHTML = unit.weapon.name + " hit for " + damage + " damage!!!";
        game.drawPlayerStats();
        game.drawEnemyStats();
        setTimeout(function(){
            game.decideTurn();
        }, 3500);
    },

    generateComputerMoveList : function(){
        bestMoves = [];
        //walk along the left edge
        for(var i = 1; i < 4; i++){
            //for each combination of cards...
            if(game.board[0][i] == null){
                for(j = 0; j < 4; j++){
                    for(k = j + 1; k < 5; k++){
                        game.board[0][i] = game.playerDeck[j];
                        game.board[4][i] = game.playerDeck[k];
                        bestMoves.push({
                            score : game.scoreTheoreticalPlay(0, i, 4, i),
                            card1 : j,
                            card2 : k,
                            x1 : 0,
                            y1 : i,
                            x2 : 4,
                            y2 : i
                        });
                    }
                }
                game.board[0][i] = null;
                game.board[4][i] = null;
            }
        }

        //walk along the top edge
        for(var i = 1; i < 4; i++){
            //for each combination of cards...
            if(game.board[i][0] == null){
                for(j = 0; j < 4; j++){
                    for(k = j + 1; k < 5; k++){
                        game.board[i][0] = game.playerDeck[j];
                        game.board[i][4] = game.playerDeck[k];
                        bestMoves.push({
                            score : game.scoreTheoreticalPlay(i, 0, i, 4),
                            card1 : j,
                            card2 : k,
                            x1 : i,
                            y1 : 0,
                            x2 : i,
                            y2 : 4
                        });
                    }
                }
                game.board[i][0] = null;
                game.board[i][4] = null;
            }
        }
        
        //check the top left corner
        if(game.board[0][0] == null){
            for(j = 0; j < 4; j++){
                for(k = j + 1; k < 5; k++){
                    game.board[0][0] = game.playerDeck[j];
                    game.board[4][4] = game.playerDeck[k];
                    bestMoves.push({
                        score : game.scoreTheoreticalPlay(0, 0, 4, 4),
                        card1 : j,
                        card2 : k,
                        x1 : 0,
                        y1 : 0,
                        x2 : 4,
                        y2 : 4
                    });
                }
            }

            game.board[0][0] = null;
            game.board[4][4] = null;
        }

        //check the bottom left corner
        if(game.board[0][4] == null){
            for(j = 0; j < 4; j++){
                for(k = j + 1; k < 5; k++){
                    game.board[0][4] = game.playerDeck[j];
                    game.board[4][0] = game.playerDeck[k];
                    bestMoves.push({
                        score : game.scoreTheoreticalPlay(0, 4, 4, 0),
                        card1 : j,
                        card2 : k,
                        x1 : 0,
                        y1 : 4,
                        x2 : 4,
                        y2 : 0
                    });
                }
            }
            game.board[0][4] = null;
            game.board[4][0] = null;
        }

        //game.drawBoard();
        bestMoves.sort(game.compareMoves);
        //console.table(bestMoves);
        return bestMoves;
    },

    compareMoves : function(a, b){
        if(a.score < b.score)
            return 1;
        if(a.score > b.score)
            return -1;
        return 0;
    },

    scoreTheoreticalPlay : function(x1, y1, x2, y2){

        return 0;
    },


    getCardHTML : function(rank, suit, modifier, x, y){
        return `
            ${rank && suit ? `<img src='images/cards/${suit}${rank}.png'/>` : ""}
        `;
    },




    decideTurn : function(){
        return
        if(game.turn == "player"){
            if(enemy.currentHp == 0){
                alert("YOU WIN");
            }

            document.getElementById('playerHand').dealNewHand();
        }
        else{
            if(player.currentHp == 0){
                alert("YOU LOSE");
            }
            document.getElementById('enemyHand').dealNewHand();
        }
        //increment the ATB guage until one of them is over 100
        while(playerTick < 100 && enemyTick < 100){
            playerTick += player.speed;
            enemyTick += enemy.speed;
        }


        game.turn = playerTick > enemyTick ? "player" : "enemy";
        if(game.turn == "player"){
            playerTick = playerTick - 100;
        }
        else{
            enemyTick = enemyTick - 100;
        }
        console.log(game.turn + "'s turn.");
        if(game.turn == "enemy")
            game.enemyTurn();
        game.turnNumber++;
        if(game.turnNumber % 8 == 0){
            document.querySelector('game-board').dealNewBoard();
        }
        console.log("TURN NUMBER " + game.turnNumber);

    },

    enemyTurn : function(){
        console.log(game.turnNumber);
        moves = game.generateComputerMoveList();

        let destination = document.querySelector('#board .card.x' + moves[0].x1 + '.y' + moves[0].y1);
        
        game.animateMoveCard(game.enemyHand[moves[0].card1], destination, function(){
            //without animation
            game.board[moves[0].x1][moves[0].y1] = game.enemyHand[moves[0].card1];
            //game.drawBoard();
            destination = document.querySelector('#board .card.x' + moves[0].x2 + '.y' + moves[0].y2);
            game.animateMoveCard(game.enemyHand[moves[0].card2], destination, function(){
                card1 = game.enemyHand[moves[0].card1];
                card2 = game.enemyHand[moves[0].card2];
                game.board[moves[0].x1][moves[0].y1] = card1;
                game.board[moves[0].x2][moves[0].y2] = card2;
                //game.drawBoard();

                game.enemyHand[moves[0].card1] = null;
                game.enemyHand[moves[0].card2] = null;
                game.scorePlay(moves[0].x1, moves[0].y1, moves[0].x2, moves[0].y2);
            });
        });
    },


    enemyHandAction : function(e){
        className = e.target.className.split(" ");
        x = className.pop().charAt(1);
        if(tempCard1 == null){
            tempCard1 = game.enemyDeck[x];
        }
        else {
            tempCard2 = game.enemyDeck[x];
        }
        game.enemyDeck[x] = null;
        game.drawEnemyCards();
    },

    animateMoveCard : function(card, destination, callback){
        console.log('aniomating card move')
        let currentPos = card.getBoundingClientRect();
        let destinationPos = destination.getBoundingClientRect();
        console.log(destinationPos);
        card.style.position = "fixed";
        card.style.left = currentPos.left + "px";
        card.style.top = currentPos.top + "px";
        // get current transformation and apply it to the card
        let transform = getComputedStyle(card).transform;
        card.style.transform = transform;
        setTimeout(function(){
            card.classList.add("cardMove");
            card.style.left = destinationPos.left + "px";
            card.style.top = destinationPos.top + "px";
            card.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
        }, 1);
        card.style.zIndex = 10000;
        card.addEventListener('animationend', function(){
            card.style.zIndex = '';
            card.style.left = '';
            card.style.top = '';
            card.style.position = '';
            card.style.transform = '';
            card.classList.remove("cardMove");
            callback()
        });
    },

    drawPlayerStats : function(){
        playerStats.innerHTML = player.html;
    },

    drawEnemyStats : function(){
        enemyStats.innerHTML = enemy.html;
    },


    init : function(){
        game.turn = "player";
        game.turnNumber = -1;
        game.playerTick = 0;
        game.enemyTick = 0;

        //game.dealInitialBoard();
        board = document.getElementById('board');
        playerDeck = document.getElementById('playerDeck');
        enemyDeck = document.getElementById('enemyDeck');
        playerStats = document.getElementById('playerStats');
        enemyStats = document.getElementById('enemyStats');

        attackContainer = document.getElementById('attackContainer');
        attackWindow = document.getElementById('attack');
        //game.drawBoard();

        game.drawEnemyStats();
        game.drawPlayerStats();
        

        enemyHand.addEventListener("click", function(e){
            if(game.turn == "enemy"){
                game.enemyHandAction(e);
            }
        });

        game.decideTurn();
    }
};

var player;
var enemy;
//on ready
document.addEventListener( "DOMContentLoaded", function(){
    player = new Unit("Player", null, null, 100, 10, 0, weapons["fire sword"]);
    enemy = new Unit("Poring", null, null, 100, 9, 0, weapons["short sword"]);
    game.init();
});
