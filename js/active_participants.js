const Participant = require("./participant.js");

function participants(req, res) {
  Participant.find({ active: true }, function (err, participants) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "There was an error finding participants" });
    } else {
      if (participants) {
        res.status(200).json({ participants });
      }
    }
  })
}

module.exports = participants;