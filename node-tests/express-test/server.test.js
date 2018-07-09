const request = require('supertest');
let app = require('./server').app;
const expect = require('chai').expect;

describe('Server',() => {
    it('should return hello world', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Hello World')
            .end(done);
    });
    
    it('should include name', (done) => {
        request(app)
            .get('/user')
            .expect(200)
            .expect((res) => {
                expect(res.body).to.deep.include({
                    name: 'jie',
                    age: 27
                });
            })
            .end(done);
    });
});