var scan = require('../../scanner/scanner'),
    should = require('should'),
    parse = require('../../parser/parser'),
    expected_ast = require('./expected/outputs'),
    error = require('../../error/error');

describe('The parser', function() {
    it('parses the simple-declaration program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-declaration.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_declaration);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the simple-assignment program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-assignment.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_assignment);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the simple-if-else program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-if-else.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_if_else);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the simple-while program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-while.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_while);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the sample1.yah program correctly', function(done) {
        scan('./test/parser/inputs/valid/sample1.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.sample1);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the expressions program correctly', function(done) {
        scan('./test/parser/inputs/valid/expressions.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.expressions);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the simple-for program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-for.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_for);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the simple-if-with-indents program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-if-with-indents.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_if_with_indents);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the else-if program correctly', function(done) {
        scan('./test/parser/inputs/valid/else-if.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.else_if);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the nested-if program correctly', function(done) {
        scan('./test/parser/inputs/valid/nested-if.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.nested_if);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the ternary-expression-test program correctly', function(done) {
        scan('./test/parser/inputs/valid/ternary-test.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.tern_exp);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('parses the primitives-and-reference-types program correctly', function(done) {
        scan('./test/parser/inputs/valid/primitives-and-reference-types.yah', function(tokens) {
            var priorErrorCount = error.count;
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.primitives);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('throws an error when there is a bad declaration program', function(done) {
        scan('./test/parser/inputs/invalid/bad-declaration.yah', function(tokens) {
            var priorErrorCount = error.count;
            parse(tokens);
            error.count.should.be.above(priorErrorCount);
            done();
        });
    });

    it('throws an error when parsing expression with missing semicolon', function(done) {
        scan('./test/parser/inputs/invalid/missing-semicolon.yah', function(tokens) {
            var priorErrorCount = error.count;
            parse(tokens);
            error.count.should.be.above(priorErrorCount);
            done();
        });
    });

    it('throws an error when parsing mixed keywords', function(done) {
        scan('./test/parser/inputs/invalid/while-for.yah', function(tokens) {
            var priorErrorCount = error.count;
            parse(tokens);
            error.count.should.be.above(priorErrorCount);
            done();
        });
    });

    it('throws an error when parsing both spit and return', function(done) {
        scan('./test/parser/inputs/invalid/spit-return.yah', function(tokens) {
            var priorErrorCount = error.count;
            parse(tokens);
            error.count.should.be.above(priorErrorCount);
            done();
        });
    });

    it('throws an error when parsing incorrect expressions', function(done) {
        scan('./test/parser/inputs/invalid/bad-expression.yah', function(tokens) {
            var priorErrorCount = error.count;
            parse(tokens);
            error.count.should.be.above(priorErrorCount);
            done();
        });
    });

    it('throws an error when parsing incorrect type', function(done) {
        scan('./test/parser/inputs/invalid/invalid-type.yah', function(tokens) {
            var priorErrorCount = error.count;
            parse(tokens);
            error.count.should.be.above(priorErrorCount);
            done();
        });
    });
});