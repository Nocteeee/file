var http  = require('http');
var fs = require('fs');
var url = require('url')
var querystring = require('querystring')

 var server = http.createServer(function(req,res){
     var pathname = url.parse(req.url).pathname;
     var data = [];
     req.on('error',function(err){
         console.log(err)
     }).on('data',function(chunk){
         data.push(chunk);
     }).on('end',function(){
         if(req.method === 'POST'){
             if(req.length > 1e6){
                 req.connection.destroy()
             }
             res.writeHead(200,{'Content-Type':'application/json'});
             data = Buffer.concat(data).toString('utf8');
             res.end(JSON.stringify(querystring.parse(data)))
         }else{
             res.writeHead(200,{'Content-Type':'text/html'});
             fs.createReadStream(__dirname + '/index.html','utf8').pipe(res)
         }
     })
 })

 server.listen(4000)


