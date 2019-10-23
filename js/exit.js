const sanitize = require("mongo-sanitize");
const Participant = require("./participant.js");

function exit(req, res) {
  const id = sanitize(req.body.id);
  const blindspots = sanitize(req.body.blindspots);
  const stopping_distance = sanitize(req.body.stopping_distance);
  const texting_risk = sanitize(req.body.texting_risk);

  if (id !== undefined && blindspots !== undefined && stopping_distance !== undefined && texting_risk !== undefined) {
    Participant.findOne({ id: id }, function(err, participant) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error finding the participant" });
      } else {
        if (participant) {
          participant.active = false;
          participant.blindspots = blindspots;
          participant.stopping_distance = stopping_distance;
          participant.texting_risk = texting_risk;
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

module.exports = exit;
