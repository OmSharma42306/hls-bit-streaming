import dotenv from "dotenv";
import {SQSClient,ReceiveMessageCommand,DeleteMessageCommand} from "@aws-sdk/client-sqs";
import {ECSClient,RunTaskCommand} from "@aws-sdk/client-ecs"


dotenv.config();

const sqs = new SQSClient({
    region:process.env.AWS_REGION!,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
    }
});

const ecs = new ECSClient({
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
    
    const msg:any = Messages[0];
    const body = JSON.parse(msg.Body);

    body?.Records?.map(async(e:any)=>{
        if(!e){
            console.log("No Process");
            return;
        }
        
        const bucket = e.s3.bucket.name;
        const key = e.s3.object.key;
        let url = `https://${bucket}.s3.amazonaws.com/${key}`
        console.log("Final URL : ",url);  
        await runTask(url);
        })

   await sqs.send(new DeleteMessageCommand({
            QueueUrl: queue_url,
            ReceiptHandle: msg.ReceiptHandle
        }));
    
}


poll()



// All ECS STUFF

async function runTask(s3Url:string){
    console.log(process.env.cluster!)
    console.log(process.env.taskDefinition!)
    console.log(process.env.subnets?.split(',')??[]!);
    console.log(process.env.containerName!);


    const cmd = new RunTaskCommand({
        cluster:process.env.cluster!,
        launchType:"FARGATE",
        taskDefinition:process.env.taskDefinition!,
        networkConfiguration:{
            awsvpcConfiguration:{
                subnets:process.env.subnets?.split(',')??[]!,
                assignPublicIp:"ENABLED"
            }
        },
        overrides:{
            containerOverrides:[
                {
                    name:process.env.containerName!,
                    environment:[
                        {name:"INPUT_URL",value:s3Url}
                    ]
                }
            ]
        }

    });

    await ecs.send(cmd);
}