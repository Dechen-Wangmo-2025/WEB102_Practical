// simple error handling middleware

module.exports = (err, req, res, next) => {
  console.log(err); // print error in terminal

  res.status(500).json({
    message: "Something went wrong"
  });
};
 //Catches errors
//Sends a proper response
//Makes your API more professional