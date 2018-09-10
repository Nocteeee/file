var http  = require('http');
var fs = require('fs');

 function startServer(){
    var req = function(req,res){
        console.log('req received');
        res.writeHead(200,{'Content-Type':'text/html'});
        var readStream = fs.createReadStream(__dirname + '/index.html','utf8');
        readStream.pipe(res)
    }
    var server = http.createServer(req)
    server.listen(3000,function(){
        console.log('server is running')
    })
}

exports.server = startServer;

