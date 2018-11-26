import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import App from "./App";
import {Form} from "react-bootstrap";


Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
    let shallowApp;
    const app = () => {
        if (!shallowApp) {
            shallowApp = shallow(
                <App/>
            );
        }
        return shallowApp;
    };

    beforeEach(() => {
        shallowApp = undefined;
    });

    // All tests will go here
    it('renders correctly', () => {
        const tree = app();
        expect(toJson(tree)).toMatchSnapshot();
    });

    it("always renders a div", () => {
        const divs = app().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a header", () => {
        const header = app().find("header");
        expect(header.length).toBe(1);
    });

    it("always renders an `AfectosForm`", () => {
        const afectos = app().find("AfectosForm");
        expect(afectos.length).toBe(1);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = app().find("div");
            const wrappingDiv = divs.first();
            expect(wrappingDiv.children()).toEqual(app().children());
        });
    });

});
