
const util = require('./util');
var expect = require('chai').expect;

it('should add 2 nums', () => {
    var res = util.add(1, 2);
    expect(res).to.be.a('number');

    // if(res !== 3){
    //     throw new Error(`Expected 3, but got ${res}`);
    // }
});