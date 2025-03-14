
// Dichiarazione di variabili 

const nameUser = document.getElementById("nameInput");

const lastNameUser = document.getElementById("lastNameInput");

const emailUser = document.getElementById("emailInput");

const workSelect = document.getElementById("workSelect");

const selecAlert = document.getElementById("selecAlert");

const floatingTextarea = document.getElementById("floatingTextarea");

const promotionalCode = document.getElementById("promotionalCode");

const promotionalAlert = document.getElementById("promotionalAlert");

const privacyCheck = document.getElementById("privacyCheck");

const checkAlert = document.getElementById("checkAlert")

const finalPrice = document.getElementById("finalPrice");

const preventiveForm = document.getElementById("preventiveForm");

const works = [
    {
        work: "Backed Development",
        price: 20.50,
    },
    {
        work: "Frontend Development",
        price: 15.30,
    },
    {
        work: "Project Analysis",
        price: 33.60,
    },
];

const discountsCode = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

const discount = 25;

const workhours = 10;

////////////////////////////////////////////////

//Creazione in modo dinamico della parte select

for (let i = 0; i < works.length; i++) {
    workSelect.innerHTML += `<option value="${i}">${works[i].work}</option>`;

}

////////////////////////////////////////////////

// Parte logica del programma

preventiveForm.addEventListener("submit", preventiveCalculator);

////////////////////////////////////////////////

// Funzioni

// Fuozione principale che si avvierà se premiamo il pulsante

function preventiveCalculator(event) {

    event.preventDefault();

    //setto gli allarmi non visibili

    checkAlert.classList.add("d-none");

    promotionalAlert.classList.add("d-none");

    selecAlert.classList.add("d-none");    

    const workPrice = workhours * works[workSelect.value].price;
    

    if (privacyCheck.checked === true) {

        if (workSelect.value === "null") {
            selecAlert.classList.remove("d-none");
        } else {

            if (promotionalCode.value === "") {
                finalPrice.innerHTML = graficPrice(workPrice.toFixed(2));
            } else if (correctDiscountCode(promotionalCode.value) === true) {
                finalPrice.innerHTML = graficPrice((workPrice - (workPrice * discount) / 100).toFixed(2));
            } else {
                finalPrice.innerHTML = graficPrice(workPrice.toFixed(2));
                promotionalAlert.classList.remove("d-none");
            }
        }

    } else {
        checkAlert.classList.remove("d-none");
    }

};

// Funzione per verificare che il codice promozionale sia corretto

function correctDiscountCode(code) {

    let correctCode = false;

    for (let i = 0; i < discountsCode.length; i++) {
        if (code === discountsCode[i]) {
            correctCode = true
        }
    }

    return correctCode;

};

// Funzione per immettere il prezzo finale con la grafica corretta

function graficPrice(price) {

    let point = price.indexOf(".");

    let boltNumber = "";

    let normalNumber = "";

    for (let i = 0; i < price.length; i++) {

        if (i < point) {
            boltNumber += price[i];
        } else if (i > point) {
            normalNumber += price[i];
        }

    }

    return `<span class="h4">€ ${boltNumber}</span>,${normalNumber}`;

};

