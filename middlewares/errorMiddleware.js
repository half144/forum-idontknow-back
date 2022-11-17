const errorMiddleware = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Algo deu errado";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    errorMessage,
  });
};

export default errorMiddleware;
