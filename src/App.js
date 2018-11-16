import React, {Component} from 'react';
import './App.css';
import AfectosForm from './components/AfectosForm';
//i ll keep a bootstrap copy locally to avoid
// my connectivity issues but i think it would
// be better to put this in header
/*<link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
    crossOrigin="anonymous"
/>*/

import './css/bootstrap.min.css';



class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Una aplicacion sencilla para calcular el estado de animo de las personas en la manana, tarde y noche de cada dia
                    </p>
                </header>
                <AfectosForm/>
            </div>
        );
    }
}

export default App;
