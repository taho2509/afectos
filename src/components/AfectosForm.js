import React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import InfiniteCalendar from "react-infinite-calendar";
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import '../css/Afectos.css';
import {InfoPanel} from "./InfoPanel";
import {afectos} from "./afectos-logic";

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

let today;

// Render the Calendar
if (process.env.NODE_ENV === 'test') {
    //I needed to fix the date to make snapshot not fail everytime it runs
    today = new Date(2018, 1, 1);
} else
{
    today = new Date();
}

let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class AfectosForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: Array(2).fill({
                value: ''
            }),
            date: today,
            emotions: {
                morning: "",
                afternoon: "",
                evening: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, i) {
        const inputs = this.state.inputs.slice();
        const date = this.state.date;
        inputs[i] = {
            value: event.target.value
        };
        let emotions = afectos(inputs[0].value + " " + inputs[1].value, this.state.date);
        this.setState({
            inputs: inputs,
            date: date,
            emotions: emotions
        });
    }

    handleSelect(date) {
        const inputs = this.state.inputs.slice();
        let emotions = afectos(inputs[0].value + " " + inputs[1].value, date);
        this.setState({
            inputs: inputs,
            date: date,
            emotions: emotions
        });
    }

    clear() {
        this.setState({
            inputs: Array(2).fill({
                value: ''
            }),
            date: today,
            emotions: {
                morning: "",
                afternoon: "",
                evening: ""
            }
        });
    }

    render() {
        return (
            <Form horizontal>
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
                        <InfoPanel
                            content={this.state.emotions}
                            handleClick={() => this.clear()}
                        />
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default AfectosForm;