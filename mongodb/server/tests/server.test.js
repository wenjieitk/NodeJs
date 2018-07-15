const expect = require('chai').expect;
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: 'Second test todo'
}];

// run before every single done
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

describe('GET Request /todos/:id',() =>{
    it('should return todo doc based on the given ID',(done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`) // to convert id to object_id format
            .expect(200)
            .expect((res) => {
                expect(todos[0].text).to.equal(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for invalid object_ID', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id',() =>{

    it('should remove a todo',(done) => {
        let hexId = todos[1]._id.toHexString();
        
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                console.log(res.body);
                
                expect(res.body.todo._id).to.deep.equal(hexId);
            })
            .end((error, res) => {
                if(error){
                    return done(error);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).to.not.exist;
                    done();
                }).catch((error) => done(error));
            });
    });

    it('should return 404 if todo not found',(done) => {
        let hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid',(done) => {
        request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
    });
});