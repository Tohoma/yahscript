var Args = require('../../entities/args'),
    AssignmentStatement = require('../../entities/assignment-statement'),
    BinaryExpression = require('../../entities/binary-expression'),
    Binding = require('../../entities/binding'),
    BindList = require('../../entities/bind-list'),
    Block = require('../../entities/block'),
    BooleanLiteral = require('../../entities/boolean-literal'),
    Class = require('../../entities/class-expression'),
    Comprehension = require('../../entities/comprehension'),
    DictLiteral = require('../../entities/dict-literal'),
    ExpList = require('../../entities/expression-list'),
    Func = require('../../entities/function'),
    FieldAccess = require('../../entities/field-access'),
    FunctionCall = require('../../entities/function-call'),
    ForStatement = require('../../entities/for-statement'),
    FloatLiteral = require('../../entities/float-literal'),
    IfElseStatement = require('../../entities/if-else-statement'),
    IntegerLiteral = require('../../entities/integer-literal'),
    ListLiteral = require('../../entities/list-literal'),
    NanLiteral = require('../../entities/nan-literal'),
    NilLiteral = require('../../entities/nil-literal'),
    Program = require('../../entities/program'),
    ReadStatement = require('../../entities/read-statement'),
    ReturnStatement = require('../../entities/return-statement'),
    StringLiteral = require('../../entities/string-literal'),
    Type = require('../../entities/type'),
    TupleLiteral = require('../../entities/tuple-literal'),
    UnaryExpression = require('../../entities/unary-expression'),
    UndefinedLiteral = require('../../entities/undefined-literal'),
    VariableDeclaration = require('../../entities/variable-declaration'),
    VariableReference = require('../../entities/variable-reference'),
    WhileStatement = require('../../entities/while-statement'),
    WriteStatement = require('../../entities/write-statement'),
    should = require("should");

