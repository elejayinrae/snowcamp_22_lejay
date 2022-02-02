module.exports = async function (context, req) {
    const mongoClient = require("mongodb").MongoClient;
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