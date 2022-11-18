fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => getData(data));

const ELEM_NUM_ON_PAGE = 7;
const ELEM_NUM_IN_SUBREGION = 5;

var section = document.querySelector('section');
var subregionsNames = new Set();
var countriesInSub = {};

async function subregionsHandling(data) {
    for (var i = 0; i < data.length; i++) {
        subregionsNames.add(data[i].subregion);
    }
    var i = 0;
    for (var country of subregionsNames) {
        countriesInSub[i] = [country, [], 0, 0];
        i++;
    }
    for (var j = 0; j < subregionsNames.size; j++) {
        let position = data.filter((c) => c.subregion == countriesInSub[j][0]);
        for (var pos of position) {
            countriesInSub[j][1].push(pos);
            countriesInSub[j][2] += pos.population;
            countriesInSub[j][3] += pos.area;
        }
    }
    addElements(countriesInSub)
}

addElements = (subregions) => {
    for (var i in subregions) {
        //make section for one subregion
        let newsubSection = document.createElement('div');
        newsubSection.id = "newsubsection" + i;
        newsubSection.classList.add("subsection")
        if (i < ELEM_NUM_ON_PAGE) {
            newsubSection.classList.add("paginationON")
        } else {
            newsubSection.classList.add("paginationOFF")
        }

        //make subregion main element 
        let newSubregion = document.createElement('div');
        newSubregion.id = subregions[i][0] + i;
        newSubregion.className = "subregion"

        let name = document.createElement('p');
        name.innerText = subregions[i][0];
        newSubregion.appendChild(name);

        let people = document.createElement('p');
        people.innerText = subregions[i][2];
        newSubregion.appendChild(people);

        let area = document.createElement('p');
        area.innerText = subregions[i][3];
        newSubregion.appendChild(area);

        //add section for handle countries
        var sectionToHandle = document.createElement('div');
        sectionToHandle.classList.add("sectionToHandle");
        sectionToHandle.id = "sectionToHandle" + i;
        addCountries(sectionToHandle, subregions[i][1]);

        //make subsection to hide
        var sectionToHide = document.createElement('div');
        sectionToHide.id = "sectionToHide";

        //add section to subsection to hide
        sectionToHide.appendChild(makePropagationBlock(i, sectionToHandle));
        sectionToHide.appendChild(makeNavBlock(i));
        sectionToHide.appendChild(sectionToHandle);

        //hide section onclick func
        bool = false;
        makeSectionHide(newSubregion, sectionToHide, bool)

        //add elements to newsubSection
        newsubSection.appendChild(newSubregion);
        newsubSection.appendChild(sectionToHide);

        //add everything to main section
        section.appendChild(newsubSection)
    }
}

makePropagationBlock = (i, sectionToHandle) => {
    var paginationSmall = document.createElement('nav')
    paginationSmall.id = 'paginationSmall';
    addSmallPagination(paginationSmall, i, sectionToHandle)
    return paginationSmall;
}

addSmallPagination = (paginationSmall, i, sectionToHandle) => {
    var pages = Math.ceil(sectionToHandle.childNodes.length / ELEM_NUM_IN_SUBREGION);
    console.log(pages)

    for (var i = 0; i < pages; i++) {
        var num = document.createElement('div');
        num.id = 'page' + i;
        num.innerText = i + 1;
        addClickSmallPagination(num, sectionToHandle, i * ELEM_NUM_IN_SUBREGION)
        paginationSmall.appendChild(num);
    }
}
addClickSmallPagination = (num, sectionToHandle, i) => {
    num.addEventListener('click', function () {
        showCountries(sectionToHandle, i)
    })
}

showCountries = (sectionToHandle, i) => {
    for (var j = 0; j < sectionToHandle.childNodes.length; j++) {
        console.log(sectionToHandle.childNodes[j])
        if (sectionToHandle.childNodes[j].classList.contains('paginationSmallON')) {
            sectionToHandle.childNodes[j].classList.remove('paginationSmallON')
            sectionToHandle.childNodes[j].classList.add('paginationSmallOFF')
        }
        if (j >= i && j < i + ELEM_NUM_IN_SUBREGION && sectionToHandle.childNodes[j]) {
            console.log('zmiana', j)
            sectionToHandle.childNodes[j].classList.remove('paginationSmallOFF')
            sectionToHandle.childNodes[j].classList.add('paginationSmallON')
        }
    }
}

makeNavBlock = (i) => {
    var nav2 = document.createElement('nav');
    nav2.id = 'nav2';
    nav2.classList = 'nav2' + i

    var name = document.createElement('div');
    var capital = document.createElement('div');
    var population = document.createElement('div');
    var area = document.createElement('div');
    name.id = 'name';
    capital.id = 'capital';
    population.id = 'population';
    area.id = 'area';

    var divs = [name, capital, population, area];
    for (d in divs) {
        var button1 = document.createElement('button');
        var button2 = document.createElement('button');
        var info = document.createElement('p');
        var input = document.createElement('input');
        button1.innerHTML = '&#11165;';
        button2.innerHTML = '&#11167;'

        addButtonHandle(button1, true, parseInt(d) + 1, i)
        addButtonHandle(button2, false, parseInt(d) + 1, i)

        info.innerText = divs[d].id;
        input.type = 'text';
        input.placeholder = 'Find ' + divs[d].id + '...';
        input.id = 'f' + divs[d].id + i;
        addInputHandle(input, parseInt(d) + 1, i)

        divs[d].appendChild(button1);
        divs[d].appendChild(button2);
        divs[d].appendChild(info);
        divs[d].appendChild(input);
        nav2.appendChild(divs[d]);
    }
    return nav2;
}

