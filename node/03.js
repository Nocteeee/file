var fs  = require('fs');

var readStream = fs.createReadStream(__dirname + '/text.txt');
readStream.setEncoding('utf8')
var writerStream = fs.createWriteStream(__dirname + '/01.txt');
// readStream.pipe(writerStream)


var str = 'hello world';
writerStream.write(str);
writerStream.end();
writerStream.on('finish',function(){
    console.log('finish!')
})





// var data = '';
// readStream.on('data',function(chunk){
//     // data += chunk;
//     writerStream.write(chunk)
// })

// readStream.on('end',function(){
//     console.log(data)
// })
