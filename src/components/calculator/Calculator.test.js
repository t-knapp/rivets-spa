import { add, square, mult } from './Calculator';

import asert from 'assert';

describe("Calculator Test", () => {
    describe("add Tests", () => {
        it("Should give 5 as result of 3 + 2", () => {
            asert.equal(add(3, 2), 5);
        });
    });

    describe("square Tests", () => {
        it("Should give 4 as result of square 2", () => {
            asert.equal(square(2), 4);
        });
    });

    describe("mult Tests", () => {
        it("Should give 20 as result of 4 * 5", () => {
            asert.equal(mult(4, 5), 20);
        })
    })
})