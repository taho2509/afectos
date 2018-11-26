import React from 'react';
import AfectosForm from './AfectosForm';
import {Form} from 'react-bootstrap';
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

    it("always renders a `Form`", () => {
        const form = afectosForm().find("Form");
        expect(form.length).toBe(1);
    });

    it("always renders an `InfiniteCalendar`", () => {
        const infCalendar = afectosForm().find("DefaultCalendar");//InfiniteCalendar renders a DefaultCalendar
        expect(infCalendar.length).toBe(1);
    });

    it("always renders two `FormControl`", () => {
        const edit = afectosForm().find("FormControl");
        expect(edit.length).toBe(2);
    });

    it("always renders an `InfoPanel`", () => {
        const infoPanel = afectosForm().find("InfoPanel");//InfiniteCalendar renders a DefaultCalendar
        expect(infoPanel.length).toBe(1);
    });

    describe("the rendered Form", () => {
        it("contains everything else that gets rendered", () => {
            const form = afectosForm().find(Form);
            const wrappingForm = form.first();
            expect(wrappingForm.children()).toEqual(afectosForm().children());
        });
    });
});
