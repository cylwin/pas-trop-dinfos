var expect = require("expect.js");
var Rendezvous = require(__dirname+'/../../crawler/rendezvous');


describe('rendezvous', function(){


    it('should callback when no more token', function(done){
        var rendezvous = new Rendezvous(function(){
            done();
        }, 14);
        for (var i = 0; i < 14; i++) {
            rendezvous.ready(1);
        }
    });

    it('should callback the function set by setcallback \
     when no more token', function(done){
        var rendezvous = new Rendezvous(function(){}, 14);
        for (var i = 0; i < 13; i++) {
            rendezvous.ready(1);
        }
        rendezvous.setCallback(function(){
            done();
        });
        rendezvous.ready(1);
    });

    it('should be possible to take 2 tokens at same time',
        function(){

        var rendezvous = new Rendezvous(function(){}, 17);
        rendezvous.ready(2);
        expect(rendezvous.numberOfTokens).to.be(15);
    });

    it('should remove 1 tokens when call ready without argument',
        function(){

        var rendezvous = new Rendezvous(function(){}, 17);
        rendezvous.ready();
        expect(rendezvous.numberOfTokens).to.be(16);
    });

    it('should throw error when setCallback with a callback wich is not a function',
        function(){

        var rendezvous = new Rendezvous(function(){}, 17);

        var fun = function(){
            rendezvous.setCallback('not a function');
        }

        expect(fun).to.throwException(/callback must be a function/)
    });

    it('should throw error when callback is not a function',
        function(){

        var rendezvous = new Rendezvous(function(){}, 17);

        var fun = function(){
            rendezvous.setCallback('not a function');
        }

        expect(fun).to.throwException(/callback must be a function/);
    });

    it('should add addTokens',
        function(){

        var rendezvous = new Rendezvous(function(){}, 17);

        rendezvous.addTokens(2);
        expect(rendezvous.numberOfTokens).to.be(19);

        rendezvous.addTokens(0);
        expect(rendezvous.numberOfTokens).to.be(19);
    });


    it('should throw error when we addTokens not an integer number or negative',
        function(){

        var rendezvous = new Rendezvous(function(){}, 17);

        var funNotANumber = function(){
            rendezvous.addTokens('not a number');
        }
        expect(funNotANumber).to.throwException(/numberOfTokens must be a number/);

        var funNotANumberUndefined = function(){
            rendezvous.addTokens();
        }
        expect(funNotANumberUndefined).to.throwException(/numberOfTokens must be a number/);

        var funNotAnInteger = function(){
            rendezvous.addTokens(17.2);
        }
        expect(funNotAnInteger).to.throwException(/numberOfTokens must be an integer/);

        var funNegative = function(){
            rendezvous.addTokens(-2);
        }
        expect(funNegative).to.throwException(/numberOfTokens must positive or null/);

    });
})
