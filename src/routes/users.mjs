import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { creatUserValidationSchema } from "../utils/validationSchemas.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";

const router = Router();

// router.get("/api/user",
//     query("filter")
//     .isString()
//     .notEmpty()
//     .withMessage("Must not be empty")
//     .isLength({ min: 3, max: 10 })
//     .withMessage("Must be at least 3-10 character"),
//   (request, response) => {
//     console.log(request.session);
//     console.log(request.session.id);
//     request.sessionStore.get(request.session.id, (err, sessionData) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//       console.log(sessionData);
//     })
//     const result = validationResult(request);
//     //console.log(request);
//     console.log(result);
//     const {
//       query: { filter, value },
//     } = request;

//     if (filter && value)
//       return response.send(
//         mockUsers.filter((user) => user[filter].includes(value))
//       );

//     return response.send(mockUsers);
//   }
// );

/*router.post(
  "/api/user", checkSchema(creatUserValidationSchema),
  (request, response) => {
    
    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty())
      return response.status(400).send({ error: result.array() });

    const data = matchedData(request);
    //console.log(data);

    // const { body } = request;
    const newuser = {
      id: mockUsers[mockUsers.length - 1].id + 1,
      ...data,
    };
    mockUsers.push(newuser);
    return response.status(201).send(newuser);
  }
);*/

// router.post("/api/user",checkSchema(creatUserValidationSchema),
//   async (request, response) => {
//   const result = validationResult(request);

//   if (!result.isEmpty()) return response.status(400).send(result.array());
//   const data = matchedData(request);
//   // const { body } = request;
//   console.log(data);
//   data.password = hashPassword(data.password);
//   console.log(data);
//   const newUser = new User(data);
//   try {
//     const savedUser = await newUser.save();
//     return response.status(201).send(savedUser);
//   } catch (err) {
//     console.log(err);
//     return response.sendStatus(400);
//   }
// });

router.get("/api/user",
  query("filter")
  .isString()
  .notEmpty()
  .withMessage("Must not be empty")
  .isLength({ min: 3, max: 10 })
  .withMessage("Must be at least 3-10 character"),
(request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.sessionStore.get(request.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  })
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
}
);


router.post("/api/user", checkSchema(creatUserValidationSchema), async (request, response) => {
  const result = validationResult(request);

  if (!result.isEmpty()) return response.status(400).send(result.array());

  const data = matchedData(request);
  console.log('Matched data:', data);

  try {
      if (!data.password) {
          console.error('Password is missing from the request data');
          return response.status(400).send({ error: 'Password is required' });
      }

      data.password = hashPassword(data.password); // Hash the password
      console.log('Data with hashed password:', data);
      
      const newUser = new User(data); // Use 'data' instead of 'body'
      const savedUser = await newUser.save();
      console.log('Saved user:', savedUser);
      return response.status(201).send(savedUser);
  } catch (err) {
      console.error('Error while saving user:', err);
      return response.sendStatus(400);
  }
});

router.get(
  "/api/user/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

router.put("/api/user/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

  return response.sendStatus(200);
});

router.patch("/api/user/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return response.sendStatus(200);
});

router.delete("/api/user/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);

  return response.sendStatus(200);
});

export default router;