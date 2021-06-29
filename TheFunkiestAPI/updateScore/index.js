const CosmosClient = require("@azure/cosmos").CosmosClient;

let endpoint = "https://thefunkiestapiv2.documents.azure.com:443/"
let key = "RakdTJnGSpQscCevzVR2wT05SNboJzk5bpOv916IKmLDC8L7lPau7Mq7fXjfNXZLSG5WlA4KZ2SPJN7dgNebVA=="
let databaseId = "ScoreDB"
let containerId = "Score"

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

module.exports = async function (context, req) {

    //Increments a specific score inside the CosmosDB collection, based on id of the entry.
    let querySpec = {
        query: "SELECT * FROM Scores s WHERE s.name =" + "'" + req.query.name + "'"
    }

    const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();
    
    let scoreObj = items[0];
    let scoreId = scoreObj.id
    let scoreValue = scoreObj.score

   scoreObj.score= scoreValue + 1;
    
    const { resource: updatedItem } = await container
        .item(scoreId)
        .replace(scoreObj);

    const responseMessage = "You have successfully increased the score by 1!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}