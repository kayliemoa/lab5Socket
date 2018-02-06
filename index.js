const port = process.env.PORT || 10000;
const server = require("http").Server();

var io = require("socket.io")(server);

var allusers = [];


io.on("connection", function(socket){
   console.log("someone is connected");
    allusers.push(socket.id);
    
    socket.emit("yourid", socket.id);
    
    
    io.emit("createimage", allusers);
    
    console.log(allusers);

    socket.on("mymove", function(data){
        socket.broadcast.emit("usermove", data);
    });
    
    socket.on("disconnect", function(){
        var index = allusers.indexOf(socket.id);
        allusers.splice(index, 1);
        io.emit("createimage", allusers);
    });
    
    
});

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
       
    }
    
    console.log("port is running");
    
})