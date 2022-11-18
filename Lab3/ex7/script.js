fetch('cities.json')
    .then((response) => response.json())
    .then((data) => getData(data.cities));

getData = (data) => {
    getA(data)
    getB(data)
    getC(data)
    getD(data)
    getE(data)
    getF(data)
    getG(data)
}

giveAnswer = (cities) => {
    let answer = "";
    for (city of cities) {
        answer += city.name + ", ";
    }
    return answer;
}

getA = (data) => {
    let cities = data.filter((city) => city.province == "małopolskie");
    document.getElementById("a").textContent = giveAnswer(cities);
}

getB = (data) => {
    let cities = data.filter((city) => checkAInName(city.name) == 2);
    document.getElementById("b").textContent = giveAnswer(cities);
}

checkAInName = (name) => {
    let counter = 0;
    for (var letter of name) {
        if (letter == "A" || letter == "a")
            counter += 1
        if (counter == 3) {
            break;
        }
    }
    return counter;
}

getC = (data) => {
    let cities = new Array;
    for (city of data) {
        cities.push([city.name, city.dentensity]);
    }
    let answer = cities.sort((a, b) => {
        if (a[1] < b[1])
            return 1
        else if (a[1] > b[1])
            return -1
        return 0
    });
    document.getElementById("c").textContent += answer[4][0];
}

getD = (data) => {
    let cities = data.filter((city) => city.people > 100000);
    document.getElementById("d").textContent = giveAnswer(cities);
}

getE = (data) => {
    let maxi = data.filter((city) => city.people > 80000).length;
    let mini = data.filter((city) => city.people < 80000).length;
    let result;

    if (maxi > mini) {
        result = "powyżej"
    } else {
        result = "poniżej"
    }
    document.getElementById("e").textContent = `Mniej niż 80000 mieszkańców jest w ${mini} maiastach, natomiast więcej niż 80000 mieszkańców jest w ${maxi} miastach.`
    document.getElementById("e1").textContent = `Więcej jest miast z liczbą mieszkańców ${result}  80000.`
}

getF = (data) => {
    let cities = data.filter((city) => city.township[0] == "p");
    let answer = "";
    let quantity = 0;
    let area = 0;

    for (city of cities) {
        quantity += 1;
        area += city.area;
        answer += city.name + ", ";
    }
    let result = area / quantity
    document.getElementById("f").textContent = `Średnia powierzchnia: ${result}`;
    document.getElementById("f1").textContent = `MIASTA: ${answer}`;
}

getG = (data) => {
    let cities = data.filter((city) => city.province == "pomorskie");
    let bigCities = cities.filter((city) => city.people > 5000);
    let result;

    if (cities.length == bigCities.length) {
        result = "TAK"
    } else {
        result = "NIE"
    }
    document.getElementById("g").innerText = `${result} \n Jest takich miast: ${bigCities.length} \n \n MIASTA: ${giveAnswer(bigCities)}`;
}

