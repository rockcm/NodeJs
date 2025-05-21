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

app.get('/', (req, res) => { 
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send(people);
});

app.post('/users', (req, res) => {
    const user = new Person(req.body.name, parseInt(req.body.age));
    people.push(user);
    console.log('User add   ed:', user);
    console.log('Current people array:', people);
    res.send(user);
}); 

app.get('/users/:age', (req, res) => {
    const age = parseInt(req.params.age);
    const user = people.find(p => p.age === age);
    res.send(user);
    console.log(people);
});



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
