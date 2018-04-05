const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: 'true',
    completedAt: 1520000
  }
];

beforeEach(function(done) {
  this.timeout(0);
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', done => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .expect(res => {
        expect(res.body.text).toBeA('undefined');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.result.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  it('should return 404 if ObjectID is not valid', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .expect(res => {
        expect(res.body.error.message).toBe('Invalid Id.');
      })
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    const hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.result._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId)
          .then(todo => {
            expect(todo).toNotExist();
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  it('should return 404 if object id is invalid', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .expect(res => {
        expect(res.body.error.message).toBe('Invalid Id.');
      })
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    const hexId = todos[0]._id.toHexString();
    const payload = { text: 'should update the todo', completed: true };

    request(app)
      .patch(`/todos/${hexId}`)
      .send(payload)
      .expect(200)
      .expect(res => {
        expect(res.body.result.text).toBe(payload.text);
        expect(res.body.result.completed).toBe(true);
        expect(res.body.result.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', done => {
    const hexId = todos[1]._id.toHexString();
    const payload = {
      text: 'should clear completedAt when todo is not completed',
      completed: false
    };

    request(app)
      .patch(`/todos/${hexId}`)
      .send(payload)
      .expect(200)
      .expect(res => {
        expect(res.body.result.text).toBe(payload.text);
        expect(res.body.result.completed).toBe(false);
        expect(res.body.result.completedAt).toNotExist();
      })
      .end(done);
  });
});
