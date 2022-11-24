var board = document.getElementById("board");
var score = 0;
var hp;
let lives = '';
let nick = '';

//ZOMBIE
generateZombie = () => {
    let size = Math.round((Math.random() * (2.0 - 0.6) + 0.6) * 100) / 100;
    let level = Math.floor(Math.random() * (800 - 400 * size));
    let speedGenerator = Math.floor(Math.random() * (6 - 1)) + 1;
    let speedInterval;

    switch (speedGenerator) {
        case 1:
            speedInterval = 10;
            break;
        case 2:
            speedInterval = 20;
            break;
        case 3:
            speedInterval = 30;
            break;
        case 4:
            speedInterval = 40;
            break;
        default:
            speedInterval = 50;
            break;
    }
    createZombie(size, level, speedInterval)
}

createZombie = (size, level, speedInterval) => {
    let zombie = document.createElement('div');
    zombie.className = 'zombie';
    zombie.style.transform = `scale(${size})`;
    zombie.style.bottom = `${level}px`;
    board.appendChild(zombie);
    moveZombie(zombie, speedInterval)
}

moveZombie = (zombie, speedInterval) => {
    let position = board.offsetWidth + 300;

    let step = 2200;
    let walking = setInterval(frameStep, speedInterval);
    function frameStep() {
        if (position < - 250) {
            zombie.remove()
            clearInterval(walking);
            changeHp(walking);
            
        } else {
            position -= 15;
            step -= 200;
            if (step == 200) step = 2200;
            zombie.style.backgroundPosition = `${step}px`;
            zombie.style.left = position + 'px';
            zombie.onclick = () => {
                zombie.remove()
                clearInterval(walking)
                changeScore(true)
            }
        }
    }
}

//POINTS and CURSOR
board.onclick = () => {
    changeScore(false)
}

changeScore = (isDead) => {
    let scoreBoard = document.getElementById('score');
    if (isDead) {
        score += 18;
    } else {
        score -= 6;
    }
    scoreBoard.innerText = `${score}`;
}

changeHp = (walking) => {
    healthPoints = document.getElementById('hp');
    hp += 1;
    lives += '2 '
    healthPoints.innerText = lives;
    if (hp == 3) {
        endGame(walking);
    }
}

moveCursor = (event) => {
    let cursorGun = document.getElementById('cursorGun');
    document.body.style.cursor = "none";
    cursorGun.style.top = event.pageY - 134 + "px";
    cursorGun.style.left = event.pageX - 56 + "px";
}

//highScoreBoard operation
async function giveDataToScoreboard(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT', 
      mode: 'cors', 
      cache: 'no-cache', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
}

async function updateScore(){
    var data = await fetch("https://jsonblob.com/api/1044373523048710144");
    var data = await data.json();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    data.push({"name": nick,"score":score, "date":today});
    data.sort((a, b) => b.score - a.score);
    data = data.slice(0, Math.min(3, data.length))

    await giveDataToScoreboard("https://jsonblob.com/api/1044373523048710144", data);
}

async function getBlobData(){
    var data = await fetch("https://jsonblob.com/api/1044373523048710144");
    var data = await data.json();
    let i = 1;
    let p = ""
    for (const player of data) {
        p += `<p>${i}. ${player.name} date: ${player.date} points: ${player.score}</p>`
        i++;
    }
    document.getElementById("scores").innerHTML = p;
}


//START and END GAME
startGame = () => {
    score = 0;
    hp = 0;
    text = ''
    document.getElementById('hp').innerText = '';
    window.addEventListener("mousemove", moveCursor);

    zombieWalking = setInterval(() => {
        generateZombie();
    }, 2000);
}

endGame = async(walking) => {
    await updateScore()
    clearInterval(walking)
    document.body.style.cursor = "auto";
    alert("GAME OVER!");
    location.reload();
    getBlobData();
}

playGame = () => {
    document.body.style.cursor = "auto";
    nick = document.forms["form"]["nickname"].value;
    header = document.getElementById('farmName');
    header.innerText = nick.toUpperCase() + '\'S ZOMBIE FARM';
    document.getElementById('formBox').style.display = 'none';

    startGame()
}

getBlobData()
