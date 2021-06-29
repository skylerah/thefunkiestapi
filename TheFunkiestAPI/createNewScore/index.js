const CosmosClient = require("@azure/cosmos").CosmosClient;

let endpoint = "https://thefunkiestapiv2.documents.azure.com:443/"
let key = "RakdTJnGSpQscCevzVR2wT05SNboJzk5bpOv916IKmLDC8L7lPau7Mq7fXjfNXZLSG5WlA4KZ2SPJN7dgNebVA=="
let databaseId = "ScoreDB"
let containerId = "Score"

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

const querySpec = {
    query: "SELECT * from c"
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let newItem = {
        "name": req.query.name,
        "score": 0
    }
    
    const { resource: createdItem } = await container.items.create(newItem);

    const responseMessage = "You just successfully inserted an item into CosmosDB! Yay!"

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}