import {afectos, generateStringDate, fillAlphabet, initializeAlphabet} from "./afectos-logic";
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'


Enzyme.configure({ adapter: new Adapter() });

describe("afectos logic", () => {

    describe("generates string dates correctly", () => {
        [
            { input: new Date(2018, 10, 28), expectedResult: "Miercoles veintiocho de noviembre" },
            { input: new Date(2018, 10, 29), expectedResult: "Jueves veintinueve de noviembre" },
            { input: new Date(2017, 11, 2), expectedResult: "Sabado dos de diciembre" },
            { input: new Date(2019, 6, 15), expectedResult: "Lunes quince de julio" },
            { input: new Date(2018, 0, 30), expectedResult: "Martes treinta de enero" },].map(
            ({ input, expectedResult }) =>
                it(`converts ${input} to ${expectedResult}`, () => {
                    expect(generateStringDate(input)).toBe(expectedResult);
                })
        );
    });

    describe("initialize alphabet correctly", () => {
        it("have 27 letters", () => {
            const alphabet = initializeAlphabet();
            expect(Object.keys(alphabet).length).toBe(27);
        });

        it("have 0 in all letters count", () => {
            const alphabet = initializeAlphabet();
            expect(Object.values(alphabet).reduce((cumulative,current) => cumulative + current,0)).toBe(0);
        });
    });

    describe("fills alphabet correctly", () => {
        [
            { input: "abc", expectedResult: 3 },
            { input: "aaaaa", expectedResult: 5 },
            { input: "abcdefghijklmnopqrstuvwxyz", expectedResult: 26 },
            { input: "", expectedResult: 0 },
            { input: "zyx", expectedResult: 3 },].map(
            ({ input, expectedResult }) =>
                it(`letters count of ${input} is ${expectedResult}`, () => {
                    let alphabet = initializeAlphabet();
                    expect(Object.values(fillAlphabet(alphabet,input)).reduce((cumulative,current) => cumulative + current,0)).toBe(expectedResult);
                })
        );
    });

    it("calculates afectos correctly", () => {
        const name = "Jhon Doe";
        const date = new Date(2018, 10, 28);
        const expected = toJson({
            morning: "odioso(a)",
            afternoon: "feliz",
            evening: "sorpresa"
        });
        expect(toJson(afectos(name,date))).toBe(expected);
    });
});