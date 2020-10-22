const mongoose = require('mongoose');
const URI = "" //MongoDB database connection

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

        const _id = mongoose.Types.ObjectId();
        const title = args.title;
        const location = args.location;
        const description = args.description;
        const submittedBy = args.submittedBy;
        const attachedMedia = args.attachedMedia;
        
        let issue = new Issues({ _id,title,location,description,submittedBy,attachedMedia });
        const new_issue = await issue.save();
        if(new_issue === issue) {
            return { 
                statusCode: 200,
                headers: {"Content-Type": "application/json"},
                body: {success:true, res:new_issue}
            } 
        }
    } catch(err) {
        return { 
            statusCode: 500,
            headers: {"Content-Type": "application/json"},
            body: {success:false, err}
        }
    }
}

exports.main = main;