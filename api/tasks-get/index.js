module.exports = async function (context, req) {
    const mongoClient = require("mongodb").MongoClient;
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const user = JSON.parse(decoded);
    const client = await mongoClient.connect(process.env.COSMOSDB_CONNECTION_STRING);
    const database = client.db("tp_task");
    const response = await database.collection("tasks").find({
        userId: user.userId
    });
    
    const tasks = await response.toArray();
    context.log('JavaScript HTTP trigger function processed a request.');

    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: tasks
    };
}