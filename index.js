const port = process.env.PORT || 10000;
const server = require("http").Server();

var io = require("socket.io")(server);

// var allusersRoom1 = [];
// var allusersRoom2 = [];

var allRooms = {};


io.on("connection", function(socket){
   console.log("someone is connected");
    // allusers.push(socket.id);
    // commnad out for allusers

    // only when they join the room
    socket.on("joinroom", function(data){
        socket.emit("yourid", socket.id);
        socket.join(data);
        //io.emit("createimage", allusers);
        socket.myRoom = data;

        // dynamically creates objects inside an array
        if(!allRooms[data]){
            allRooms[data] = [];
        }

        allRooms[data].push(socket.id);
        io.to(data).emit("createimage", allRooms[data]);

        // it is code only for room1 and room2
        // if (data =="room1") {
        //     allusersRoom1.push(socket.id);
        //     io.to(data).emit("createimage", allusersRoom1);
        // }else if(data =="room2"){
        //     allusersRoom2.push(socket.id);
        //     io.to(data).emit("createimage", allusersRoom2);
        // }
        
        console.log(data);

    });
    
    // console.log(allusers);

    socket.on("mymove", function(data){
        socket.to(this.myRoom).emit("usermove", data);
    });
    
    socket.on("disconnect", function(){
        var index = allRooms[this.myRoom].indexOf(socket.id);
        allRooms[this.myRoom].splice(index, 1);
        io.to(this.myRoom).emit("createimage", allRooms[this.myRoom]);
    });
    
    
});

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
       
    }
    
    console.log("port is running");
    
})