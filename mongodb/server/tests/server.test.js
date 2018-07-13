const expect = require('chai').expect;
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// run before every test
// clear the db
beforeEach((done) => {
    Todo.remove({}).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).to.deep.equal(text);
            })
            .end((error,res) => {
                if(error){
                    return done(error);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).to.deep.equal(1);
                    expect(todos[0].text).to.deep.equal(text);
                    done();
                }).catch((error) => done(error));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({ text : ""})
            .expect(400)
            .end((error,res) => {
                if(error){
                    return done(error);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).to.deep.equal(0);
                    done();
                }).catch((error) => done(error));
            });
    });
});