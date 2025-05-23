// node main.js basic api file
const express = require('express');
const cors = require('cors');

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const person = new Person("John Doe", 30);
const person2 = new Person("Jane Doe", 25);

const people = [person, person2];
console.log(people);
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Redirect root to index.html
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// JSON API route - moved to /api
app.get('/api', (req, res) => { 
    res.json({ message: 'Hello, World!' });
});

app.get('/users', (req, res) => {
    res.json(people);
});

app.post('/users', (req, res) => {
    const user = new Person(req.body.name, parseInt(req.body.age));
    people.push(user);
    console.log('User added:', user);
    console.log('Current people array:', people);
    res.json(user);
}); 

app.get('/users/:age', (req, res) => {
    const age = parseInt(req.params.age);
    const user = people.find(p => p.age === age);
    res.json(user);
    console.log(people);
});

// Export for testing
module.exports = app;

// Only listen if this file is run directly
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

