var Categories = function () {
  this.init();
}

Categories.prototype = {
  categories: [],
  init:function(){
    this.categories[0] = {_id: 0, name : "Science/HighTech"};
    this.categories[1] = {_id: 1, name : "Economie/Politique"};
    this.categories[2] = {_id: 2, name : "Sport"};
    this.categories[3] = {_id: 3, name : "Santé"};
    this.categories[4] = {_id: 4, name : "International"};
  },

  get: function(id){
    if(id === undefined){
      return this.categories;
    }
    if(id >= this.categories.length){
      throw new Error("no categorie for id "+id);
    }
    return this.categories[id];
  },

  getName: function(id){
    return this.get(id).name;
  }
}

module.exports = Categories;