var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path')
var os = require('os');


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
  socket.on('sendMeme', function(reqData){

    if(os.platform() == 'win32')
    {
      slash = '\\'
    }
    else
    {
      slash = '/'
    }

    filePath = __dirname + slash +'memes'; //sets up teh file path
    fs.readdir(filePath, function(err, folders) {
      console.log(reqData.profile + "this is the profile")
      if(reqData.initalized == false)
      {
        for(folder of folders)
        {
          if(path.extname(folder) != '.ini')
            reqData.profile[folder] = 0;
        }
      }
      else
      {
        for(folder of folders)
        {

          if(path.extname(folder) != '.ini')
          {

            first = reqData.profile['1st'];
            second = reqData.profile['2nd'];
            third = reqData.profile['3rd'];
            fourth = reqData.profile['4th'];
            contender = reqData.profile[folder];
            if(first == undefined || contender > reqData.profile[first])
            {
              reqData.profile['1st'] = folder;
              console.log(reqData.profile['1st']);
            }
            else if(second == undefined || contender > reqData.profile[second])
            {
              reqData.profile['2nd'] = folder;
            }
            else if(third == undefined || contender > reqData.profile[third])
            {
              reqData.profile['3rd'] = folder;
            }
            else if(second == undefined || contender > reqData.profile[fourth])
            {
              reqData.profile['4th'] = folder;
            }
          }
        }
        console.log(reqData.profile)
      }
    })
    decision = Math.floor(Math.random() * 100);//Separate our probability space into a scale of 0-99


      filePath +=  slash + randomFile(filePath) //get a random folder
      filePath += slash+ randomFile(filePath) // get a random image





    //Gets a random meme from that folder
      fs.readFile(filePath, function(err, data) {
        io.emit('gotMeme', {image:true, buffer: data.toString('base64'),
                            userProfile: reqData.profile,initalized:true} )
      })
    });
});

app.get('/front', function(req, res){
  res.sendFile(__dirname + '/frontend.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
