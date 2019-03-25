const knex = require('../db/dbConfig');
const admin = require('../firebase-admin/admin');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server');
const rp = require('request-promise');
const fixtures = require('./fixtures');

require('dotenv').load();

chai.use(chaiHttp);

const uid = 'test-uid';
let customToken = null;
let idToken = null;

describe('Todos', () => {
  // Run migrations/seeds and retrieve idToken for authentication
  before(async () => {
    try {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();

      customToken = await admin.auth().createCustomToken(uid);
      console.log('customToken: ', customToken);
      // Swap custom token for an idToken
      const res = await rp({
        url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${
          process.env.FIREBASE_WEB_API_KEY
        }`,
        method: 'POST',
        body: {
          token: customToken,
          returnSecureToken: true,
        },
        json: true,
      });

      idToken = res.idToken;
      console.log(idToken);
    } catch (error) {
      console.log(error);
    }
  });

  it('Displays a welcome message', done => {
    chai
      .request(app)
      .get('/')
      .set('Authorization', idToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.be.a('string');
        done();
      });
  });

  it('Lists todos from a specific user', done => {
    chai
      .request(app)
      .get('/api/users/todos')
      .set('Authorization', idToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.deep.equal([
          {
            createdAt: '3/21/19',
            description: 'This is my final todo',
            id: 4,
            title: 'My final todo',
          },
        ]);
        done();
      });
  });

  it('Inserts a todo into the DB', done => {
    chai
      .request(app)
      .post('/api/todos')
      .set('Authorization', idToken)
      .send({
        title: 'One more todo',
        description: 'This is one more todo',
        createdAt: '3/19/19',
        user_uid: uid,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('array');
        expect(res.body).to.deep.equal([5]);
        done();
      });
  });

  it('Updates a specified todo', done => {
    chai
      .request(app)
      .put('/api/todos/5')
      .set('Authorization', idToken)
      .send({
        title: 'Updated Todo',
        description: 'This is an updated todo',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.equal(1);
        done();
      });
  });

  it('Deletes a specified group of todos', done => {
    chai
      .request(app)
      .delete('/api/todos')
      .set('Authorization', idToken)
      .send({ checked: [1, 2] })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.equal(2);
        done();
      });
  });
});
