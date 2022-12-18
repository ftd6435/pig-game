'use strict';

const sectionPlayer0 = document.querySelector('.player--0');
const sectionPlayer1 = document.querySelector('.player--1');

const namePlayer0 = document.getElementById('name--1');
const namePlayer1 = document.getElementById('name--1');

const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.getElementById('score--1');

const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const diceGame = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

diceGame.classList.add('hidden');
scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;

let scoresTab = [0,0];
let currentScore = 0;
let play = true;
let turn = 0;

// function to draw a game number 
let ramdomGame = function(){
    return Math.trunc(Math.random() * 6) + 1; 
}

// function showing the dice image
const showDice = diceNumber => {
    diceGame.classList.remove('hidden');
    diceGame.setAttribute('src', `dice-${diceNumber}.png`);
}

// function permit to switch when one of the player lose 
const switchPlayer = function(){
    // Before switching put the current user's score to 0
    document.getElementById(`current--${turn}`).textContent = 0;

    // Test which one of them just lost and restart the game
    turn = (turn === 0) ? 1 : 0;
    currentScore = 0;
    sectionPlayer0.classList.toggle('player--active');
    sectionPlayer1.classList.toggle('player--active');
}



// Launch click event when we press on the roll button
btnRoll.addEventListener('click', function(){
    
    if(play){
        // Catching the new roll number by randomGame function
        const dice = ramdomGame();

        // Showing the dice
        showDice(dice);

        if(dice !== 1){
            // if the dice is different from 1 we increment current user score and print it
            currentScore +=dice;
            document.getElementById(`current--${turn}`).textContent = currentScore;
        }else{
            // if dice is equal 1 then current user lose his session and switch the other side
            switchPlayer();
        }
    }

});


// Launch click event when we press on the hold button
btnHold.addEventListener('click', function(){
  
    if(play){
        // Keeping current user's score in the array
        scoresTab[turn] += currentScore;
   
        // Showing current user's score holding
        document.getElementById(`score--${turn}`).textContent = scoresTab[turn];

        // After holding is current user's score is greater or equal to 100 he wins the game
        if(scoresTab[turn] >= 100){
            play = false;
            document.querySelector(`.player--${turn}`).classList.add('player--winner');
            document.querySelector(`.player--${turn}`).classList.remove('player--active');
        }else{
            switchPlayer();
        }
    }

});

// Relanch the game when we click on button new game
btnNew.addEventListener('click', function(){
    // Before starting we remove win mark on the winner player
    // And then put all the score counter to 0 
    document.querySelector(`.player--${turn}`).classList.remove('player--winner');
    document.querySelector(`#current--${turn}`).textContent = 0;
    scorePlayer0.textContent = 0;
    scorePlayer1.textContent = 0;


    scoresTab = [0,0];
    currentScore = 0;
    play = true;
    turn = 0;
    document.querySelector(`.player--${turn}`).classList.add('player--active');
})