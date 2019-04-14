var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path')
var os = require('os');



slash = "";

if(os.platform() == 'win32')
{
  slash = '\\'
}
else
{
  slash = '/'
}

//Basic code to determine if a number is
//between values
Number.prototype.between = function(a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this >= min && this <= max;
};

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

function asyncRandomFile(filePath) {
  return new Promise(function(resolve, reject)  {
    fs.readdir(filePath, function (err,files){
      if(err) return console.log("asyncRandomFailed")
      var randFile = files[Math.floor(Math.random() * files.length)]
      while(path.extname(randFile) == '.ini')
      {
        randFile = files[Math.floor(Math.random() * files.length)];
      }
      if (err) reject(err);
      else resolve(randFile);
    });
  });
};



app.get('/', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

app.use(express.static(__dirname))


io.on('connection', function(socket){


  socket.on('upload',function(data){
    name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    filePath = path.join(__dirname, 'uploads', name+'.png')
    fs.writeFile(filePath, data, {encoding: 'base64'}, function(err) {
    console.log('File created');
});
  })

  socket.on('getProfile',function(profileName) {
    profileName = profileName.profileName
    var profileName = profileName.replace(/[^\w]/gi, '')
    console.log(profileName)
    currentPath = __dirname+ slash + 'profiles'
    profileList = fs.readdirSync(currentPath)
    if(profileList.includes(profileName + '.json'))
    {
      console.log("profile name is " + profileName)
      file = currentPath+slash+profileName + '.json';
      fs.readFile(file, function (err, data) {
        if (err) return console.error(err + "THIS BROKE");
         profile = JSON.parse(data)
         console.log(data, "this is data")
         console.log(JSON.parse(data), "this is JSON")
         socket.emit('sendProfile',{profile: profile, name: profileName})
      });
    }
    else
    {
      console.log(currentPath+slash+profileName+'.json')
      categoriesPromise = new Promise(function(resolve, reject) {
        fs.readdir(__dirname+slash+'memes', function(err, folders) {
          categories = {}
          for(folder of folders)
          {
            if(path.extname(folder) != '.ini')
              categories[folder] = 0;
          }
          console.log(JSON.stringify(categories))
          if (err) reject(err);
          else resolve(categories);
        })
      })
      categoriesPromise.then(function(result) {
        console.log(categories)
        fs.writeFile(currentPath+slash+profileName+'.json',JSON.stringify(categories),function(err){
          if(err) return console.log("file created?")
          else {
            console.log(result)
            socket.emit('sendProfile',{profile: result, name:profileName})
          }
        })
      },
      function(err) {console.log(err)}) //If promise does not resolve

    }
  });

  socket.on('updateProfile', function(data)
  {
    fs.readdir(__dirname+slash+'memes', function(err, folders) {
        for(folder of folders)
        {
          profile = data.profile;
          console.log(profile)
          profileName = data.profileName;
          if(path.extname(folder) != '.ini')
          {


            first = profile.first;
            second = profile.second;
            third = profile.third;
            fourth = profile.fourth;
            contender = profile[folder];
            if(first == undefined || contender >= profile[profile.first])
            {
              profile.first = folder;
            }
            else if(second == undefined || contender >= profile[profile.second])
            {
              if(folder != profile.first)
                profile.second = folder;
            }
            else if(third == undefined || contender >= profile[profile.third])
            {
              if(folder != profile.second && folder != profile.first)
                profile.third = folder;
            }
            else if(fourth == undefined || contender >= profile[profile.fourth])
            {
              if(folder != profile.third && folder != profile.second && profile.first)
                profile.fourth = folder;
            }

          }
        }
        currentPath = __dirname+slash+'/profiles'+slash+profileName+'.json'
        fs.writeFile(currentPath,JSON.stringify(profile),function(err){
          if(err) return console.log("file created?")
          else {
            console.log(profile, "result of profile")
            socket.emit('getUpdate', {profile:profile})
          }
        })

    })
  })

  socket.on('sendMeme', function(data){
    decision = 0;
    category = undefined;
    console.log(data, "this is send meme data")
    profileName = data.profileName;
    profileData = data.profile;
    filePath = __dirname + slash +'memes'; //sets up the file path
    console.log("this is reqData" ,data)

    if(profileName == "")
    {
      decision = 0; //automatically send them random memes
    }
    else if(profileData != undefined)
    {
      decision = Math.floor(Math.random() * 101);
      if(decision.between(100,95) && profileData.first != undefined)
        category = profileData.first
      else if(decision.between(94,90) && profileData.second != undefined)
        category = profileData.second
      else if(decision.between(89,85) && profileData.third != undefined)
        category = profileData.third
      else if(decision.between(84,80) && profileData.fourth != undefined)
        category = profileData.fourth

    }
    if(category != undefined)
    {
      console.log(profileData)
      filePath+= slash + profileData.first;
      console.log(filePath, "testing new branch")
      filePromise = asyncRandomFile(filePath)
      filePromise.then(function(result){
        fileName = result;
        filePath+= slash+ fileName;
        fs.readFile(filePath, function(err, data) {
          if(err) return "yo this fucked up"
          io.emit('gotMeme', {buffer: data.toString('base64'),
                              loading: data.loading,category:category})
        })
        },function(err) {return console.log("error, failed to load meme")}
      );
    }
    else
    {
      folderPromise = asyncRandomFile(filePath)
      folderPromise.then(function(result) {
        category = result // Save the category for later
        filePath+= slash + category;
        filePromise = asyncRandomFile(filePath)
        filePromise.then(function(result){
          fileName = result;
          filePath+= slash+ fileName;
          fs.readFile(filePath, function(err, data) {
            if(err) return "yo this fucked up"
            io.emit('gotMeme', {buffer: data.toString('base64'),
                                loading: data.loading,category:category})
          })
          },function(err) {
              console.log(err) //resolves second promise
          })
        }, function(err) {
        console.log(err); // resolves first
      });
    }

  });
});

app.get('/front', function(req, res){
  res.sendFile(__dirname + '/frontend.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
