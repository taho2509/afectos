import React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import InfiniteCalendar from "react-infinite-calendar";
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import '../css/Afectos.css';
import {InfoPanel} from "./InfoPanel";

const locale = {
    blank: 'Ninguna fecha seleccionada',
    headerFormat: 'dddd, D MMM',
    locale: require('date-fns/locale/es'), // You need to pass in the date-fns locale for the language you want (unless it's EN)
    todayLabel: {
        long: "Hoy",
        short: 'Hoy',
    },
    weekdays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekStartsOn: 1, // Start the week on Monday
};

var today;

// Render the Calendar
if (process.env.NODE_ENV === 'test') {
    //I needed to fix the date to make snapshot not fail everytime it runs
    today = new Date(2018, 1, 1);
} else
{
    today = new Date();
}

var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class AfectosForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: Array(2).fill({
                value: ''
            }),
            date: today,
            emotions: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, i) {
        const inputs = this.state.inputs.slice();
        const date = this.state.date;
        var emotions = main(this.state.inputs[0].value + " " + this.state.inputs[1].value, this.state.date);
        inputs[i] = {
            value: event.target.value
        }
        this.setState({
            inputs: inputs,
            date: date,
            emotions: emotions
        });
    }

    handleSelect(date) {
        const inputs = this.state.inputs.slice();
        this.setState({
            inputs: inputs,
            date: date
        });
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Col sm={5} smOffset={1}>
                        <InfiniteCalendar
                            width={(window.innerWidth <= 400) ? window.innerWidth : 400}
                            height={window.innerHeight - 400}
                            rowHeight={30}
                            selected={today}
                            minDate={lastWeek}
                            locale={locale}
                            displayOptions={{
                                layout: 'landscape'
                            }}
                            onSelect={(date) => this.handleSelect(date)}
                        />
                    </Col>
                    <Col sm={5}>
                        <FormGroup>
                            <ControlLabel>Nombres</ControlLabel>
                            <FormControl
                                placeholder="Entre su(s) nombre(s)"
                                value={this.state.inputs[0].value}
                                onChange={(event) => this.handleChange(event, 0)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Apellidos</ControlLabel>
                            <FormControl
                                placeholder="Entre sus apellidos"
                                value={this.state.inputs[1].value}
                                onChange={(event) => this.handleChange(event, 1)}
                            />
                        </FormGroup>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={10} smOffset={1}>
                        <InfoPanel content={this.state.emotions}/>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "nn", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function initializeAlphabet() {
    var newObject = {
        a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0,
        m: 0, n: 0, nn: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0
    };
    return newObject;
}

function fillAlphabet(parameterObject, fillingString) {
    for (var i = fillingString.length - 1; i >= 0; i--) {
        parameterObject[fillingString[i]]++;
    }
    return parameterObject;
}

function generateStringDate(argDate) {
    var esMonth = {
        1: "enero",
        2: "febrero",
        3: "marzo",
        4: "abril",
        5: "mayo",
        6: "junio",
        7: "julio",
        8: "agosto",
        9: "septiembre",
        10: "octubre",
        11: "noviembre",
        12: "diciembre"
    };

    var esWeekDay = {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miercoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sabado"
    };

    var esMonthDay = {
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

function main(nameString, dateString) {
    //initialize with full options
    var afectos = ["alegre", "feliz", "enamorado(a)", "cari&ntilde;oso(a)", "triste", "odioso(a)", "sorpresa"];

    //0. Capturing values
    dateString = generateStringDate(dateString);

    //1. Preprocessing of strings
    nameString = nameString.replace(/\s/g, '');
    dateString = dateString.replace(/\s/g, '');
    nameString = nameString.toLowerCase();
    dateString = dateString.toLowerCase();

    //2. Saving initial legth of strings
    var initialNameLength = nameString.length;
    var initialDateLength = dateString.length;

    //3. Initializing the name array
    var nameObject = initializeAlphabet();

    //4. Filling the name array
    nameObject = fillAlphabet(nameObject, nameString);

    //5. Creating auxiliar string
    var lettersStringAdded = "";
    var lettersStringDeleted = "";

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
    var stringDateObject = initializeAlphabet();

    //8. Filling the date array
    stringDateObject = fillAlphabet(stringDateObject, lettersStringAdded);

    //9. Counting letters ocurrency
    var nameCounter = 0;
    var dateCounter = 0;
    for (var i = 26; i >= 0; i--) {
        nameCounter += nameObject[alphabet[i]];
        dateCounter += stringDateObject[alphabet[i]];
    }

    //10. Computing numbers of cancelled letters
    nameCounter = initialNameLength - nameCounter;
    dateCounter = initialDateLength - dateCounter;

    var morning, afternoon, evening;
    var index;

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

export default AfectosForm;