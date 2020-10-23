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

        const result = await Issues.find({_id: qid})
        if(result) {
            return { 
                statusCode: 200,
                headers: {"Content-Type": "application/json"},
                body: {success:true, res:result}
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