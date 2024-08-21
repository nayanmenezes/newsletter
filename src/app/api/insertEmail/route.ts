import AWS from 'aws-sdk';

require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_SECRET_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'newsletter-emails';

export async function POST(request: Request) {
    const { email } = await request.json();

    const params = {
        TableName: TABLE_NAME,
        Item: {email_address: email}
    }
  
    try{
        const res = await dynamoClient.put(params).promise();
        return new Response(JSON.stringify({status: "success"}));
    }catch(error){
        return new Response(JSON.stringify(error));
    }
    
  }
