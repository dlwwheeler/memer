var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path')

//Name: randomMeme, expects folder, returns filename
//Purpose: returns a random meme when the user fails to get a top 4
function randomMeme(folders)
{
  var randFolder = folders[Math.floor(Math.random() * folders.length)];
  while(path.extname(randFolder) == '.ini')
  {
    randFolder = folders[Math.floor(Math.random() * folders.length)];
  }
  filePath += '\\' + randFolder + '\\';
  fs.readdir(filePath,function(err,files) {

    var randFile = files[Math.floor(Math.random() * files.length)]
    while(path.extname(randFile) == '.ini')
    {
      randFile = files[Math.floor(Math.random() * files.length)];
    }
}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('sendMeme', function(userProfile){

      filePath = __dirname + '\\memes';
      console.log(filePath)
      fs.readdir(filePath, function(err, folders) {
        if(userProfile.initalized == false)
        {
          for(folder of folders)
          {
            if(path.extname(folder) != '.ini')
              userProfile.profile[folder] = 0;
          }
        }




          filePath+=randFile;
            fs.readFile(filePath, function(err, data) {
              console.log(data)
              io.emit('getMeme', {image:true, buffer: data.toString('base64'),
                                  userProfile: userProfile})
          });
        });
      });
    });
});

      //io.emit("SWAG", { image: true, buffer: buf.toString('base64') });

app.get('/front', function(req, res){
  res.sendFile(__dirname + '/frontend.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
