const express = require('express');
//import express from "express";

const app = express();

//const port = 3000;


const PORT = process.env.PORT || 3000;

const mockUsers=[
  {
    id: 1, username: "hercules", displayName: "hercules"
  },
  {
    id: 2, username: "nileh", displayName: "nileh"
  },
  {
    id: 3, username: "layav", displayName: "layav"
  },
  {
    id: 4, username: "hellen", displayName: "hellen"
  },
  {
    id: 5, username: "jack", displayName: "jack"
  },
  {
    id: 6, username: "uden", displayName: "uden"
  },
]


app.get('/', (request, response) => {
  response.status(201).send({ msg: "Hello"});
});

app.get('/api/user', (request, response) => {
  //response.send(mockUsers);
  console.log(request.query);
  const {
    query: {filter, value},
  } = request;
  // when filetr value undefined
  if (!filter && !value) 
    return response.send(mockUsers);
  if (filter && value)
    return response.send(
  mockUsers.filter((user) => user[filter].includes(value))
  );
  
  return response.send(mockUsers);
});

app.get('/api/user/:id', (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) 
    return response.status(400).send({msg: 'Bad Request. Invalid ID'});
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) 
    return response.sendStatus(404);
  return response.send(findUser);

});


app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
