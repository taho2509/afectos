import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Form, Col } from 'react-bootstrap';
import InfiniteCalendar from "react-infinite-calendar";
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import '../css/Afectos.css';

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

// Render the Calendar
var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class AfectosForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: Array(2).fill({
                value: ''
            })
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, i) {
        const inputs = this.state.inputs.slice();
        inputs[i] = {
            value: event.target.value
        }
        this.setState({
            inputs: inputs
        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.inputs[0].value + " " + this.state.inputs[1].value);
        event.preventDefault();
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Col sm={5}>
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
                        />
                    </Col>
                    <Col sm={5}>
                        <FormGroup>
                            <ControlLabel>Nombres</ControlLabel>
                            <FormControl
                                placeholder="Entre su(s) nombre(s)"
                                value={this.state.inputs[0].value}
                                onChange={(event) => this.handleChange(event,0)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Apellidos</ControlLabel>
                            <FormControl
                                placeholder="Entre sus apellidos"
                                value={this.state.inputs[1].value}
                                onChange={(event) => this.handleChange(event,1)}
                            />
                        </FormGroup>
                        <Button  bsStyle="primary" type="submit">
                            Ver estados de animo
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default AfectosForm;