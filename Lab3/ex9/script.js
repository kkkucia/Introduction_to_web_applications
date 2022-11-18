let slider = document.querySelector('#container');
let cards = document.querySelectorAll('.card')
let prevButton = document.querySelector('#prev');
let nextButton = document.querySelector('#next');
let counter = 1;
const size = cards[0].clientWidth;

slider.style.transform = 'translateX(' + (-size * counter) + 'px';

nextButton.addEventListener('click', () => {
    if (counter > cards.length - 2) return;
    slider.style.transition = "transform 800ms";
    counter++;
    slider.style.transform = 'translateX(' + (-size * counter) + 'px';
});

prevButton.addEventListener('click', () => {
    if (counter < 1) return;
    slider.style.transition = "transform 800ms ";
    counter--;
    slider.style.transform = 'translateX(' + (-size * counter) + 'px';
});

slider.addEventListener('transitionend', () => {
    if (cards[counter].id == 'lastClone') {
        slider.style.transition = "none";
        counter = cards.length - 2;
        slider.style.transform = 'translateX(' + (-size * counter) + 'px';
    }
    if (cards[counter].id == 'firstClone') {
        slider.style.transition = "none";
        counter = cards.length - counter;
        slider.style.transform = 'translateX(' + (-size * counter) + 'px';
    }
});

lotteryClick = () => {
    let currCounter = counter;
    while (currCounter == counter) {
        counter = Math.floor(Math.random() * (7 - 1) + 1);
    }
    slider.style.transition = "none";
    slider.style.transform = 'translateX(' + (-size * counter) + 'px';
}
