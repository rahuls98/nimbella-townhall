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

        const _id = mongoose.Types.ObjectId();
        const title = args.title;
        const description = args.description;
        const issueId = args.issueId;
        const participants = args.participants;
        
        let event = new Events({ _id,title,description,issueId,participants });
        const new_event = await event.save();
        if(new_event === event) {
            return { 
                statusCode: 200,
                headers: {"Content-Type": "application/json"},
                body: {success:true, res:new_event}
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