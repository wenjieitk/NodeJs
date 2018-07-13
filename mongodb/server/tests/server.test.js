const expect = require('chai').expect;
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First test todo'
},{
    text: 'Second test todo'
}];

// run before every single test
// clear the db
beforeEach((done) => {
    console.log('\n *********** run beforeEach *********** \n');
    
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    //beforeEach
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
                    expect(todos.length).to.deep.equal(3);
                    expect(todos[0].text).to.equal(todos[0].text);
                    done();
                }).catch((error) => done(error));
            });
    });

    //beforeEach
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
                    expect(todos.length).to.deep.equal(2);
                    done();
                }).catch((error) => done(error));
            });
    });
});


describe('GET /todos',() =>{
    //beforeEach
    it('shoud get all todos',(done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).to.deep.equal(2);
            })
            .end(done);
    })
});