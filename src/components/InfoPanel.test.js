import React from 'react';
import {InfoPanel} from './InfoPanel';
import {Button, Panel} from "react-bootstrap";
import Enzyme, {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

//here I setup all tests for InfoPanel
describe("InfoPanel", () => {
    let props;
    let shallowedInfoPanel;
    const infoPanel = () => {
        if (!shallowedInfoPanel) {
            shallowedInfoPanel = shallow(
                <InfoPanel {...props} />
            );
        }
        return shallowedInfoPanel;
    };

    beforeEach(() => {
        props = {
            content: undefined,
        };
        shallowedInfoPanel = undefined;
    });

    it('renders correctly', () => {
        const testString = "Test string";
        beforeEach(() => {
            props.content = testString;
        });
        const tree = infoPanel();
        expect(toJson(tree)).toMatchSnapshot();
    });

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
        const testString = "Test string";
        beforeEach(() => {
            props.content = testString;
        });

        it("text from `content` is shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.contains(testString)).toBe(true);
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
            const panel = mount(
                <InfoPanel/>
            );
            expect(panel.find(Panel.Body).text()).toEqual("");
        });

        it("Button isn't shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.find(Button).length).toBe(0);
        });
    });
});