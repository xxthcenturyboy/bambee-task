import request from 'supertest';
import { expect } from 'chai';

describe.skip('app', function() {
  before(function() {
    this.server = require('server/app');
  });
  after(function(done) {
    this.server.close(done);
  })
  it('responds to /', function(done) {
    request(server)
      .get('/')
      .expect(200, done)
  });
});
