var fs = require('fs');

fs.mkdir('duff',function(){
    fs.readFile('text.txt','utf8',function(err,data){
        fs.writeFile('./duff/writer.txt',data,function(){
            console.log('copy is successfully')
        })
    })
})