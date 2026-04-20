// custom logger middleware

module.exports = (req, res, next) => {
  console.log(req.method + " " + req.url); // logs request
  next(); // move to next step
};

//Prints requests like: GET /api/users
//POST /api/videos
