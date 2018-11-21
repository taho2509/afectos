import React from 'react';
import AfectosForm from './components/AfectosForm';
import {InfoPanel} from './components/InfoPanel';
import {Button, Panel} from "react-bootstrap";
import Enzyme, {mount, shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("AfectosForm", () => {
    let mountedAfectosForm;
    const afectosForm = () => {
        if (!mountedAfectosForm) {
            mountedAfectosForm = mount(
                <AfectosForm/>
            );
        }
        return mountedAfectosForm;
    };

    beforeEach(() => {
        mountedAfectosForm = undefined;
    });

    // All tests will go here
    it("always renders a div", () => {
        const divs = afectosForm().find("form");
        expect(divs.length).toBeGreaterThan(0);
    });
});

//here I setup all tests for InfoPanel
describe("InfoPanel", () => {
    let props;
    let mountedInfoPanel;
    const infoPanel = () => {
        if (!mountedInfoPanel) {
            mountedInfoPanel = shallow(
                <InfoPanel {...props} />
            );
        }
        return mountedInfoPanel;
    };

    beforeEach(() => {
        props = {
            content: undefined,
        };
        mountedInfoPanel = undefined;
    });

    // All tests will go here
    it("always renders a `Panel`", () => {
        expect(infoPanel().find(Panel).length).toBe(1);
    });

    it("always renders a `Panel.Body`", () => {
        expect(infoPanel().find(Panel.Body).length).toBe(1);
    });

    describe("the rendered Panel", () => {
        it("contains everything else that gets rendered", () => {
            const panel = infoPanel().find(Panel);
            const wrappingPanel = panel.first();
            expect(wrappingPanel.children()).toEqual(infoPanel().children());
        });
    });

    describe("when `content` is defined", () => {
        beforeEach(() => {
            props.content = "Test string";
        });

        it("text from `content` is shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.text()).toBe(props.content);
        });

        it("Button is shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.find(Button).length).toBe(1);
        });
    });

    describe("when `content` is undefined", () => {
        beforeEach(() => {
            props.content = undefined;
        });

        it("no text is shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.text()).toBe("");
        });

        it("Button isn't shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.find(Button).length).toBe(0);
        });
    });
});