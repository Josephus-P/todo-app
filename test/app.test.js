const knex = require('../db/dbConfig');
const admin = require('../firebase-admin/admin');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server');
const rp = require('request-promise');
require('dotenv').load();

chai.use(chaiHttp);

let uid = 'test-uid';
let customToken = null;
let idToken = null;

describe('Todos', () => {
  // Run migrations/seeds and retrieve idTokens for authentication
  before(async () => {
    try {
      await knex.migrate.latest();
      await knex.seed.run();
      customToken = await admin.auth().createCustomToken(uid);

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
    } catch (error) {
      console.log(error);
    }
  });

  it('GET / Displays welcome message', done => {
    chai
      .request(app)
      .get('/')
      .set('Authorization', idToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});
