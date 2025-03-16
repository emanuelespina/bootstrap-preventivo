
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

//Creazione in modo dinamico della parte workSelect

for (let i = 0; i < works.length; i++) {
    workSelect.innerHTML += `<option value="${i}">${works[i].work}</option>`;

}

////////////////////////////////////////////////

// Parte logica del programma

preventiveForm.addEventListener("submit", preventiveCalculator);

////////////////////////////////////////////////

// FUNZIONI

// Fuozione principale che si avvierà quando il pulsante verrà premuto

function preventiveCalculator(event) {

    event.preventDefault();

    //setto gli allarmi non visibili

    checkAlert.classList.add("d-none");

    promotionalAlert.classList.add("d-none");

    selecAlert.classList.add("d-none");
    
    //controllo che l'utente abbia acconsentito alla privacy

    if (privacyCheck.checked === true) {

        //constrollo che l'utente abbia selezionato un lavoro tra quelli proposti

        if (workSelect.value === "notSelect") {
            selecAlert.classList.remove("d-none");
        } else {

            //calcolo il prezzo a listino del preventivo 

            const workPrice = workhours * works[workSelect.value].price;

            //controllo se l'utente ha inserito un codice promozionale e se quest'ultimo è corretto

            // nessun codice promozionale => il prezzo finale è uguale a quello di listino

            if (promotionalCode.value === "") {
                finalPrice.innerHTML = graficPrice(workPrice.toFixed(2));
            } else 
            
            //codice promozionale coretto => viene applicato lo sconto deciso 

            if (correctDiscountCode(promotionalCode.value) === true) {
                finalPrice.innerHTML = graficPrice((workPrice - (workPrice * discount) / 100).toFixed(2));
            } 
            
            //codice promozionale sbagliato => il prezzo finale è uguale a quello di listino e viene mostrato il messaggio di errore
            
            else {
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

    //imposto una varibila falsa e se il valore inserito è uguale a quello dentro la varibile lo cambio in vero

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

    //divide il numero preso come stringa in cifre prima del punto e cifre dopo il punto

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

