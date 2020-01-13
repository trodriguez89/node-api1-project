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

// GET requests
server.get("/api/users", (request, response) => {
    Hubs.find()
    .then(hubs => {
        response.status(200).json(hubs)
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
});

server.get("/api/users/:id", (request, response) => {
    const id = request.params.id;
    Hubs.findById(id)
    .then(hubs => {
        if(!hubs){
            response.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            response.status(200).json(hubs);
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({ errorMessage: "The user information could not be retrieved."})
    })
});

// POST request
server.post("/api/users", (request, response) => {
    const {name, bio} = request.body;
    if(!name || !bio) {
        response.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        Hubs.insert(request.body)
        .then(hub => {
            response.status(201).json(hub)
        })
        .catch(error => {
            console.log(error)
            response.status(500).json({ errorMessage: "The user could not be removed"})
        })
    }
});

// DELETE request
server.delete("/api/users/:id", (request, response) => {
    const id = request.params.id;
    Hubs.remove(id)
    .then(deleted => {
        if(deleted){
            response.status(200).json({ message:"User successfully removed", deleted})
        } else {
            response.status(404).json({ errorMessage: "The user with that specified ID does not exist"})
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({ errorMessage: "The user could not be removed"})
    })
});

// PUT request


const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port}`));