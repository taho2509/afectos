import React from 'react';
import {InfoPanel} from './InfoPanel';
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
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

    it("always renders a `MDBCard`", () => {
        expect(infoPanel().find(MDBCard).length).toBe(1);
    });

    it("always renders a `MDBCardBody`", () => {
        expect(infoPanel().find(MDBCardBody).length).toBe(1);
    });

    it("always renders three `img`", () => {
        expect(infoPanel().find("img").length).toBe(3);
    });

    it("always render a `MDBBtn`", () => {
        expect(infoPanel().find(MDBBtn).length).toBe(1);
    });

    describe("the rendered Panel", () => {
        it("contains everything else that gets rendered", () => {
            const panel = infoPanel().find(MDBCol);
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
            const panelBody = infoPanel().find(MDBCardBody);
            expect(panelBody.contains(emotions.morning)).toBe(true);
        });

        it("text from `afternoon` is shown", () => {
            const panelBody = infoPanel().find(MDBCardBody);
            expect(panelBody.contains(emotions.afternoon)).toBe(true);
        });

        it("text from `evening` is shown", () => {
            const panelBody = infoPanel().find(MDBCardBody);
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
            expect(panel.find(MDBCardBody).text().trim()).toEqual("");
        });
    });
});