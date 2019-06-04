var animals = ["whale", "dolphin", "eel", "seal", "sponge", "tuna"];
var animalPick = "";
var animalLetters = [];
var charNumber = 0;
var charSpaces = [];
var wrongLetters = [];
//counters
var wins = 0;
var losses = 0;
var guessesRemain = 8;
//logo mouseover effect
var wordGuessLogo = document.getElementById("logo");

wordGuessLogo.onmouseover = function logoAudio() {
    var audio = document.getElementById("eeeeeee");
    audio.play();
}

//set up the game
function gameStart() {
    //pick word from animals
    animalPick = animals[Math.floor(Math.random() * animals.length)];

    // split the chosen string from animals into an array of substrings for each letter, and store in new array 
    animalLetters = animalPick.split("");
    charNumber = animalLetters.length;

    //loop to push corresponding underscores to an array
    for (var i = 0; i < charNumber; i++) {
        charSpaces.push("_");
    };

    //Inject that array into the "console" container
    document.getElementById("computerpick").innerHTML = " " + charSpaces;
}

//re-initialize vars after game ends  - will be called during win/loss function
function gameInit() {
    console.log("||| SESSION STATS ||| WINS: " + wins + " ||| LOSSES: " + losses + " |||");
    guessesRemain = 8; 
    wrongLetters = [];
    charSpaces = [];
    gameStart();
}

//changes image depending on animal pick - will be called during win/loss function
function imgSwap() {
    if (animalPick == animals[0]) {
        document.getElementById("gameimg").src = "assets/images/whale.jpg"
    }
    else if (animalPick == animals[1]) {
        document.getElementById("gameimg").src = "assets/images/dolphin.jpg"
    }
    else if (animalPick == animals[2]) {
        document.getElementById("gameimg").src = "assets/images/eel.jpg"
    }
    else if (animalPick == animals[3]) {
        document.getElementById("gameimg").src = "assets/images/seal.jpg"
    }
    else if (animalPick == animals[4]) {
        document.getElementById("gameimg").src = "assets/images/sponge.jpeg"
    }
    else if (animalPick == animals[5]) {
        document.getElementById("gameimg").src = "assets/images/tuna.jpg"
    }
}

//verify player entry is in word
function verify(entry) {
    var entryIsInWord = false; //false by default
    for (var i = 0; i < charNumber; i++) {
        if (animalPick[i] == entry) {
            entryIsInWord = true;
        }
    }

    if (entryIsInWord) {
        for (var i = 0; i < charNumber; i++) {
            if (animalPick[i] == entry) {
                charSpaces[i] = entry;
            };
        };
    }
    else {
        wrongLetters.push(entry);
        guessesRemain--;
    }
}

//check to see if player has won or lost
function winnerLoser () {
    if (animalLetters.toString() == charSpaces.toString()) {//if pick letters match entered letters, WINNER
        wins++;
        imgSwap();
        alert("You WON!!!");
        gameInit();
        document.getElementById("winscounter").innerHTML = wins;//inject wins variable into html
    }
    else if (guessesRemain === 0) {//otherwise LOSER
        losses++;
        document.getElementById("gameimg").src = "assets/images/lost.jpg";
        alert("Sorry! You Lost!");
        gameInit();
        document.getElementById("lossescounter").innerHTML = losses;//inject losses variable into html
    }
    document.getElementById("computerpick").innerHTML = charSpaces;
    document.getElementById("guessescounter").innerHTML = guessesRemain;
}

//call em up!
gameStart();
document.onkeyup = function(event) {
    var guess = String.fromCharCode(event.keyCode).toLowerCase();
    verify(guess);
    winnerLoser();
    console.log(guess);
    document.getElementById("wrongletters").innerHTML = wrongLetters.join(" ");
};
