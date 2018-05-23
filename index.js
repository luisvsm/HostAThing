const express = require('express');
const app = express();
const fs = require('fs');
var playsockets = require("./playsockets/playsockets.js");
var port = 3000;
app.use('/p', express.static('html'));
app.use('/',  ProjectListing);

app.listen(port, () => console.log('Static hosting on port ' + port + '!'));

function ProjectListing(req, res){
    getDirs((dirs)=>{
        var returnHtml = "";
        for (var i = 0; i < dirs.length; i++) {
            returnHtml += '<a href="/p/' + dirs[i] + '">' + dirs[i] + '</a>';
        }
        res.send(returnHtml);
    });
}

function getDirs(callback) { 
    var rootDir = __dirname + "/html";
    fs.readdir(rootDir, function(err, files) { 
        var dirs = []; 
        for (var index = 0; index < files.length; ++index) { 
            var file = files[index]; 
            if (file[0] !== '.') { 
                var filePath = rootDir + '/' + file; 
                fs.stat(filePath, function(err, stat) {
                    if (stat.isDirectory()) { 
                        dirs.push(this.file); 
                    } 
                    if (files.length === (this.index + 1)) { 
                        return callback(dirs); 
                    } 
                }.bind({index: index, file: file})); 
            }
        }
    });
}

playsockets.start(app);