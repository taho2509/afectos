import React from 'react';
import AfectosForm from './components/AfectosForm';
import Enzyme, {mount} from 'enzyme'
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