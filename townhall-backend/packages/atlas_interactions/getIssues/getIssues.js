const mongoose = require('mongoose');
const URI = "mongodb+srv://townhallAdmin:townhallAdmin123@cluster0.erhvs.mongodb.net/TownhallDB?retryWrites=true&w=majority"

const IssueSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    submittedBy: String,
    attachedMedia: [String]
});
IssueSchema.index({ location: "2dsphere" });
const Issues = mongoose.model('Issues', IssueSchema);

async function main(args) {
    try {
        await mongoose.connect(
            URI,
            {useUnifiedTopology: true, useNewUrlParser: true}
        );

        const minD = args.minD;
        const maxD = args.maxD;
        const long = args.long;
        const lat = args.lat;

        const results = await Issues.find({
            location: {
                $near: {
                    $minDistance: minD,
                    $maxDistance: maxD,
                    $geometry: {
                        type: "Point",
                        coordinates: [long, lat]
                    }
                }
            }
        })
        if(results) {
            return { 
                statusCode: 200,
                headers: {"Content-Type": "application/json"},
                body: {success:true, res:results}
            } 
        };
    } catch(err) {
        return { 
            statusCode: 500,
            headers: {"Content-Type": "application/json"},
            body: {success:false, err}
        }
    }
}

exports.main = main;