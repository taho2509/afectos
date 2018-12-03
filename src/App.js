import React, {Component} from 'react';
import './App.css';
import MyNavBar from './components/NavBar';
import AfectosForm from './components/AfectosForm';


class App extends Component {
    render() {
        return (
            <div className="App">
                <MyNavBar/>
                &nbsp;
                <AfectosForm/>
            </div>
        );
    }
}

export default App;
