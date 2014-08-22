
var RssXmlGenerator = function () {
  this.init();
}

RssXmlGenerator.prototype = {

 /**
  * Constructor
  * @return {RssXmlGenerator} this
  */
  init:function(){
    this.feed = [];
  }


};

module.exports = RssXmlGenerator;