describe('The entities', function() {
    describe('assignment-statement', function() {
        it('successfully creates an assignment statement', function(done) {
            var newAssignment = new AssignmentStatement('x', '3');
            newAssignment.toString().should.eql('(be (x 3))');
            done();
        });
    });

    describe('binary-expression', function() {
        it('successfully creates a binary-expression with addition', function(done) {
            var newBinExp = new BinaryExpression({
                'lexeme': '+',
                'kind': '+'
            }, '2', '3');
            newBinExp.toString().should.eql('(+ 2 3)');
            done();
        });

        it('successfully creates a binary-expression with a boolean operator', function(done) {
            var newBinExp = new BinaryExpression({
                'lexeme': '<=',
                'kind': '<='
            }, '2', '3');
            newBinExp.toString().should.eql('(<= 2 3)');
            done();
        });
        it('successfully throws an error with type mismatch on boolean operators', function(done) {
            var newBinExp = new BinaryExpression({
                'lexeme': '<=',
                'kind': '<='
            }, 'true', '3');
            newBinExp.toString().should.eql('(<= true 3)');
            done();
        });
    });

    describe('binding', function() {
        it('successfully creates a binding expression', function(done) {
            var newBinding = new Binding({
                'lexeme': 'trix'
            }, '4kdz');
            newBinding.toString().should.eql('(: trix 4kdz)');
            done();
        });
    });

    describe('bind-list', function() {
        it('successfully creates a list of binds', function(done) {
            var items = [
                new Binding({
                    'lexeme': 'trix'
                }, '4kdz'),
                new Binding({
                    'lexeme': 'apples'
                }, 'oranges'),
                new Binding({
                    'lexeme': 'foo'
                }, 'bar')
            ];
            var newBindList = new BindList(items);
            newBindList.toString().should.eql('BindList ((: trix 4kdz), (: apples oranges), (: foo bar))');
            done();
        });
        it('successfully creates an empty bind-list', function(done) {
            var newEmptyBindList = new BindList([]);
            newEmptyBindList.toString().should.eql('BindList ()');
            done();
        });
    });

    describe('block', function() {
        it('successfully creates a block', function(done) {
            var newBlock = new Block(['statement']);
            newBlock.toString().should.eql('(Block statement)');
            done();
        });
    });

    describe('boolean-literal', function() {
        it('successfully creates a boolean-literal', function(done) {
            var newBoolLit = new BooleanLiteral({
                'lexeme': 'yah'
            });
            newBoolLit.toString().should.eql('true');
            done();
        });
    });

    describe('comprehension', function() {
        it('successfully creates a list comprehension', function(done) {
            var newListComp = new Comprehension('0', {
                'lexeme': '..'
            }, '4', '2');
            newListComp.toString().should.eql('(0 .. 4 by 2)');
            done();
        });
    });

    describe('dict-literal', function() {
        it('successfully creates a dictionary-literal', function(done) {
            var items = [
                new Binding({
                    'lexeme': 'trix'
                }, '4kdz'),
                new Binding({
                    'lexeme': 'apples'
                }, 'oranges'),
                new Binding({
                    'lexeme': 'foo'
                }, 'bar')
            ];
            var newDictLit = new DictLiteral(new BindList(items));
            newDictLit.toString().should.eql('{BindList ((: trix 4kdz), (: apples oranges), (: foo bar))}');
            done();
        });
        it('successfully creates an empty dictionary-literal', function(done) {
            var newDictLit = new DictLiteral(new BindList([]));
            newDictLit.toString().should.eql('{BindList ()}');
            done();
        });
    });

    describe('field-access', function() {
        it('successfully creates a field-access expression', function(done) {
            var newFieldAccess = new FieldAccess('x', '0');
            newFieldAccess.toString().should.eql('(. x 0)');
            done();
        });
    });

    describe('float-literal', function() {
        it('successfully creates a float-literal', function(done) {
            var newFloatLit = new FloatLiteral({
                'lexeme': '3.1415926535'
            });
            newFloatLit.toString().should.eql('3.1415926535');
            done();
        });
    });

    describe('for-statement', function() {
        it('successfully creates a for-statement', function(done) {
            var newForStmt = new ForStatement({
                lexeme: 'name'
            }, '["trixie", "peyton", "vic", "adrian", "jb", "chris"]', 'spit name');
            newForStmt.toString().should.eql('(For name ["trixie", "peyton", "vic", "adrian", "jb", "chris"] spit name)')
            done();
        });
    });

    describe('function-call', function() {
        it('successfully creates a function-call', function(done) {
            var newFunDec = new FunctionCall('x', new Args(new ExpList([
                new VariableReference({
                    'lexeme': 'a'
                }),
                new VariableReference({
                    'lexeme': 'b'
                })
            ])));
            newFunDec.toString().should.eql('(FunCall x (a, b))');
            done();
        });
    });

    describe('if-else-statement', function() {
        it('successfully creates an if-else-statement', function(done) {
            var newStmt = new IfElseStatement("true", "(be (x 3))", [], "(be (x 4))");
            newStmt.toString().should.eql('(If true (be (x 3)) Else (be (x 4)))');
            done();
        });
    });

    describe('integer-literal', function() {
        it('successfully creates an integer-literal', function(done) {
            var newIntLit = new IntegerLiteral({
                'lexeme': '10000'
            });
            newIntLit.toString().should.eql('10000');
            done();
        });
    });

    describe('list-literal', function() {
        it('successfully creates a list-literal', function(done) {
            var newListLit = new ListLiteral(new ExpList([
                new IntegerLiteral({
                    'lexeme': '0'
                }),
                new IntegerLiteral({
                    'lexeme': '1'
                }),
                new IntegerLiteral({
                    'lexeme': '2'
                })
            ]));
            newListLit.toString().should.eql('[0, 1, 2]');
            done();
        });
        it('successfully creates an empty list-literal', function(done) {
            var newEmptyList = new ListLiteral([]);
            newEmptyList.toString().should.eql('[]');
            done();
        });
        it('successfully creates a single element list-literal', function(done) {
            var newSingleList = new ListLiteral(['1']);
            newSingleList.toString().should.eql('[1]');
            done();
        });
    });

    describe('nan-literal', function() {
        it('successfully creates a nan-literal', function(done) {
            var newNanLit = new NanLiteral({
                'lexeme': 'nan'
            });
            newNanLit.toString().should.eql('nan');
            done();
        });
    });

    describe('nil-literal', function() {
        it('successfully creates a nil-literal', function(done) {
            var newFloatLit = new NilLiteral({
                'lexeme': 'nil'
            });
            newFloatLit.toString().should.eql('nil');
            done();
        });
    });

    describe('program', function() {
        it('successfully creates a program', function(done) {
            var newProgram = new Program('block');
            newProgram.toString().should.eql('(Program block)');
            done();
        });
    });

    describe('return-statement', function() {
        it('successfully creates a return-statement', function(done) {
            var newReturnStmt = new ReturnStatement('(be (x 3))');
            newReturnStmt.toString().should.eql('(Return (be (x 3)))');
            done();
        })
    })

    describe('string-literal', function() {
        it('successfully creates an string-literal', function(done) {
            var newStrLit = new StringLiteral({
                "lexeme": "stringy"
            });
            newStrLit.toString().should.eql('"stringy"');
            done();
        });
    });

    describe('type', function() {
        it('successfully creates an INT type', function(done) {
            Type.INT.toString().should.eql('int');
            done();
        });
        it('successfully creates a BOOL type', function(done) {
            Type.BOOL.toString().should.eql('bool');
            done();
        });
        it('successfully creates a STR type', function(done) {
            Type.STR.toString().should.eql('str');
            done();
        });
        it('successfully creates a FLOAT type', function(done) {
            Type.FLOAT.toString().should.eql('float');
            done();
        });
        it('successfully creates a UNDEFINED type', function(done) {
            Type.UNDEFINED.toString().should.eql('undefined');
            done();
        });
        it('successfully creates a NAN type', function(done) {
            Type.NAN.toString().should.eql('nan');
            done();
        });
        it('successfully creates a NIL type', function(done) {
            Type.NIL.toString().should.eql('nil');
            done();
        });
        it('successfully creates a LIST type', function(done) {
            Type.LIST.toString().should.eql('list');
            done();
        });
        it('successfully creates a TUPLE type', function(done) {
            Type.TUPLE.toString().should.eql('tuple');
            done();
        });
        it('successfully creates a DICT type', function(done) {
            Type.DICT.toString().should.eql('dict');
            done();
        });
        it('successfully creates an ARBITRARY type', function(done) {
            Type.ARBITRARY.toString().should.eql('<arbitrary_type>');
            done();
        })
    });

    describe('tuple-literal', function() {
        it('successfully creates a tuple literal', function(done) {
            var newTupleLit = new TupleLiteral(new ExpList([
                new IntegerLiteral({
                    'lexeme': '1'
                }),
                new IntegerLiteral({
                    'lexeme': '2'
                })
            ]));
            newTupleLit.toString().should.eql('(1, 2)');
            done();
        });
    });

    describe('unary-expression', function() {
        it('successfully creates a unary-expression', function(done) {
            var newUnaryExp = new UnaryExpression({
                'lexeme': '!',
                'kind': '!'
            }, 'yah');
            newUnaryExp.toString().should.eql('(! yah)');
            done();
        });
    });

    describe('undefined-literal', function() {
        it('successfully creates a undefined-literal', function(done) {
            var newUndefinedLit = new UndefinedLiteral({
                'lexeme': 'undefined'
            });
            newUndefinedLit.toString().should.eql('undefined');
            done();
        });
    });

    describe('variable-declaration', function() {
        it('successfully creates a variable-declaration', function(done) {
            var newVarDec = new VariableDeclaration({
                "lexeme": 'x',
                "kind": 'id'
            }, '3');
            newVarDec.toString().should.eql('(is (x 3))');
            done();
        });
    });

    describe('variable-reference', function() {
        it('successfully creates a variable-reference', function(done) {
            var newVarRef = new VariableReference({
                "lexeme": 'x',
                "kind": 'id'
            }, '100');
            newVarRef.toString().should.eql('x');
            done();
        });
    });

    describe('while-statement', function() {
        it('successfully creates a while-statement', function(done) {
            var newStmt = new WhileStatement("true", "spit");
            newStmt.toString().should.eql("(While (true) spit)");
            done();
        });
    });

});