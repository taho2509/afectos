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
            content: {
                morning:"",
                afternoon:"",
                evening: ""
            },
        };
        shallowedInfoPanel = undefined;
    });

    it('renders correctly', () => {
        const emotions = {
            morning:"",
            afternoon:"",
            evening: ""
        };
        beforeEach(() => {
            props.content = emotions;
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

    it("always renders three `img`", () => {
        expect(infoPanel().find("img").length).toBe(3);
    });

    it("always render a `Button`", () => {
        expect(infoPanel().find(Button).length).toBe(1);
    });

    describe("the rendered Panel", () => {
        it("contains everything else that gets rendered", () => {
            const panel = infoPanel().find(Panel);
            const wrappingPanel = panel.first();
            expect(wrappingPanel.children()).toEqual(infoPanel().children());
        });
    });

    describe("when `content` is defined", () => {
        const emotions = {
            morning:"hate",
            afternoon:"love",
            evening: "surprise"
        };
        beforeEach(() => {
            props.content = emotions;
        });

        it("text from `morning` is shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.contains(emotions.morning)).toBe(true);
        });

        it("text from `afternoon` is shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.contains(emotions.afternoon)).toBe(true);
        });

        it("text from `evening` is shown", () => {
            const panelBody = infoPanel().find(Panel.Body);
            expect(panelBody.contains(emotions.evening)).toBe(true);
        });
    });

    describe("when `content` is undefined", () => {
        const emotions = {
            morning:"",
            afternoon:"",
            evening: ""
        };

        it("no text is shown", () => {
            const panel = mount(
                <InfoPanel content={emotions}/>
            );
            expect(panel.find(Panel.Body).text().trim()).toEqual("X");
        });
    });
});