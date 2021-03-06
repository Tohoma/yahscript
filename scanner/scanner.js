var fs = require('fs');
var byline = require('byline');
var XRegExp = require('xregexp');
var tokenList = require('./tokens.js');
var error = require('../error/error');

const LETTER = /^([a-zA-Z])$/
const WORD_CHAR = XRegExp('[\\p{L}\\p{Nd}_]');
const DIGIT = /\d/;
const RESERVED_WORD = /^(is|be|yah|nah|spit|return|nil|undefined|NaN|for|while|in|and|or|if|elif|else|not|class|new|int|float|bool|string|list|tuple|dict|times|by|each)$/;
const ONE_CHARACTER_TOKENS = /^([+%\*{^}?<>|,\.\:\-{!}{(}{)}/\/\]\[])$/;
const TWO_CHARACTER_TOKENS = /^(\-\>|\&\&|\|\||\.\.|\:\:|\*\*|\<\=|\>\=|\=\=)$/;
const THREE_CHARACTER_TOKENS = /^(\.\.\.)$/;

module.exports = function(filename, callback) {
    var baseStream = fs.createReadStream(filename, {
        encoding: 'utf8'
    });

    //Current error is a placeholder
    baseStream.on('error', function() {
        console.log("I got an error")
    });

    var stream = byline(baseStream, {
        keepEmptyLines: true
    });
    var tokens = [];
    var linenumber = 0;
    var stack = [];
    var idStack = [0];
    stream.on('readable', function() {
        scan(stream.read(), linenumber++, tokens, stack, idStack)
    })
    stream.once('end', function() {
        tokens.push({
            kind: 'EOF',
            lexeme: 'EOF'
        });
        callback(tokens);
    })
}

var scan = function(line, linenumber, tokens, stack, idStack) {
    var pos = 0;
    var start = 0;
    var indentMode = true;
    var idLevel = 0;


    var emit = function(type, word, indentation, col, line) {
        tokens.push({
            kind: type,
            lexeme: word,
            idLevel: indentation,
            col: col,
            line: line
        })
    }

    if (!line) {
        return;
    }

    while (true) {

        //calculates indentation
        while (indentMode) {
            if (!/\s/.test(line[pos])) {
                idLevel = pos;
                indentMode = false;
                if (idStack[idStack.length - 1] < idLevel) {
                    idStack.push(idLevel);
                    emit("INDENT", "INDENT", idLevel, pos + 1, linenumber + 1);
                } else if (idLevel < idStack[idStack.length - 1]) {
                    while (!(idStack[idStack.length - 1] === idLevel) && !(typeof(idStack[0]) === "undefined")) {
                        idStack.pop()
                        emit("DEDENT", "DEDENT", idLevel, pos + 1, linenumber + 1);
                    }

                }
                if (typeof idStack[0] === "undefined") {
                    error("Indentation error", {
                        line: linenumber + 1
                    });

                }

            } else {
                pos++;
            };
        }

        // Skips over non indent spaces
        while (/\s/.test(line[pos]) && !indentMode) {
            pos++
        }

        start = pos;

        //Multi-Line comments
        if (line.substring(pos, pos + 3) === "///" || stack[0] === "///") {
            if (stack[0] != "///") {
                stack.push("///");
                pos += 3;
            }
            if (line.substring(pos, pos + 3) != "///") {
                while (line.substring(pos, pos + 3) != "///" && pos < line.length) {
                    pos++;
                }
                break;
            } else {
                stack.pop();
                break;
            }
        }

        //Single line comments
        if (line[pos] === "/" && line[pos + 1] === "/") {
            var linePos = pos;
            pos = line.length;
            emit("newline", "newline", idLevel, linePos + 1, linenumber + 1);
            break;
        }

        //Strings
        if (line[pos] === '"') {
            pos++;
            var stringMode = true;
            while (stringMode && line[pos]) {
                pos++;
                if (line[pos] === '"') {
                    stringMode = false;
                    var matchedString = line.substring(start + 1, pos);
                    emit("strlit", matchedString, idLevel, start + 1, linenumber + 1);
                } else if (line[pos] === undefined) {
                    error("Yo homie, you appear to have forgotten to add closing quotes to that string there, it's", {
                        line: linenumber + 1
                    })
                }
            }
        }

        //Three Character tokens
        if (THREE_CHARACTER_TOKENS.test(line.substring(pos, pos + 3))) {
            emit(line.substring(pos, pos + 3), line.substring(pos, pos + 3), idLevel, pos + 1, linenumber + 1);
            pos += 2;

            //Two Character tokens
        } else if (TWO_CHARACTER_TOKENS.test(line.substring(pos, pos + 2))) {
            emit(line.substring(pos, pos + 2), line.substring(pos, pos + 2), idLevel, pos + 1, linenumber + 1);
            pos++;

            //One Character tokens
        } else if (ONE_CHARACTER_TOKENS.test(line[pos])) {
            emit(line[pos], line[pos], idLevel, pos + 1, linenumber + 1);

        } else if (LETTER.test(line[pos])) {
            while (WORD_CHAR.test(line[pos + 1]) && (pos < line.length)) {
                pos++;

            }
            var matchedWord = line.substring(start, pos + 1);
            if (RESERVED_WORD.test(matchedWord)) {
                emit(matchedWord, matchedWord, idLevel, start + 1, linenumber + 1);
            } else if (matchedWord) {
                emit("id", matchedWord, idLevel, start + 1, linenumber + 1);
            }

            //Digits
        } else if (DIGIT.test(line[pos])) {
            while (DIGIT.test(line[pos + 1]) && (pos < line.length)) {
                pos++;
            }
            var matchedNumber = line.substring(start, pos + 1);
            emit("intlit", matchedNumber, idLevel, start + 1, linenumber + 1);
        }


        if (line[pos]) {
            pos++;
        } else {
            emit("newline", "newline", idLevel, pos + 1, linenumber + 1);

            break;
        }
    }

}