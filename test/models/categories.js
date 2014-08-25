var expect = require("expect.js");

var categories = require(__dirname+'/../../models/categories');

describe('categories', function(){

	it('should return a categorie', function(){
		var cat1 = categories.get(1);

		expect(cat1._id).to.be(1);
		expect(cat1.name).to.be.a('string');

		var cat2 = categories.get(2);
		expect(cat2._id).to.be(2);
		expect(cat2.name).to.be.a('string');
	});

	it('should return all categories if get called without argument',
	 function(){

		var cats = categories.get();

		expect(cats).to.be.an('array');
		expect(cats).to.not.be.empty();
	});

	it('should fail if cat does not exist',
	 function(){

		var funNegativeId = function(){
			categories.get(-1);
		};
        expect(funNegativeId).to.throwException(/no categorie for id -1/)

		var funTooBigId = function(){
			categories.get(999999);
		};
        expect(funTooBigId).to.throwException(/no categorie for id 999999/)


	});

});
