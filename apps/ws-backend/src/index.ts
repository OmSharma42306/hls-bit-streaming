import {WebSocket,WebSocketServer} from "ws"


const wss = new WebSocketServer({port:8080});


wss.on('connection',function connection(ws){
    console.log("Client Connected!")

    ws.on('message',function message(data,isBinary){
    
    
    
    wss.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN){
            client.send("hi")
            client.send(data,{binary:isBinary})
        }
        
    })


    })

    ws.send("i am connected!")

})