addInputHandle = (elem, num, numSec) => {
    elem.addEventListener('input', function (e) {
        filterCountries(e.target.value, num, numSec);
    });
}

addButtonHandle = (btn, bool, num, numSec) => {
    btn.addEventListener('click', function () {
        sortCountries(bool, num, numSec)
    });
}

addCountries = (sectionToHide, countries) => {
    var i = 0;
    for (var country of countries) {

        let flag = document.createElement('img');
        flag.className = "flag";
        flag.src = country.flags.png;

        let name = document.createElement('p');
        name.innerText = country.name.common;

        let capital = document.createElement('p');
        capital.innerText = country.capital;

        let population = document.createElement('p');
        population.innerText = country.population;

        let area = document.createElement('p');
        area.innerText = country.area;

        let newCountry = document.createElement('div');
        newCountry.id = country.name.common;
        newCountry.classList.add("country");

        if (i < ELEM_NUM_IN_SUBREGION) {
            newCountry.classList.add("paginationSmallON");
        } else {
            newCountry.classList.add("paginationSmallOFF");
        }
        i++;

        newCountry.appendChild(flag);
        newCountry.appendChild(name);
        newCountry.appendChild(capital);
        newCountry.appendChild(population);
        newCountry.appendChild(area);
        sectionToHide.appendChild(newCountry)
    }
}

makeSectionHide = (newSubregion, sectionToHide, bool) => {
    newSubregion.addEventListener('click', function () {
        bool = !bool;
        if (bool) {
            sectionToHide.style.display = 'block';
        } else {
            sectionToHide.style.display = 'none';
        }
    })
}

filterSubregions = (filter, num) => {
    var x, txtValue;
    var element = document.getElementsByClassName('subsection');
    for (i = 0; i < element.length; i++) {
        x = element[i].firstChild.childNodes[num]
        txtValue = x.textContent || x.innerText;
        if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
            element[i].style.display = "";
        } else {
            element[i].style.display = "none";
        }
    }
}

filterCountries = (filter, num, numSec) => {
    var x, txtValue;
    var idx = 'sectionToHandle' + numSec;
    var element = document.getElementById(idx);

    for (i = 0; i < element.childNodes.length; i++) {
        x = element.childNodes[i].childNodes[num]

        txtValue = x.textContent || x.innerText;
        if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
            element.childNodes[i].style.display = "";
        } else {
            element.childNodes[i].style.display = "none";
        }
    }
}

sortSubregions = (ascending, num) => {
    var element = document.getElementsByClassName("subregion");

    for (var i = 0; i < element.length; i++) {
        for (var j = 0; j < (element.length - i - 1); j++) {
            if (ascending) {
                if ((element[j].childNodes[num].textContent.toLowerCase() > element[j + 1].childNodes[num].textContent.toLowerCase())) {
                    element[j].parentNode.parentNode.insertBefore(element[j + 1].parentNode, element[j].parentNode);
                }
            } else {
                if ((element[j].childNodes[num].textContent.toLowerCase() < element[j + 1].childNodes[num].textContent.toLowerCase())) {
                    element[j].parentNode.parentNode.insertBefore(element[j + 1].parentNode, element[j].parentNode);
                }
            }
        }
    }
}

sortCountries = (ascending, num, numSec) => {
    var idx = 'sectionToHandle' + numSec;
    var element = document.getElementById(idx);
    for (var i = 0; i < element.childNodes.length; i++) {
        for (var j = 0; j < (element.childNodes.length - i - 1); j++) {
            if (ascending) {
                if ((element.childNodes[j].childNodes[num].textContent.toLowerCase() > element.childNodes[j + 1].childNodes[num].textContent.toLowerCase())) {
                    element.childNodes[j].parentNode.insertBefore(element.childNodes[j + 1], element.childNodes[j]);
                }
            } else {
                if ((element.childNodes[j].childNodes[num].textContent.toLowerCase() < element.childNodes[j + 1].childNodes[num].textContent.toLowerCase())) {
                    element.childNodes[j].parentNode.insertBefore(element.childNodes[j + 1], element.childNodes[j]);
                }
            }
        }
    }
}

addBigPagination = () => {
    var element = document.getElementsByClassName('subsection');
    var pages = Math.ceil(element.length / ELEM_NUM_ON_PAGE);
    var paginationBig = document.getElementById('paginationBig')

    for (var i = 0; i < pages; i++) {
        var num = document.createElement('div');
        num.id = 'page' + i;
        num.innerText = i + 1;
        addClickPagination(num, element, i * ELEM_NUM_ON_PAGE)
        paginationBig.appendChild(num);
    }
}

addClickPagination = (num, element, i) => {
    num.addEventListener('click', function () {
        showSubregions(element, i)
    })
}

showSubregions = (element, i) => {
    for (var j = 0; j < element.length; j++) {
        if (element[j].classList.contains('paginationON')) {
            element[j].classList.remove('paginationON')
            element[j].classList.add('paginationOFF')
        }
        if (j >= i && j < i + ELEM_NUM_ON_PAGE && element[j]) {
            element[j].classList.remove('paginationOFF')
            element[j].classList.add('paginationON')
        }
    }
}

getData = (data) => {
    countriesInSub = subregionsHandling(data);
    addBigPagination()

    document.getElementById('fsubRegion').addEventListener('input', function (e) {
        filterSubregions(e.target.value, 0);
    });

    document.getElementById('fsubPopulation').addEventListener('input', function (e) {
        filterSubregions(e.target.value, 1);
    });

    document.getElementById('fsubArea').addEventListener('input', function (e) {
        filterSubregions(e.target.value, 2);
    });
}
