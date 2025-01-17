export const inputValidationMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    console.log("Validation passed");
    next();
  } catch (error) {
    return res.status(error?.status || 400).send({
      status: "FAILED",
      data: {
        error: error.errors.map((error) => ({
          path: error.path,
          message: error.message,
        })),
      },
    });
  }
};
