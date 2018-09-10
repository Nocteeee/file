var http  = require('http');
var fs = require('fs');

var req = function(req,res){
    console.log('req received');
    res.writeHead(200,{'Content-Type':'application/json'});
    var text = fs.readFile('text.json','utf8',function(err,data){
        res.end(data)
    })
}
var server = http.createServer(req)

server.listen(3000,function(){
    console.log('server is running')
})