var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

// starting the game
var started = true;

$(document).keypress(function () {
    if (started) {
        nextSequence()
    }

    // terminating the key pressing
    started = false
});

// pressing the button
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress($(this));
    checkAnswer();

});

// checking the user answer
function checkAnswer() {
    var l = userClickedPattern.length
    if (userClickedPattern[l - 1] == gamePattern[l - 1]) {
        console.log("success");
        if (userClickedPattern.length == level) {
            userClickedPattern = [];
            nextSequence();
        }
    } else {
        gameOver();
    }
}

// nextSequence
var level = 0

function nextSequence() {
    level++;
    $('h1').text("Level " + level);
    setTimeout(() => {
        newSequence();
    }, 1000);
}

// adding new sequence
function newSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var randomButton = $("#" + randomChosenColor);
    randomButton.fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log("gamePattern" + gamePattern);
}

// playing the button sound
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// pressing animation effect
function animatePress(btn) {
    btn.addClass("pressed");
    setTimeout(() => {
        btn.removeClass("pressed");
    }, 100);
}

// game over 
function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    new Audio("sounds/wrong.mp3").play();
    level = 0;
    gamePattern = [];
    userClickedPattern = []
    started = true;
}