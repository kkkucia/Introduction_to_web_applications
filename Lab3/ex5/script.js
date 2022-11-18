let score = 0;
let propagationON = true;
let announcementCounter = 0;
let order = true;

outsideClicked = () => {
    giveAnnouncement('niebieski', 1)
}

centerClicked = (event) => {
    if (!propagationON) {
        event.stopPropagation();
    }
    giveAnnouncement('czerowny', 2)
}

insideClicked = (event) => {
    if (!propagationON) {
        event.stopPropagation();
    }
    giveAnnouncement('żółty', 5)
}

giveAnnouncement = (color, number) => {
    score += number;
    announcementCounter += 1;
    info = document.getElementById('info');
    message = document.createElement('li');
    message.innerText = "Nacisnąłeś " + color + " o wartości " + number;
    info.prepend(message);
    document.getElementById('score').innerText = score;
    console.log(score)
    if (announcementCounter > 16) {
        announcementCounter = 0;
        while (info.lastElementChild) {
            info.removeChild(info.lastElementChild);
        }
    }
    checkClicked()
}

checkClicked = () => {
    if (score > 30) {
        center.removeEventListener("click", centerClicked, order);
        center.style.background = "grey";
    }
    if (score > 50) {
        inside.removeEventListener("click", insideClicked, order);
        inside.style.background = "lightgrey";
    }
}

changePropagation = () => {
    propagationON = !propagationON;
    let status;
    if (propagationON) {
        status = 'Start';
    }
    else {
        status = 'Stop';
    }
    document.getElementById("sPropagation").innerText = status + " Propagation";
}

changeOrder = () => {
    if (!order) {
        outside.removeEventListener("click", outsideClicked, false);
        center.removeEventListener("click", centerClicked, false);
        inside.removeEventListener("click", insideClicked, false);

        outside.addEventListener("click", outsideClicked, true);
        center.addEventListener("click", centerClicked, true);
        inside.addEventListener("click", insideClicked, true);

    } else {
        outside.removeEventListener("click", outsideClicked, true);
        center.removeEventListener("click", centerClicked, true);
        inside.removeEventListener("click", insideClicked, true);

        outside.addEventListener("click", outsideClicked, false);
        center.addEventListener("click", centerClicked, false);
        inside.addEventListener("click", insideClicked, false);
    }
    order = !order;
}

reset = () => {
    if (!propagationON) {
        changePropagation()
    }
    score = 0;
    announcementCounter = 0;
    document.getElementById('score').innerText = score;
    while (info.lastElementChild) {
        info.removeChild(info.lastElementChild);
    }
    order = true;
    changeOrder();
    center.style.background = "red";
    inside.style.background = "yellow";
}

outside = document.getElementById("outside");
center = document.getElementById("center");
inside = document.getElementById("inside");
changeOrder()
