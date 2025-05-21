const http = require('http');
const { expect } = require('chai');

describe('Node.js API', () => {
  it('GET / should return Hello, World!', (done) => {
    http.get('http://localhost:3000/', (res) => {
      let data = '';
      
      // Read response data
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        expect(json.message).to.equal('Hello, World!');
        done();
      });
    });
  });

  it('GET /users should return an array', (done) => {
    http.get('http://localhost:3000/users', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        expect(json).to.be.an('array');
        done();
      });
    });
  });
});
