const mongoose = require("mongoose");

const Participant = mongoose.model("Participant", {
  id: String,
  name: String,
  age: Number,
  email: String,
  gender: String,
  active: Boolean,
  quiz: Number,
  video_1: Boolean,
  video_2: Boolean,
  video_3: Boolean,
  video_4: Boolean,
  vr: Boolean,
  regional: Boolean,
  urban: Boolean,
  learner: Boolean,
  p1: Boolean,
  p2: Boolean,
  full_license: Boolean,
  not_driving: Boolean,
  blindspots: Number,
  stopping_distance: Number,
  texting_risk: Number
});

module.exports = Participant;