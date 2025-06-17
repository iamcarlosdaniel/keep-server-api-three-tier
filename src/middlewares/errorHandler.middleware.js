const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: "failed",
    error: [
      {
        message:
          err.userErrorMessage ||
          "An error occurred while processing your request. Please try again later.",
      },
    ],
  });
};

export default errorHandler;
