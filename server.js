var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path')

//Name: randomMeme, expects folder, returns filename
//Purpose: returns a random meme when the user fails to get a top 4
 function randomFile(filePath) {
  randFile = ""
  files = fs.readdirSync(filePath)
  var randFile = files[Math.floor(Math.random() * files.length)]
  while(path.extname(randFile) == '.ini')
  {
    randFile = files[Math.floor(Math.random() * files.length)];
  }
  return randFile

}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

io.on('connection', function(socket){
  socket.on('sendMeme', function(userProfile){

    filePath = __dirname + '\\memes'; //sets up teh file path
    fs.readdir(filePath, function(err, folders) {
      if(userProfile.initalized == false)
      {
        for(folder of folders)
        {
          if(path.extname(folder) != '.ini')
            userProfile.profile[folder] = 0;
        }
      }
    })
    filePath +=  '\\' + randomFile(filePath)
    filePath += '\\' + randomFile(filePath)

    //filePath += randomFile(filePath)
   // gets a random folder from "memes"

    //filePath += randomFile(filePath) //Gets a random meme from that folder
      fs.readFile(filePath, function(err, data) {
        io.emit('getMeme', {image:true, buffer: data.toString('base64'),
                            userProfile: userProfile})
      })
    });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
