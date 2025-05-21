const http = require('http'); // Import the http module to make HTTP requests
const { expect } = require('chai'); // Import the expect function from Chai for assertions
const app = require('../main'); // Import the Express app from main.js

let server; // Variable to hold the server instance

// Start server before tests
before(function (done) {
  server = app.listen(3000, () => { // Start the server on port 3000
    console.log('Test server started on port 3000');
    done(); // Signal that the asynchronous setup is complete
  });
});

// Close server after tests
after(function (done) {
  server.close(() => { // Close the server after tests are done
    console.log('Test server closed');
    done(); // Signal that the asynchronous teardown is complete
  });
});

describe('Node.js API', () => { // Describe the test suite for the Node.js API
  it('GET / should return Hello, World!', (done) => { // Test case for the root endpoint
    http.get('http://localhost:3000/', (res) => { // Make a GET request to the root endpoint
      let data = ''; // Variable to accumulate response data
      
      // Read response data
      res.on('data', chunk => data += chunk); // Append each chunk of data to the data variable
      res.on('end', () => { // When the response ends
        const json = JSON.parse(data); // Parse the response data as JSON
        expect(json.message).to.equal('Hello, World!'); // Assert that the message is 'Hello, World!'
        done(); // Signal that the test is complete
      });
    });
  });

  it('GET /users should return an array', (done) => { // Test case for the /users endpoint
    http.get('http://localhost:3000/users', (res) => { // Make a GET request to the /users endpoint
      let data = ''; // Variable to accumulate response data
      res.on('data', chunk => data += chunk); // Append each chunk of data to the data variable
      res.on('end', () => { // When the response ends
        const json = JSON.parse(data); // Parse the response data as JSON
        expect(json).to.be.an('array'); // Assert that the response is an array
        done(); // Signal that the test is complete
      });
    });
  });

  it('Get /users/profile/:id should return a user object', (done) => {
    http.get('http://localhost:3000/users/profile/1', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        expect(json).to.be.an('object');
        done();
      });
    });
  });

  it('Post /users should return the user object being created', (done) => {
    http.request('http://localhost:3000/users/profile/1', (res) => {
      const postData = JSON.stringify({id: 4, name: 'testUser', age: 27});

      this.timeout(5000); 
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/users', 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
        }
      };
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const json = JSON.parse(data);
        expect(json).to.have.property('name', 'Test User');
        expect(json).to.have.property('age', 25);
        expect(json).to.have.property('id', 4); // assuming your API assigns an ID
        done();
        });
          req.on('error', (err) => {
      done(err); // Fail test on error
    });

    // Write the request body and end
    req.write(postData);
    req.end();
      });
    });
  });


});
