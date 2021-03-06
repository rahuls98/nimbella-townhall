const mongoose = require('mongoose');
const URI = ""

const EventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    issueId: mongoose.Schema.Types.ObjectId,
    participants: [{userId:String ,name: String}]
});
const Events = mongoose.model('Events', EventSchema);

async function main(args) {
    try {
        await mongoose.connect(
            URI,
            {useUnifiedTopology: true, useNewUrlParser: true}
        );

        const qid = args.qid;

        const result = await Events.find({_id: qid})
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