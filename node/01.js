var fs = require('fs');

var text = fs.readFile('text.txt', "utf8",function(err,data){
    fs.writeFile('writer.txt', data,function(){
        console.log('writer is finished')
    })
});

var waitTill = new Date(new Date().getTime() + 4* 1000);
while(new Date().getTime() < waitTill){}

console.log('finished')