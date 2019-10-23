const sanitize = require("mongo-sanitize");
const Participant = require("./participant.js");

function play(req, res) {
  console.log(req.body);
  const video = sanitize(req.body.video);
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
          if(video === "1")
          {
            participant.video_1 = true;
          }
          else if(video === "2")
          {
            participant.video_2 = true;
          }
          else if (video === "3")
          {
            participant.video_3 = true;
          }
          else if (video === "4")
          {
            participant.video_4 = true;
          }
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

module.exports = play;
