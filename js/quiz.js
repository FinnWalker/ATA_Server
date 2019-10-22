const sanitize = require("mongo-sanitize");
const Participant = require("./participant.js");

function quiz(req, res) {
  const score = sanitize(req.body.score);
  const id = sanitize(req.body.id);

  if (score !== undefined && id !== undefined) {
    Participant.findOne({ id: id }, function(err, participant) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error finding the participant" });
      } else {
        if (participant) {
          participant.quiz = score;
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

module.exports = quiz;
