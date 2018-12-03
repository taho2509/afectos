import React from 'react';
import AfectosForm from './AfectosForm';
import { MDBCard, MDBCardBody , MDBRow, MDBCol, MDBInput } from "mdbreact";
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'


Enzyme.configure({ adapter: new Adapter() });

describe("AfectosForm", () => {

    let shallowedInfoPanel;
    const afectosForm = () => {
        if (!shallowedInfoPanel) {
            shallowedInfoPanel = shallow(
                <AfectosForm/>
            );
        }
        return shallowedInfoPanel;
    };

    beforeEach(() => {
        shallowedInfoPanel = undefined;
    });

    // All tests will go here
    it('renders correctly', () => {
        const tree = afectosForm();
        expect(toJson(tree)).toMatchSnapshot();
    });

    it("always renders a `MDBCard`", () => {
        const form = afectosForm().find(MDBCard);
        expect(form.length).toBe(1);
    });

    it("always renders a `MDBCardBody`", () => {
        const form = afectosForm().find(MDBCardBody);
        expect(form.length).toBe(1);
    });

    it("always renders an `InfiniteCalendar`", () => {
        const infCalendar = afectosForm().find("DefaultCalendar");//InfiniteCalendar renders a DefaultCalendar
        expect(infCalendar.length).toBe(1);
    });

    it("always renders two `MDBInput`", () => {
        const edit = afectosForm().find(MDBInput);
        expect(edit.length).toBe(2);
    });

    it("always renders an `InfoPanel`", () => {
        const infoPanel = afectosForm().find("InfoPanel");
        expect(infoPanel.length).toBe(1);
    });

    describe("the rendered MDBCol", () => {
        it("contains everything else that gets rendered", () => {
            const parent = afectosForm().find(MDBCol);
            const wrapper = parent.first();
            expect(wrapper.children()).toEqual(afectosForm().children());
        });
    });
});
