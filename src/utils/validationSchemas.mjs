export const creatUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters with a max of 32 character",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: " Username must be string",
    },
  },
  displayName: {
    notEmpty: true,
  },
};