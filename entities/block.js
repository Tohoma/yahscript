var chalk = require('chalk');
var Block;

Block = (function() {
    function Block(statements) {
        this.statements = statements;
    }

    Block.prototype.toString = function() {
        return "(Block " + (this.statements.join(' ')) + ")";
    };

    Block.prototype.analyze = function(context, symbols) {
        var i, len, localContext, ref, results, statement;
        localContext = context.createChildContext();
        localContext.returnType = context.returnType;
        ref = this.statements;
        //console.log(chalk.magenta(this.statements))
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
            statement = ref[i];
            results.push(statement.analyze(localContext));
        }
        return results;
    };

    Block.prototype.optimize = function() {
        var s;
        this.statements = (function() {
            var i, len, ref, results;
            ref = this.statements;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                s = ref[i];
                results.push(s.optimize());
            }
            return results;
        }).call(this);
        this.statements = (function() {
            var i, len, ref, results;
            ref = this.statements;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                s = ref[i];
                if (s !== null) {
                    results.push(s);
                }
            }
            return results;
        }).call(this);
        return this;
    };

    return Block;

})();

module.exports = Block;