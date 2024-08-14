module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal server error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "Invalid Input":
    case "Email is required":
    case "Password is required":
      status = 400;
      message = err.name;
      break;
    case "Invalid email/password":
      status = 401;
      message = err.name;
      break;
    case "Invalid token":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "Data not found":
    case "Hero not found":
      status = 404;
      message = err.name;
      break;
  }
  res.status(status).json({ message });
};
