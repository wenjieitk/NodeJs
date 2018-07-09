const utils = require('./utils');
const expect = require('chai').expect;

it('should add two numbers', () => {
    let res = utils.add(33,11);

    if(res !== 44){
        throw new Error(`expected 44, but got ${res}`)
    }

    // expect(res).to.equal(44);
    // expect(res).to.not.equal(1);

    expect(res).to.be.a('number')
    expect(res).to.not.be.a('string');

});

it('should square a number', () => {
    let res = utils.square(3);

    if(res !== 9){
        throw new Error(`expected 9, but got ${res}`)
    }
});

/**
 * deep -> ===
 */
it('should expect some values', () => {
    let res = 44;
    let name = 'jie';
    let obj = {
        name:'jie',
    };

    let obj2 = {
        a:1,
        b:2
    };
    let arr = [1,2,3];

    // value
    expect(res).to.deep.equal(44);
    expect(res).to.not.equal(1);

    // type
    expect(res).to.deep.be.a('number')
    expect(res).to.not.be.a('string');

    // object
    expect(obj).to.deep.equal({
        name:'jie'
    });

    expect(name).to.include('ie');
    expect(arr).to.deep.include(1);
    expect(obj2).to.deep.include({a:1});
});

// async code testing - done
it('should async add two numbers', (done) => {
    utils.asyncAdd(4,3,(sum) => {
        expect(sum).to.deep.equal(7).to.deep.to.be.a('number');
        done();
    })
});