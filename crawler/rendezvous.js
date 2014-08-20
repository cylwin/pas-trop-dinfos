var RendezVous = function (callback, numberOfTokens) {
  this.setCallback(callback);
  this.addTokens(numberOfTokens || 0);
}

RendezVous.prototype = {
  numberOfTokens: 0,

  ready: function(numberOfTokensToRemove){
    numberOfTokensToRemove = numberOfTokensToRemove || 1;
    this.numberOfTokens = this.numberOfTokens - numberOfTokensToRemove;

    if(this.numberOfTokens <= 0){
      this.callback.call();
    }
  },

  setCallback: function(callback){
    if(!callback){
      throw new Error("callback must be a function");
    }
    this.callback = callback;
    return this;
  },

  addTokens: function(numberOfTokens){
    if(typeof numberOfTokens != 'number'){
      throw new Error("numberOfTokens must be a number");
    }
    if(Math.round(numberOfTokens) != numberOfTokens){
      throw new Error("numberOfTokens must be an integer");
    }
    if(numberOfTokens < 0){
      throw new Error("numberOfTokens must positive or null");
    }
    numberOfTokens = numberOfTokens || 0;
    this.numberOfTokens = this.numberOfTokens + numberOfTokens;
  }
}

module.exports = RendezVous;