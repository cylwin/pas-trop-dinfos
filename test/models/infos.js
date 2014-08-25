var expect = require("expect.js");

var Infos = require(__dirname+'/../../models/infos');

describe('infos', function(){

	it('should group infos by categories', function(){

		var infos = [
			{_id : 1, categorieId : 0},
			{_id : 5, categorieId : 1},
			{_id : 2, categorieId : 2},

			// 2 for the same categorie
			{_id : 3, categorieId : 3},
			{_id : 6, categorieId : 3},

			{_id : 4, categorieId : 4}
		];

		var categories = Infos.groupByCategories(infos);

		expect(categories).to.be.an('array');
		expect(categories[0].infos).to.be.an('array');
		expect(categories[0].infos[0]._id).to.be(1);
		expect(categories[1].infos[0]._id).to.be(5);
		expect(categories[3].infos).to.have.length(2);
	});


});
