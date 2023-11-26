let total_game_result = 0;

function getComputerChoice() {
    const hand = ['Rock', 'Scissors', 'Paper'];
    random = Math.floor(Math.random() * 3)
    console.log(hand[random]);
    return hand[random];
}

function getUserChoice() {
    text = prompt("pick Rock Scissors Paper");
    console.log(text);
    return text;
}

function playRound(playerChoice, computerChoice) {
    rules = [[1, 2], [2, 0], [0, 1]];
    const playerIndex = changeChoiceToNumber(playerChoice);
    const computerIndex = changeChoiceToNumber(computerChoice);
    if (rules[playerIndex][0] == computerIndex) {
        return 1;
    } else if (rules[playerIndex][1] == computerIndex) {
        return 0;
    } else {
        console.log("Tie!");
        return playRound(getUserChoice(), getComputerChoice());
    }
}

function changeChoiceToNumber(yourChoice) {
    let Choice = yourChoice.toUpperCase();
    if (Choice == "ROCK") {
        return 0;
    } else if (Choice == "SCISSORS") {
        return 1;
    } else if (Choice == "PAPER") {
        return 2;
    } else {
        console.log("wrong Format");
        return changeChoiceToNumber(getUserChoice());
    }
}

function game(game_result) {
    console.log(`total: ${game_result}`);
    if (game_result >= 3) {
        console.log("total: you win");
    } else {
        console.log("total: you lose");
    }
}

for (let i = 1; i < 6; i++) {
    console.log(i + ": game start");
    
    const playerSelection = getUserChoice();
    const computerSelection = getComputerChoice();

    game_result = playRound(playerSelection, computerSelection);
    console.log(game_result==1 ? "win" : "lose");
    total_game_result+=game_result;
}

game(total_game_result);