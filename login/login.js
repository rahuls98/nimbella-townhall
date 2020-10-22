var jwt = require('jsonwebtoken');

function main(params) {
    const usn = params.usn;
    const pwd = params.pwd;
    if(usn==="admin" && pwd==="admin123") {
        var token = jwt.sign({ usn, pwd }, 'nimbellaSecret');
        return { 
            statusCode: 200,
            headers: {"Content-Type": "application/json"},
            body: {success:true, msg:"authorized", token}
        }
    } else {
        return { 
            statusCode: 401,
            headers: {"Content-Type": "application/json"},
            body: {success:false, msg:"unauthorized"} 
        }
    }
}

exports.main = main;