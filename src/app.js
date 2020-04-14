const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  
  const {title, url, techs} = request.body
  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository)
  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  
  const {id} = request.params
  const {title, url, techs} = request.body
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0){
    return response.status(400).json({error: `Repository ID ${id} not found`})
  }
  const repository = repositories.find(repository => { 
    if (repository.id === id) {
      repository.title = title
      repository.url = url
      repository.techs = techs
      return repository
    }
  })
  repositories[repositoryIndex] = repository
  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0){
    return response.status(400).json({error: `Repository ID ${id} not found`})
  }
  repositories.splice(repositoryIndex, 1)
  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {

  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0){
    return response.status(400).json({error: `Repository ID ${id} not found`})
  }

  const repository = repositories.find(repository => {
    if (repository.id === id){
      repository.likes++
      return repository
    }
  })
  return response.json(repository)

});

module.exports = app;
