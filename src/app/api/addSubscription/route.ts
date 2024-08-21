import mailchimp from "@mailchimp/mailchimp_marketing";

require('dotenv').config();

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

export async function POST(request: Request) {

  const { email } = await request.json();
  console.log(process.env.MAILCHIMP_API_SERVER);

  if (!email) new Response(JSON.stringify({ error: "Email is required" }));

  

  try{
    const res = await mailchimp.lists.addListMember(String(process.env.MAILCHIMP_AUDIENCE_ID),
    {email_address: String(email), status: "subscribed"});

    return new Response(JSON.stringify({status: "success", email_address: email}));
  }
    catch(error){
      return new Response(JSON.stringify({error: error}));  
  }
  
}