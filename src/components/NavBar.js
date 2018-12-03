import React from 'react'
import { Navbar, NavbarBrand} from "mdbreact";

function MyNavBar() {
    return(
        <Navbar color="blue" dark expand="md">
            <NavbarBrand>
                <strong className="white-text">Una aplicación sencilla para calcular el estado de ánimo de las personas en la mañana, tarde y noche de cada día</strong>
            </NavbarBrand>
        </Navbar>
    )
}

export default MyNavBar;