import { revertA, revertB } from './Candidate'

import { expect, should } from 'chai'

should();

describe("Candidate Tests", () => {
    describe("revert* Tests", () => {
        it("should give a string if called with no args", () => {
            let value = revertA();
            expect(value).to.be.a('string');
            expect(value).to.have.lengthOf(0);
        });

        it("should give reversed string", () => {
            let input = "ABC";
            let value = revertA(input);
            value.should.be.a('string');
            value.should.have.length(input.length);
            value.should.equal("CBA");
        });

        it("should give the same output", () => {
            let input = "ABC";
            let valA = revertA(input);
            let valB = revertB(input);
            expect(valA).to.equal(valB);
        });
        
    });
})