let board = document.getElementById('board')
let ball = document.getElementById('ball')
const diameter = ball.offsetHeight;

moveBall = (event) => {
    event.stopPropagation();
    ball.style.left = event.x - diameter / 2 + 'px';
    ball.style.top = event.y - diameter / 2 + 'px';
    ball.style.transition = '600ms';
}

document.addEventListener('click', function () {
    alert("You missed :P");
})

board.addEventListener('click', moveBall)
