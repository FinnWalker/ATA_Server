const mongoose = require("./js/mongoose.js");

const Participant = require("./js/participant.js");

const fs = require('fs');
let events = require("events");

let content = "Name,Age,Gender,Email,Regional,Urban,License,Quiz Score,Turning Vehicles,Blindspots,Stopping Distance,True Stories,VR,Checkout\n";

Participant.find({ active: false }, function(err, participants) {
  if (err) {
    console.log(err);
    console.log("There was an error finding participants");
  } else {
    if (participants) {
      for (let participant of participants) {
        let license = "Not Driving";
        if(participant.p1) {
          license = "P1";
        } else if(participant.p2) {
          license = "P2";
        } else if(participant.full_license) {
          license = "Full License";
        }
        content += participant.name + ',' + participant.age + ',' + participant.gender + ',' + participant.email + ',' + participant.regional + ',' + participant.urban + ',' + license + ',' + participant.quiz + ',' + participant.video_1 + ',' + participant.video_2 + ',' + participant.video_3 + ',' + participant.video_4 + ',' + participant.vr + ',' + participant.blindspots + " " + participant.stopping_distance + " " + participant.texting_risk + '\n';
      }
      fs.writeFile('participants.csv', content, function (err) {
        if (err) throw err;
        const { exec } = require("child_process");
          exec("start participants.csv");
      });
    }
  }
});


