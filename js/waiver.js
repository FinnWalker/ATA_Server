const sanitize = require("mongo-sanitize");
const Participant = require("./participant.js");
const uuid = require("uuid");

function waiver(req, res) {

    const name = sanitize(req.body.name);
    const age = sanitize(req.body.age);
    const email = sanitize(req.body.email);
    const gender = sanitize(req.body.gender);

    if (
        name !== undefined &&
        age !== undefined &&
        email !== undefined &&
        gender !== undefined
    ) {
        const newParticipant = new Participant({
            id: uuid.v4(),
            name,
            age,
            email,
            gender,
            active: true,
            quiz: -1,
            video_1: false,
            video_2: false,
            video_3: false,
            video_4: false,
            vr: false
        });
        newParticipant.save().then(() => {
            res
                .status(200)
                .json({ message: "Player added", participant: newParticipant });
        });

    } else {
        res.status(300).json({ message: "Please include all fields" });
    }
}

module.exports = waiver;
