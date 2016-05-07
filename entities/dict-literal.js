var DictLiteral, Type;

Type = require('./type');

DictLiteral = (function() {
    function DictLiteral(items) {
        this.items = items;
    }

    DictLiteral.prototype.toString = function() {
        return "{" + this.items + "}";
    };

    DictLiteral.prototype.analyze = function(context) {
        items.analyze(context);
        return this.type = Type.DICT;
    }

    DictLiteral.prototype.optimize = function() {
        items.optimize();
        return this;
    }

    return DictLiteral;
})();

module.exports = DictLiteral;