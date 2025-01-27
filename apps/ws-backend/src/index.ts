import {OPEN, WebSocket,WebSocketServer} from "ws"
import jwt, { JwtPayload } from "jsonwebtoken"
const JWT_SECRET = "1232"
const wss = new WebSocketServer({port:8080});


wss.on('connection',function connection(ws,request){
    console.log("Client Connected!")

    const url = request.url;  // ws:localhost:3000?token=123542
    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1])   // .split["ws:localhost:3000","token=123542"]
    const token:string|any = queryParams.get('token');

    const decodedToken = jwt.verify(token,JWT_SECRET);
    if(typeof decodedToken === "string"){
        ws.close();
        return;
    }

    if(!decodedToken || !decodedToken.userId){
        ws.close();
        return;
    }
    if(decodedToken){
        // @ts-ignore
        req.userId = decodedToken.userId;
    }

    wss.clients.forEach((client)=>{
        if(client.readyState === OPEN){
            
        }
    })




    ws.send("i am connected!")

})

