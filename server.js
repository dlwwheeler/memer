var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path')



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('sendMeme', function(data){
      if(data.intailized == false)
      filePath = __dirname + '\\memes';
      console.log(filePath)
      fs.readdir(filePath, function(err, folders) {
        var randFolder = folders[Math.floor(Math.random() * folders.length)];
        while(path.extname(randFolder) == '.ini')
          randFolder = folders[Math.floor(Math.random() * folders.length)];
        filePath += '\\' + randFolder + '\\';
        console.log(filePath, 'This is the file path')
        fs.readdir(filePath,function(err,files) {

          var randFile = files[Math.floor(Math.random() * files.length)]
          while(path.extname(randFile) == '.ini')
            randFile = files[Math.floor(Math.random() * files.length)];

          filePath+=randFile;
          console.log(filePath + "this is the file");
            fs.readFile(filePath, function(err, data) {
              console.log(data)
              io.emit('getMeme', {image:true, buffer: data.toString('base64')})
          });
        });
      });
    });
});

      //io.emit("SWAG", { image: true, buffer: buf.toString('base64') });




http.listen(3000, function(){
  console.log('listening on *:3000');
});
