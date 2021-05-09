const ternSound=new Audio('./sounds/moveSound.mp3');
const ohohSound = new Audio('./sounds/ohoherror.mp3');
const errorSound = new Audio('./sounds/errorSound.mp3');
const kidsCheerSound = new Audio('./sounds/kidsCheer.mp3');
const gameTieSound = new Audio('./sounds/gameWooSound.mp3');

const boxArr = document.querySelectorAll('.boxes');
const winnerStatus = document.querySelector('.winner__status');
const reset = document.querySelector('.reset');
const turn = document.querySelector('.turn');

let checkStatus = 'x';
let gameOn = true;


function resetGame(){
    checkStatus = 'x';
    gameOn = true;
    winnerStatus.innerHTML = 'Tic Tac Toe'
    boxArr.forEach(box=>{
        box.classList.remove('x');
        box.classList.remove('o');
    })
    turn.style.display = 'block';
    turn.innerHTML = "⭕ 's Turn";
}

reset.addEventListener('click',e=>{
    resetGame();
})

function winner(item){
    gameOn = false;
    if(item === 'x')
        return 'x';
    else 
        return 'o';
}

function checkresult(){
    let item00 = boxArr[0].classList[2]; 
    let item01 = boxArr[1].classList[2]; 
    let item02 = boxArr[2].classList[2]; 
    let item10 = boxArr[3].classList[2]; 
    let item11 = boxArr[4].classList[2]; 
    let item12 = boxArr[5].classList[2]; 
    let item20 = boxArr[6].classList[2]; 
    let item21 = boxArr[7].classList[2]; 
    let item22 = boxArr[8].classList[2]; 

    if(item00 && item00 === item01 && item00 === item02){
        return winner(item00);
    }
    else if(item10 && item10 === item11 && item10 === item12){
        return winner(item10);
    }
    else if(item20 && item20 === item21 && item20 === item22){
        return winner(item20);
    }
    else if(item00 && item00 === item10 && item00 === item20){
        return winner(item00);
    }
    else if(item01 && item01 === item11 && item01 === item21){
        return winner(item01);
    }
    else if(item02 && item02 === item12 && item02 === item22){
        return winner(item02);
    }
    else if(item00 && item00 === item11 && item00 === item22){
        return winner(item00);
    }
    else if(item02 && item02 === item11 && item02 === item20){
        return winner(item02);
    }
    else if(item00 && item01 && item02 && item10 && item11 && item12 && item20 && item21 && item22){
        return 'xo';
    }
    return null;
}

function handelclick(e){
    let classList = e.target.classList;

    if(!gameOn || classList[2]=='x' || classList[2]=='o'){
        errorSound.play();
        return;
    }

    if(checkStatus === 'x'){
        ternSound.play();
        turn.innerHTML = "❌ 's Turn";
        classList.add('o');
        
        checkStatus = 'o';
        let result = checkresult();
        DeclareWinner(result);
    }
    else{
        ternSound.play();
        turn.innerHTML = "⭕ 's Turn";
        classList.add('x');
        checkStatus='x';
        let result = checkresult();
        DeclareWinner(result);
    }
    
}

function DeclareWinner(result){
    if(result && result!= 'xo'){
        turn.style.display = 'none';
        kidsCheerSound.play();
        winnerStatus.innerHTML= 'winner is '+ result; 
    }
    else if(result && result == 'xo'){
        turn.style.display = 'none';
        gameTieSound.play();
        winnerStatus.innerHTML = 'Game is Tie!'
    }
}

boxArr.forEach(box=>{
    box.addEventListener('click',handelclick);
})
