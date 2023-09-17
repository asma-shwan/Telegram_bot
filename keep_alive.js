const { write } = require('fs')
var http=require('http')

http.createServer(function(req,res){
    res.write("i am alive")
    res.sendDate()
}).listen(8080)

