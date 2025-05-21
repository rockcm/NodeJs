const http = require('http');
const { expect } = require('chai');
const app = require('../main');

let server;

// Start server before tests
before(function (done) {
  server = app.listen(3000, () => {
    console.log('Test server started on port 3000');
    done();
  });
});

// Close server after tests
after(function (done) {
  server.close(() => {
    console.log('Test server closed');
    done();
  });
});

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
