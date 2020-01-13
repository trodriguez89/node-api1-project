// implement your API here

const express = require("express");

const Hubs = require("./data/db");

const server = express();

server.use(express.json());

server.get("/", (request, response) => {
    response.send({
        hello: "Web 25 afternoon project!"
    })
});

// GET request
server.get("/api/users", (request, response) => {
    Hubs.find()
    .then(hubs => {
        response.status(200).json(hubs)
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({ errorMessage: "sorry, we ran into an error getting the list of users"})
    })
});

server.get("/api/users/:id", (request, response) => {
    const id = request.params.id;
    Hubs.findById(id)
    .then(hubs => {
        response.status(200).json(hubs)
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({ errorMessage: "sorry, we ran into an error fetching a specific user"})
    })
});

// POST request
server.post("/api/users", (request, response) => {
    const hubData = request.body;
    Hubs.add(hubData)
    .then(hub => {
        response.status(201).json(hub)
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({ errorMessage: "sorry, we ran into an error removing a user"})
    })
});

// DELETE request
server.delete("/api/users/:id", (request, response) => {
    const id = request.params.id;
    Hubs.remove(id)
    .then(deleted => {
        response.status(204).json(deleted)
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({ errorMessage: "sorry, we ran into an error removing a user"})
    })
});


const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port}`));