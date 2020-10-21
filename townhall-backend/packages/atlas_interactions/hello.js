function main(args) { 
    return { 
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: {success:true, args}
    }
}