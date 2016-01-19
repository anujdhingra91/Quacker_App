angular.module("quacker").controller("QuackListController", ["quacks", "user",
function(quacks, user) {
    var self = this;
    this.all_quacks = quacks.quacks;
    
    this.updateList = function() {
        self.all_quacks = quacks.getQuacks ();
    };
    
    this.removeQuack = function(id) {
        quacks.removeQuack(id);
        self.fetchQuacks();
    };
    
    this.fetchQuacks = function() {
        quacks.fetchQuacks().then(function() {
            self.updateList(); 
        });
    }
        
    this.setRead = function(id) {
        
    };
    
    this.getUserID = function() {
        return user.info._id;
    };
    
    this.getQuacks = function() {
        return quacks.getQuacks();  
    };

    self.fetchQuacks();
}]);