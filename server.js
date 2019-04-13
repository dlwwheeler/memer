var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('sendMeme', function(socket){
      fs.readdir(__dirname, function(err, folders) {
      var randFolder = folders[Math.floor(Math.random() * folders.length)];
      fs.readdir(__dirname+randFolder,function(err,files)) {
        randFile = files[Math.floor(Math.random() * files.length)]
      })
});

      //io.emit("SWAG", { image: true, buffer: buf.toString('base64') });
    })

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
