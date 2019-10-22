const sanitize = require("mongo-sanitize");
const Participant = require("./participant.js");

function vr(req, res) {
  const id = sanitize(req.body.id);

  if (video !== undefined && id !== undefined) {
    Participant.findOne({ id: id }, function(err, participant) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error finding the participant" });
      } else {
        if (participant) {
         
          participant.vr = true;
          
          participant.save().then(() => {
            res.status(200).json({ participant });
          });
        } else {
          res.status(300).json({ message: "The participant was not found" });
        }
      }
    });
  } else {
    res.status(300).json({ message: "Please include all fields" });
  }
}

module.exports = vr;
