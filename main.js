// node main.js basic api file
const express = require('express');
const cors = require('cors');

class Person {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

const person = new Person(1, "John Doe", 30);
const person2 = new Person(2, "Jane Doe", 25);

const people = [person, person2];
console.log(people);
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { 
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

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = people.find(p => p.id === id);
    res.json(user);
});

// Export for testing
module.exports = app;

// Only listen if this file is run directly
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}
