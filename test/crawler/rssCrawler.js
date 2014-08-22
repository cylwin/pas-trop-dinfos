var expect = require("expect.js");
var RssCrawler = require(__dirname+'/../../crawler/rssCrawler');

describe('rssCrawler', function(){
    var rssCrawler;

    beforeEach(function(){
        rssCrawler = new RssCrawler();
    });

    it('should select best infos even if there are only 2 infos', function(){
        var info1 = {
            title : "Un virus inconnu",
            analysedInfos : {score : 12},
            categorieId : 1
        };
        var info2 = {
            title : "Un virus inconnu",
            analysedInfos : {score : 14},
            categorieId : 2
        };

        rssCrawler.items = [info1, info2];
        rssCrawler.selectItems();

        expect(rssCrawler.selectedItems).to.be.an('array');
        expect(rssCrawler.selectedItems).to.have.length(2);

        expect(rssCrawler.selectedItems).to.contain(info1);
        expect(rssCrawler.selectedItems).to.contain(info2);
    });

    it('should ignore incomplete item when selecting best items',
        function(){

        var info1 = {
            title : "Un virus inconnu",
            categorieId : 1
        };
        var info2 = {
            title : "Un virus inconnu",
            categorieId : 2
        };

        rssCrawler.items = [info1, info2];
        rssCrawler.selectItems();

        expect(rssCrawler.selectedItems).to.be.an('array');
        expect(rssCrawler.selectedItems).to.have.length(2);

        expect(rssCrawler.selectedItems).to.contain(info1);
        expect(rssCrawler.selectedItems).to.contain(info2);

        expect(info1.analysedInfos.score).to.be(0);
        expect(info2.analysedInfos.score).to.be(0);


    });

    it('select best infos', function(){
        var info1 = {
            title : "Un virus inconnu",
            analysedInfos : {score : 12},
            categorieId : 1
        };
        var info2 = {
            title : "Un virus inconnu",
            analysedInfos : {score : 14},
            categorieId : 2
        };
        var info3 = {
            title : "Un virus inconnu",
            analysedInfos : {score : 11},
            categorieId : 3
        };
        var info4 = {
            title : "Un virus inconnu",
            analysedInfos : {score : 142},
            categorieId : 4
        };
        var info5 = {
            title : "Un virus inconnu",
            analysedInfos : {score : 17},
            categorieId : 3
        };
        var info6 ={
            title : "Un virus inconnu",
            analysedInfos : {score : 0},
            categorieId : 5
        };
        rssCrawler.items = [info1, info2, info3, info4, info5, info6] ;
        rssCrawler.selectItems();

        expect(rssCrawler.selectedItems).to.be.an('array');
        expect(rssCrawler.selectedItems).to.have.length(5);

        expect(rssCrawler.selectedItems).to.contain(info1);
        expect(rssCrawler.selectedItems).to.contain(info2);
        expect(rssCrawler.selectedItems).to.not.contain(info3);
        expect(rssCrawler.selectedItems).to.contain(info4);
        expect(rssCrawler.selectedItems).to.contain(info5);
        expect(rssCrawler.selectedItems).to.contain(info6);
    });




});
