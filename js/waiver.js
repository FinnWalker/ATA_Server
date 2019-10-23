const sanitize = require("mongo-sanitize");
const Participant = require("./participant.js");
const uuid = require("uuid");

function waiver(req, res) {

    const name = sanitize(req.body.name);
    const age = sanitize(req.body.age);
    const email = sanitize(req.body.email);
    const gender = sanitize(req.body.gender);
    const regional = sanitize(req.body.regional);
    const urban = sanitize(req.body.urban);
    const learner = sanitize(req.body.learner);
    const p1 = sanitize(req.body.p1);
    const p2 = sanitize(req.body.p2);
    const full_license = sanitize(req.body.full_license);
    const not_driving = sanitize(req.body.not_driving);

    if (
        name !== undefined &&
        age !== undefined &&
        email !== undefined &&
        gender !== undefined && 
        regional !== undefined &&
        urban !== undefined &&
        learner !== undefined &&
        p1 !== undefined &&
        p2 !== undefined &&
        full_license !== undefined &&
        not_driving !== undefined
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
            vr: false,
            regional: (regional==="1")?true:false,
            urban: (urban==="1")?true:false,
            learner: (learner==="1")?true:false,
            p1: (p1==="1")?true:false,
            p2: (p2==="1")?true:false,
            full_license: (full_license==="1")?true:false,
            not_driving: (not_driving==="1")?true:false,
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
