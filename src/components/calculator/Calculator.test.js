import { add, square, mult, pow } from './Calculator';

import assert from 'assert';

describe("Calculator Test", () => {
    describe("add Tests", () => {
        it("Should give 5 as result of 3 + 2", () => {
            assert.equal(add(3, 2), 5);
        });
        it("Should give 5 as result of 2 + 3", () => {
            assert.equal(add(2, 3), 5);
        });
    });

    describe("mult Tests", () => {
        it("Should give 20 as result of 4 * 5", () => {
            assert.equal(mult(4, 5), 20);
        });
        it("Should give 20 as result of 5 * 4", () => {
            assert.equal(mult(5, 4), 20);
        });
    });

    describe("square Tests", () => {
        it("Should give 4 as result of square 2", () => {
            assert.equal(square(2), 4);
        });
    });

    describe("pow Tests", () => {
        it("Should give 9 as result of 3^2", () => {
            assert.equal(pow(3, 2), 9);
        })
        it("Should give 27 as result of 3^3", () => {
            assert.equal(pow(3, 3), 27);
        })
        it("Should give -27 as result of -3^3", () => {
            assert.equal(pow(-3, 3), -27);
        })
    });
})