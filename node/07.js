var http  = require('http');
var fs = require('fs');
var url = require('url')
var queryStr = require('querystring')

 function startServer(){
    var req = function(req,res){
        var pathname = url.parse(req.url);
        console.log(pathname)
        if(req.url === '/' || req.url === '/home'){
            res.writeHead(200,{'Content-Type':'text/html'});
            fs.createReadStream(__dirname + '/index.html').pipe(res);
        }else if(req.url === '/v1/api'){
            var path = url.parse(req.url)
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(path);
        }
    }
    var server = http.createServer(req)
    server.listen(3000,function(){
        console.log('server is running')
    })
}


startServer();

