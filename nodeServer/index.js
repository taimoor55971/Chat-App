
const Port=process.env.Port||3000;
const io = require("socket.io")(Port);
const express=require("express");
const users={};

const app=express()
// node crash  because of following codd
//   .use((req, res) => res.sendFile(__dirname +"/./index.html"))
//   .listen(Port, () => console.log(`Listening on ${Port}`));

// const IO = socketIO(app);

io.on('connection', socket => {

    socket.on('new-user-joined', name=>{
       
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send', message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})
console.log(`running on ${Port}`);