
var categories = [];
categories[0] = {_id: 0, name : "Science/HighTech"};
categories[1] = {_id: 1, name : "Economie/Politique"};
categories[2] = {_id: 2, name : "Sport"};
categories[3] = {_id: 3, name : "Santé"};
categories[4] = {_id: 4, name : "International"};

module.exports = {
  get: function(id){
    if(id === undefined){
      return categories;
    }
    if(id >= categories.length || id < 0){
      throw new Error("no categorie for id "+id);
    }
    return categories[id];
  },

  getName: function(id){
    return this.get(id).name;
  }
}
