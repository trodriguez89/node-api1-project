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
      if (!hubs) {
        response.status(404).json({ message: "The user with the specified ID does not exist." })
      } else {
        response.status(200).json(hubs);
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })
});

// POST request
server.post("/api/users", (request, response) => {
  // const {name, bio} = request.body;
  const info = request.body
  if (!info.name || !info.bio) {
    response.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    Hubs.insert(info)
      .then(hub => {
        response.status(201).json(hub)
      })
      .catch(error => {
        console.log(error)
        response.status(500).json({ errorMessage: "The user could not be removed" })
      })
  }
});

// DELETE request
server.delete("/api/users/:id", (request, response) => {
  const id = request.params.id;
  Hubs.findById(id)
  .then(user => {
    if(!user){
      response.status(404).json({ errorMessage: "The user with that specified ID does not exist."})
    } else {
      Hubs.remove(id)
      .then(deleted => {
        response.status(201).json({ message: "User successfully removed", deleted})
      })
      .catch(error => {
        console.log(error)
        response.status(500).json({errorMessage: "The user could not be removed."})
      })
    }
  })
});

// PUT request
server.put("/api/users/:id", (request, response) => {
  const id = request.params.id;
  const info = request.body;
  Hubs.findById(id)
    .then(user => {
      if (!user) {
        response.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
      } else if (!info.name || !info.bio) {
        response.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      } else {
        Hubs.update(id, info)
          .then(hub => {
            response.status(200).json(hub)
          })
          .catch(error => {
            console.log(error)
            response.status(500).json({ errorMessage: "The user information could not be modified" })
          })
      }
    })
});

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port}`));