var formData = new FormData(document.querySelector('form'));

isValid = () => {
    return document.getElementById("name").checkValidity() && document.getElementById("phone").checkValidity();
}

delateContact = (toDelete) => {
    document.getElementById("telContainer").removeChild(toDelete);
}

addContact = () => {
    formData = new FormData(document.querySelector('form'));
    if (!isValid()) {
        return;
    }
    let name = formData.get("name");
    let phone = formData.get("phone");
    let newContact = document.createElement("div");
    newContact.className = "contact";
    document.getElementById("telContainer").appendChild(newContact);

    let info = document.createElement("div");
    info.className = "info";
    newContact.appendChild(info);

    let infoName = document.createElement("p");
    infoName.className = "contactInfo";
    infoName.innerText = name;
    info.appendChild(infoName);

    let infoPhone = document.createElement("p");
    infoPhone.className = "contactInfo";
    infoPhone.innerText = phone;
    info.appendChild(infoPhone);

    let trash = document.createElement("div");
    trash.className = "trash";
    newContact.appendChild(trash);

    let img = document.createElement("img");
    img.src = "./assets/delete.png"
    trash.appendChild(img);

    trash.onclick = () => {
        delateContact(newContact);
    }
}
