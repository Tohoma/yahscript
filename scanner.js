fs = require('fs')
byline = require('byline')
XRegExp = require('xregexp')

module.exports = function(filename, callback) {
    var baseStream = fs.createReadStream(filename,{encoding: 'utf8'})
    //Current error is a placeholder
    //baseStream.on('error', function(){console.log("I got an error")})

    var stream = byline(baseStream, {keepEmptyLines: true})
    var tokens = []
    var linenumber = 0
    stream.on('readable', function(){
        scan(stream.read(),linenumber++,tokens)
    })
    stream.once('end', function() {
        tokens.push({kind: 'EOF', lexeme:'EOF', idlevel: 1})
        callback(tokens)
    })
}

var scan = function(line, linenumber, tokens) {
    var pos = 0;
    var start = 0;

    var emit = function(type,word, indentation){
        tokens.push({kind:type, lexeme:word, idlevel: indentation})
    }

    if(!line){return}

    while(true){
        //Single line comments
        if(line[pos]==="/" &&line[pos + 1] === "/") {break}

        if(line[pos]){ 
        //Should print out character and position. Will remove later.
        console.log(line[pos]);
        pos++;
        console.log(pos);
        
        } else{
            console.log(line);
            break}
    }
    

}