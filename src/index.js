const express = require("express");
const { query, validationResult, body, matchedData} = require("express-validator");

//import express from "express";

//import { query } from "express-validator";

const app = express();
app.use(express.json());

/*                                  Middle Ware                                     */

const loggingMiddleWare = (request, response, next) => {
  console.log(`${request.method} - ${request.url} `);
  next();
};

const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
  next();
};

app.get("/api/user/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.put("/api/user/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

  return response.sendStatus(200);
});

app.patch("/api/user/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return response.sendStatus(200);
});

app.delete("/api/user/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);

  return response.sendStatus(200);
});

/* --------------------------------------------Validation ------------------------------------------------------------------- */
app.get(
  "/api/user",
  query('filter')
  .isString()
  .notEmpty()
  .withMessage("Must not be empty")
  .isLength({min:3, max:10})
  .withMessage("Must be at least 3-10 character"),
  (request, response) => {
  const result = validationResult(request);
  //console.log(request);
  console.log(result);
  const {
    query: { filter, value },
  } = request;

  if (filter && value)
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );

  return response.send(mockUsers);
});

//const port = 3000;

const PORT = process.env.PORT || 3000;

const mockUsers = [
  {
    id: 1,
    username: "hercules",
    displayName: "hercules",
  },
  {
    id: 2,
    username: "nileh",
    displayName: "nileh",
  },
  {
    id: 3,
    username: "layav",
    displayName: "layav",
  },
  {
    id: 4,
    username: "hellen",
    displayName: "hellen",
  },
  {
    id: 5,
    username: "jack",
    displayName: "jack",
  },
  {
    id: 6,
    username: "uden",
    displayName: "uden",
  },
];

// app.get('/',loggingMiddleWare, (request, response, next) => {
//   console.log("Base URL");
//   next();
// }, (request, response) => {
//   response.status(201).send({ msg: "Hello"});
// });

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

//--------------------------------post request-------------------------------------------------
// app.post("/api/user", (request, response) => {
//   //console.log(request.body);
//   const { body } = request;
//   const newuser = {
//     id: mockUsers[mockUsers.length - 1].id + 1,
//     ...body,
//   };
//   mockUsers.push(newuser);
//   return response.status(201).send(newuser);
// });

app.post("/api/user",
  [
 body("username").notEmpty().withMessage("Must not be emoty")
.isLength({min: 5, max:32})
.withMessage("Username must be have at least 3-32 character")
.isString()
.withMessage("Username must be string"),
body('displayName').notEmpty(),
  ],
 (request, response) => {
  const result = validationResult(request);
  console.log(result);

  if (!result.isEmpty())
    return response.status(400).send({error: result.array()});
  
  const data = matchedData(request);
  console.log(data);

  // const { body } = request;
  const newuser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...body,
  };
  mockUsers.push(newuser);
  return response.status(201).send(newuser);
});

app.use(loggingMiddleWare, (request, response, next) => {
  console.log("Logging...");
  next();
});

//--------------------------------------------get request-------------------------------------
// app.get("/api/user", (request, response) => {
//   //response.send(mockUsers);
//   console.log(request.query);
//   const {
//     query: { filter, value },
//   } = request;
//   // when filter value undefined
//   if (!filter && !value) return response.send(mockUsers);
//   if (filter && value)
//     return response.send(
//       mockUsers.filter((user) => user[filter].includes(value))
//     );

//   return response.send(mockUsers);
// });

// app.get('/api/user/:id', (request, response) => {
//   console.log(request.params);
//   const parsedId = parseInt(request.params.id);
//   console.log(parsedId);
//   if (isNaN(parsedId))
//     return response.status(400).send({msg: 'Bad Request. Invalid ID'});
//   const findUser = mockUsers.find((user) => user.id === parsedId);
//   if (!findUser)
//     return response.sendStatus(404);
//   return response.send(findUser);

// });

// ------------------------------put request-----------------------------------------------------
// app.put("/api/user/:id", (request, response) => {
//   const {
//     body,
//     params: { id },
//   } = request;
//   const parsedId = parseInt(id);
//   if (isNaN(parsedId)) return response.sendStatus(400);
//   const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

//   if (findUserIndex === -1) return response.sendStatus(404);

//   mockUsers[findUserIndex] = { id: parsedId, ...body };

//   return response.sendStatus(200);
// });

// -------------------------------patch request ------------------------------------------------------

// app.patch("/api/user/:id", (request, response) => {
//   const {
//     body,
//     params: { id },
//   } = request;
//   const parsedId = parseInt(id);
//   if (isNaN(parsedId)) return response.sendStatus(400);
//   const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

//   if (findUserIndex === -1) return response.sendStatus(404);

//   mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

//   return response.sendStatus(200);

// });

// -----------------------------------delete request-------------------------------------------------------------
app.delete("/api/user/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);

  mockUsers.splice(findUserIndex, 1);

  return response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
