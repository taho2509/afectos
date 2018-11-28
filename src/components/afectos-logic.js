const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "nn", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export function afectos(nameString, dateString) {
    //initialize with full options
    let afectos = ["alegre", "feliz", "enamorado(a)", "cariñoso(a)", "triste", "odioso(a)", "sorpresa"];

    //0. Capturing values
    dateString = generateStringDate(dateString);

    //1. Preprocessing of strings
    nameString = nameString.replace(/\s/g, '');
    dateString = dateString.replace(/\s/g, '');
    nameString = nameString.toLowerCase();
    dateString = dateString.toLowerCase();

    if(nameString === "")
        return "";

    //2. Saving initial length of strings
    let initialNameLength = nameString.length;
    let initialDateLength = dateString.length;

    //3. Initializing the name array
    let nameObject = initializeAlphabet();

    //4. Filling the name array
    nameObject = fillAlphabet(nameObject, nameString);

    //5. Creating auxiliar string
    let lettersStringAdded = "";
    let lettersStringDeleted = "";

    //6. Cancelling common letters
    for (let i = dateString.length - 1; i >= 0; i--) {
        if (nameObject[dateString[i]] === 0) {
            if (lettersStringDeleted.indexOf(dateString[i]) === -1)
                lettersStringAdded += dateString[i];
        }
        else {
            nameObject[dateString[i]] = 0;
            lettersStringDeleted += dateString[i];
        }
    }

    //7. Initializing the date array
    let stringDateObject = initializeAlphabet();

    //8. Filling the date array
    stringDateObject = fillAlphabet(stringDateObject, lettersStringAdded);

    //9. Counting letters ocurrency
    let nameCounter = 0;
    let dateCounter = 0;
    for (let i = 26; i >= 0; i--) {
        nameCounter += nameObject[alphabet[i]];
        dateCounter += stringDateObject[alphabet[i]];
    }

    //10. Computing numbers of cancelled letters
    nameCounter = initialNameLength - nameCounter;
    dateCounter = initialDateLength - dateCounter;

    let morning, afternoon, evening;
    let index;

    //11.1 Finding the humor of the morning
    index = nameCounter % (afectos.length) - 1;
    if (index === -1)
        index = afectos.length - 1;
    morning = afectos[index];
    afectos.splice(index, 1);

    //11.2 Finding the humor of the afternoon
    index = dateCounter % (afectos.length) - 1;
    if (index === -1)
        index = afectos.length - 1;
    afternoon = afectos[index];
    afectos.splice(index, 1);

    //11.3 Finding the humor of the evening
    index = (nameCounter + dateCounter) % (afectos.length) - 1;
    if (index === -1)
        index = afectos.length - 1;
    evening = afectos[index];

    //12. Creating the output
    return morning + "|" + afternoon + "|" + evening;
}

export function generateStringDate(argDate) {
    const esMonth = {
        0: "enero",
        1: "febrero",
        2: "marzo",
        3: "abril",
        4: "mayo",
        5: "junio",
        6: "julio",
        7: "agosto",
        8: "septiembre",
        9: "octubre",
        10: "noviembre",
        11: "diciembre"
    };

    const esWeekDay = {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miercoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sabado"
    };

    const esMonthDay = {
        1: "primero",
        2: "dos",
        3: "tres",
        4: "cuatro",
        5: "cinco",
        6: "seis",
        7: "siete",
        8: "ocho",
        9: "nueve",
        10: "diez",
        11: "once",
        12: "doce",
        13: "trece",
        14: "catorce",
        15: "quince",
        16: "dieciseis",
        17: "diecisiete",
        18: "dieciocho",
        19: "diecinueve",
        20: "veinte",
        21: "veintiuno",
        22: "veintidos",
        23: "veintitres",
        24: "veinticuatro",
        25: "veinticinco",
        26: "veintiseis",
        27: "veintisiete",
        28: "veintiocho",
        29: "veintinueve",
        30: "treinta",
        31: "treinta y uno"
    };

    return esWeekDay[argDate.getDay()] + " " + esMonthDay[argDate.getDate()] + " de " + esMonth[argDate.getMonth()];
}

export function initializeAlphabet(){
    return {
        a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0,
        m: 0, n: 0, nn: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0
    };
}

export function fillAlphabet(parameterObject, fillingString) {
    for (let i = fillingString.length - 1; i >= 0; i--) {
        parameterObject[fillingString[i]]++;
    }
    return parameterObject;
}