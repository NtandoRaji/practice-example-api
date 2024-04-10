const express = require("express");
const app = express();
// if want to connect with local npm install cors
const cors = require("cors");
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
const PORT = process.env.PORT || 3000;

const persons = require("./persons.json");

let GlobalPersonCount = persons.length;

app.listen(PORT, () => {
    console.log("[+] Listening on port: ", PORT);
});

app.post("/persons/", (request, response) =>{
    const person = {
        id: GlobalPersonCount + 1,
        name: request.body.name,
        surname: request.body.surname,
        age: parseInt(request.body.age)
    }

    persons.push(person);
    GlobalPersonCount++;
    response.status(200).send(person);
});

app.get("/persons/:name", (request, response) => {
    const { name } = request.params;

    const person = persons.find(person => person.name == name);
    if (!person) {
        response.status(404).send("The person with the given name: " + name + " doesn't exist");
    }

    response.status(200).send(person);
});