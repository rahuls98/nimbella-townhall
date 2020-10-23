const mongoose = require('mongoose');
const URI = ""

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
    discussions: [{name: String, comment: String}],
    attachedMedia: [String]
});
const Issues = mongoose.model('Issues', IssueSchema);

async function main(args) {
    try {
        await mongoose.connect(
            URI,
            {useUnifiedTopology: true, useNewUrlParser: true}
        );

        const qid = args.qid;
        const discussionObj = args.discussionObj;
        
        const res = await Issues.update(
            {_id: qid},
            {$push: {discussions: discussionObj}} 
        );
        if(res) {
            return { 
                statusCode: 200,
                headers: {"Content-Type": "application/json"},
                body: {success:true, res}
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