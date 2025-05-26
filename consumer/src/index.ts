import dotenv from "dotenv";
import {SQSClient,ReceiveMessageCommand,DeleteMessageCommand} from "@aws-sdk/client-sqs";


dotenv.config();


const sqs = new SQSClient({
    region:process.env.AWS_REGION!,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
    }
});


const queue_url = process.env.AWS_QUEUE_URL!


async function poll(){
    const {Messages} = await sqs.send(new ReceiveMessageCommand({
        QueueUrl:queue_url,
        MaxNumberOfMessages:1,
        WaitTimeSeconds:20
    }));

    if(!Messages || Messages.length === 0) return;

    console.log("*********************************")
    console.log(Messages)
    
    const msg:any = Messages[0];
    
    const body = JSON.parse(msg.Body);
    
    body?.Records?.map((e:any)=>{
        console.log("ffffff",e)
        if(!e){
            console.log("No Process");
            return;
        }
        
        const bucket = e.s3.bucket.name;
        const key = e.s3.object.key;
        let url = `https://${bucket}.s3.amazonaws.com/${key}`
        console.log("Final URL : ",url);  
        })
    
}


poll()