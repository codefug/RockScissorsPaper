// 0. 언어 팩 설정
const lanPack = [['가위바위보 페이지', 'RockScissorsPaper Page'
], ['영화버전 가위바위보', 'RockScissorsPaper Movie Version'
], ['language Settings', '언어 설정'
], ['가위 바위 보 중에 어떤 걸 내고 싶나요?', 'What Would You Like To Do?'
], ['게임 결과', 'Game Result'
], ['승자', 'Winner'
], ['총 스코어', 'Total Score'
], ['<span>축하</span>해줘', 'Give <span>Congratulation</span>'
], ["다시하기", "Retry"
]]

// 1. 언어 설정

// query 선택
const languageSelection = document.querySelector("#headLanguageSelector");

// 선택되면 h1Content, headLanguageSelector>label, 
// h2Content>h2, #h2Content>h2, #resultWinner>div
// #resultScore>div, #winnerButtonContainer>button>span(congraduaration도 바꿔야됨.)
// #reset>resetButton 전부 영어로 변경 기능 구현

languageSelection.addEventListener('change', (event) => {
    const classLabel = document.querySelectorAll('.label');
    if (event.target.value == 'en') {
        for (let i = 0; i < classLabel.length; i++) {
            classLabel[i].textContent = lanPack[i][1];
            classLabel[7].innerHTML = lanPack[7][1]
        }
    } else {
        for (let i = 0; i < classLabel.length; i++) {
            classLabel[i].textContent = lanPack[i][0];
        }
        classLabel[7].innerHTML = lanPack[7][0]
    }
});

// 2. 게임 로직 

// 전체 게임 스코어
let total_game_result = 0;
let Round = 0;

// 컴퓨터 선택 0: rock, 1: scissors, 2: paper
function getComputerChoice() {
    random = Math.floor(Math.random() * 3);
    return random;
}

// 버튼 이벤트
// 1. 버튼을 누르면 event효과로 해당 button의 id를 뽑아서 해당 인덱스로 
// playRound로 비교한 뒤 결과를 total_game_result에 전달,
// eachScore에 ${Round} user: computer (win or lose), 형식으로 전달,
// thisRound로 사진 두개 전달
function getUserChoice(text) {
    return text.replace('Button', '');
}

//클릭시 이벤트
const UserChoice = document.querySelectorAll('.userChoice')
for (let i = 0; i < 3; i++) {
    UserChoice[i].addEventListener('click', (event) => {
        for (US of UserChoice) {
            if (US.classList.contains("active")) {
                US.classList.remove("active")
            }
        }
        UserChoice[i].classList.add("active")
    })
}//더블 클릭 이벤트
for (let i = 0; i < 3; i++) {
    UserChoice[i].addEventListener('dblclick', (event) => {
        if (Round != 5) {
            const n = playRound(changeChoiceToIndex(UserChoice[i].id), getComputerChoice());
            if (n == null) {
                return;
            } else {
                // 총 스코어 +n
                total_game_result += n;
                console.log(Round);
                if (Round==5){
                    finish();
                }
            }
        }
    })
}

//string을 인덱스값으로 바꾸는 함수
function changeChoiceToIndex(Choice) {
    if (Choice == 'rock') {
        return 0;
    } else if (Choice == 'scissors') {
        return 1;
    } else {
        return 2;
    }
}
const IndexToChoiceList = ['rock', 'scissors', 'paper']
const IndexToImageList = ['rock.jpg', 'scissors.webp', 'paper.jpg']
const eachScoreRecord = document.querySelector("#eachScore>h3")
const thisRound=document.querySelector(".thisRound");

// 게임 이벤트
// 컴퓨터는 번호를, 사용자는 문자열을 입력
// 승리 공식에 따라 return 값을 뱉음. 틀리면 재대결, 즉 이 함수에서는
// 게임 결과만 출력하게 해야됨.
function playRound(playerIndex, computerChoice) {
    rules = [[1, 2], [2, 0], [0, 1]];
    if (rules[playerIndex][0] == computerChoice) {
        // 각 라운드 경기 결과
        eachScoreRecord.innerHTML += `${++Round}: ${IndexToChoiceList[playerIndex]} : ${IndexToChoiceList[computerChoice]}
        (win)<br>`;
        // thisRound 초기화
        thisRound.replaceChildren();
        // thisROund에 사진 추가
        const newNode1 = document.createElement("img");
        newNode1.setAttribute('src',IndexToImageList[playerIndex]);
        const newNode2 = document.createElement("img");
        newNode2.setAttribute('src',IndexToImageList[computerChoice]);
        newNode1.setAttribute('style','height:150px;');
        newNode2.setAttribute('style','height:150px;');
        thisRound.appendChild(newNode1);
        thisRound.appendChild(newNode2);
        return 1;
    } else if (rules[playerIndex][1] == computerChoice) {
        // 각 라운드 경기 결과
        eachScoreRecord.innerHTML += `${++Round}: ${IndexToChoiceList[playerIndex]} : ${IndexToChoiceList[computerChoice]}
        (lose)<br>`;
        // thisRound 초기화
        thisRound.replaceChildren();
        // thisROund에 사진 추가
        const newNode1 = document.createElement("img");
        newNode1.setAttribute('src',IndexToImageList[playerIndex]);
        const newNode2 = document.createElement("img");
        newNode2.setAttribute('src',IndexToImageList[computerChoice]);
        newNode1.setAttribute('style','height:150px;');
        newNode2.setAttribute('style','height:150px;');
        thisRound.appendChild(newNode1);
        thisRound.appendChild(newNode2);
        return 0;
    } else {
        // thisRound 초기화
        thisRound.replaceChildren();
        // thisRound에 Tie 사진 삽입
        const newNode = document.createElement("img");
        newNode.setAttribute('src','Tie.avif');
        newNode.setAttribute('style','height:150px;');
        thisRound.appendChild(newNode);
        console.log("비겼습니다.")
        return;
    }
}

// reset
const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', () => { location.reload() });

const winnerButton=document.querySelector("#winnerButton");
// result
// 1. total_game_result>=3 이면 resultWInner.winner은 User
// 2. 아니면 Computer
// 3. resultScore.score에 total_game_result : Round-total_game_result 전달
// 4. .label>span에 클릭하면 커졌다가 작아지는 이벤트 추가
function finish() {
    console.log(total_game_result);
    for (let i = 0; i < 3; i++) {
        UserChoice[i].disabled = true;
    }
    resetButton.disabled=false;
    if (total_game_result>=3){
        winnerButton.disabled=false;
        const resultWInner=document.querySelector("#resultWinner>#winner");
        resultWInner.textContent='User!';
        const resultScore=document.querySelector("#resultScore>#score");
        resultScore.textContent=`${total_game_result} : ${Round-total_game_result}`
    }else{
        const resultWInner=document.querySelector("#resultWinner>#winner");
        resultWInner.textContent='YOU';
        const resultScore=document.querySelector("#resultScore>#score");
        resultScore.textContent=`${total_game_result} : ${Round-total_game_result}`
    }
}

function congratulation(){
    const winnerButtonContainer = document.querySelector("#winnerButtonContainer>.niceButton>span")
    winnerButtonContainer.classList.add("hovering");
    setTimeout(() => {winnerButtonContainer.classList.remove("hovering")},2000);
}

winnerButton.addEventListener('click',congratulation);