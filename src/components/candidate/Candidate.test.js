import { revertA, revertB } from './Candidate'

import { expect } from 'chai'

describe("Candidate Tests", () => {
    describe("revert* Tests", () => {
        it("should give a string if called with no args", () => {
            let value = revertA();
            expect(value).to.be.a('string');
            expect(value).to.have.lengthOf(0);
        });
    });
})